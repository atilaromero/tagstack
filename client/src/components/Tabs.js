import React from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types'


// import C3Chart from 'react-c3js';
// import Data from './Data'
import DocContainer  from './DocContainer'
// import DocSizes from './DocSizes'
// import DocList from './DocList'
import DocTable from './DocTable'

// const DocSizesContainer = DocContainer(DocSizes)
// const DocListContainer = DocContainer(DocList)
// const DocTableContainer = DocContainer(DocTable)
// const C3Container = DocContainer(C3Chart)

// import BarChart from './BarChart'
import C3Size from './C3Size'
import C3Dates from './C3Dates'

export class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      visible: [],
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}>
              Table + Graphs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}>
              Table
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <DocTable
              data={this.props.data}
              fields={this.props.fields}
              onVisible={data => {
                this.setState({visible: data})
              }}
            />
            <C3Size json={this.state.visible}
              selection={this.props.selection}
              onselected={this.props.select}
              onunselected={this.props.unselect}
            />
            <C3Dates json={this.state.visible}
              selection={this.props.selection}
              onselected={this.props.select}
              onunselected={this.props.unselect}
            />
          </TabPane>
          <TabPane tabId="2">
            {/* <DocTableContainer/> */}
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
Tabs.propTypes = {
  data: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  selection: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  unselect: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
}

export const TabsContainer = DocContainer(Tabs)

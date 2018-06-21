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


import C3Chart from 'react-c3js';
// import Data from './Data'
import DocContainer  from './DocContainer'
// import DocSizes from './DocSizes'
// import DocList from './DocList'
import DocTable from './DocTable'

// const DocSizesContainer = DocContainer(DocSizes)
// const DocListContainer = DocContainer(DocList)
const DocTableContainer = DocContainer(DocTable)
// const C3Container = DocContainer(C3Chart)

export class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
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
            <DocTableContainer/>
            <C3Chart data={{
              json: this.props.data,
              type: 'area-spline',
              selection: {
                enabled: true,
                grouped: true,
                multiple: true,
                draggable: true,
              },
              keys: {
                value: ['st_size']
              }
            }}/>
            <C3Chart data={{
              json: this.props.data,
              grid: {
                y: {
                  show: true
                }
              },
              axis:{
                y: {
                  type: 'timeseries',
                }
              },
              type: 'scatter',
              selection: {
                enabled: true,
                grouped: true,
                multiple: true,
                draggable: true,
              },
              keys: {
                value: ['st_atime', 'st_mtime', 'st_ctime', 'st_crtime']
              }
            }}/>
          </TabPane>
          <TabPane tabId="2">
            <DocTableContainer/>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
Tabs.propTypes = {
  data: PropTypes.array.isRequired,
}

export const TabsContainer = DocContainer(Tabs)

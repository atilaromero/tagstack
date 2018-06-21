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
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}>
              Sample
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}>
              Table
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <DocTableContainer/>
          </TabPane>
          <TabPane tabId="4">
            <C3Chart data={{
              rows: this.props.data,
              hide: 'md5|file|st_ino|st_ls|st_uid|st_gid|st_atime|st_mtime|st_ctime|st_crtime'.split('|')
            }}/>
            <C3Chart data={{
              rows: this.props.data,
              hide: 'md5|file|st_ino|st_ls|st_uid|st_gid|st_size'.split('|')
            }}/>
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

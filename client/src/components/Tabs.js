import React from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap';
import classnames from 'classnames';


// import C3Chart from 'react-c3js';
// import Data from './Data'
import DocContainer  from './DocContainer'
import DocSizes from './DocSizes'
import DocList from './DocList'

const DocSizesContainer= DocContainer(DocSizes)
const DocListContainer= DocContainer(DocList)

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
              onClick={() => { this.toggle('1'); }}
            >
              Paths
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Sizes
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                {/* <Data user={this.state.user} onData={this.updateData}/>
                {(this.state.data) ?
                  (<C3Chart data={this.state.data}/>)
                  : (null)
                } */}
                <DocListContainer/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col>
                <DocSizesContainer/>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
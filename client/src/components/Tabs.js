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


import { connect } from 'react-redux';
import { actions }  from '../ducks/docs'
import DocTable from './DocTable'

import C3Size from './C3Size'
import C3Dates from './C3Dates'
import TagGroup from './TagGroup'

export class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: props.initialTab.toString(),
    };
  }
  componentDidMount() {
    if (!this.state.activeTab) {
      this.toggle(this.props.initialTab.toString())
    }
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
          {(this.props.disableFirst)?
            null:
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}>
                Table
              </NavLink>
            </NavItem>
          }
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}>
              Tags
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}>
              Size
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}>
              Dates
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          {(this.props.disableFirst)?
            null:
            <TabPane tabId="1">
              <DocTable
                data={this.props.data}
                fields={this.props.fields}
                onVisible={this.props.setVisibleData}
              />
            </TabPane>
          }
          <TabPane tabId="2">
            <TagGroup/>
          </TabPane>
          <TabPane tabId="3">
            <C3Size json={this.props.visibleData}
              selection={this.props.selection}
              onselected={this.props.select}
              onunselected={this.props.unselect}
            />
          </TabPane>
          <TabPane tabId="4">
            <C3Dates json={this.props.visibleData}
              selection={this.props.selection}
              onselected={this.props.select}
              onunselected={this.props.unselect}
            />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
Tabs.defaultProps = {
  initialTab: '1',
  disableFirst: false,
}
Tabs.propTypes = {
  initialTab: PropTypes.number,
  disableFirst: PropTypes.bool,

  data: PropTypes.array.isRequired,
  visibleData: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  selection: PropTypes.array.isRequired,

  select: PropTypes.func.isRequired,
  unselect: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  setVisibleData: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    data:   state.docs.data,
    visibleData: state.docs.visibleData,
    selection: state.docs.selection,
    fields: state.docs.fields,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    select: x => dispatch(actions.select(x)),
    unselect: x => dispatch(actions.unselect(x)),
    clear: () => dispatch(actions.clear()),
    setVisibleData: data => dispatch(actions.setVisibleData(data)),
  };
}

export const TabsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tabs)

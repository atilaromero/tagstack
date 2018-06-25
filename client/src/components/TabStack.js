import React from 'react';
// import PropTypes from 'prop-types'
import { TabsContainer } from './Tabs'

const Element = () => {
  return (
    <div className="container">
      <div className="row rounded border">
        <div className="col-md-12">
          <TabsContainer
            initialTab={2}
            disableFirst={true}
          />
        </div>
      </div>
      <div className="row rounded border">
        <div className="col-md-12">
          <TabsContainer
            initialTab={3}
            disableFirst={true}
          />
        </div>
      </div>
      <div className="row rounded border">
        <div className="col-md-12">
          <TabsContainer
            initialTab={4}
            disableFirst={true}
          />
        </div>
      </div>
    </div>
  )
};
Element.propTypes = {
  // data: PropTypes.array.isRequired,
}

export default Element

import React from 'react';
// import PropTypes from 'prop-types'
import { TabsContainer } from './Tabs'

const Element = () => {
  return (
    <div>
      <TabsContainer
        initialTab={2}
        disableFirst={true}
      />
      <TabsContainer
        initialTab={3}
        disableFirst={true}
      />
      <TabsContainer
        initialTab={4}
        disableFirst={true}
      />
    </div>
  )
};
Element.propTypes = {
  // data: PropTypes.array.isRequired,
}

export default Element

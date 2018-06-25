import React from 'react'
import { TagAddContainer } from './TagAdd'
import { TagListContainer } from './TagList'

const TagGroup = () => {
  return (
    <div className="container" style={{paddingTop: '10px'}}>
      <div className="row">
        <div className="col-md-5">
          <TagAddContainer/>
        </div>
        <div className="col-md-1">
        </div>
        <div className="col-md-6">
          <TagListContainer/>
        </div>
      </div>
    </div>
  )
}

export default TagGroup
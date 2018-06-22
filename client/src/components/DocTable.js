import React from 'react';
import PropTypes from 'prop-types'
import ReactTable from "react-table";
import "react-table/react-table.css";

const toHeader = x => ({ Header: x, accessor: x})

const visible = (data, pageSize, page) => {
  return data.slice(page*pageSize,(page+1)*pageSize)
}

const Element = (props) => (
  <ReactTable style={{}}
    defaultPageSize={10}
    className="-striped -highlight"
    data = {props.data}
    columns = {props.fields.map(toHeader)}
    onFetchData = {state => {
      if (!state) return;
      const data = visible(state.sortedData, state.pageSize, state.page)
      if (props.onVisible)
        props.onVisible(data)
    }}
  />
)
// class Element extends React.Component {
//   render () {
//   }
// }
Element.propTypes = {
  data: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  onVisible: PropTypes.func.isRequired,
}

export default Element
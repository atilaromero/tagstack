import React from 'react';
import PropTypes from 'prop-types'
import ReactTable from "react-table";
import "react-table/react-table.css";

const headers = 'md5|file|st_ino|st_ls|st_uid|st_gid|st_size|st_atime|st_mtime|st_ctime|st_crtime'.split('|')

const toHeader = x => ({ Header: x, accessor: x})

const Element = (props) => {
  return (
    <ReactTable
      defaultPageSize={10}
      className="-striped -highlight"
      data = {props.data}
      columns = {headers.map(toHeader)}
    />
  )
};
Element.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Element
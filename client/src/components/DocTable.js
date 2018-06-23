import React from 'react';
import PropTypes from 'prop-types'
import ReactTable from "react-table";
import "react-table/react-table.css";
import DocContainer from './DocContainer'
import checkboxHOC from "react-table/lib/hoc/selectTable";
const CheckboxTable = checkboxHOC(ReactTable);

// const toHeader = x => ({ Header: x, accessor: x})

const visible = (data, pageSize, page) => {
  return data.slice(page*pageSize,(page+1)*pageSize)
}

const columns = [
  { Header: 'obj_id', accessor: 'obj_id' },
  // { Header: 'fs_obj_id', accessor: 'fs_obj_id' },
  // { Header: 'data_source_obj_id', accessor: 'data_source_obj_id' },
  // { Header: 'attr_type', accessor: 'attr_type' },
  // { Header: 'attr_id', accessor: 'attr_id' },
  { Header: 'parent_path', accessor: 'parent_path' },
  { Header: 'name', accessor: 'name' },
  // { Header: 'meta_addr', accessor: 'meta_addr' },
  // { Header: 'meta_seq', accessor: 'meta_seq' },
  // { Header: 'type', accessor: 'type' },
  // { Header: 'has_layout', accessor: 'has_layout' },
  // { Header: 'has_path', accessor: 'has_path' },
  { Header: 'size', accessor: 'size' },
  // { Header: 'ctime', accessor: 'ctime' },
  { Header: 'crtime', accessor: 'crtime' },
  { Header: 'atime', accessor: 'atime' },
  { Header: 'mtime', accessor: 'mtime' },
  { Header: 'dir_type', accessor: 'dir_type' },
  { Header: 'meta_type', accessor: 'meta_type' },
  { Header: 'dir_flags', accessor: 'dir_flags' },
  { Header: 'meta_flags', accessor: 'meta_flags' },
  { Header: 'mode', accessor: 'mode' },
  { Header: 'uid', accessor: 'uid' },
  { Header: 'gid', accessor: 'gid' },
  // { Header: 'md5', accessor: 'md5' },
  // { Header: 'known', accessor: 'known' },
  // { Header: 'mime_type', accessor: 'mime_type' } ,
]

const isSelected = (key, props) => {
  return props.selection.includes(key)
}
const DocTable = (props) => (
  <ReactTable style={{}}
    defaultPageSize={10}
    className="-striped -highlight"
    data = {props.data}
    filterable = {true}
    selectType = "checkbox"
    getTrProps = {
      (s, r) => {
        const selected = isSelected(r.original.obj_id, props);
        return {
          style: {
            backgroundColor: selected ? "lightgreen" : "inherit"
            // color: selected ? 'white' : 'inherit',
          }
        };
      }
    }
    columns = {columns}
    onFetchData = {state => {
      if (!state) return;
      const data = visible(state.sortedData, state.pageSize, state.page)
      if (props.onVisible)
        props.onVisible(data)
    }}
  />
)
DocTable.propTypes = {
  data: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  selection: PropTypes.array.isRequired,
  onVisible: PropTypes.func.isRequired,
}

export default DocTable
export const DocTableContainer = DocContainer(DocTable)

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
const stringFilter = (filter, row) => {
  const value = String(row[filter.id])
  const expr = filter.value
  return value.includes(expr)
}
const dateFilter = (filter, row) => {
  const value = new Date(row[filter.id])
  const expr = filter.value
  if (expr.startsWith('>=')) try {
    return (new Date(value) >= new Date(expr.slice(2)))
  } catch (error) { /**/ }
  if (expr.startsWith('<=')) try {
    return (new Date(value) <= new Date(expr.slice(2)))
  } catch (error) { /**/ }
  if (expr.startsWith('==')) try {
    return (new Date(value) === new Date(expr.slice(2)))
  } catch (error) { /**/ }
  if (expr.startsWith('=')) try {
    return (new Date(value) === new Date(expr.slice(1)))
  } catch (error) { /**/ }
  if (expr.startsWith('>')) try {
    return (new Date(value) > new Date(expr.slice(1)))
  } catch (error) {/**/}
  if (expr.startsWith('<')) try {
    return (new Date(value) < new Date(expr.slice(1)))
  } catch (error) { /**/ }
  return stringFilter(filter, row)
}
const numberFilter = (filter, row) => {
  const value = String(row[filter.id])
  const expr = filter.value
  if (expr.startsWith('>=')) try {
    return (Number(value) >= Number(expr.slice(2)))
  } catch (error) { /**/ }
  if (expr.startsWith('<=')) try {
    return (Number(value) <= Number(expr.slice(2)))
  } catch (error) { /**/ }
  if (expr.startsWith('==')) try {
    return (Number(value) === Number(expr.slice(2)))
  } catch (error) { /**/ }
  if (expr.startsWith('=')) try {
    return (Number(value) === Number(expr.slice(1)))
  } catch (error) { /**/ }
  if (expr.startsWith('>')) try {
    return (Number(value) > Number(expr.slice(1)))
  } catch (error) { /**/ }
  if (expr.startsWith('<')) try {
    return (Number(value) < Number(expr.slice(1)))
  } catch (error) { /**/ }
  return (Number(value) === Number(expr))
}

const columns = [
  { Header: 'obj_id', accessor: 'obj_id',
    filterMethod: numberFilter },
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
  { Header: 'size', accessor: 'size',
    filterMethod: numberFilter },
  // { Header: 'ctime', accessor: 'ctime' },
  { Header: 'crtime', accessor: 'crtime',
    Cell: ({value}) => (new Date(value).toISOString()),
    filterMethod: dateFilter
  },
  { Header: 'atime', accessor: 'atime',
    Cell: ({value}) => (new Date(value).toISOString()),
    filterMethod: dateFilter
  },
  { Header: 'mtime', accessor: 'mtime',
    Cell: ({value}) => (new Date(value).toISOString()),
    filterMethod: dateFilter
  },
  { Header: 'dir_type', accessor: 'dir_type',
    filterMethod: numberFilter },
  { Header: 'meta_type', accessor: 'meta_type',
    filterMethod: numberFilter },
  { Header: 'dir_flags', accessor: 'dir_flags',
    filterMethod: numberFilter },
  { Header: 'meta_flags', accessor: 'meta_flags',
    filterMethod: numberFilter },
  { Header: 'mode', accessor: 'mode',
    filterMethod: numberFilter },
  { Header: 'uid', accessor: 'uid',
    filterMethod: numberFilter },
  { Header: 'gid', accessor: 'gid',
    filterMethod: numberFilter },
  // { Header: 'md5', accessor: 'md5' },
  // { Header: 'known', accessor: 'known' },
  // { Header: 'mime_type', accessor: 'mime_type' } ,
]

const isSelected = (key, props) => {
  return props.selection.includes(key)
}
const toggleSelection = (key, props) => {
  if (isSelected(key, props)) {
    props.unselect(key)
  } else {
    props.select(key)
  }
}
const calcPageSizeOptions = (dataLength) => {
  const result = [5, 10, 20, 25, 50, 100]
    .filter(x => x < dataLength)
  return [...result, dataLength].filter(x => x<= 100)
}
const DocTable = (props) => (
  <CheckboxTable
    keyField='obj_id'
    style={{}}
    defaultFilterMethod={stringFilter}
    pageSizeOptions={calcPageSizeOptions(props.data.length)}
    defaultPageSize={10}
    className="-striped -highlight"
    data = {props.data}
    filterable = {true}
    selectType = "checkbox"
    isSelected = {key => isSelected(key, props)}
    toggleAll = {() => {
      if (
        props.visibleData
          .map(x => x.obj_id)
          .map(obj_id => isSelected(obj_id,props))
          .filter(isSel => isSel === false)
          .length > 0
      ) {
        props.visibleData
          .map(x => x.obj_id)
          .map(obj_id => props.select(obj_id))
      } else {
        props.visibleData
          .map(x => x.obj_id)
          .map(obj_id => props.unselect(obj_id))
      }
    }}
    toggleSelection = {key => toggleSelection(key, props)}
    getTrProps = {
      (state, rowInfo) => {
        let selected = false
        try {
          selected = isSelected(rowInfo.original.obj_id, props);
        } catch(error) {
          selected = false
        }
        return {
          style: {
            backgroundColor: selected ? "lightgreen" : "inherit"
            // color: selected ? 'white' : 'inherit',
          },
          onClick: () => toggleSelection(rowInfo.original.obj_id, props)
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
  visibleData: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  selection: PropTypes.array.isRequired,
  onVisible: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
  unselect: PropTypes.func.isRequired,

}

export default DocTable
export const DocTableContainer = DocContainer(DocTable)

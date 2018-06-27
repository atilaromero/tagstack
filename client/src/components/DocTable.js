import React from 'react';
import PropTypes from 'prop-types'
import ReactTable from "react-table";
import "react-table/react-table.css";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import { connect } from 'react-redux';
import { actions } from '../ducks/docs'

const CheckboxTable = checkboxHOC(ReactTable);

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

const getColumns = (fields) => {
  return Object.keys(fields).map(key => {
    switch (fields[key].type) {
    case "number":
      return  { Header: key, accessor: key,
        filterMethod: numberFilter }
    case "date-time":
      return  { Header: key, accessor: key,
        Cell: ({value}) => (new Date(value).toISOString()),
        filterMethod: dateFilter }
    default:
      return  { Header: key, accessor: key,
        filterMethod: stringFilter }
    }
  })
}

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
const visible = (data, pageSize, page) => {
  return data.slice(page*pageSize,(page+1)*pageSize)
}

class DocTable extends React.Component{
  constructor(props) {
    super(props)
    this.updateVisibleData = this.updateVisibleData.bind(this)
  }
  updateVisibleData(state) {
    if (!state) return;
    const data = visible(state.sortedData, state.pageSize, state.page)
    this.props.onVisible(data)
  }
  componentDidUpdate() {
    if (!this.node) return ;
    if (this.props.visibleData.length===0 && this.props.data.length>0){
      this.updateVisibleData(this.node.wrappedInstance.state)
    }
  }
  render() {
    return   (
      <CheckboxTable
        ref={node => {this.node = node}}
        keyField='obj_id'
        style={{}}
        defaultFilterMethod={stringFilter}
        pageSizeOptions={calcPageSizeOptions(this.props.data.length)}
        defaultPageSize={10}
        className="-striped -highlight"
        data = {this.props.data}
        filterable = {true}
        selectType = "checkbox"
        isSelected = {key => isSelected(key, this.props)}
        toggleAll = {() => {
          if (
            this.props.visibleData
              .map(x => x.obj_id)
              .map(obj_id => isSelected(obj_id,this.props))
              .filter(isSel => isSel === false)
              .length > 0
          ) {
            this.props.visibleData
              .map(x => x.obj_id)
              .map(obj_id => this.props.select(obj_id))
          } else {
            this.props.visibleData
              .map(x => x.obj_id)
              .map(obj_id => this.props.unselect(obj_id))
          }
        }}
        toggleSelection = {key => toggleSelection(key, this.props)}
        getTrProps = {
          (state, rowInfo) => {
            let selected = false
            try {
              selected = isSelected(rowInfo.original.obj_id, this.props);
            } catch(error) {
              selected = false
            }
            return {
              style: {
                backgroundColor: selected ? "lightgreen" : "inherit"
                // color: selected ? 'white' : 'inherit',
              },
              onClick: () => toggleSelection(rowInfo.original.obj_id, this.props)
            };
          }
        }
        columns = {getColumns(this.props.fields)}
        onFetchData = {this.updateVisibleData}
      />
    )
  }
}
DocTable.propTypes = {
  data: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  visibleData: PropTypes.array.isRequired,
  selection: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  unselect: PropTypes.func.isRequired,
  onVisible: PropTypes.func.isRequired,
}
function mapStateToProps(state) {
  return {
    data:   state.docs.data,
    fields: state.docs.fields,
    visibleData: state.docs.visibleData,
    selection: state.docs.selection,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    select: x => dispatch(actions.select(x)),
    unselect: x => dispatch(actions.unselect(x)),
    onVisible: data => dispatch(actions.setVisibleData(data)),
  };
}

export default DocTable
export const DocTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocTable)

import { connect } from 'react-redux';
import { actions } from '../ducks/docs'

function mapStateToProps(state) {
  return {
    data:   state.docs.data,
    selection: state.docs.selection,
    fields: state.docs.fields,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    select: x => dispatch(actions.select(x)),
    unselect: x => dispatch(actions.unselect(x)),
    clear: () => dispatch(actions.clear()),
  };
}

const DocContainer = (X) => connect(
  mapStateToProps,
  mapDispatchToProps
)(X);

export default DocContainer
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    data:   state.docs.data,
  }
}

function mapDispatchToProps() {
  return {};
}

const DocContainer = (X) => connect(
  mapStateToProps,
  mapDispatchToProps
)(X);

export default DocContainer
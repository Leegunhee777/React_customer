import { connect } from 'react-redux';
import AuthTab from './AuthTab';

const mapStateToProps = (state) => ({
    currentRoute: state.router.location.pathname
});

export default connect(mapStateToProps)(AuthTab);

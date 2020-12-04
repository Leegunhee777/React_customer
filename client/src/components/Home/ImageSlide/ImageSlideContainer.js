import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageSlide from './ImageSlide';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ImageSlide);

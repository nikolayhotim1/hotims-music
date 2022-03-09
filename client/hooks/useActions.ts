import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import AllPlayerPlayerActionCreators from '../store/action-creators';

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(AllPlayerPlayerActionCreators, dispatch);
};
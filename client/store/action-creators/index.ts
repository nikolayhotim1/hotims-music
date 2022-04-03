import { setActiveAlbum, setResponseError, setResponseMessage } from './albums';
import * as PlayerActionCreators from '../action-creators/player';

const AllPlayerPlayerActionCreators = {
    ...PlayerActionCreators,
    setActiveAlbum,
    setResponseError,
    setResponseMessage
};

export default AllPlayerPlayerActionCreators;
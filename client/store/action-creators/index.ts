import { setActiveAlbum } from './albums';
import * as PlayerActionCreators from '../action-creators/player';

const AllPlayerPlayerActionCreators = {
    ...PlayerActionCreators,
    setActiveAlbum
};

export default AllPlayerPlayerActionCreators;
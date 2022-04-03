import { albumReducer } from './albumReducer';
import { trackReduser } from './trackReduser';
import { playerReducer } from './playerReducer';
import { AnyAction, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

const rootReducer = combineReducers({
    player: playerReducer,
    track: trackReduser,
    album: albumReducer
});

export const reducer = (state: any, action: AnyAction) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload
        };
        if (state.player) {
            nextState.player = state.player;
        }
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};

export type RootState = ReturnType<typeof rootReducer>;
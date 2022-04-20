import { PlayerState, PlayerAction, PlayerActionTypes } from '../../types/player';

const initialState: PlayerState = {
    active: null,
    volume: 50,
    currentTime: 0,
    duration: 0,
    pause: true,
    collapsed: true
};

export const playerReducer = (
    state = initialState, action: PlayerAction
): PlayerState => {
    switch (action.type) {
        case PlayerActionTypes.PLAY:
            return { ...state, pause: false };
        case PlayerActionTypes.PAUSE:
            return { ...state, pause: true };
        case PlayerActionTypes.SET_ACTIVE:
            return { ...state, active: action.payload, currentTime: 0 };
        case PlayerActionTypes.SET_CURRENT_TIME:
            return { ...state, currentTime: action.payload };
        case PlayerActionTypes.SET_DURATION:
            return { ...state, duration: action.payload };
        case PlayerActionTypes.SET_VOLUME:
            return { ...state, volume: action.payload };
        case PlayerActionTypes.SET_COLLAPSED:
            return { ...state, collapsed: action.payload };
        default:
            return state;
    }
};
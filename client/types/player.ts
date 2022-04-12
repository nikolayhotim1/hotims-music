import { IAlbum } from './albums';
import { ITrack } from './track';

export interface PlayerState {
    active: null | ITrack | IAlbum,
    volume: number,
    duration: number,
    currentTime: number,
    pause: boolean,
    collapsed: boolean
};

export enum PlayerActionTypes {
    PLAY = 'PLAY',
    PAUSE = 'PAUSE',
    SET_ACTIVE = 'SET_ACTIVE',
    SET_DURATION = 'SET_DURATION',
    SET_CURRENT_TIME = 'SET_CURRENT_TIME',
    SET_VOLUME = 'SET_VOLUME',
    SET_COLLAPSED = 'SET_COLLAPSED'
};

interface PlayAction {
    type: PlayerActionTypes.PLAY
}

interface PauseAction {
    type: PlayerActionTypes.PAUSE
}

interface SetActiveAction {
    type: PlayerActionTypes.SET_ACTIVE,
    payload: ITrack
}

interface SetDurationAction {
    type: PlayerActionTypes.SET_DURATION,
    payload: number
}

interface SetCurrentTimeAction {
    type: PlayerActionTypes.SET_CURRENT_TIME,
    payload: number
}

interface SetVolumeAction {
    type: PlayerActionTypes.SET_VOLUME,
    payload: number
}

interface SetCollapsedAction {
    type: PlayerActionTypes.SET_COLLAPSED,
    payload: boolean
}

export type PlayerAction = PlayAction
    | PauseAction
    | SetActiveAction
    | SetDurationAction
    | SetCurrentTimeAction
    | SetVolumeAction
    | SetCollapsedAction;
import { AlbumAction, AlbumActionTypes, AlbumState } from '../../types/albums';

const InitialState: AlbumState = {
    albums: [],
    activeAlbum: null,
    error: ''
};

export const albumReducer = (
    state = InitialState,
    action: AlbumAction
): AlbumState => {
    switch (action.type) {
        case AlbumActionTypes.FETCH_ALBUMS:
            return { ...state, albums: action.payload };
        case AlbumActionTypes.FETCH_ALBUMS_ERROR:
            return { ...state, error: action.payload };
        case AlbumActionTypes.FETCH_ALBUM_TRACKS:
            return { ...state, albums: action.payload };
        case AlbumActionTypes.FETCH_ALBUM_TRACKS_ERROR:
            return { ...state };
        case AlbumActionTypes.SET_ACTIVE_ALBUM:
            return { ...state, activeAlbum: action.payload };
        case AlbumActionTypes.REMOVE_ALBUM:
            return { ...state };
        case AlbumActionTypes.REMOVE_ALBUM_ERROR:
            return { ...state };
        default:
            return state;
    }
};
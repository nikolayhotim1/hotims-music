import { AlbumAction, AlbumActionTypes, AlbumState } from "../../types/albums";

const InitialState: AlbumState = {
  albums: [],
  activeAlbum: null,
  removeResponse: null,
};

export const albumReducer = (
  state = InitialState,
  action: AlbumAction
): AlbumState => {
  switch (action.type) {
    case AlbumActionTypes.FETCH_ALBUMS:
      return { ...state, albums: action.payload };
    case AlbumActionTypes.FETCH_ALBUMS_ERROR:
      return { ...state };
    case AlbumActionTypes.SET_ACTIVE_ALBUM:
      return { ...state, activeAlbum: action.payload };
    case AlbumActionTypes.REMOVE_ALBUM:
      return { ...state, removeResponse: action.payload };
    case AlbumActionTypes.REMOVE_ALBUM_ERROR:
      return { ...state, removeResponse: { error: action.payload } };
    case AlbumActionTypes.SET_RESPONSE_ERROR:
      return { ...state, removeResponse: { error: action.payload } };
    case AlbumActionTypes.SET_RESPONSE_MESSAGE:
      return { ...state, removeResponse: { message: action.payload } };

    default:
      return state;
  }
};

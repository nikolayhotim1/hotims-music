import { reducer, RootState } from './redusers/index';
import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
import { applyMiddleware, createStore, Store, AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

const makeStore: MakeStore<Store<RootState>> = (
    context: Context
) => createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: true });
export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
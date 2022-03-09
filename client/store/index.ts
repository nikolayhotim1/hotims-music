import { reducer, RootState } from './redusers/index';
import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
import { applyMiddleware, createStore, Store, AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

const makeStore: MakeStore<Store<RootState>> = (
    context: Context
) => createStore(reducer, applyMiddleware(thunk));

export const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: true });

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
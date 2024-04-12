import { combineReducers } from '@reduxjs/toolkit';
import modalReducer from './modal';

const rootReducer = combineReducers({
  modal: modalReducer,

});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
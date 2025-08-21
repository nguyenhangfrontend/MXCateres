import { combineReducers } from 'redux';
import {clientReducers} from '@/store/reducers/clientReducer';

const clientState = combineReducers(clientReducers);

export default clientState;

export type RootState = ReturnType<typeof clientState>;

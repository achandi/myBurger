import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/burgerBuilder';

// export const ingGet = store => async dispatch => {

export function* ingGetSaga() {
  try {
    const res = yield axios.get('/ingredients.json');
    yield put(actions.ingGetSync(res.data));
  } catch (err) {
    yield put(actions.ingGetFail());
  }
}

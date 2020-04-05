import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/order';

export function* purchaseBurgerSaga(action) {
  try {
    yield put(actions.loading());
    const res = yield axios.post(
      '/orders.json?auth=' + action.token,
      action.order
    );
    yield put(actions.purchaseSuccess(res.data.name, action.order));
  } catch (err) {
    yield put(actions.purchaseFail(err));
  }
}

export function* orderGetSaga(action) {
  try {
    const res = yield axios.get(
      './orders.json?auth=' +
        action.token +
        '&orderBy="userId"&equalTo="' +
        action.userId +
        '"'
    );
    yield put(actions.orderGetSync(res));
  } catch (err) {
    console.log(err);
  }
}

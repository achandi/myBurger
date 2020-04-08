import { takeEvery, takeLatest, all } from 'redux-saga/effects';
import * as actionType from '../actions/actionTypes';

import { logoutSaga, autoLogoffSaga, authSaga, authCheckSaga } from './auth';
import { ingGetSaga } from './burgerBuilder';
import { orderGetSaga, purchaseBurgerSaga } from './order';

export function* watchAuth() {
  yield all([
    takeEvery(actionType.AUTH_AUTO_LOGOFF, autoLogoffSaga),
    takeEvery(actionType.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionType.AUTH_INITIATE, authSaga),
    takeEvery(actionType.AUTH_CHECK, authCheckSaga),
  ]);
}

export function* watchIng() {
  yield takeEvery(actionType.INGREDIENTS_GET, ingGetSaga);
}

export function* watchOrd() {
  yield takeEvery(actionType.ORDER_GET, orderGetSaga);
  yield takeLatest(actionType.PURCHASE_INITIATE, purchaseBurgerSaga);
}

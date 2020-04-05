import { takeEvery } from 'redux-saga/effects';
import * as actionType from '../actions/actionTypes';

import { logoutSaga, autoLogoffSaga, authSaga, authCheckSaga } from './auth';
import { ingGetSaga } from './burgerBuilder';
import { orderGetSaga, purchaseBurgerSaga } from './order';

export function* watchAuth() {
  yield takeEvery(actionType.AUTH_AUTO_LOGOFF, autoLogoffSaga);
  yield takeEvery(actionType.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionType.AUTH_INITIATE, authSaga);
  yield takeEvery(actionType.AUTH_CHECK, authCheckSaga);
}

export function* watchIng() {
  yield takeEvery(actionType.INGREDIENTS_GET, ingGetSaga);
}

export function* watchOrd() {
  yield takeEvery(actionType.ORDER_GET, orderGetSaga);
  yield takeEvery(actionType.PURCHASE_INITIATE, purchaseBurgerSaga);
}

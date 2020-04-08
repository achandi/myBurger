import * as actionType from './actionTypes';

export const orderGetSync = (res) => {
  return { type: actionType.ORDERGET, res };
};

export const orderGet = (token, userId) => {
  return { type: actionType.ORDER_GET, token, userId };
};

// export const orderGet = (token, userId) => async (dispatch) => { ///changed for saga practice
//   try {
//     const res = await axios.get(
//       './orders.json?auth=' +
//         token +
//         '&orderBy="userId"&equalTo="' +
//         userId +
//         '"'
//     );
//     dispatch(orderGetSync(res));
//   } catch (err) {
//     console.log(err);
//   }
// };

export const purchaseSuccess = (id, orderData) => {
  return {
    type: actionType.PURCHASE_SUCCESS,
    orderId: id,
    orderData,
  };
};

export const purchaseFail = (error) => {
  return {
    type: actionType.PURCHASE_FAIL,
    error,
  };
};

export const loading = () => {
  return {
    type: actionType.LOADING,
  };
};

export const purchaseBurger = (token, order) => {
  return { type: actionType.PURCHASE_INITIATE, token, order };
};

// export const purchaseBurger = (token, order) => async (dispatch) => {
//   try {
//     dispatch(loading());
//     const res = await axios.post('/orders.json?auth=' + token, order);
//     dispatch(purchaseSuccess(res.data.name, order));
//   } catch (err) {
//     dispatch(purchaseFail(err));
//   }
// };

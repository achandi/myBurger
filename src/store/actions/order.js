import * as actionType from './actionTypes';
import axios from '../../axios-orders';

const orderGetSync = res => {
  return { type: actionType.ORDERGET, res };
};

export const orderGet = (token, userId) => async dispatch => {
  try {
    const res = await axios.get(
      './orders.json?auth=' +
        token +
        '&orderBy="userId"&equalTo="' +
        userId +
        '"'
    );
    dispatch(orderGetSync(res));
  } catch (err) {
    console.log(err);
  }
};

const purchaseSuccess = (id, orderData) => {
  return {
    type: actionType.PURCHASE_SUCCESS,
    orderId: id,
    orderData
  };
};

const purchaseFail = error => {
  return {
    type: actionType.PURCHASE_FAIL,
    error
  };
};

const loading = () => {
  return {
    type: actionType.LOADING
  };
};

export const purchaseBurger = (token, order) => async dispatch => {
  try {
    dispatch(loading());
    const res = await axios.post('/orders.json?auth=' + token, order);
    dispatch(purchaseSuccess(res.data.name, order));
  } catch (err) {
    dispatch(purchaseFail(err));
  }
};

// export const purchaseBurger = order => {
//   return dispatch => {
//     dispatch(loading());
//     axios
//       .post('/orders.json', order)
//       .then(res => {
//         dispatch(purchaseSuccess(res.data.name, order));
//         //   this.setState({ loading: false });
//         //   this.props.history.push('/');
//       })
//       .catch(err => {
//         dispatch(purchaseFail(err));
//         //   this.setState({ loading: false });
//       });
//   };
// };

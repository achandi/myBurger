import * as actionType from '../actions/actionTypes';
const initialState = {
  orders: [],
  loading: false,
};

const fetchedOrder = (actions) =>
  Object.keys(actions.res.data).map((key) => ({
    id: key,
    ...actions.res.data[key],
  }));

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionType.LOADING:
      return { ...state, loading: true };
    case actionType.ORDERGET:
      return { ...state, orders: [...fetchedOrder(actions)] };
    case actionType.PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: [
          ...state.orders,
          { id: actions.orderId, ...actions.orderData },
        ],
      };
    case actionType.PURCHASE_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reducer;

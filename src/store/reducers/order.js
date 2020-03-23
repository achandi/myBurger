import * as actionType from '../actions/actionTypes';
const initialState = {
  orders: [],
  loading: false
};

// const fetchedOrder = Object.keys(res.data).map(key => ({
//     id: key,
//     ...res.data[key]
//   }));

const fetchedOrder = actions =>
  Object.keys(actions.res.data).map(key => ({
    id: key,
    ...actions.res.data[key]
  }));

const reducer = (state = initialState, actions) => {
  console.log('reducer');
  switch (actions.type) {
    case actionType.LOADING:
      console.log('LOADING ORDER', { ...state });
      return { ...state, loading: true };

    case actionType.ORDERGET:
      //   const fetchedOrder = Object.keys(actions.res.data).map(key => ({
      //     id: key,
      //     ...actions.res.data[key]
      //   }));
      return { ...state, orders: [...state.orders, ...fetchedOrder(actions)] };
    case actionType.PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: [...state.orders, { id: actions.orderId, ...actions.orderData }]
      };

    case actionType.PURCHASE_FAIL:
      return { ...state, loading: false };
  }
  return state;
};

export default reducer;

import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import { orderGet } from '../../store/actions/order';
const orders = (props) => {
  const { getOrders, auth } = props;
  useEffect(() => {
    props.getOrders(props.auth.token, props.auth.userId);
  }, [getOrders, auth]);
  //to do optional: add loading spinner
  return (
    <div>
      {props.orders.map((order) => (
        <Order
          price={order.totalPrice}
          ingredients={order.ingredients}
          key={order.id}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.ord.orders,
  auth: state.auth.auth,
});

const mapDispatchToProps = (dispatch) => ({
  getOrders: (token, userId) => dispatch(orderGet(token, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(orders, axios));

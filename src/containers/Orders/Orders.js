import React, { Component } from 'react';
import Order from '../../components/Order/Order';
// import { Route } from 'react-router-dom';
// import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
// import ContactData from './ContactData/ContactData';
///show summary, then when user clicks on continue
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import { orderGet } from '../../store/actions/order';
class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    this.props.getOrders(this.props.auth.token, this.props.auth.userId);

    // axios
    //   .get('./orders.json')
    //   .then(res => {
    //     const fetchedOrder = Object.keys(res.data).map(key => ({
    //       id: key,
    //       ...res.data[key]
    //     }));
    //     this.setState({ orders: fetchedOrder, loading: false });
    //   })
    //   .catch(err => {
    //     this.setState({ loading: false });
    //   });
  }
  render() {
    return (
      <div>
        {this.props.orders.map(order => (
          <Order
            price={order.totalPrice}
            ingredients={order.ingredients}
            key={order.id}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.ord.orders,
  auth: state.auth.auth
});

const mapDispatchToProps = dispatch => ({
  getOrders: (token, userId) => dispatch(orderGet(token, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));

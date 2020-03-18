import React, { Component } from 'react';
import Order from '../../components/Order/Order';
// import { Route } from 'react-router-dom';
// import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
// import ContactData from './ContactData/ContactData';
///show summary, then when user clicks on continue
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios
      .get('./orders.json')
      .then(res => {
        const fetchedOrder = Object.keys(res.data).map(key => ({
          id: key,
          ...res.data[key]
        }));
        this.setState({ orders: fetchedOrder, loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => (
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
export default withErrorHandler(Orders, axios);

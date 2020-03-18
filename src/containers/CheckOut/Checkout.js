import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
///show summary, then when user clicks on continue
class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    },
    totalPrice: 0
  };

  componentDidMount = () => {
    console.log('checkout.js props', this.props);
    const queryString = new URLSearchParams(
      this.props.location.search
    ).entries();
    const ingObject = {};
    let totalPrice;
    for (let param of queryString) {
      if (param[0] === 'price') {
        totalPrice = param[1];
      } else {
        ingObject[param[0]] = Number(param[1]);
      }
    }
    console.log(ingObject);
    this.setState({
      ingredients: ingObject,
      totalPrice: totalPrice
    });
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...this.props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;

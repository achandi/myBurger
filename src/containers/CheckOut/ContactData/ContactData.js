import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import classes from './ContactData.css';
import { purchaseBurger } from '../../../store/actions/order';
import withErrorHandler from '../../../hoc/withErrorHandler';
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touching: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touching: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touching: false
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code'
        },
        value: '',
        validation: {
          required: true,
          maxLength: 6,
          minLength: 6
        },
        valid: false,
        touching: false
      },
      deliveryType: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    formValid: false
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };
  orderHandler = event => {
    event.preventDefault();

    console.log('price', this.props);

    const orderForm = { ...this.state.orderForm };

    const orderFormEdit = Object.keys(orderForm).reduce(
      (acc, key) => ({ ...acc, [key]: orderForm[key].value }),
      {}
    );
    const order = {
      ingredients: this.props.ing,
      totalPrice: Number(this.props.totPrice).toFixed(2),
      orderForm: { ...orderFormEdit },
      userId: this.props.userId
    };

    this.props.purchaseBurger(this.props.token, order);
    // axios
    //   .post('/orders.json', order)
    //   .then(response => {
    //     this.setState({ loading: false });
    //     this.props.history.push('/');
    //   })
    //   .catch(err => {
    //     console.log(err);

    //     this.setState({ loading: false });
    //   });
    this.props.history.push('/');

    console.log(this.props);
  };

  changeHandler = event => {
    const orderForm = { ...this.state.orderForm };
    const values = {
      ...orderForm[event.target.name],
      value: event.target.value,
      valid: this.checkValidity(
        event.target.value,
        orderForm[event.target.name].validation
      ),
      touching: true
    };
    const orderFormUpdate = { ...orderForm, [event.target.name]: values };
    let isValid = true;
    for (let key in orderFormUpdate) {
      isValid = orderFormUpdate[key].valid && isValid;
    }

    this.setState({ orderForm: orderFormUpdate, formValid: isValid });
    // const value = {value: event.target.value}}
    // const
    // const orderFormEdit = { ...orderForm,
    //                        [event.target.value].value =
    // this.setState({ orderForm[event.target.name]['value']: event.target.value  });
    // console.log(event.target);
  };
  render() {
    let form = (
      <form onSubmit={this.orderHandler}>
        {Object.keys(this.state.orderForm).map(key => {
          return (
            <Input
              key={key}
              name={key}
              value={this.state.orderForm[key].value}
              elementType={this.state.orderForm[key].elementType}
              elementConfig={this.state.orderForm[key].elementConfig}
              change={this.changeHandler}
              invalid={!this.state.orderForm[key].valid}
              touched={this.state.orderForm[key].touching}
            />
          );
        })}
        {/* <Input
          inputType="input"
          label="Postal Code"
          type="text"
          name="postal"
          placeholder="Postal Code"
        /> */}
        <Button disabled={!this.state.formValid} btnType="Success">
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4> Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ing: state.burBuild.ingredients,
  totPrice: state.burBuild.totalPrice,
  loading: state.ord.loading,
  token: state.auth.auth.token,
  userId: state.auth.auth.userId
});

const mapStateToDispatch = dispatch => ({
  purchaseBurger: (token, order) => dispatch(purchaseBurger(token, order))
});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(withErrorHandler(ContactData, axios));

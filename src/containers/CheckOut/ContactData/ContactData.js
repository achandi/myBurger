import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import classes from './ContactData.css';
import { purchaseBurger } from '../../../store/actions/order';
import { clearBurState } from '../../../store/actions/burgerBuilder';
import withErrorHandler from '../../../hoc/withErrorHandler';
const contactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Name',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touching: false,
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touching: false,
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touching: false,
    },
    postalCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Postal Code',
      },
      value: '',
      validation: {
        required: true,
        maxLength: 6,
        minLength: 6,
      },
      valid: false,
      touching: false,
    },
    deliveryType: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' },
        ],
      },
      value: 'fastest',
      validation: {},
      valid: true,
    },
  });
  const [formValid, setFormValid] = useState(false);
  const checkValidity = (value, rules) => {
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
  const orderHandler = (event) => {
    event.preventDefault();
    const orderForms = { ...orderForm };
    const orderFormEdit = Object.keys(orderForms).reduce(
      (acc, key) => ({ ...acc, [key]: orderForms[key].value }),
      {}
    );
    const order = {
      ingredients: props.ing,
      totalPrice: Number(props.totPrice).toFixed(2),
      orderForm: { ...orderFormEdit },
      userId: props.userId,
    };
    props.purchaseBurger(props.token, order);
    props.clearBurState();
    props.history.push('/');
  };

  const changeHandler = (event) => {
    const orderForms = { ...orderForm };
    const values = {
      ...orderForms[event.target.name],
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForms[event.target.name].validation
      ),
      touching: true,
    };
    const orderFormUpdate = { ...orderForms, [event.target.name]: values };
    let isValid = true;
    for (let key in orderFormUpdate) {
      isValid = orderFormUpdate[key].valid && isValid;
    }
    setOrderForm(orderFormUpdate);
    setFormValid(isValid);
  };
  let form = (
    <form onSubmit={orderHandler}>
      {Object.keys(orderForm).map((key) => {
        return (
          <Input
            key={key}
            name={key}
            value={orderForm[key].value}
            elementType={orderForm[key].elementType}
            elementConfig={orderForm[key].elementConfig}
            change={changeHandler}
            invalid={!orderForm[key].valid}
            touched={orderForm[key].touching}
          />
        );
      })}
      <Button disabled={!formValid} btnType="Success">
        Order
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4> Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ing: state.burBuild.ingredients,
  totPrice: state.burBuild.totalPrice,
  loading: state.ord.loading,
  token: state.auth.auth.token,
  userId: state.auth.auth.userId,
});

const mapStateToDispatch = (dispatch) => ({
  purchaseBurger: (token, order) => dispatch(purchaseBurger(token, order)),
  clearBurState: () => dispatch(clearBurState()),
});

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(withErrorHandler(contactData, axios));

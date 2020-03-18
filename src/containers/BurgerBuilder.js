import React, { Component } from 'react';
import axios from '../axios-orders';
import Loader from '../components/UI/Spinner/Spinner';
import Aux from '../hoc/Aux';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import Modal from '../components/UI/Modal/Modal';
import WithErrorHandler from '../hoc/withErrorHandler';
const INGREDIENT_PRICES = {
  meat: 1.4,
  cheese: 0.8,
  bacon: 1,
  salad: 0.4
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount = () => {
    axios
      .get('https://burger-app-33a3f.firebaseio.com/ingredients.json')
      .then(ingredients => {
        console.log(ingredients);
        this.setState({ ingredients: ingredients.data });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true });
      });
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Ajit Chandi',
    //     address: {
    //       street: 'Test street 1',
    //       pos`talCode: 'V6X3b9',
    //       country: 'Canada'
    //     },
    //     email: 'test@test.com'
    //   },
    //   deliveryMethod: 'fastest'
    // };
    // axios
    //   .post('/orders.json', order)
    //   .then(response => this.setState({ loading: false, purchasing: false }))
    //   .catch(err => this.setState({ loading: false }));
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  };
  // addIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;

  //   this.setState((prevState, props) => {
  //     return {
  //       ingredients: updatedIngredients,
  //       totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
  //     };
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // };
  // removeIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount) {
  //     const updatedCount = oldCount - 1;
  //     const updatedIngredients = {
  //       ...this.state.ingredients
  //     };
  //     updatedIngredients[type] = updatedCount;

  //     this.setState((prevState, props) => {
  //       return {
  //         ingredients: updatedIngredients,
  //         totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type]
  //       };
  //     });
  //     this.updatePurchaseState(updatedIngredients);
  //   }
  // };

  ingredientHandler = (type, operator) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount || operator === 'add') {
      const updatedCount = operator === 'add' ? oldCount + 1 : oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      this.setState((prevState, props) => {
        return {
          ingredients: updatedIngredients,
          totalPrice:
            operator === 'add'
              ? prevState.totalPrice + INGREDIENT_PRICES[type]
              : prevState.totalPrice - INGREDIENT_PRICES[type]
        };
      });
      this.updatePurchaseState(updatedIngredients);
    }
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients //copy object, not original
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    if (this.state.ingredients) {
    }

    let burger = this.state.error ? (
      <p> Ingredients can't be loaded </p>
    ) : (
      <Loader />
    );

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            remove={this.ingredientHandler}
            add={this.ingredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            purchasing={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          cancel={this.purchaseCancelHandler}
          continue={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Loader />;
    }
    return (
      <Aux>
        <Modal
          modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);

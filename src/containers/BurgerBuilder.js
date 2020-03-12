import React, { Component } from 'react';
import Aux from '../hoc/Aux';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import Modal from '../components/UI/Modal/Modal';
const INGREDIENT_PRICES = {
  meat: 1.4,
  cheese: 0.8,
  bacon: 1,
  salad: 0.4
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      meat: 0,
      cheese: 0,
      bacon: 0,
      salad: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
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
    alert('continue order');
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
    return (
      <Aux>
        <Modal
          modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing}
        >
          <OrderSummary
            cancel={this.purchaseCancelHandler}
            continue={this.purchaseContinueHandler}
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
          />
        </Modal>
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
  }
}

export default BurgerBuilder;

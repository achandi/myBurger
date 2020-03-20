import React, { Component } from 'react';
import axios from '../axios-orders';
import Loader from '../components/UI/Spinner/Spinner';
import Aux from '../hoc/Aux';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import Modal from '../components/UI/Modal/Modal';
import WithErrorHandler from '../hoc/withErrorHandler';
import { connect } from 'react-redux';
import * as actionType from '../store/actions';

class BurgerBuilder extends Component {
  state = {
    // ingredients: null, //ingredients and totla price are both
    // totalPrice: 4,
    // purchasable: false,
    purchasing: false, // local ui state (where to show error/mesage)
    loading: false,
    error: false
  };

  // componentDidMount = () => {
  //   axios
  //     .get('https://burger-app-33a3f.firebaseio.com/ingredients.json')
  //     .then(ingredients => {
  //       console.log(ingredients);
  //       this.setState({ ingredients: ingredients.data });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       this.setState({ error: true });
  //     });
  // };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    //   const queryParams = [];
    //   for (let i in this.props.ing) {
    //     queryParams.push(
    //       encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ing[i])
    //     );
    //   }
    //   queryParams.push('price=' + this.props.totPrice);
    //   const queryString = queryParams.join('&');
    //   this.props.history.push({
    //     pathname: '/checkout',
    //     search: '?' + queryString
    //   });
    ///above after redux becomes
    this.props.history.push('/checkout');
  };

  // addIngredientHandler = type => {
  //   const oldCount = this.props.ing[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.props.ing
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
  //   const oldCount = this.props.ing[type];
  //   if (oldCount) {
  //     const updatedCount = oldCount - 1;
  //     const updatedIngredients = {
  //       ...this.props.ing
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

  // ingredientHandler = (ingType, operator) => {
  //   const oldCount = this.props.ing[ingType];
  //   if (oldCount || operator === 'add') {
  //     const updatedCount = operator === 'add' ? oldCount + 1 : oldCount - 1;
  //     const updatedIngredients = {
  //       ...this.props.ing
  //     };
  //     updatedIngredients[ingType] = updatedCount;
  //     this.setState((prevState, props) => {
  //       return {
  //         ingredients: updatedIngredients,
  //         totalPrice:
  //           operator === 'add'
  //             ? prevState.totalPrice + INGREDIENT_PRICES[ingType]
  //             : prevState.totalPrice - INGREDIENT_PRICES[ingType]
  //       };
  //     });
  //     this.updatePurchaseState(updatedIngredients);
  //   }
  // };

  render() {
    const disabledInfo = {
      ...this.props.ing //copy object, not original
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    if (this.props.ing) {
    }

    let burger = this.state.error ? (
      <p> Ingredients can't be loaded </p>
    ) : (
      <Loader />
    );

    if (this.props.ing) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            remove={this.props.ingHandler}
            add={this.props.ingHandler}
            disabled={disabledInfo}
            price={this.props.totPrice}
            purchasable={this.updatePurchaseState(this.props.ing)}
            purchasing={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          cancel={this.purchaseCancelHandler}
          continue={this.purchaseContinueHandler}
          ingredients={this.props.ing}
          price={this.props.totPrice}
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

const mapStateToProps = state => ({
  ing: state.ingredients,
  totPrice: state.totalPrice
});

const mapDispatchToProps = dispatch => ({
  ingHandler: (ingType, operator) =>
    dispatch({ type: actionType.INGREDIENT_HANDLER, ingType, operator })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));

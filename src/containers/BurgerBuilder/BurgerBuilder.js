import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../axios-orders';
import Loader from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import WithErrorHandler from '../../hoc/withErrorHandler';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/burgerBuilder';
import * as actionsAuth from '../../store/actions/auth';

const burgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const loading = false;
  const dispatch = useDispatch();
  const ingGet = useCallback(() => dispatch(actions.ingGet()), [dispatch]);
  const ingHandler = (ingType, operator) =>
    dispatch(actions.ingHandler(ingType, operator));
  const setAuthRedirectPath = (path) =>
    dispatch(actionsAuth.setAuthRedirectPath(path));

  const ing = useSelector((state) => state.burBuild.ingredients);
  const totPrice = useSelector((state) => state.burBuild.totalPrice);
  const error = useSelector((state) => state.burBuild.error);
  const isAuth = useSelector((state) => (state.auth.auth.token ? true : false));

  useEffect(() => {
    ingGet();
  }, [ingGet]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuth) {
      setPurchasing(true);
    } else {
      setAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.history.push('/checkout');
  };

  const disabledInfo = {
    ...ing, //copy object, not original
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;
  if (ing) {
  }

  let burger = error ? <p> Ingredients can't be loaded </p> : <Loader />;

  if (ing) {
    burger = (
      <Aux>
        <Burger ingredients={ing} />
        <BuildControls
          remove={ingHandler}
          add={ingHandler}
          disabled={disabledInfo}
          price={totPrice}
          isAuth={isAuth}
          purchasable={updatePurchaseState(ing)}
          purchasing={purchaseHandler}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        cancel={purchaseCancelHandler}
        continue={purchaseContinueHandler}
        ingredients={ing}
        price={totPrice}
      />
    );
  }
  if (loading) {
    orderSummary = <Loader />;
  }
  return (
    <Aux>
      <Modal modalClosed={purchaseCancelHandler} show={purchasing}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

//converted below to hooks
// const mapDispatchToProps = (dispatch) => ({
//   ingGet: () => dispatch(ingGet()),
//   ingHandler: (ingType, operator) => dispatch(ingHandler(ingType, operator)),
//   setAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path)),
//  });

// const mapStateToProps = (state) => ({
//   ing: state.burBuild.ingredients,
//   totPrice: state.burBuild.totalPrice,
//   error: state.burBuild.error,
//   isAuth: state.auth.auth.token ? true : false,
// });

export default WithErrorHandler(burgerBuilder, axios);

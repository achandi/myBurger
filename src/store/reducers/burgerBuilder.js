import * as actionType from '../actions/actionTypes';

const initialState = {
  totalPrice: 4,
  ingredients: null,
  error: false,
};

const INGREDIENT_PRICES = {
  meat: 1.4,
  cheese: 0.8,
  bacon: 1,
  salad: 0.4,
};

const ingredientsHandler = (state, actions) => {
  const oldCount = state.ingredients[actions.ingType];
  if (oldCount || actions.operator === 'add') {
    const updatedCount =
      actions.operator === 'add' ? oldCount + 1 : oldCount - 1;
    const updatedIngredients = {
      ...state.ingredients,
      [actions.ingType]: updatedCount,
    };
    return {
      ...state,
      ingredients: updatedIngredients,
      totalPrice:
        actions.operator === 'add'
          ? state.totalPrice + INGREDIENT_PRICES[actions.ingType]
          : state.totalPrice - INGREDIENT_PRICES[actions.ingType],
      building: true,
    };
  } else {
    return state;
  }
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case actionType.INGGET:
      return {
        ...state,
        ingredients: state.ingredients
          ? state.ingredients
          : actions.ingredients,
        error: false,
        building: false,
      };
    case actionType.INGGETFAIL:
      return { ...state, error: true };
    case actionType.INGREDIENT_HANDLER:
      return ingredientsHandler(state, actions);
    case actionType.CLEAR_BURGER_STATE:
      return { ...initialState };
    default:
      return state;
  }
};

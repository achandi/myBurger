import * as actionType from './actions';

const initialState = {
  totalPrice: 4,
  ingredients: {
    meat: 0,
    cheese: 0,
    bacon: 0,
    salad: 0
  }
};

const INGREDIENT_PRICES = {
  meat: 1.4,
  cheese: 0.8,
  bacon: 1,
  salad: 0.4
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case actionType.INGREDIENT_HANDLER:
      const oldCount = state.ingredients[actions.ingType];
      if (oldCount || actions.operator === 'add') {
        const updatedCount =
          actions.operator === 'add' ? oldCount + 1 : oldCount - 1;
        const updatedIngredients = {
          ...state.ingredients,
          [actions.ingType]: updatedCount
        };
        //   updatedIngredients[ingType] = updatedCount;
        return {
          ...state,
          ingredients: updatedIngredients,
          totalPrice:
            actions.operator === 'add'
              ? state.totalPrice + INGREDIENT_PRICES[actions.ingType]
              : state.totalPrice - INGREDIENT_PRICES[actions.ingType]
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};

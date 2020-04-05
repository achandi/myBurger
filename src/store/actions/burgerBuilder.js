import * as actionType from './actionTypes';
import axios from '../../axios-orders';

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

export const ingGetSync = (res) => {
  return { type: actionType.INGGET, ingredients: res };
};

export const ingGetFail = (res) => {
  return { type: actionType.INGGETFAIL };
};

// export const ingGet = store => async dispatch => {

export const ingGet = () => {
  return { type: actionType.INGREDIENTS_GET };
};

// export const ingGet = (store) => async (dispatch) => {
//   try {
//     const res = await axios.get('/ingredients.json');
//     dispatch(ingGetSync(res.data));
//   } catch (err) {
//     dispatch(ingGetFail());
//   }
// };

export const ingHandler = (ingType, operator) => {
  console.log('inghandler');
  return {
    type: actionType.INGREDIENT_HANDLER,
    ingType,
    operator,
  };
};

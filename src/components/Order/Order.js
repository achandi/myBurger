import React from 'react';
import classes from './Order.css';

const Order = props => {
  const ingredients = [];
  for (let ingredientsName in props.ingredients) {
    ingredients.push({
      name: ingredientsName,
      amount: props.ingredients[ingredientsName]
    });
  }

  const ingredientsOutput = ingredients.map(ig => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });
  //can also use the logic in burger.js
  return (
    <div className={classes.Order}>
      <div>Ingredients: {ingredientsOutput}</div>
      <div>
        Price: <strong>USD {Number(props.price).toFixed(2)} </strong>
      </div>
    </div>
  );
};

export default Order;

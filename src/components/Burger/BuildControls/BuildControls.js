import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Salad', type: 'salad' }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>Current Price: {props.price.toFixed(2)}</p>
    {controls.map((item, index) => {
      return (
        <BuildControl
          type={item.type}
          addIngredients={() => props.add(item.type, 'add')}
          removeIngredients={() => props.remove(item.type, 'subtract')}
          key={item.label}
          label={item.label}
          disabledInfo={props.disabled[item.type]}
        />
      );
    })}
    <button
      onClick={props.purchasing}
      disabled={!props.purchasable}
      className={classes.OrderButton}
    >
      {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
    </button>
  </div>
);

export default buildControls;

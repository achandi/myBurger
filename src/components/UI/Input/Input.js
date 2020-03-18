import React from 'react';
import classes from './Input.css';
const input = props => {
  let inputElement = null;

  const classArray = [classes.InputElement];
  console.log(props.invalid, props.touched);
  if (props.invalid && props.touched) classArray.push(classes.Invalid);
  console.log(classArray);
  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          key={props.name}
          {...props.elementConfig}
          name={props.name}
          value={props.value}
          onChange={props.change}
          className={classArray.join(' ')}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          key={props.name}
          {...props.elementConfig}
          name={props.name}
          value={props.value}
          onChange={props.change}
          className={classArray.join(' ')}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          value={props.value}
          onChange={props.change}
          className={classArray.join(' ')}
          key={props.name}
          name={props.name}
        >
          {props.elementConfig.options.map(obj => (
            <option key={obj.displayValue} value={obj.value}>
              {obj.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          key={props.name}
          {...props.elementConfig}
          name={props.name}
          value={props.value}
          onChange={props.change}
          className={classArray.join(' ')}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;

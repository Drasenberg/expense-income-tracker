import classes from './Button.module.css';
const Button = (props) => {
  const classNames = classes.button + ' ' + props.class;
  return <button className={classNames} {...props} >{props.children}</button>
}

export default Button;
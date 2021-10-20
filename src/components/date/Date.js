import classes from './Date.module.css';

const Date = (props) => {
  const day = props.date.toLocaleString('pl-PL', { day: '2-digit' });
  const month = props.date.toLocaleString('pl-PL', { month: 'long' });
  const year = props.date.toLocaleString('pl-PL', { year: 'numeric' });;

  return <div className={classes.date}>
    <div className={classes['date__day']}>{day}</div>
    <div className={classes['date__month']}>{month}</div>
    <div className={classes['date__year']}>{year}</div>
  </div>
}

export default Date;
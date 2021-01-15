import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    fontSize: props => props.fontSize ? props.fontSize : '1rem',
    color: props => props.color ? props.color : 'black'
  }
});

function StyledIcon(props) {
  const classes = useStyles(props);
  const Icon = props.icon;
  return (
    <Icon className={classes.root} />
  );
}

export default StyledIcon;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LocalAtm } from '@material-ui/icons';
import StyledIcon from '../icon/styledIcon';

const useStyles = makeStyles({
  navWrapper: {
    width: props => props.width ? props.width : '',
    backgroundColor: 'white',
    position: 'fixed',
    top: '0',
    left: '0',
    bottom: '0'
  },
  logo: {
    width: '100%',
    height: '121px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid #f5f7f8'
  },
  test: {
    position: 'fixed',
    top: '0',
    left: '290px'
  }
});

function Navbar(props) {
  const classes = useStyles(props);
  return (
    <div className={classes.navWrapper}>
      <div className={classes.logo}>
        <StyledIcon icon={LocalAtm} fontSize="5rem" color="green"/>
      </div>
    </div>
  );
}

export default Navbar;

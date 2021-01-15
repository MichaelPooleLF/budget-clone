import React from 'react';
import { LocalAtm } from '@material-ui/icons';
import StyledIcon from '../icon/styledIcon';

function Navbar(props) {
  return (
    <>
      <div className="sidebar">
        <StyledIcon icon={LocalAtm} fontSize="5rem" color="green"/>
      </div>
    </>
  );
}

export default Navbar;

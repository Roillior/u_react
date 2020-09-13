import React, { useEffect } from 'react';

import classes from './Cockpit.module.css';
import AuthContext from '../../context/auth-context';

const Cockpit = ( props ) => {
  // create ref 
  const toggleBtnRef = React.useRef(null);

  const authContext = React.useContext(AuthContext);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    toggleBtnRef.current.click();

    return () => {
      console.log('[Cockpit.js] clean up work for useEffect');
    };
  }, []);  // pass here empty Array for run only 1 time like Componentdidmount

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] clean up work for 2nd useEffect');
    };
  }, [props.persons]);

  const assignedClasses = [];
  let btnClass = '';

  if (props.showPersons) {
      btnClass = classes.Red;
    }

  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red);
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold);
  }

  return (
      <div className={classes.Cockpit}>
          <h1>{props.title}</h1>
          <p className={assignedClasses.join(' ')}>This is the P</p>
          <button 
              className={btnClass}
              ref={toggleBtnRef}
              onClick={props.clicked}>
              Switch Name
          </button>
          <button onClick={authContext.login}>Log in</button>
      </div>
  );
};

export default React.memo(Cockpit);
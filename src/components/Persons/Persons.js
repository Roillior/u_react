import React from 'react';

import Person from './Person/Person';

// we can use PureComponent id we want to use shouldComponentUpdate with the check on all props
class Persons extends React.Component {
      // static getDerivedStateFromProps(props, state) {
      //       console.log('[Persons.js] getDerivedStateFromProps')
      //       return state
      // }

      shouldComponentUpdate(nextProps, nextState) {
            console.log('[Persons.js] shouldComponentUpdate')
            if (nextProps.persons !== this.props.persons) {
                  return true;
            }
            else {
                  return false;
            }
      }
      
      getSnapshotBeforeUpdate(prevProps, prevState) {
            console.log('[Persons.js] getSnapshotBeforeUpdate')
            return { message: 'Snapshot!'};
      }

      componentDidUpdate(prevProps, prevState, snapshot) {
            console.log('[Persons.js] componentDidUpdate', snapshot)
      }

      componentWillUnmount() {
            console.log('[Persons.js] componentWillUnmount')
      }

      render() {
            console.log('[Persons.js] rendering...')
            return (this.props.persons.map((person, index) => {
                  return <Person
                        key={person.id}
                        name={person.name}
                        age={person.age }
                        click={() => this.props.clicked( index )}
                        changed={(event) => this.props.changed( event, person.id )}
                        />
            }));
      }
}

export default Persons;
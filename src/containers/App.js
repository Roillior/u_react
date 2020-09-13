import React from 'react';
import classes from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import AuthContext from '../context/auth-context';

import withClass from '../hoc/withClass';
// import styled from 'styled-components';


// const StyledButton = styled.button`
//   background-color: ${props => props.alt ? 'red' : 'green'};
//   font: inherit;
//   border: 1px solid blue;
//   padding: 8px;
//   cursor: pointer;

//   &:hover {
//     background-color: ${props => props.alt ? 'pink' : 'lightgreen'};;
//     color: ${props => props.alt ? 'black' : 'pink'};;
//   }
// `;

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('[App.js] Constructor')

    this.state = {
      persons: [
        { id: '1',name: 'lior', age: 29 },
        { id: '2',name: 'lior 1', age: 23 },
        { id: '3',name: 'lior 2', age: 24 }
      ],
      showPersons: false,
      showCockpit: true,
      changedCounter: 0,
      authenticated: false
    }
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props)
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate')
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate')
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { id: '1',name: 'lior', age: 29 },
        { id: '2',name: 'lior 1', age: 23 },
        { id: '3',name: 'lior 2', age: 24 }
      ]
    })
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changedCounter: prevState.changedCounter + 1
      };
    });
  }

  togglePersonHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    })
  }

  loginHandler = () => {
    this.setState({
      authenticated: true
    });
  };

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }


  render() {
    console.log('[App.js] rendering....')
    // inline styling
    // const style = {
    //   backgroundColor: this.state.showPersons === false ? 'green' : 'red',
    //   font: 'inherit',
    //   border: '1x solid blue',
    //   padding: '8px',
    //   ':hover': this.state.showPersons === false ? {
    //     backgroundColor: 'lightgreen',
    //     color: 'white'
    //     } : {
    //       backgroundColor: 'pink',
    //       color: 'yellow'
    //     }
    // };


    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
          />
    }
    let assignedClasses = [];

    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
        <React.Fragment>
          <button onClick={
            () => {this.setState({showCockpit: !this.state.showCockpit})}
          }>Control Cockpit</button>
          { this.state.showCockpit 
            && <AuthContext.Provider 
                value={{authenticated: this.state.authenticated, login: this.loginHandler}} 
              >
              <Cockpit 
                personsLength={this.state.persons.length}
                showPersons={this.state.showPersons}
                clicked={this.togglePersonHandler}
                title={this.props.appTitle}
              />
              {persons}
            </AuthContext.Provider>
          }
        </React.Fragment>
    );
  }
}

export default withClass(App, classes.App);

import React from 'react';

import classes from './Person.module.css';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

// import './Person.css';
// import styled from 'styled-components';

// import Radium from 'radium';


class Person extends React.Component {
    // componentDidMount() {
    //     document.querySelector('input').focus();
    // }
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        // option ref one 
        // this.inputElement.focus()
        //option ref 2
        this.inputElementRef.current.focus();
    }

    render() {
        console.log('[Person.js] rendering...')
        return (
            <React.Fragment>
                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
                <p onClick={this.props.click}>I am a Person!</p>
                <p>My name is { this.props.name }</p>
                <p>My age is { this.props.age }</p>
                <p>{ this.props.children }</p>
                <input 
                    type="text"
                    // option 1 declare ref - not useable in functional component
                    // ref={(inputEl) => {this.inputElement = inputEl}}
                    // option 2 use createRef
                    ref={this.inputElementRef}
                    onChange={this.props.changed} 
                    value={this.props.name}
                />
            </React.Fragment>
        );
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

            // <div className="Person" style={style}>
            // <div className={classes.Person}>
            //<StyleDiv>

            //</StyleDiv>
    // const StyleDiv = styled.div`
    //     width: 80%;
    //     margin: auto;
    //     border: 1px solid #eeeeee;
    //     box-shadow: 0 2px 3px #cccccc;
    //     padding: 16px;
    //     text-align: center;

    //     @media (min-width: 300px) {
    //             width: 450px;
    //     }
    // `
    // const style = {
    //     '@media (min-width: 500px)': {
    //         width: '450px'
    //     }
    // }


export default withClass(Person, classes.Person);
// export default Radium(person);
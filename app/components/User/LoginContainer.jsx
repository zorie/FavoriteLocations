import React, { PropTypes } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import LoginForm from './LoginForm.jsx';
import AuthActions from '../../actions/AuthActions.js';
import AuthStore from '../../stores/AuthStore.js';
import errorMessages from '../../constants/errorMessages.js';

class LoginUser extends React.Component {   
    static getStores() {
        return [AuthStore];
    }

    static getPropsFromStores() {
        return AuthStore.getState();
    }

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            userForm: {
                Email: '',
                Password: ''
            }
        };
    }

    login = (e) => {
        e.preventDefault();
        
        let user = {
            username: this.state.userForm.Email,
            password: this.state.userForm.Password
        };

        AuthActions.loginUser(user);
    }

    handleChange = (e) => {
        let field = e.target.name;
        let temp = this.state.userForm;
        let textFieldValue = e.target.value;

        temp[field] = textFieldValue;
        let errMsg = this.validate(field, textFieldValue);
        
        let errs = this.state.errors;
        errs[field] = errMsg;

        this.setState({
            errors: errs,
            userForm: temp
        });
    }

    validate = (field, textFieldValue) => {
        if(field === 'Email') {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(textFieldValue) ? "" : errorMessages.email;
        }
    }

    render() {
        const { errors, userForm } = this.state;
        return (
            <div>
                <LoginForm
                    login={this.login}
                    handleChange={this.handleChange}
                    errors={errors}
                    user={userForm}
                />
            </div>            
        );
    }
}

export default connectToStores(LoginUser);
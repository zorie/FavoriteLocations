import React, { PropTypes } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import AuthActions from '../../actions/AuthActions.js';
import AuthStore from '../../stores/AuthStore.js';
import NotificationStore from '../../stores/NotificationStore.js';
import RegisterForm from './RegisterForm.jsx';
import errorMessages from '../../constants/errorMessages.js';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

class RegisterUser extends React.Component {    
    static getStores() {
        return [AuthStore, NotificationStore];
    }

    static getPropsFromStores() {
        return {
            authStore: AuthStore.getState(),
            message: NotificationStore.getMessage()
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            user: {
                Email: '',
                Password: '',
                ConfirmPassword: ''
            }
        };
    }

    handleChange = (e) => {
        const field = e.target.name;        
        let temp = this.state.user;
        const textFieldValue = e.target.value;

        temp[field] = textFieldValue;
        
        let errMsg = this.validate(field, textFieldValue);
        
        let errs = this.state.errors;

        if(field == 'Password') {
            if(errMsg.includes("least")) {
                errs[field] = errMsg;    
            } else {
                errs['Password'] = "";
                errs['ConfirmPassword'] = errMsg;
            }
        } else {
            if(field == 'ConfirmPassword' || field == 'Email') {
                errs[field] = errMsg;
            }
        }

        this.setState({
            errors: errs,
            user: temp
        });
    }

    register = (e) => {
        e.preventDefault();
        let user = this.state.user;

        AuthActions.registerUser(user);
    }

    validate = (field, textFieldValue) => {
        if(field === 'Email') {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(textFieldValue) ? "" : errorMessages.email;
        } else if (field === 'ConfirmPassword') {
            return this.state.user.Password === textFieldValue ? "" : errorMessages.passwordsMatch;
        } else if (field === 'Password' ) {
                if(textFieldValue.length < 6) {
                    return errorMessages.passwordLength;
                } else {
                    return this.state.user.ConfirmPassword === textFieldValue ? "" : errorMessages.passwordsMatch;
                }
        }
    }

    render() {
        return (
            <RegisterForm
                register={this.register}
                handleChange={this.handleChange}
                errors={this.state.errors}
            />      
        );
    }
}

export default connectToStores(RegisterUser);
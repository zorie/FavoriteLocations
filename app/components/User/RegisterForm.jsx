import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const propTypes = {
    register: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const RegisterForm = ({
    register,
    handleChange,
    errors
}) => (
        <Card style={{padding:10, width: 400, height: 400, margin: 30, marginLeft: 500, textAlign: 'center'}}>
            <form action="/" onSubmit={register}>
            <h2 className="card-heading">Sign Up</h2>

            {errors.summary && <p className="error-message">{errors.summary}</p>}

            <div className="field-line">
                <TextField
                    floatingLabelText="Email"
                    name="Email"
                    errorText={errors.Email}
                    onChange={handleChange}
                />
            </div>

            <div className="field-line">
                <TextField
                    floatingLabelText="Password"
                    type="password"
                    name="Password"
                    onChange={handleChange}
                    errorText={errors.Password}
                />
            </div>

            <div className="field-line">
                <TextField
                    floatingLabelText="Confirm Password"
                    type="password"
                    name="ConfirmPassword"
                    onChange={handleChange}
                    errorText={errors.ConfirmPassword}
                />
            </div>

            <div style={{margin: 10}} className="button-line">
                <RaisedButton type="submit" label="Register" primary />
            </div>

            <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
            </form>
        </Card>
);

RegisterForm.propTypes = propTypes;

export default RegisterForm;
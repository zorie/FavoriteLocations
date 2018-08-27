import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const propTypes = {
    login: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const LoginForm = ({
    login,
    handleChange,
    errors
}) => (
            <Card style={{padding:10, width: 400, height: 400, position: 'relative', margin: 30, marginLeft: 500, textAlign: 'center'}}>
                <form action="/" onSubmit={login}>
                    <h2 className="card-heading">Login</h2>

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
                        />
                    </div>

                    <div style={{margin: 20}} className="button-line">
                        <RaisedButton type="submit" label="Log in" primary />
                    </div>

                    <CardText>Don't have an account? <Link to={'/register'}>Create one</Link>.</CardText>
                </form>
            </Card>
);

LoginForm.propTypes = propTypes;

export default LoginForm;
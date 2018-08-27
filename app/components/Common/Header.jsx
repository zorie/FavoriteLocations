import React, { Component, PropTypes } from 'react';
import { browserHistory, Link } from 'react-router';
import { Tabs, Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import AuthStore from '../../stores/AuthStore.js';
import AuthActions from '../../actions/AuthActions.js';
import connectToStores from 'alt-utils/lib/connectToStores';
// import isEqual from 'lodash';

import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';

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

class HeaderComponent extends React.Component {
    static getStores() {
        return [AuthStore];
    }

    static getPropsFromStores() {        
        let authState = AuthStore.getState();

        return AuthStore.getState();
    }

    constructor(props) {
        super(props);
        
        this.state = {
            authenticated: this.props.authenticatedUser,
            open: false
        }; 
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.authenticatedUser !== this.props.authenticatedUser) {
            this.setState({
                authenticated: nextProps.authenticatedUser
            });
        }
    }

    redirectToLogin = () => {
        browserHistory.push('/login');
    }

    redirectToRegister = () => {
        browserHistory.push('/register');
    }

    redirectToUserProfile = () => {
        browserHistory.push('/dashboard');
    }

    redirectToLogout = () => {
        this.setState({
            open: false,
        });
        
        let userToken = AuthStore.getToken();
        AuthActions.logoutUser(userToken);
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    handleTouchTap = (e) => {
        e.preventDefault();
        this.setState({
            open: true,
            anchorEl: e.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    addNewLocation = (e) => {
        e.preventDefault();
        this.setState({
            open: false,
        });

        browserHistory.push("/locations/create");
    }

    explore = (e) => {
        e.preventDefault();
        browserHistory.push("/locations");
    }

    render() {
        return (
            <div style={{height: 50, backgroundColor: '#1e9eb2'}}>
                <Tabs style={{float: 'right'}}
                    onChange={this.handleChange}
                    value={this.state.slideIndex}>
                    <Tab style={{ width:300, left: 10}} label="Explore" onClick={this.explore} />     
                    
                    { !this.state.authenticated && ( <Tab style={{width: 300}} label="Login" onClick={this.redirectToLogin} /> ) }

                    
                    { !this.state.authenticated && <Tab style={{width: 300}} label="Register" onClick={this.redirectToRegister} /> }
                    
                    { this.state.authenticated &&
                        <Tab style={{width: 300}} label="Profile" onClick={this.handleTouchTap} >
                            <Popover
                                open={this.state.open}
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                onRequestClose={this.handleRequestClose}>
                                {/* <div style={{width: 10, display: "inline-block", margin:" 0 auto"}}>
                                    <Avatar src="./app/constants/profile.png" />                               
                                </div> */}
                                <Menu>
                                    {/* <MenuItem primaryText="Add new location" onClick={this.addNewLocation} /> */}
                                    <MenuItem primaryText="Sign out" onClick={this.redirectToLogout}/>
                                </Menu>
                            </Popover>   
                        </Tab>
                    }                              
                </Tabs>
                <div style={{display: 'block', width: "160px", paddingTop: 50}}>
                { this.state.authenticated &&
                <Paper style={{width: 200, marginTop: 10, marginLeft: 0}} zDepth={2} >
                <List>
                 <ListItem primaryText="Add new" leftIcon={<ContentAdd />} onClick={this.addNewLocation} />
                 <ListItem primaryText="Liked" leftIcon={<ActionGrade />} /> 
                </List>
                </Paper>
                }
                </div>
            </div>                        
        );
    }
}

HeaderComponent.propTypes = {
    authenticatedUser: PropTypes.bool
};

export default connectToStores(HeaderComponent);
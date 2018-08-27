import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import RegisterContainer from './components/User/RegisterContainer.jsx';
import LoginContainer from './components/User/LoginContainer.jsx';
import AuthStore from './stores/AuthStore.js';
import DashboardContainer from './components/User/DashboardContainer.jsx';
import LocationDetailsContainer from './components/Location/LocationDetailsContainer.jsx';
import CreateLocationContainer from './components/Location/CreateLocationContainer.jsx';

let checkAuthentication = (nextState, replace) => {
    let isThereAuthUser = AuthStore.isAuthenticated();
    if(!isThereAuthUser) {
        replace('/login');
    }
};

let isThereIsNoUserLoggedIn = (nextState, replace) => {
    let isThereAuthUser = AuthStore.isAuthenticated();
    if(isThereAuthUser) {
        replace('/dashboard');
    }
};

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />                     
        <Route path="/register" component={RegisterContainer} onEnter={isThereIsNoUserLoggedIn}/>
        <Route path="/login" component={LoginContainer} onEnter={isThereIsNoUserLoggedIn}/>
        <Route path="/dashboard" component={DashboardContainer} onEnter={checkAuthentication} />
        <Route path="/locations/create" component={CreateLocationContainer} onEnter={checkAuthentication} />        
        <Route path="/locations" component={Home} />
        <Route path="/locations/:id" component={LocationDetailsContainer} />
    </Route>
);
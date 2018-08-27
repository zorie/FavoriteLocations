import React from 'react';
import {render} from 'react-dom';
import App from './components/App.jsx';
import alt from './libs/alt';
import storage from './libs/storage';
import persist from './libs/persist';
import { Router, browserHistory } from 'react-router';
import routes from './routes.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

persist(alt, storage, 'app');

// render(<Root history={browserHistory} />, document.getElementById('app'));

injectTapEventPlugin();

render((
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router history={browserHistory} routes={routes} />
    </MuiThemeProvider>),
    document.getElementById('app')
);


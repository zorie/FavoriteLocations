import React, {PropTypes} from 'react';
import Header from './Common/Header.jsx';
import Sidebar from './Common/Sidebar.jsx';
import Notification from "../components/Common/NotificationContainer.jsx";

const App = ({children}) => (
      <div>
        <Header />
          {children}
        <Notification />      
      </div>
);

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;

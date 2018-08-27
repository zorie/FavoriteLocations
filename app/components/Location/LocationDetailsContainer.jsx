import React, { PropTypes } from 'react';
import LocationStore from '../../stores/LocationStore.js';
import LocationActions from '../../actions/LocationActions.js';
import connectToStores from 'alt-utils/lib/connectToStores';
import AuthStore from '../../stores/AuthStore.js';
import GridTileWrapper from './GridTileWrapperr.jsx';
import UserActions from '../../actions/UserActions.js';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Typography from '@material-ui/core/Typography';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  root: {
    marginTop:10,
    marginLeft: 200,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 600,
    height: 300,
    overflowX: 'auto',
  },
};

const propTypes = {
    selectedLocation: PropTypes.object,
    params: PropTypes.object
};

class LocationDetailsContainer extends React.Component {
    static getStores() {        
        return [LocationStore];
    }

    static getPropsFromStores() {   
        return LocationStore.getState();
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        LocationActions.getLocationDetailsById(this.props.params.id);
    }

    addToFavorites = (locationId) => {  
        UserActions.addToFavorites(locationId);
    }

    removeFromFavorites = (locationId) => {
        UserActions.removeFromFavorites(locationId);
    }

    render() {
        return (
            <div style={styles.root}>
            <Card>
            <CardHeader style={{fontStyle: 'italic'}}
              title={this.props.selectedLocation.Name + " In Details"} 
            />
            
            <div style={{width: 380, float: 'right'}}>
            <GridTileWrapper
            
            everyLocation={this.props.selectedLocation} 
            addToFavorites={this.addToFavorites} 
            removeFromFavorites={this.removeFromFavorites}
            isAuthorized={AuthStore.isAuthenticated()}/>
            </div>
            {/* <div style={{display: 'block', float: 'left' }}>
                <img style={{float: 'right', height: 130, width: 150}} src="../app/constants/explore.png" alt=""/>
            </div> */}
            <CardText style={styles.gridList}>
                {this.props.selectedLocation.Description}
            </CardText>
            <Divider style={{marginTop: 20}}/>
            <CardActions>
              <FlatButton label="SHARE" />
              <FlatButton label="COMMENT" />
            </CardActions>
          </Card>
          </div>
        );
    }
}

LocationDetailsContainer.propTypes = propTypes;

export { LocationDetailsContainer };
export default connectToStores(LocationDetailsContainer);
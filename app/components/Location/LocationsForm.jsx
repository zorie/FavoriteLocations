import React, { PropTypes } from 'react';
import {GridList} from 'material-ui/GridList';
import GridTileWrapperr from './GridTileWrapperr.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const styles = {
  root: {
    width: 800,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // border: '10px solid #1e9eb2',
    margin: '0 auto',
    padding: '10px',
    backgroundColor: '#FFFFFF'
  },
  gridList: {
    width: 800,
    height: 596,
    overflowY: 'auto',
  },
};

const propTypes = {
    locations: PropTypes.array,
    addToFavorites: PropTypes.func,
    removeFromFavorites: PropTypes.func,
    isAuthorized: PropTypes.bool
};

const LocationsForm = ({locations, addToFavorites, removeFromFavorites, isAuthorized}) => {
   return (
    <div>
            {/* <Card >
                <CardHeader
                    title="All locations"
                />
            </Card>   */}
            {/* <div style={{display: "inline-block", float: 'left'}}>
                <FloatingActionButton style={{ marginRight: 20}}>
                    <ContentAdd />
                </FloatingActionButton>
            </div> */}
            <div style={styles.root}>
                <GridList
                    cellHeight={300}
                    style={styles.gridList}>
                    {
                        locations.map((location) =>                 
                        (<div key={location.Id}>
                            <GridTileWrapperr 
                                key={location.Id} 
                                everyLocation={location} 
                                addToFavorites={addToFavorites} 
                                removeFromFavorites={removeFromFavorites}
                                isAuthorized={isAuthorized}/>
                        </div>))
                    }
                </GridList>
            </div>
        </div>);
};

LocationsForm.propTypes = propTypes;

export default LocationsForm;
import React, { PropTypes } from 'react';
import { GridTile } from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

class GridTileWrapperr extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.setState({
            isLiked: this.props.everyLocation.isLikedByCurrentUser
        });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.everyLocation.isLikedByCurrentUser !== this.props.everyLocation.isLikedByCurrentUser){
            this.setState({
                isLiked: nextProps.everyLocation.isLikedByCurrentUser
            });
        }
    }

    handleLike = (e) => {
        // e.preventDefault();

        if(this.state.isLiked === true) {
             // unfave
             this.props.removeFromFavorites(this.props.everyLocation.Id);
             this.setState({
                isLiked: false
            });
        } else {
            this.props.addToFavorites(this.props.everyLocation.Id);
            this.setState({
                isLiked: true
            });
        }
    }

    render() {        
        return (
        <GridTile
            key={this.props.everyLocation.Id}         
            title={this.props.everyLocation.Name}
            subtitle={<span>Stars <b>{this.props.everyLocation.NumberOfLikes}</b></span>}
            actionIcon={this.props.isAuthorized ?
                (<div style={{marginRight: 10}}><button
                        type="button"
                        className={`btn ${this.state.isLiked ? 'btn-primary' : ''}`}
                        onClick={this.handleLike}
                    ><span className="glyphicon glyphicon-heart" /></button></div>) : (<div />)}                         
        >
            
            <Link to={`/locations/${this.props.everyLocation.Id}`} ><img style={{width:390,height: 300}} src={`http://localhost:59034/api/images/get?name=${this.props.everyLocation.PhotoUrl}`} alt={this.props.everyLocation.PhotoUrl} /> </Link>
        </GridTile>                                           
    );
    }
}

GridTileWrapperr.propTypes = {
    everyLocation: PropTypes.object,
    addToFavorites: PropTypes.func,
    removeFromFavorites: PropTypes.func,
    isAuthorized: PropTypes.bool
};


export default GridTileWrapperr;

// <RaisedButton 
//                     id={this.props.everyLocation.Id} 
//                     backgroundColor="none" 
//                     primary={this.state.isLiked}
//                     style={{margin: 10}}
//                     icon={<StarBorder color="white" />} onTouchTap={this.handleLike} 
//                 />
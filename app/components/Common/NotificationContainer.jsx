import React, { PropTypes } from "react";
import connectToStores from "alt-utils/lib/connectToStores";
import NotificationStore from "../../stores/NotificationStore.js";
import Snackbar from "material-ui/Snackbar";
import NotificationActions from "../../actions/NotificationActions.js";

class Notification extends React.Component {
    static getStores() {
        return [NotificationStore];
    }

    static getPropsFromStores() {
        return NotificationStore.getState();
    }

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            message: ""
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.message == "") {
            this.setState({
                open: false,
                message: nextProps.message
            });
        }
        else {
            this.setState({
                open: true,
                message: nextProps.message
            });
        }
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });

        NotificationActions.ResetState();
    };

    render() {
        return (
            <div>
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}/>
            </div>
        );
    }
}

Notification.propTypes = {
    message: PropTypes.string
};

export default connectToStores(Notification);
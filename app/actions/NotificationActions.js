import alt from "../libs/alt.js";

class NotificationActions {
    ResetState() {
        let state = {
            messsage: ""
        };
        
        return (dispatch) => { 
            dispatch(state); 
        };
    }
}
export default alt.createActions(NotificationActions);
import React from 'react';
import { Card, CardHeader} from 'material-ui/Card';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLiked: false
        };
    }

    render() {
        return (
            <div className="container">
                {/* <Card >
                    <CardHeader
                        title="Hello from dashboard"
                    />              
                </Card> */}
            </div>
        );
    }
}

export default Dashboard;
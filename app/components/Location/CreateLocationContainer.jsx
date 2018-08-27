import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import connectToStores from 'alt-utils/lib/connectToStores';
import CountryActions from '../../actions/CountryActions.js';
import CountryStore from '../../stores/CountryStore.js';
import LocationStore from '../../stores/LocationStore';
import AuthStore from '../../stores/AuthStore.js';
import LocationActions from '../../actions/LocationActions.js';
import NotificationStore from '../../stores/NotificationStore.js';

let formdata = new FormData();

class CreateLocation extends React.Component {
    static getStores() {
        return [LocationStore, CountryStore, NotificationStore];
    }

    static getPropsFromStores() {
        return {
            countries: CountryStore.getState().countries,
            message: NotificationStore.getMessage()
        };
    }
    
    constructor(props) {
        super(props);

        this.state = {
            locationName: '',
            description: '',
            selectedCountryName: '',
            selectedCountryId: '',
            image: {}           
        };

        CountryActions.getAllCountries();        
    }

    createLocation = (e) => {
        e.preventDefault();

        let newLocation = {
            Name: this.state.locationName,
            Description: this.state.description,
            CountryId: this.state.selectedCountryId,
        };

        let userToken;
        if(AuthStore.getToken() == '') {
            userToken = null;
        }
        else {
            userToken = AuthStore.getToken();
        }
        
        LocationActions.createLocation(newLocation, formdata, userToken);
    }

    handleChange = (e, index, value) => {
        e.preventDefault();
        this.setState({
            selectedCountryName: value,
            selectedCountryId: index + 1
        });
    }

    handleTextFields = (e) => {
        e.preventDefault();
        if(e.target.name == "locationName") {
            this.setState({
                locationName: e.target.value
            });
        } 
        else {
            this.setState({
                description: e.target.value
            });
        }            
    }

    menuItems(countries) {
        return countries.map((country) => (
        <MenuItem
            key={country.Id}
            value={country.Name}
            primaryText={country.Name}
        />
        ));
    }

    handleUploadFile = (e) =>  {
        e.preventDefault();
        
        let file = this.fileUpload.files[0];
        formdata.delete('LocationImage');        
        formdata.append("LocationImage", file);
    }

    render() {
        return (
            // <div style={{width:'800px', margin:'0 auto'}}>
             <Card style={{padding: 10, width: 600, height: 600, position: 'relative', margin: '0 auto', textAlign: 'center'}}>
                <form action="/" onSubmit={this.createLocation}>
                    <div>
                        <h1>Create new location</h1>
                    </div>
                    <br/>
                    <br/>
                    
                    <div>
                        <TextField name="locationName"  fullWidth hintText="Name" onChange={this.handleTextFields}/>                    
                    </div>
                    <div>
                        <TextField name="description" 
                            fullWidth
                            multiLine={true}
                            hintText="Description"
                            rows={6}
                            rowsMax={6}
                            onChange={this.handleTextFields} />
                    </div>
                    <div>
                        <SelectField
                            hintText="Select a country"
                            value={this.state.selectedCountryName}
                            onChange={this.handleChange}
                            fullWidth>
                            {this.menuItems(this.props.countries)}
                        </SelectField>
                    </div>
                    <div>
                        <RaisedButton containerElement="label">
                            <input 
                                onChange={this.handleUploadFile} 
                                type="file"
                                accept=".jpg"
                                ref={(ref) => this.fileUpload = ref} />
                        </RaisedButton>
                    </div>

                    <div style={{margin: 50}} className="button-line">
                        <RaisedButton type="submit" label="Create" primary />
                    </div>        
                </form>
            </Card>
            // </div>
        );
    }
}

export default connectToStores(CreateLocation);
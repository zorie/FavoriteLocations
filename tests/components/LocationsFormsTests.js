import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Card, CardHeader } from 'material-ui/Card';
import {GridList} from 'material-ui/GridList';
import GridTileWrapperr from '../../app/components/Location/GridTileWrapperr.jsx';
import LocationsForm from '../../app/components/Location/LocationsForm.jsx';

describe("LocationsForm test", () => {
    // setup
    let props;
    let mountedLocationsForm;
    const muiTheme = getMuiTheme();

    const locationsForm = () => {
        if(!mountedLocationsForm) {
            mountedLocationsForm = mount(
                <LocationsForm {...props} />,
                { 
                    context: {muiTheme},
                    childContextTypes: {muiTheme: React.PropTypes.object}
                } 
            );
        }

        return mountedLocationsForm;
    };

    beforeEach(() => {
        props = {
            locations: [{Id: 1, Name: 'TestLoc', NumberOfLikes: 5, PhotoUrl: 'photoURL'}],
            addToFavorites: undefined,
            removeFromFavorites: undefined,
            isAuthorized: false
        };
        mountedLocationsForm = undefined;
    });

    // tests & cases

    it("always renders a main div", () => {
        const divs = locationsForm().find("div");
        expect(divs.length).to.be.above(1);
    });

    it("always renders a <Card >", () => {
        const wrapper = locationsForm();
        expect(wrapper.find(Card).length).to.equal(1);
    });

    it("always renders a <CardHeader >", () => {
        const wrapper = locationsForm();
        expect(wrapper.find(CardHeader).length).to.equal(1);
    });

    it("always renders a <GridList >", () => {
        const wrapper = locationsForm();
        expect(wrapper.find(GridList).length).to.equal(1);
    });

    it("always renders a <GridTileWrapperr >", () => {
        const wrapper = locationsForm();
        expect(wrapper.find(GridTileWrapperr).length).to.equal(1);
    });

    it("receives props", () => {
        const wrapper = locationsForm();
        expect(Object.keys(wrapper.props()).length).to.equal(4);
    });

});



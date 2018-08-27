import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Card, CardHeader } from 'material-ui/Card';
import { LocationDetailsContainer } from '../../app/components/Location/LocationDetailsContainer.jsx';
import {AuthStore} from '../../app/stores/AuthStore.js';
import { LocationAction } from '../../app/actions/LocationActions.js';

describe("Location Details Container", () => {
    // setup
    let props;
    let mountedComponent;
    const muiTheme = getMuiTheme();
    let authStore, locationActions;

    const locationDetails = () => {
        if(!mountedComponent) {
            mountedComponent = shallow(
                <LocationDetailsContainer {...props}/>,
                {
                    context: {muiTheme},
                    childContextTypes: {muiTheme: React.PropTypes.object}
                }
            );
        }
        return mountedComponent;
    };

    beforeEach(() => {
        props = {
            params: {
                id: 1
            },
            selectedLocation: {
                Description: ''
            }
        };
        mountedComponent = null;
    });

    // tests & cases
    it("contains the wrapping div", () => {
        const wrapper = locationDetails();
        expect(wrapper.find("div").length).to.be.above(0);
    });

    it("renders <Card />", () => {
        const wrapper = locationDetails();
        expect(wrapper.find(Card).length).to.equal(1);
    });

    it("renders <CardHeader />", () => {
        const wrapper = locationDetails();
        expect(wrapper.find(CardHeader).length).to.equal(1);
    });

});
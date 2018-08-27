import assert from 'assert';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import LocationsForm from '../app/components/Location/LocationsForm.jsx';
import Dashboard from '../app/components/User/DashboardContainer.jsx';
import { Card, CardHeader, CardText} from 'material-ui/Card';
import chai from 'chai';

let expect = chai.expect;

describe("Dashboard tests", function() {
    it("contains Card component", function() {
      const wrapper = shallow(<Dashboard />);
      expect(wrapper.find(Card)).to.have.length(1);
    });
});

// describe('add', () => {
//   it('adds', () => {
//     assert.equal(1+3, 2);
//   });
// });

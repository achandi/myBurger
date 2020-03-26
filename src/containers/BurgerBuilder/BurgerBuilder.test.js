import React from 'react';
import { configure, shallow } from 'enzyme';
import { BurgerBuilder } from '../BurgerBuilder/BurgerBuilder';

import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder ingGet={() => {}} />);
  });

  it('to should render build controls when receiving ingredients', () => {
    wrapper.setProps({ ing: { salad: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});

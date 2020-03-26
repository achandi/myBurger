import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  it('should render two <Navigation Item /> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it('should render two <Navigation Item /> elements if authenticated', () => {
    //u can manually change wrapper to pass prop
    ///wrapper = shallow(<NavigationItems isAuth />)
    /// or use Enzymes wrapper.setProps({prop: value, prop: value}) method
    wrapper.setProps({ isAuth: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});

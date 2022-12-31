import Enzyme from 'enzyme';                          // DEAD. Migrate to react-testing-library
import EnzymeAdapter from 'enzyme-adapter-react-16';  // DEAD. Migrate to react-testing-library

Enzyme.configure({adapter: new EnzymeAdapter(), disableLifecycleMethods: true});
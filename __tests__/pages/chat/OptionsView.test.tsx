import { shallow } from 'enzyme';
import React from 'react';

import { OptionsView } from '../../../src/pages/chat/OptionsView';

const changeRoom =      jest.fn();
const changeRoomInput = jest.fn();
const connect =         jest.fn();
const disconnect =      jest.fn();

const initialProps = {changeRoom, changeRoomInput, connect, disconnect, loading: false, room: "5067", roomToEnter: "5068"};

afterEach(() => {
  jest.clearAllMocks();
});

describe('OptionsView', () => {
  const wrapper = shallow(<OptionsView status="Connected" {...initialProps} />);

  it(`displays a span element with className current-room__label and with text 'Current Room:'`, () => {
    expect(wrapper.find('span.current-room__label').text()).toEqual('Current Room:');
  });

  it(`displays a span element with className current-room__value and with text '5067'`, () => {
    expect(wrapper.find('span.current-room__value').text()).toEqual('5067');
  });

  it(`displays an input element with className change-room__input and with value '5068'`, () => {
    expect(wrapper.find('input.change-room__input').prop('value')).toEqual('5068');
  });

  it(`displays a button element with className change-room__button and with text 'Enter'`, () => {
    expect(wrapper.find('button.change-room__button').text()).toEqual('Enter');
  });

  describe('when status is Connected', () => {
    it(`displays a button element with className connection__button and with text 'Disconnect'`, () => {
      const wrapper = shallow(<OptionsView status="Connected" {...initialProps} />);
      expect(wrapper.find('button.connection__button').text()).toEqual('Disconnect');
    });
  });

  describe('when status is Disconnected', () => {
    it(`displays a button element with className connection__button and with text 'Connect'`, () => {
      const wrapper = shallow(<OptionsView status="Disconnected" {...initialProps} />);
      expect(wrapper.find('button.connection__button').text()).toEqual('Connect');
    });
  });
});
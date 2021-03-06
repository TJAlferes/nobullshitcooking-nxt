import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import Equipment from '../../../src/pages/equipment/index.page';
import { EquipmentView } from '../../../src/pages/equipment/view';

const initialProps = {
  equipment: [
    {
      id: 1,
      owner_id: 1,
      equipment_type_id: 3,
      name: "Metal Spatula",
      equipment_type_name: "Cooking",
      description: "Some note.",
      image: "nobsc-metal-spatula"
    },
    {
      id: 1,
      owner_id: 1,
      equipment_type_id: 2,
      name: "Cutting Board",
      equipment_type_name: "Preparing",
      description: "Some note.",
      image: "nobsc-cutting-board"
    }
  ],
  myPrivateEquipment: [],
  theme: "light"
};

const mockHistoryPush = jest.fn();
const mockEquipmentBreadcrumbs = jest.fn();

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {...originalModule, useHistory: () => ({push: mockHistoryPush})};
});

jest.mock(
  '../../../src/components/Breadcrumbs/Breadcrumbs',
  () => ({EquipmentBreadcrumbs: mockEquipmentBreadcrumbs})
);

afterEach(() => {
  jest.clearAllMocks();
});

describe('Equipment', () => {
  it('should redirect to /home if given no equipment', () => {
    jest.mock('react-router-dom', () => {
      const originalModule = jest.requireActual('react-router-dom');
      return {...originalModule, useParams: () => ({})};
    });

    mount(<MemoryRouter><Equipment {...initialProps} /></MemoryRouter>);

    expect(mockHistoryPush).toHaveBeenCalledWith("/home");
  });

  it('should redirect to /home if given an invalid equipment', () => {
    jest.mock('react-router-dom', () => {
      const originalModule = jest.requireActual('react-router-dom');
      return {...originalModule, useParams: () => ({id: "999"})};
    });

    mount(<MemoryRouter><Equipment {...initialProps} /></MemoryRouter>);

    expect(mockHistoryPush).toHaveBeenCalledWith("/home");
  });

  it('should not redirect if given a valid equipment', async () => {
    jest.mock('react-router-dom', () => {
      const originalModule = jest.requireActual('react-router-dom');
      return {...originalModule, useParams: () => ({id: "1"})};
    });

    const wrapper =
      mount(<MemoryRouter><Equipment {...initialProps} /></MemoryRouter>);

    await act(async () => {
      Promise.resolve(() => {
        setImmediate(() => wrapper.update());
        expect(mockHistoryPush).not.toHaveBeenCalled();
      });
    });
  });

  it('should get the appropriate equipment', async () => {
    jest.mock('react-router-dom', () => {
      const originalModule = jest.requireActual('react-router-dom');
      return {...originalModule, useParams: () => ({id: "1"})};
    });

    const wrapper =
      mount(<MemoryRouter><Equipment {...initialProps} /></MemoryRouter>);

    await act(async () => {
      Promise.resolve(() => {
        setImmediate(() => wrapper.update());
        expect(wrapper.find('.equipment')).toHaveLength(1);
        expect(wrapper.find(EquipmentView).props().equipment.id).toEqual(1);
      });
    });
  });
});
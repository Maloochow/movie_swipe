import React from 'react';
import ReactDOM from 'react-dom';

import {render, fireEvent, cleanup} from '@testing-library/react';
import * as Reducer from '../roomReducer';
import * as ACTIONS from '../../actions/roomActions';


afterEach(cleanup)

describe('test the reducer and actions', () => {
  it('should return the initial state', () => {
    expect(Reducer.initialState).toEqual({currentRoom: {}, pastEvents: [], rooms: []})
  })

  it('should update currentRoom', () => {
    expect(Reducer.roomReducer(Reducer.initialState, ACTIONS.addRoomHistory(
      {
        name: "test",
        numMembers: "test",
        members: ["test", "test2"],
        admin: "test"
      })
    ))
      .toEqual(
        {
          currentRoom:{
              name: "test",
              numMembers: "test",
              members: ["test", "test2"],
              admin: "test"
            }, 
          pastEvents: [], 
          rooms: []
        })
  })

  it('should update pastEvents', () => {
    expect(Reducer.roomReducer(Reducer.initialState, ACTIONS.addEvents([{ name: "a list of" }, { name: "events" }])))
      .toEqual(
        {
          currentRoom:{}, 
          pastEvents: [{ name: "a list of" }, { name: "events"}], 
          rooms: []
        })
  })

  it('should add all the rooms', () => {
    expect(Reducer.roomReducer(Reducer.initialState, ACTIONS.getRooms([{ name: "a list of" }, { name: "rooms" }])))
      .toEqual(
        {
          currentRoom:{}, 
          pastEvents: [], 
          rooms: [{ name: "a list of" }, { name: "rooms" }]
        })
  })


  it('should push a new room', () => {
    expect(Reducer.roomReducer({
      currentRoom:{}, 
      pastEvents: [], 
      rooms: [{ name: "a list of" }, { name: "rooms" }]
    }, ACTIONS.addRooms([{ name: "new room" }])))
      .toEqual(
        {
          currentRoom:{}, 
          pastEvents: [], 
          rooms: [{ name: "a list of" }, { name: "rooms" }, { name: "new room" }]
        })
  })
})

// it('Reducer changes stateprop1 from false to true', () => {
//    const { container, getByText } = render(<TestHookReducer />);

//    expect(getByText(/stateprop1 is/i).textContent).toBe("stateprop1 is false")

//    fireEvent.click(getByText("Dispatch Success"))

//    expect(getByText(/stateprop1 is/i).textContent).toBe("stateprop1 is true")
// })
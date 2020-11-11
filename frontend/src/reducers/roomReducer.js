export const initialState = {currentRoom: {}, pastEvents: [], rooms: []}

export function roomReducer( state= initialState, action) {
    switch (action.type) {
        case 'ENTER_ROOM':
            return {
                ...state,
                currentRoom: action.room,
                pastEvents: state.pastEvents,
                rooms: state.rooms
            }
            break;
        case 'ADD_EVENTS':
            return {
                ...state,
                currentRoom: state.currentRoom,
                pastEvents: action.events,
                rooms: state.rooms
            }
            break;
        case 'GET_ROOMS':
            return {
                ...state,
                history: state.history,
                pastEvents: state.pastEvents,
                rooms: action.rooms
            }
        case 'ADD_ROOMS':
            return {
                ...state,
                history: state.history,
                pastEvents: state.pastEvents,
                rooms: state.rooms.concat(action.rooms)
            }
            break;
        default:
            return state
            break;
    }
}
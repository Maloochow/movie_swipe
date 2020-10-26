export default function roomReducer( state= {currentRoom: {}, pastEvents: [], rooms: []}, action) {
    switch (action.type) {
        case 'ADD_HISTORY':
            return {
                ...state,
                currentRoom: action.history,
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
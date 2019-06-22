import {FETCH_LOCATIONS} from './../actions/types';

const initialState = {
  items: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LOCATIONS:
            return {
                ...state,
                items: action.payload.locations
            };
        default:
            return state;
    }
}

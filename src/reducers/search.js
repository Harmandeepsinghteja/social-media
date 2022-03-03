import { FETCH_SEARCH_RESULTS_SUCCESS } from "../actions/actionTypes";

const initialSearchState = {
    results: [],
}


export default function search (state = initialSearchState, action) {
    switch(action) {
        case FETCH_SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                results: action.users,
            }
        default :
        return state;
    }
}
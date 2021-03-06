import { GET_DOJO_ITEMS, ADD_DOJO_ITEM, DELETE_DOJO_ITEM, ITEMS_LOADING } from "../actions/types";

const initialState = {
	items: [],
	loading: false
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_DOJO_ITEMS:
			return {
				...state,
				items: action.payload,
				loading: false
			};
		case ADD_DOJO_ITEM:
			return {
				...state,
				items: [...state.items, action.payload]
			};
		case DELETE_DOJO_ITEM:
			return {
				...state,
				items: state.items.filter(item => item._id !== action.payload)
			};
		case ITEMS_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}

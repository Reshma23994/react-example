import { LIST_USER } from "../constants/actionConstants";
import instance from '../../utils/serviceConfig';
import axios from "axios";
const initialState = {
    customerDetails: [],
};

function contactReducer(state = initialState, action = {}) {

    switch (action.type) {
        case LIST_USER:
            console.log(`action.payload`, action.payload)
            return {
                ...state,
                customerDetails: [action.payload]

            };
        default:
            return { ...state }

    }
}

export default contactReducer;
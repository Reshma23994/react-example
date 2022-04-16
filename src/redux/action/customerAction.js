import { LIST_USER } from '../constants/actionConstants';

const listContact = (data) => {
    console.log("DATA??", data)
    return {
        type: LIST_USER,
        payload: data

    }
}

export const customerAction = {
    listContact
}

// export default customerAction
import {SIGN_IN , SIGN_UP,USER_DATA,USERS_DATA} from '../actions/types';

const initialState = {
  users: [],
  user:{},
  token:null,
};

export default function(state = initialState, action) {
    
  switch (action.type) {
    case SIGN_IN:
        return {
            ...state,
            token:action.payload
        }
    case SIGN_UP:
            console.log(action.payload)
        return {
            ...state,
            user:action.payload,
        }
    case USER_DATA:
            console.log(action.payload)
        return {
            ...state,
            user:action.payload,
        }
    case USERS_DATA:
            console.log(action.payload)
        return {
            ...state,
            users:action.payload.users,
        }
    default:
      return state;
  }
}
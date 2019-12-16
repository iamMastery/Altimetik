import { SIGN_IN ,SIGN_UP,USER_DATA,USERS_DATA,SinUp_Error} from './types';
import axios from 'axios';
import { push } from 'react-router-redux';
export const SignIn = postData => dispatch => {
    axios.post("http://localhost:5000/api/auth/",postData)
      .then(post =>
        dispatch({
          type: SIGN_IN,
          payload: post.data.token
        })
      );
  };
  export const SignUP = postData => dispatch => {
    axios.post("http://localhost:5000/api/users/",postData)
      .then(post =>
        dispatch({
          type: SIGN_UP,
          payload: post.data
        }),
      ).catch((err)=>{
         console.log(err)
      })

  };
  export const UserData=postData=>dispatch=>{
      console.log("i am in")
      axios.get("http://localhost:5000/api/auth/",{headers:{'x-auth-token': postData}})
      .then(
          post=>
          dispatch({
              type:USER_DATA,
              payload:post.data
          })
        .then(rest => console.log(rest))
      ).catch((err)=>{
          console.log(err);
      }
      )
  };
  export const UsersData=postData=>dispatch=>{
    console.log("i am in")
    axios.get("http://localhost:5000/api/users/",{headers:{'x-auth-token': postData}})
    .then(
        post=>
        dispatch({
            type:USERS_DATA,
            payload:post.data
        })
      .then(rest => console.log(rest))
    ).catch((err)=>{
        console.log(err);
    }
    )
};
  export const Redirect=()=>dispatch=>{
      console.log("hi")
    dispatch( push('/') );
};  

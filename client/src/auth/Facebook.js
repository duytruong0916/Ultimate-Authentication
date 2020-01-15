import React from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
const Facebook = ({informParent =f =>f}) => {

    const responseFacebook = (response) => {
        console.log(response);
      
        // axios({
        //     method: 'POST',
        //     url: `${process.env.REACT_APP_API}/google-login`,
        //     data: {idToken: response.tokenId}
        // })
        // .then(response=>{
        //     console.log("GOOGLE SIGNIN SUCCESS:", response)
        //     informParent(response);
        // })
        // .catch(err=>{
        //     console.log("GOOGLE SIGNIN ERROR:", err)
        // })
      }
       
    return (
        <div>
            <FacebookLogin
                appId={`${process.env.REACT_APP_FACEBOOKCLIENTID}`}
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                render={renderProps => (
                  <button onClick={renderProps.onClick} className='button-card w-100 bg-info'><i class="fa fa-facebook-f mr-4" aria-hidden="true"></i>LOGIN WITH FACEBOOK</button>
                )}
            />
        </div>
    )
}

export default Facebook;
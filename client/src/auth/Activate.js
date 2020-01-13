import React, { useState, useEffect, Fragment } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
const Activate = (props) => {
    const [data, setdata] = useState({
        lastname: '',
        token: '',

    })
    const {lastname, token } = data;
    useEffect(() => {
       let token  = props.match.params.token;
       if(token){
        let {lastname} = jwt.decode(token);
        setdata({...data, lastname,token})
       }
       console.log(lastname,token);

    }, [])
    const ClickSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: `http://localhost:8000/api/account-activation`,
            data: {token }
        })
            .then((response) => {
                console.log('ACCOUNT ACTIVATED',response.data.message)
            })
            .catch(error => {
                console.log(error)
            })

    }
    const ActivationLink = () => (
        <div>
            <h1>Hey {lastname}, ready to activate your account?</h1>
            <button className='button-card' onClick={ClickSubmit}>Activate Account</button>
        </div>
    )
    return (
        <div className='Signup-wrapper mx-auto py-5'>
            {ActivationLink()}
        </div>

    )
}

export default Activate;
import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
const Forgot = () => {
    const [data, setdata] = useState({
        email: '',
        error: false,
        success:false,
    })
    const {success,email,error } = data;
    const onChangeHandler = name => (e) => {
        const value = e.target.value;
        setdata({ ...data, [name]: value });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(!email){
            setdata({...data, error: 'Missing required fields'});
        }else{
            setdata({...data, error: ''})
            //console.log(`${process.env.REACT_APP_API}`)
            axios({
                method: 'PUT',
                url: `http://localhost:8000/api/forgot-password`,
                data: {email}
            })
            .then((response)=>{
                    setdata({email:'',error:'',success: response.data.message});
            })
            .catch(error=>{
                setdata({...data, error: error.response.data.error});
            })
        }
    }
    const ShowForm = ()=>(
        <div className='py-5'>
            <div className='page-header-title text-center'>RESET PASSWORD</div>
            <form onSubmit={onSubmit} onBlur={()=>setdata({...data,error:'', success:''})}>
                <div className='mt-4'>
                    <div><span className="font-weight-bold">*Enter your email to reset your password:</span></div>
                    <input
                        className={`text-input w-100 ${error&&!email?'missing-field':''}`}
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={onChangeHandler('email')} />
                </div>
                <div className='text-center text-danger m-4'>
                    {error&&(<div>{error}</div>)}
                </div>
                <div className='text-center text-success mt-4'>
                    {success&&(<div>{success}</div>)}
                </div>
                <div className='text-center'>
                    <button className="button-card mt-3 w-50 p-4 mb-5">SUBMIT</button>
                </div>
            </form>
        </div>
    )
    return (
        <div className='Signup-wrapper mx-auto py-5'>
            {/* {isAuth!==false?<Redirect to ='/'/>:null} */}
            {ShowForm()}
        </div>
    
    )
}

export default Forgot;
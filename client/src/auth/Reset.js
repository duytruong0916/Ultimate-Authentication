import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
const Reset = (props) => {
    const [data, setdata] = useState({
        newpassword: '',
        confirmpassword: '',
        email: '',
        error: false,
        success: false,
        errornotmatch: false,
        name: '',
        token: ''
    })
    const { success, token, newpassword, confirmpassword, error, errornotmatch } = data;
    useEffect(() => {
        let token = props.match.params.token;
        if (token) {
            setdata({ ...data, token })
        }
    }, [])
    const onChangeHandler = name => (e) => {
        const value = e.target.value;
        setdata({ ...data, [name]: value });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (!newpassword || !confirmpassword) {
            setdata({ ...data, error: 'Missing required fields' });
        } else if (newpassword !== confirmpassword) {
            setdata({ ...data, errornotmatch: 'Passwords do not match' })
        } else {
            setdata({ ...data, error: '', errornotmatch: '' })
            axios({
                method: 'PUT',
                url: `http://localhost:8000/api/reset-password`,
                data: { newpassword, resetPasswordLink: token }
            })
                .then((response) => {
                    setdata({ error: '', newpassword: '', confirmpassword: '', success: response.data.message });
                })
                .catch(error => {
                    setdata({ ...data, error: error.response.data.error });
                })
        }
    }
    const ShowForm = () => (
        <div className='py-5'>
            <div className='page-header-title text-center'>RESET PASSWORD</div>
            <form onSubmit={onSubmit} onBlur={() => setdata({ ...data, error: '', errornotmatch: '', success: '', name: '' })}>
                <div className='mt-4'>
                    <div><span className="font-weight-bold">*Password:</span></div>
                    <div>
                        <input
                            className={`text-input w-100 ${error && !newpassword || errornotmatch ? 'missing-field' : ''}`}
                            type='password'
                            value={newpassword}
                            placeholder='New password'
                            onChange={onChangeHandler('newpassword')} />
                    </div>
                    <div className='mt-4'>
                        <div><span className="font-weight-bold">*Confirm password:</span></div>
                        <input
                            className={`text-input w-100 ${error && !confirmpassword || errornotmatch ? 'missing-field' : ''}`}
                            type='password'
                            value={confirmpassword}
                            placeholder='Confirm new password'
                            onChange={onChangeHandler('confirmpassword')} />
                    </div>
                </div>
                <div className='text-center text-danger m-4'>
                    {error && (<div>{error}</div>)}
                    {!error && errornotmatch && (<div>{errornotmatch}</div>)}
                </div>
                <div className='text-center text-success mt-4'>
                    {success && (<div>{success}} </div>)}
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

export default Reset;
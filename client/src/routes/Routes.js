import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import App  from '../App';
import SignUp from '../auth/signup';
import SignIn from '../auth/signin';
import Menu from '../core/Menu';
import Activate from '../auth/Activate';
import Forgot from '../auth/Forgot';
import Reset from '../auth/Reset';
const Routes = ()=>{
    return(
        <BrowserRouter>
        <Menu />
            <Switch >
                <Route path = '/' exact = {true}component={App}/>
                <Route path = '/signup' component={SignUp}/>
                <Route path = '/signin' component={SignIn}/>
                <Route path = '/forgotpassword' component={Forgot}/>
                <Route path = '/auth/password/reset/:token' component={Reset}/>
                <Route path = '/auth/activate/:token' component={Activate}/>
            </Switch>
        </BrowserRouter>
    )
}
export default Routes;
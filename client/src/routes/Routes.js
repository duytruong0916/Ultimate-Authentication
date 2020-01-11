import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import App  from '../App';
import SignUp from '../auth/signup';
import SignIn from '../auth/signin';
const Routes = ()=>{
    return(
        <BrowserRouter>
            <Switch >
                <Route path = '/' exact = {true}component={App}/>
                <Route path = '/signup' component={SignUp}/>
                <Route path = '/signin' component={SignIn}/>
                <Route path = '/account/activate/:token' component={App}/>
            </Switch>
        </BrowserRouter>
    )
}
export default Routes;
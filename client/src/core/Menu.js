import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { isAuth, Signout } from '../auth/Helpers';
const Menu = (props) => {

    const renderToggle = () => (
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <div className='text-danger py-5'>
                <NavLink to='/signup' activeClassName='is-active' className='link-nav'>REGISTER</NavLink>
            </div>
            <div className='text-danger pb-5'>
                <NavLink to='/signin' activeClassName='is-active' className='link-nav'>LOG IN</NavLink>
            </div>
            <div className='text-danger pb-5'>
                <NavLink to='/signin' activeClassName='is-active' className='link-nav'>LOG OUT</NavLink>
            </div>

        </div>
    )
    const renderMain = () => (
        <div className="navbar">
            <div className="main ">
                {!isAuth() &&
                    <Fragment>
                        <span>
                            <NavLink to='/signin' activeClassName='is-active' className='link-nav'>LOG IN</NavLink>
                        </span>
                        <span>
                            <NavLink to='/signup' activeClassName='is-active' className='link-nav'>REGISTER</NavLink>
                        </span>
                    </Fragment>}
                {isAuth()&& <span onClick={()=>Signout(()=>{ console.log('Signed Out'); window.location.reload(false); })}>
                    <div className='text-white'>LOG OUT</div>
                </span>}
            </div>
            <span className="navbar-toggle" data-toggle="collapse" data-target="#collapsibleNavbar">
                <i className="fa fa-bars "></i>
            </span>
        </div>
    )

    return (
        <Fragment>
            <div className='w-100 sticky-top' style={{ zIndex: '1', top: 0 }}>
                {renderMain()}
                {renderToggle()}
            </div>

        </Fragment>
    )
}


export default Menu;
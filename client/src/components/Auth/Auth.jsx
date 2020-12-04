import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import { history } from '@app/store';
import './Auth.scss';

import AuthTab from './AuthTab';
import SignIn from './SignIn';
import Register from './Register';

import Cloud from '@app/media/5dd659d93bdf1f00125efc0d.mp4';

import { signOut } from '@app/utils/auth';

class Auth extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        signOut();
    }

    render() {
        return (
            <div className='app-Auth'>
                <div>
                    <video className='auth-backgroundVideo' loop autoPlay muted>
                        <source src={Cloud} type='video/mp4'/>
                    </video>
                </div>
                <div className='auth-root-contents'>
                    <div className='auth-contents'>
                        {/* Brand Logo */}
                        <div className='auth-brand'>
                            {/* <img className='brand-logo'
                                src={Logo}
                            /> */}
                            <span className='brand-name'>
                                EGEG
                            </span>
                        </div>

                        {/* Auth form box */}
                        <div className='auth-box'>
                            <AuthTab />
                            <div className='auth-box-contents'>
                                <Switch>
                                    <Route
                                        path='/auth'
                                        render={() =>
                                            history.push('/auth/signin') 
                                        }
                                        exact
                                    />
                                    <Route
                                        path='/auth/signin'
                                        component={SignIn}
                                    />
                                    <Route
                                        path='/auth/register'
                                        component={Register}
                                    />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Auth;

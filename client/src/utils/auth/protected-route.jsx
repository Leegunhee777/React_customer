import * as React from 'react';
import { Route, Redirect } from 'react-router';
import { isTokenValid } from './token';


export const ProtectedRoute = ({
    Component,
    authToken,
    ...args
}) => {
    return (
        <Route
            { ...args }
            render={
                props => isTokenValid(authToken) ?
                    <Component { ...props } /> :
                    <Redirect to={{
                        pathname: '/auth',
                        state: { from: props.location }
                    }} />
            }
        />
    );
}

import React, { useContext } from "react";
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Context } from './context/AuthContext';

import history from './history'

import {Home} from './pages/Home/Home'
import { PokemonDetails } from "./pages/PokemonDetails/PokemonDetails";


export function AppRoutes() {

    // function CustomRoute({ isPrivate, ...rest }) {

    //     const { loading, isLoggedIn } = useContext(Context);

    //     if (loading) {
    //         return <h1>Loading...</h1>;
    //     }

    //     if (isPrivate && !isLoggedIn) {
    //         return <Redirect to="/login" />
    //     }
    //     return <Route {...rest} />;
    // }
    

    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/pokemon/:id" component={PokemonDetails} />
            </Switch>
        </Router>
    )
}
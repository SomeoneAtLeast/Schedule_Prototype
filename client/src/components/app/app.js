/* eslint-disable react/prop-types */
import React, {useEffect} from "react";
import {Route, Link, Switch, Redirect} from 'react-router-dom';
import {connect} from "react-redux"
import {ChangeSelectedPage} from "../../store/actions"
import Context from "../../context";
import {useAuth} from "../../hooks/auth.hook";

import "./app.scss";

import logo from "./../../global-imgs/logo.png";

import Auth from "../auth";
import FilterList from "../filter-list";
import DaysFieldPresonal from "../days-field-porsonal"
import DaysFieldCommon from "../days-field-common"
import MainNav from "../main-nav"
import SeatsField from "../seats-field"
import DaysFieldCommonControls from "../days-field-common-controls"
import WorkingShifts from "../working-shifts"


const App = ({ChangeSelectedPage, location}) => {

    const {token, login, logout, userId} = useAuth();
    const isAuthenticated = !!token;

    useEffect(() => {
        ChangeSelectedPage(location);
    }, [ChangeSelectedPage, location])
    
    if (isAuthenticated) {
        return (
            <div className = "app">
                <header className="header">
                    <div className="header__main-nav">
                        <div className="header__main-nav-logo-wrapper">
                            <Link 
                                className="header__main-nav-link"
                                to="/">
                                    <img className="header__main-nav-logo"
                                    src={logo}
                                    alt="Логотип"/>
                            </Link>
                        </div>
                        <Route path="/" component={MainNav}/>
                    </div>
                </header>
                <main className="main">
                    <Route path="/personalschedule/:id" exact render={() => {
                        return (
                        <div className="controls">
                            <Route path="/personalschedule/:id" exact component={FilterList}/>
                        </div>
                        )
                    }}/>
                    <Route path="/" exact>
                        <div className="controls">
                            <Route path="/" exact component={DaysFieldCommonControls}/>
                        </div>
                    </Route>
                    <div className="main-content">
                        <Switch>
                            <Route path="/" exact component={DaysFieldCommon}/>
                            <Route path="/personalschedule/:id" render={({match}) => {
                                const {id} = match.params;
                                return (
                                    <DaysFieldPresonal
                                        id = {id - 1}/>
                                )
                            }}/>
                            <Route path="/seats" exact component={SeatsField}/>
                            <Route path="/workingshifts" exact component={WorkingShifts}/>
                            <Redirect to="/"/>
                        </Switch>
                    </div>
                </main>
            </div>
        )
    }

    if(!isAuthenticated) {
        return (
            <Context.Provider value={{
                token, login, logout, userId, isAuthenticated
              }}>
                <Switch>
                    <Route path="/" exact component={Auth}/>
                    <Redirect to="/"/>
                </Switch>
            </Context.Provider>
        )
    }

}

const mapDispatchToProps = {
    ChangeSelectedPage
}


export default connect(null, mapDispatchToProps)(App);
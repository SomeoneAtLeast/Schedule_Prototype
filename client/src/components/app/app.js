import React, {useEffect} from "react";
import {Route, Link, Switch, Redirect} from 'react-router-dom';
import {connect} from "react-redux"
import {ChangeSelectedPage} from "../../store/actions"
import Context from "../../context";
import {useAuth} from "../../hooks/auth.hook";

import "./app.scss";

import logo from "./../../global-imgs/logo.png";

import Login from "../login";
import FilterList from "../filter-list";
import SaveAndCancel from "../save-and-cancel";
import DaysFieldPresonal from "../days-field-personal"
import DaysFieldCommon from "../days-field-common"
import MainNav from "../main-nav"
import SeatsField from "../seats-field"
import DaysFieldCommonControls from "../days-field-common-controls"
import WorkingShifts from "../working-shifts"
import UserControls from "../user-controls";
import ManagingWorkers from "../managing-workers";
import DualBall from "../dual-ball";


const App = ({ChangeSelectedPage, location}) => {

    const {token, login, logout, userId, role, ready} = useAuth();
    const isAuthenticated = !!token;
    useEffect(() => {
        ChangeSelectedPage(location);
    }, [ChangeSelectedPage, location])

    if (!ready) {
        return <DualBall/>
    }
    
    if (isAuthenticated) {
        return (
            <Context.Provider value={{
                token, login, logout, userId, isAuthenticated, role
                }}>
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
                                { (role === "Супервайзер") ?
                                    <Route path="/personalschedule/:id" exact component={SaveAndCancel}/>                                
                                    :
                                    null
                                }
                                <Route path="/personalschedule/:id" exact component={UserControls}/>   
                            </div>
                            )
                        }}/>
                        <Route path="/" exact>
                            <div className="controls">
                                { (role === "Супервайзер") ?
                                    <>
                                        <Route path="/" exact component={DaysFieldCommonControls}/>
                                        <Route path="/" exact component={SaveAndCancel}/>
                                    </>                               
                                    :
                                    null
                                }
                                <Route path="/" exact component={UserControls}/>
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
                                <Route path="/seats" component={SeatsField}/>
                                <Route path="/workingshifts" component={WorkingShifts}/>
                                <Route path="/managing-workers" component={ManagingWorkers}/>
                                <Redirect to="/"/>
                            </Switch>
                        </div>
                    </main>
                </div>
            </Context.Provider>
        )
    }

    return (
        <Context.Provider value={{
            token, login, logout, userId, isAuthenticated
            }}>
            <Switch>
                <Route path="/auth" exact component={Login}/>
                <Redirect to="/auth"/>
            </Switch>
        </Context.Provider>
    )
}

const mapDispatchToProps = {
    ChangeSelectedPage
}


export default connect(null, mapDispatchToProps)(App);
import React from "react";
import {Route, Link} from 'react-router-dom';
import {connect} from "react-redux"

import "./app.scss";

import logo from "./../../global-imgs/logo.png"

import FilterList from "../filter-list";
import DaysFieldPresonal from "../days-field-porsonal"
import DaysFieldCommon from "../days-field-common"
import MainNav from "../main-nav"
import SeatsField from "../seats-field"
import DaysFieldCommonControls from "../days-field-common-controls"
import WorkingShifts from "../working-shifts"


// Ограничить количество символов в инпутах

const App = () => {
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
                <Route path="/personalschedule/:id" exact render={() => {
                                return (
                                    <div className="header__second-nav">
                                        <Route path="/personalschedule/:id" exact component={FilterList}/>
                                    </div>
                                )
                            }}/>
            </header>
            <main className="main">
                <div className="controls">
                    <Route path="/" exact component={DaysFieldCommonControls}/>
                </div>
                <div className="main-content">
                    <Route path="/" exact component={DaysFieldCommon}/>
                    <Route path="/personalschedule/:id" component={DaysFieldPresonal}/>
                    <Route path="/seats" component={SeatsField}/>
                    <Route path="/workingshifts" component={WorkingShifts}/>
                </div>
            </main>
        </div>
    )
}


export default connect()(App);
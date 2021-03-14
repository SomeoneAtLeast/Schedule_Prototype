import React from "react";
import {Route} from 'react-router-dom';
import {connect} from "react-redux"
import "./app.scss";

import FilterList from "../filter-list";
import DaysFieldPresonal from "../days-field-porsonal"
import DaysFieldCommon from "../days-field-common"
import MainNav from "../main-nav"
import SeatsField from "../seats-field"
import DaysFieldCommonControls from "../days-field-common-controls"
import WorkingShifts from "../working-shifts"


// Ограничить количество символов в инпутах
// Создать единый стейт

const App = () => {
    return (
        <div className = "app">
            <header className="header">
                <div className="header__main-nav">
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
                <Route path="/seats" component={SeatsField}/>
                <Route path="/workingshifts" component={WorkingShifts}/>
                <Route path="/" exact component={DaysFieldCommon}/>
                <Route path="/personalschedule/:id" component={DaysFieldPresonal}/>
            </main>
        </div>
    )
}


export default connect()(App);
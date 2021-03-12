/* eslint-disable react/prop-types */
import React, {Component} from "react";
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

class App extends Component {
    constructor (props) {
        super(props);
    }


    render() {
        return (
            <div className = "app">
                <div className="header">
                    <div className="header__main-nav">
                        <Route path="/" component={MainNav}/>
                    </div>
                    <div className="header__second-nav">
                        <Route path="/personalschedule/:id" exact component={FilterList}/>
                    </div>
                </div>
                <div className="main">
                    <div className="controls">
                        <Route path="/" exact component={DaysFieldCommonControls}/>
                    </div>
                    <Route path="/seats" component={SeatsField}/>
                    <Route path="/workingshifts" component={WorkingShifts}/>
                    <Route path="/" exact component={DaysFieldCommon}/>
                    <Route path="/personalschedule/:id" component={DaysFieldPresonal}/>
                </div>
            </div>
        )
    }
}


export default connect()(App);
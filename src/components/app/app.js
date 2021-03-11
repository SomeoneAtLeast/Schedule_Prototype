/* eslint-disable react/prop-types */
import React, {Component} from "react";
import {Route} from 'react-router-dom';
import {connect} from "react-redux"
import {SelectWorker, ClearAllDays, ChangeDayType} from "../../store/actions"
import "./app.scss";

import FilterList from "../filter-list";
import DaysFieldPresonal from "../days-field-porsonal"
import DaysFieldCommon from "../days-field-common"
import MainNav from "../main-nav"
import SeatsField from "../seats-field"
import DaysFieldCommonControls from "../days-field-common-controls"
import WorkingShifts from "../working-shifts"

// В процессе рефакторинг personalschedule, в особенности перенос на this.state.workers
// Ограничить количество символов в инпутах
// Создать единый стейт
// пофиксить ошибку при попытки назначить день не выбрав его

class App extends Component {
    constructor (props) {
        super(props);
    }

    filterDays(workers, filter) {
        if(filter === "worked") {
            return  workers.filter(item => item.worked)
        } else if (filter === "weekends") {
            return  workers.filter(item => item.weekend) 
        } else if (filter === "vacation") {
            return  workers.filter(item => item.vacation) 
        } else {
            return  workers
        }
    }

    filterWorkers(workersArr, selectedWorker, filter) {
        const {workers} = this.props;
        if(filter === "worked") {
            const workedDays = workersArr.filter(item => item.worked);
            const newWorker = {...workers[selectedWorker], days: workedDays}
            const newWorkers = [...workers.slice(0, selectedWorker), newWorker, ...workers.slice(selectedWorker + 1)];
            return  newWorkers
        } else if (filter === "weekends") {
            const weekendDays = workersArr.filter(item => item.weekend);
            const newWorker = {...workers[selectedWorker], days: weekendDays}
            const newWorkers = [...workers.slice(0, selectedWorker), newWorker, ...workers.slice(selectedWorker + 1)];
            return  newWorkers
        } else if (filter === "vacation") {
            const vacationDays = workersArr.filter(item => item.vacation);
            const newWorker = {...workers[selectedWorker], days: vacationDays}
            const newWorkers = [...workers.slice(0, selectedWorker), newWorker, ...workers.slice(selectedWorker + 1)];
            return  newWorkers
        } else {
            return  workers
        }
    }

    render() {

       const {SelectWorker, ClearAllDays, ChangeDayType} = this.props;

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
                    <Route path="/personalschedule/:id" render={({match}) => {
                        const {id} = match.params;
                        return (
                            <DaysFieldPresonal
                                days = {visibleDays}
                                workers = {visibleWorkers}
                                selectedWorker = {id - 1}
                                ChangeDayType = {ChangeDayType}
                                SelectWorker = {() => SelectWorker(id - 1)}
                                ClearAllDays = {ClearAllDays}
                                />
                        )
                    }}/>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    SelectWorker, 
    ClearAllDays, 
    ChangeDayType
}

const mapStateToProps = ({workers, selectedWorker, selectedDay, filter}) => {
    return {
        workers,
        selectedWorker,
        selectedDay,
        filter,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
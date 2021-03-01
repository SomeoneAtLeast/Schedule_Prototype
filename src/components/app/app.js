import React, {Component} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';

import "./app.scss";

import {days, workers} from "../../models/app-model"

import FilterList from "../filter-list";
import DaysField from "../days-field"
import DaysFieldCommon from "../days-field-common"
import MainNav from "../main-nav"
import SeatsField from "../seats-field"
import Controls from "../controls"
import WorkingShifts from "../working-shifts"

// В процессе рефакторинг personalschedule, в особенности перенос на this.state.workers
// Ограничить количество символов в инпутах
// Добавить обработку ошибок внутри компонентов.
// Создать единый стейт
// MVC (начато)

export default class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            days: days,
            workers: workers,
            filter: "all",
            allActive: true,
            workedActive: false,
            weekendsActive: false,
            vacationActive: false
        };
        
        this.onChangeDayType = this.onChangeDayType.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.onActive = this.onActive.bind(this);
    }

    onChangeDayType(id, objKey) {
        this.setState(({workers}) => {
            console.log(workers)
            const index = workers.findIndex(elem => elem.id === id); 
            const oldWorkerStatus = workers[id];
            const newWorkerStatus = {...oldWorkerStatus}
            console.log(newWorkerStatus)
            newWorkerStatus[objKey] = !oldWorkerStatus[objKey];
            const newWorkers = [...workers.slice(0, index), newWorkerStatus, ...workers.slice(index + 1)];
            if (objKey === "selected") {
                newWorkers.forEach(item => {
                    if (item.id !== (index + 1)) {
                        item[objKey] = false
                        }  
                  });
            } else if (objKey === "worked") {
                newWorkers[index].weekend = false;
                newWorkers[index].vacation = false;
            } else if (objKey === "weekend") {
                newWorkers[index].worked = false;
                newWorkers[index].vacation = false;
            } else if (objKey === "vacation") {
                newWorkers[index].worked = false;
                newWorkers[index].weekend = false;
            }
            console.log(workers)
            return {
                workers: newWorkers
            }
        });
    }
    
    filterDays(days, filter) {
        if(filter === "worked") {
            return days.filter(item => item.worked)
        } else if (filter === "weekends") {
            return days.filter(item => item.weekend) 
        } else if (filter === "vacation") {
            return days.filter(item => item.vacation) 
        } else {
            return days
        }
    }

    onFilterSelect(filter) {
        this.setState({filter})
    }

    onActive (id) {
        if (id === -1) {
            this.setState({
                allActive: true,
                workedActive: false,
                weekendsActive: false,
                vacationActive: false
            })
        } else if (id === -2) {
            this.setState({
                workedActive: true,
                allActive: false,
                weekendsActive: false,
                vacationActive: false
            })
        } else if (id === -3) {
            this.setState({
                weekendsActive: true,
                workedActive: false,
                allActive: false,
                vacationActive: false
            })
        } else if (id === -4) {
            this.setState({
                vacationActive: true,
                workedActive: false,
                allActive: false,
                weekendsActive: false
            })
        }
    }

    render() {
        const {days, workers, filter, allActive, workedActive, weekendsActive, vacationActive} = this.state;
        const workedQuantity = days.filter(item => item.worked).length;
        const weekendsQuantity = days.filter(item => item.weekend).length;
        const vacationQuantity = days.filter(item => item.vacation).length;
        const allDaysQuantity = days.length;

        const visibleDays = this.filterDays(days, filter)

        return (
            <Router>
                <div className = "app">
                    <div className="header">
                        <div className="header__main-nav">
                            <MainNav/>
                        </div>
                        <div className="header__second-nav">
                            <Route path="/personalschedule" exact render={() => {
                                return (
                                    <FilterList
                                        workedQuantity={workedQuantity}
                                        allDaysQuantity={allDaysQuantity}
                                        weekendsQuantity={weekendsQuantity}
                                        vacationQuantity={vacationQuantity}
                                        allActive={allActive}
                                        workedActive={workedActive}
                                        weekendsActive={weekendsActive}
                                        vacationActive={vacationActive}
                                        onFilterSelect={this.onFilterSelect}
                                        onActive={this.onActive}/>
                                )
                            }}/>
                        </div>
                    </div>
                    <div className="main">
                        <Controls/>
                        <Route path="/seats" component={SeatsField}/>
                        <Route path="/workingshifts" component={WorkingShifts}/>
                        <Route path="/" exact render={() => {
                            return (
                                <DaysFieldCommon
                                    days = {days}
                                    workers = {workers}/>
                            )
                        }}/>
                        <Route path="/personalschedule" render={() => {
                            return (
                                <DaysField
                                    days = {visibleDays}
                                    workers = {workers}
                                    onChangeDayType={this.onChangeDayType}/>
                            )
                        }}/>
                    </div>
                </div>
            </Router>
        )
    }
}

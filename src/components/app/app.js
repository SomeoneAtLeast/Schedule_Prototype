import React, {Component} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';

import "./app.scss";

import {workers} from "../../models/app-model"

import FilterList from "../filter-list";
import DaysFieldPresonal from "../days-field-porsonal"
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
            workers: workers,
            selectedWorker: 0,
            filter: "all",
            allActive: true,
            workedActive: false,
            weekendsActive: false,
            vacationActive: false
        };
        
        this.onChangeDayType = this.onChangeDayType.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.onActive = this.onActive.bind(this);
        this.onSelectWorker = this.onSelectWorker.bind(this);
    }

    onChangeDayType(workerId, dayId, objKey) {
        this.setState(({workers}) => {

            const workerIndex = workers.findIndex(elem => elem.id === workerId);
            const dayIndex = workers[workerIndex].days.findIndex(elem => elem.id === dayId); 
            const oldDayStatus = workers[workerIndex].days[dayIndex];
            const newDayStatus = {...oldDayStatus}
            newDayStatus[objKey] = !oldDayStatus[objKey];
            const newDays = [...workers[workerIndex].days.slice(0, dayIndex), newDayStatus, ...workers[workerIndex].days.slice(dayIndex + 1)];
            const newWorker = {...workers[workerIndex], days: newDays}
            const newWorkers = [...workers.slice(0, workerIndex), newWorker, ...workers.slice(workerIndex + 1)];

            if (objKey === "selected") {
                newWorkers[workerIndex].days.forEach(item => {
                    if (item.id !== (dayIndex + 1)) {
                        item[objKey] = false
                        }  
                  });
            } else if (objKey === "worked") {
                newWorkers[workerIndex].days[dayIndex].weekend = false;
                newWorkers[workerIndex].days[dayIndex].vacation = false;
            } else if (objKey === "weekend") {
                newWorkers[workerIndex].days[dayIndex].worked = false;
                newWorkers[workerIndex].days[dayIndex].vacation = false;
            } else if (objKey === "vacation") {
                newWorkers[workerIndex].days[dayIndex].worked = false;
                newWorkers[workerIndex].days[dayIndex].weekend = false;
            }

            return {
                workers: newWorkers
            }
        });
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

    filterWorker(workers, selectedWorker, filter) {
        if(filter === "worked") {
            const workedDays = workers.filter(item => item.worked);
            const newWorker = {...this.state.workers[selectedWorker], days: workedDays}
            const newWorkers = [...this.state.workers.slice(0, selectedWorker), newWorker, ...this.state.workers.slice(selectedWorker + 1)];
            return  newWorkers
        } else if (filter === "weekends") {
            const weekendDays = workers.filter(item => item.weekend);
            const newWorker = {...this.state.workers[selectedWorker], days: weekendDays}
            const newWorkers = [...this.state.workers.slice(0, selectedWorker), newWorker, ...this.state.workers.slice(selectedWorker + 1)];
            return  newWorkers
        } else if (filter === "vacation") {
            const vacationDays = workers.filter(item => item.vacation);
            const newWorker = {...this.state.workers[selectedWorker], days: vacationDays}
            const newWorkers = [...this.state.workers.slice(0, selectedWorker), newWorker, ...this.state.workers.slice(selectedWorker + 1)];
            return  newWorkers
        } else {
            return  this.state.workers
        }
    }

    onFilterSelect(filter) {
        this.setState({
            filter,
            allActive: true,
            workedActive: false,
            weekendsActive: false,
            vacationActive: false
        })
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

    onSelectWorker(id) {
        this.setState({
            selectedWorker: id
        })
    }

    render() {
        const {workers, filter, selectedWorker, allActive, workedActive, weekendsActive, vacationActive} = this.state;
        const workedQuantity = workers[selectedWorker].days.filter(item => item.worked).length;
        const weekendsQuantity = workers[selectedWorker].days.filter(item => item.weekend).length;
        const vacationQuantity = workers[selectedWorker].days.filter(item => item.vacation).length;
        const allDaysQuantity = workers[selectedWorker].days.length;
        const visibleDays = this.filterDays(workers[selectedWorker].days, filter)
        const visibleWorkers = this.filterWorker(workers[selectedWorker].days, selectedWorker, filter)

        return (
            <Router>
                <div className = "app">
                    <div className="header">
                        <div className="header__main-nav">
                            <Route path="/" component={MainNav}/>
                        </div>
                        <div className="header__second-nav">
                            <Route path="/personalschedule/:id" exact render={() => {
                                return (
                                    <FilterList
                                        workedQuantity = {workedQuantity}
                                        allDaysQuantity = {allDaysQuantity}
                                        weekendsQuantity = {weekendsQuantity}
                                        vacationQuantity = {vacationQuantity}
                                        allActive = {allActive}
                                        workedActive = {workedActive}
                                        weekendsActive = {weekendsActive}
                                        vacationActive = {vacationActive}
                                        onFilterSelect = {this.onFilterSelect}
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
                                    workers = {workers}
                                    onSelectWorker = {this.onSelectWorker} />
                            )
                        }}/>
                        <Route path="/personalschedule/:id" render={({match}) => {
                            const {id} = match.params;
                            return (
                                <DaysFieldPresonal
                                    days = {visibleDays}
                                    workers = {visibleWorkers}
                                    selectedWorker = {id - 1}
                                    onChangeDayType = {this.onChangeDayType}
                                    onSelectWorker = {() => this.onSelectWorker(id - 1)}/>
                            )
                        }}/>
                    </div>
                </div>
            </Router>
        )
    }
}

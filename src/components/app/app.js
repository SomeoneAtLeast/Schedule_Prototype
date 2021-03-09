import React, {Component} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';

import "./app.scss";

import {workers} from "../../models/app-model"

import FilterList from "../filter-list";
import DaysFieldPresonal from "../days-field-porsonal"
import DaysFieldCommon from "../days-field-common"
import MainNav from "../main-nav"
import SeatsField from "../seats-field"
import DaysFieldCommonControls from "../days-field-common-controls"
import WorkingShifts from "../working-shifts"

// В процессе рефакторинг personalschedule, в особенности перенос на this.state.workers
// Ограничить количество символов в инпутах
// Добавить обработку ошибок внутри компонентов.
// Создать единый стейт
// MVC (начато)
// пофиксить ошибку при попытки назначить день не выбрав его

export default class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            workers: workers,
            selectedWorker: 0,
            selectedDay: 0,
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
        this.onSelectDay = this.onSelectDay.bind(this);
        this.onClearAllDays = this.onClearAllDays.bind(this);
    }

    onChangeDayType(workerId, dayId, objKey, scheduleType = "common") {
        console.log(workerId, dayId, objKey, scheduleType)
        this.setState(({workers}) => {
            const workerIndex = workers.findIndex(elem => elem.id === workerId);
            const dayIndex = workers[workerIndex].days.findIndex(elem => elem.id === dayId); 
            const oldDayStatus = workers[workerIndex].days[dayIndex];
            const newDayStatus = {...oldDayStatus}
            newDayStatus[objKey] = !oldDayStatus[objKey];
            const newDays = [...workers[workerIndex].days.slice(0, dayIndex), newDayStatus, ...workers[workerIndex].days.slice(dayIndex + 1)];
            const newWorker = {...workers[workerIndex], days: newDays}
            const newWorkers = [...workers.slice(0, workerIndex), newWorker, ...workers.slice(workerIndex + 1)];

            if (objKey === "worked") {
                newWorkers[workerIndex].days[dayIndex].weekend = false;
                newWorkers[workerIndex].days[dayIndex].vacation = false;
            } else if (objKey === "weekend") {
                newWorkers[workerIndex].days[dayIndex].worked = false;
                newWorkers[workerIndex].days[dayIndex].vacation = false;
            } else if (objKey === "vacation") {
                newWorkers[workerIndex].days[dayIndex].worked = false;
                newWorkers[workerIndex].days[dayIndex].weekend = false;
            }

            if (scheduleType === "common") {
                if (objKey === "worked") {
                    newWorkers.forEach((item) => {
                        item.days.forEach((item) => {
                            if (item.selected) {
                                item.worked = true;
                                item.weekend = false;
                                item.vacation = false;
                                item.selected = false;
                            }
                        })
                    })
                } else if (objKey === "weekend") {
                    newWorkers.forEach((item) => {
                        item.days.forEach((item) => {
                            if (item.selected) {
                                item.weekend = true
                                item.worked = false;
                                item.vacation = false;
                                item.selected = false;
                            }
                        })
                    })
                } else if (objKey === "vacation") {
                    newWorkers.forEach((item) => {
                        item.days.forEach((item) => {
                            if (item.selected) {
                                item.vacation = true
                                item.worked = false;
                                item.weekend = false;
                                item.selected = false;
                            }
                        })
                    })
                } else if (objKey === "clear") {
                    newWorkers.forEach((item) => {
                        item.days.forEach((item) => {
                            if (item.selected) {
                                item.vacation = false
                                item.worked = false;
                                item.weekend = false;
                                item.selected = false;
                            }
                        })
                    })
                }
            }

            if (scheduleType === "personal") {
                if (objKey === "selected") {
                    newWorkers[workerIndex].days.forEach(item => {
                        if (item.id !== (dayIndex + 1)) {
                            item[objKey] = false
                        }  
                      });
                }
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

    onSelectDay(selectedWorker, selectedDay) {
        console.log(selectedWorker, selectedDay)
        this.setState({
            selectedWorker: selectedWorker,
            selectedDay: selectedDay,
        })

        this.onChangeDayType(selectedWorker, selectedDay, "selected")
    }

    onClearAllDays() {
        this.setState(({workers}) => {
            const newWorkers = [...workers]
            newWorkers.forEach((item) => {
                item.days.forEach((item) => {
                    item.selected = false
                })
            })

            return {
                workers: newWorkers
            }
        });
    }

    render() {
        const {workers, filter, selectedWorker, selectedDay, allActive, workedActive, weekendsActive, vacationActive} = this.state;
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
                        <div className="controls">
                            <Route path="/" exact render={() => {
                                    return (
                                        <DaysFieldCommonControls
                                            onChangeDayType = {this.onChangeDayType}
                                            onClearAllDays = {this.onClearAllDays}
                                            selectedWorker = {selectedWorker}
                                            selectedDay = {selectedDay}/>
                                    )
                                }}/>
                        </div>
                        <Route path="/seats" component={SeatsField}/>
                        <Route path="/workingshifts" component={WorkingShifts}/>
                        <Route path="/" exact render={() => {
                            return (
                                <DaysFieldCommon
                                    workers = {workers}
                                    onSelectWorker = {this.onSelectWorker}
                                    onSelectDay={this.onSelectDay}/>
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
                                    onSelectWorker = {() => this.onSelectWorker(id - 1)}
                                    onClearAllDays = {this.onClearAllDays}/>
                            )
                        }}/>
                    </div>
                </div>
            </Router>
        )
    }
}

import React, {Component} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "./app.scss";

import FilterList from "../filter-list";
import DaysField from "../days-field"
import MainNav from "../main-nav"
import ArrangementsField from "../arrangements-field"
import Controls from "../controls"
import WorkingShifts from "../working-shifts"

// Добавить обработку ошибок внутри компонентов. 

const totalDays = 30;
let emptyDays = [];
const dayNames7 = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
const dayNames30 = [
    ...dayNames7, ...dayNames7, ...dayNames7, ...dayNames7, dayNames7[0], dayNames7[1]
    ];

for (let i = 1; i <= totalDays; i++) {
    emptyDays.push(
        {
            dayNumber: i,
            dayName: dayNames30[i - 1],
            id: i,
            selected: false,
            worked: false,
            weekend: false,
            vacation: false
        }
    )
}

const days = emptyDays;

export default class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            days: days,
            filter: "all",
            allActive: true,
            workedActive: false,
            weekendsActive: false,
            vacationActive: false
        };
        
        this.onMakeDaySelected = this.onMakeDaySelected.bind(this);
        this.onMakeDayWorking = this.onMakeDayWorking.bind(this);
        this.onMakeDayWeekend = this.onMakeDayWeekend.bind(this);
        this.onMakeDayVacation = this.onMakeDayVacation.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.onActive = this.onActive.bind(this);
    }

    onMakeDaySelected(id) {
        this.setState(({days}) => {
            const index = days.findIndex(elem => elem.id === id); 
            const oldDay = days[index];
            const newDay = {...oldDay, selected: !oldDay.selected}
            const newDays = [...days.slice(0, index), newDay, ...days.slice(index + 1)];
            newDays.forEach(item => {
                if (item.id !== (index + 1)) {
                    item.selected = false
                    }  
              });

            return {
                days: newDays
            }
        });
    }

    onMakeDayWorking(id) {
        this.setState(({days}) => {
            const index = days.findIndex(elem => elem.id === id); 
            const oldDay = days[index];
            const newDay = {...oldDay, worked: !oldDay.worked}
            const newDays = [...days.slice(0, index), newDay, ...days.slice(index + 1)];
            newDays[index].weekend = false;
            newDays[index].vacation = false;

            return {
                days: newDays
            }
        });
    }

    onMakeDayWeekend(id) {
        this.setState(({days}) => {
            const index = days.findIndex(elem => elem.id === id); 
            const oldDay = days[index];
            const newDay = {...oldDay, weekend: !oldDay.weekend}
            const newDays = [...days.slice(0, index), newDay, ...days.slice(index + 1)];
            newDays[index].worked = false;
            newDays[index].vacation = false;

            return {
                days: newDays
            }
        });
    }

    onMakeDayVacation(id) {
        this.setState(({days}) => {
            const index = days.findIndex(elem => elem.id === id); 
            const oldDay = days[index];
            const newDay = {...oldDay, vacation: !oldDay.vacation}
            const newDays = [...days.slice(0, index), newDay, ...days.slice(index + 1)];
            newDays[index].worked = false;
            newDays[index].weekend = false;

            return {
                days: newDays
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
        const {days, filter, allActive, workedActive, weekendsActive, vacationActive} = this.state;
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
                            <Route path="/" exact render={() => {
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
                        <Route path="/arrangements" component={ArrangementsField}/>
                        <Route path="/workingshifts" component={WorkingShifts}/>
                        <Route path="/" exact render={() => {
                            return (
                                <DaysField
                                    daysArr = {visibleDays}
                                    onMakeDaySelected={this.onMakeDaySelected}
                                    onMakeDayWorking={this.onMakeDayWorking}
                                    onMakeDayWeekend={this.onMakeDayWeekend}
                                    onMakeDayVacation={this.onMakeDayVacation}/>
                            )
                        }}/>
                    </div>
                </div>
            </Router>
        )
    }
}
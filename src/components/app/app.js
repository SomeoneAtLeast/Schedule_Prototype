import React, {Component} from "react";

import "./app.scss";

import FilterList from "../filter-list";
import DaysField from "../days-field"

const totalDays = 30;
const emptyDays = [];

for (let i = 1; i <= totalDays; i++) {
    emptyDays.push(
        {
            dayNumber: i,
            id: i,
            worked: false
        }
    )
}

const days = emptyDays;

export default class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            allDays: days,
            workingDays: [],
            weekends: [],
            days: days
        };

        this.onMakeDayWorking = this.onMakeDayWorking.bind(this);
        this.showWorkingdays = this.showWorkingdays.bind(this);
        this.showWeekends = this.showWeekends.bind(this);
        this.showAllDays = this.showAllDays.bind(this);
        this.sort = this.sort.bind(this);
    }

    onMakeDayWorking(id) {
        this.setState(({days, workingDays}) => {
            const index = days.findIndex(elem => elem.id === id); 
            const oldDay = days[index];
            const newDay = {...oldDay, worked: !oldDay.worked}
            const newDays = [...days.slice(0, index), newDay, ...days.slice(index + 1)];
            workingDays = newDays;
            return {
                days: workingDays
            }
        });
    }

    showWorkingdays() {
        this.setState(({days, workingDays}) => {
           const workedDays = days.filter((day) => {
               return day.worked == true;
           });

           workingDays = workedDays;

           return {
            days: workingDays
        }
        });
    }

    showWeekends() {
        this.setState(({days, weekends}) => {
           const weekendsDays = days.filter((day) => {
               return day.worked == false;
           });

           weekends = weekendsDays;
           return {
            days: weekends
        }
        });
    }

    showAllDays() {
        this.setState(({allDays, workingDays, weekends}) => {
            allDays = [...workingDays, ...weekends];
           return {
            days: allDays
        }
        });
    }

    sort(id) {
        if (id == -1) {
            this.showAllDays()
        } else if (id == -2) {
            this.showWorkingdays();
        } else if (id == -3) {
            this.showWeekends()
        }
    }

    render() {
        const {days} = this.state;
        const workedQuantity = days.filter(item => item.worked).length;
        const weekendsQuantity = days.filter(item => !item.worked).length;
        const allDaysQuantity = days.length;

        return (
            <div className = "app">
                <FilterList
                workedQuantity={workedQuantity}
                allDaysQuantity={allDaysQuantity}
                weekendsQuantity={weekendsQuantity}
                onSort={this.sort}/>
                <DaysField
                daysArr = {this.state.days}
                onMakeDayWorking={this.onMakeDayWorking}/>
            </div>
        )
    }
}
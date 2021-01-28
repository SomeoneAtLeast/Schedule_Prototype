import React, {Component} from "react";

import "./app.scss";

import FilterList from "../filter-list";
import DaysField from "../days-field"

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
            filter: "all"
        };

        this.onMakeDaySelected = this.onMakeDaySelected.bind(this);
        this.onMakeDayWorking = this.onMakeDayWorking.bind(this);
        this.onMakeDayWeekend = this.onMakeDayWeekend.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
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
        } else {
            return days
        }
    }

    onFilterSelect(filter) {
        this.setState({filter})
    }

    render() {
        const {days, filter} = this.state;
        const workedQuantity = days.filter(item => item.worked).length;
        const weekendsQuantity = days.filter(item => item.weekend).length;
        const allDaysQuantity = days.length;

        const visibleDays = this.filterDays(days, filter)

        return (
            <div className = "app">
                <FilterList
                workedQuantity={workedQuantity}
                allDaysQuantity={allDaysQuantity}
                weekendsQuantity={weekendsQuantity}
                onFilterSelect={this.onFilterSelect}/>
                <DaysField
                daysArr = {visibleDays}
                onMakeDaySelected={this.onMakeDaySelected}
                onMakeDayWorking={this.onMakeDayWorking}
                onMakeDayWeekend={this.onMakeDayWeekend}/>
            </div>
        )
    }
}
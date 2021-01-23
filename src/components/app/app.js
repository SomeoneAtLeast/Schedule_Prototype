import React, {Component} from "react";

import "./app.scss";

import FilterList from "../filter-list";
import DaysField from "../days-field"

const totalDays = 30;
let emptyDays = [];
const dayNames7 = ["пн", "вт", "ср", "чет", "пт", "сб", "вс"];
const dayNames30 = [
    ...dayNames7, ...dayNames7, ...dayNames7, ...dayNames7, dayNames7[0], dayNames7[1]
    ];

for (let i = 1; i <= totalDays; i++) {
    emptyDays.push(
        {
            dayNumber: i,
            dayName: dayNames30[i - 1],
            id: i,
            unassigned: true,
            worked: false,
            weekend: false
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

        this.onMakeDayWorking = this.onMakeDayWorking.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
    }

    onMakeDayWorking(id) {
        this.setState(({days}) => {
            const index = days.findIndex(elem => elem.id === id); 
            const oldDay = days[index];
            const newDay = {...oldDay, worked: !oldDay.worked}
            const newDays = [...days.slice(0, index), newDay, ...days.slice(index + 1)];
            return {
                days: newDays
            }
        });
    }

    filterDays(days, filter) {
        if(filter === "worked") {
            return days.filter(item => item.worked)
        } else if (filter === "weekends") {
            return days.filter(item => !item.worked) 
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
        const weekendsQuantity = days.filter(item => !item.worked).length;
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
                onMakeDayWorking={this.onMakeDayWorking}/>
            </div>
        )
    }
}
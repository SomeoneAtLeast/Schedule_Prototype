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
            working: true
        }
    )
}

const days = emptyDays;

export default class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            days : days
        };

        this.showWorkingdays = this.showWorkingdays.bind(this);
        this.sort = this.sort.bind(this);
    }
    
    // Эта функция работает на всех трех кнопках
    showWorkingdays() {
        this.setState(({days}) => {
           const workingDays = days.filter((day) => {
               return day.working == false;
           });

           return {
            days: workingDays
        }
        })
    }

    sort(btnText) {
        console.log(btnText);
        this.showWorkingdays();
    }

    render() {
        return (
            <div className = "app">
                <FilterList onSort={this.sort}/>
                <DaysField daysArr = {this.state.days}/>
            </div>
        )
    }
}
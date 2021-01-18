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
            working: false
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

        this.changeState = this.changeState.bind(this);
        this.showWorkingdays = this.showWorkingdays.bind(this);
        this.sort = this.sort.bind(this);
    }

    changeState(id) {
        console.log(id);
        this.setState(({days}) => {
            const indexObj = days.findIndex(elem => elem.id === id); 
            const Obj = days.find(elem => elem.id === id); 
            Obj.working = true;
            const newDays = days.slice();

            newDays.splice(indexObj, 1, Obj);


            return {
                days: newDays
            }
        });
    }

    showWorkingdays() {
        this.setState(({days}) => {
           const workingDays = days.filter((day) => {
               return day.working == true;
           });

           return {
            days: workingDays
        }
        });

        console.log("Показываю рабочие")
    }


    sort(id) {
        console.log(id);

        if (id == -1) {
            return
        } else if (id == -2) {
            this.showWorkingdays();
        } else {
            return
        }
    }

    render() {
        return (
            <div className = "app">
                <FilterList onSort={this.sort}/>
                <DaysField
                daysArr = {this.state.days}
                changeState={this.changeState}/>
            </div>
        )
    }
}
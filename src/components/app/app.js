import React from "react";

import "./app.css";

import FilterList from "../app-filter-list";
import DaysField from "../days-field"

const App = () => {

    const totalDays = 30;
    const days = [];

    for (let i = 1; i <= totalDays; i++) {
        days.push(
            {
                dayNumber: i,
                id: i,
            }
        )
    }

    return (
    <div className = "app">
        <FilterList/>
        <DaysField daysArr = {days}/>
    </div>
    )
}

export default App;
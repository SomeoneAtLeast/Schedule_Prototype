import React from "react";

import "./app-filter-list.css"

import Filter from "../app-filter";

const FilterList = () => {
    return (
    <ul className = "filter-list">
        <Filter btnText={"Все дни"}/>
        <Filter btnText={"Рабочие"}/>
        <Filter btnText={"Выходные"}/>
    </ul>
    )
}

export default FilterList;
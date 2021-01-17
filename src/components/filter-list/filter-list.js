import React from "react";

import "./filter-list.scss"

import Filter from "../filter";

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
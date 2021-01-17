import React from "react";

import "./filter-list.scss"

import Filter from "../filter";

// eslint-disable-next-line react/prop-types
const FilterList = ({onSort}) => {

    const buttons = [
        {label: "Все дни", id: -1},
        {label: "Рабочие", id: -2},
        {label: "Выходные", id: -3},
    ]

    return (
    <ul className = "filter-list">
        <Filter
            btnText={buttons[0].label}
            onSort = {() => onSort(buttons[0].label)}
            id = {buttons[0].id}
            />
        <Filter
            btnText={buttons[1].label}
            onSort = {() => onSort(buttons[1].label)}
            id = {buttons[1].id}
            />
        <Filter
            btnText={buttons[2].label}
            onSort = {() => onSort(buttons[2].label)}
            id = {buttons[2].id}
            />
    </ul>
    )
}

export default FilterList;
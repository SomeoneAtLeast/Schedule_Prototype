import React from "react";

import "./filter-list.scss"

import Filter from "../filter";

// eslint-disable-next-line react/prop-types
const FilterList = ({onSort, workedQuantity, allDaysQuantity, weekendsQuantity}) => {

    const buttons = [
        {label: "Все дни", id: -1, quantity: `(${allDaysQuantity})`},
        {label: "Рабочие", id: -2, quantity: `(${workedQuantity})`},
        {label: "Выходные", id: -3, quantity: `(${weekendsQuantity})`},
    ]
    return (
    <ul className = "filter-list">
        <Filter
            btnText={buttons[0].label}
            btnQuantity={buttons[0].quantity}
            onSort = {() => onSort(buttons[0].id)}
            id = {buttons[0].id}
            />
        <Filter
            btnText={buttons[1].label}
            btnQuantity={buttons[1].quantity}
            onSort = {() => onSort(buttons[1].id)}
            id = {buttons[1].id}
            />
        <Filter
            btnText={buttons[2].label}
            btnQuantity={buttons[2].quantity}
            onSort = {() => onSort(buttons[2].id)}
            id = {buttons[2].id}
            />
    </ul>
    )
}

export default FilterList;
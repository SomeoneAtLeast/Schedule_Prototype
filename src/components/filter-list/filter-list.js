import React from "react";

import "./filter-list.scss"

import Filter from "../filter";

// eslint-disable-next-line react/prop-types
const FilterList = ({workedQuantity, allDaysQuantity, weekendsQuantity, onFilterSelect}) => {

    const buttons = [
        {name: "all",  label: "Все дни", id: -1, quantity: `(${allDaysQuantity})`},
        {name: "worked",  label: "Рабочие", id: -2, quantity: `(${workedQuantity})`},
        {name: "weekends",  label: "Выходные", id: -3, quantity: `(${weekendsQuantity})`},
    ]
    return (
    <ul className = "filter-list">
        <Filter
            btnText={buttons[0].label}
            btnQuantity={buttons[0].quantity}
            id = {buttons[0].id}
            onFilterSelect={() => onFilterSelect(buttons[0].name)}
            />
        <Filter
            btnText={buttons[1].label}
            btnQuantity={buttons[1].quantity}
            id = {buttons[1].id}
            onFilterSelect={() => onFilterSelect(buttons[1].name)}
            />
        <Filter
            btnText={buttons[2].label}
            btnQuantity={buttons[2].quantity}
            id = {buttons[2].id}
            onFilterSelect={() => onFilterSelect(buttons[2].name)}
            />
    </ul>
    )
}

export default FilterList;
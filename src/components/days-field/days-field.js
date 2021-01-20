import React from "react";

import "./days-field.scss"

import DaysFieldItem from "../days-field-item";

// eslint-disable-next-line react/prop-types
const DaysField = ({daysArr, onMakeDayWorking}) => {

    // eslint-disable-next-line react/prop-types
    const daysFieldElements = daysArr.map((item) => {
        const {id, ...itemProps} = item;

        return (
            <article
            className="days-field__item"
            key = {id}>
                <DaysFieldItem
                {...itemProps}
                onMakeDayWorking={() => onMakeDayWorking(id)}/>
            </article>
        )
    })


    return (
    <div className = "days-field">
        {daysFieldElements}
    </div>
    )
}

export default DaysField;
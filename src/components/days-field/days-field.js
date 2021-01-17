import React from "react";

import "./days-field.scss"

import DaysFieldItem from "../app-days-field-item";

// eslint-disable-next-line react/prop-types
const DaysField = ({daysArr}) => {

    // eslint-disable-next-line react/prop-types
    const daysFieldElements = daysArr.map((item) => {
        const {id, ...itemProps} = item;

        return (
            <article
            className="days-field__item"
            key = {id}>
                <DaysFieldItem {...itemProps}/>
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
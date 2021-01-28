import React from "react";

import "./days-field.scss"

import DaysFieldItem from "../days-field-item";

// eslint-disable-next-line react/prop-types
const DaysField = ({daysArr, onMakeDaySelected, onMakeDayWorking, onMakeDayWeekend}) => {

    // eslint-disable-next-line react/prop-types
    const daysFieldElements = daysArr.map((item) => {
        const {id, ...itemProps} = item;
        const {weekend, worked, selected} = item;
        let classNames = "days-field__item";

        if(selected) {
            classNames += " selected";
        }

        if(worked) {
            classNames += " worked";
        }
        
        if(weekend) {
            classNames += " weekend";
        }

        return (
            <article
            className={classNames}
            key = {id}
            onClick={() => onMakeDaySelected(id)}>
                <DaysFieldItem
                {...itemProps}
                onMakeDayWorking={() => onMakeDayWorking(id)}
                onMakeDayWeekend={() => onMakeDayWeekend(id)}/>
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
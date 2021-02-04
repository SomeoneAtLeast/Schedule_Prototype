/* eslint-disable react/prop-types */
import React from "react";

import "./days-field.scss"

import DaysFieldItem from "../days-field-item";


const DaysField = ({daysArr, onMakeDaySelected, onMakeDayWorking, onMakeDayWeekend, onMakeDayVacation}) => {

    const daysFieldElements = daysArr.map((item) => {
        const {id, ...itemProps} = item;
        const {weekend, worked, vacation, selected} = item;
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

        if(vacation) {
            classNames += " vacation";
        }

        return (
            <article
            className={classNames}
            key = {id}
            onClick={() => onMakeDaySelected(id)}>
                <DaysFieldItem
                {...itemProps}
                onMakeDayWorking={() => onMakeDayWorking(id)}
                onMakeDayWeekend={() => onMakeDayWeekend(id)}
                onMakeDayVacation={() => onMakeDayVacation(id)}/>
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
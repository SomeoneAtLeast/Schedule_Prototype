import React from "react";
import PropTypes from 'prop-types';

import "./days-field.scss"

import DaysFieldItem from "../days-field-item";


const DaysField = ({daysArr, onChangeDayType}) => {

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
            onClick={() => onChangeDayType(id, "selected")}>
                <DaysFieldItem
                {...itemProps}
                onMakeDayWorking={() => onChangeDayType(id, "worked")}
                onMakeDayWeekend={() => onChangeDayType(id, "weekend")}
                onMakeDayVacation={() => onChangeDayType(id, "vacation")}/>
            </article>
        )
    })

    return (
    <div className = "days-field">
        {daysFieldElements}
    </div>
    )
}

DaysField.propTypes = {
    daysArr: PropTypes.array,
    onChangeDayType: PropTypes.func,
}

export default DaysField;

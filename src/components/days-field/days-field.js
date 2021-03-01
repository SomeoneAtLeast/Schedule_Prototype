/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from 'prop-types';

import "./days-field.scss"

import DaysFieldItem from "../days-field-item";


const DaysField = ({days, workers, onChangeDayType}) => {

    
    const daysNumbers = days.map((item) => {

        return (
            <th className = "days-field-common-item" 
                key={item.id}>
                {item.id} {item.dayName}
            </th>
        )
    })

    const getWorkerPresonalDays = (workerNumber) => {
        let daysInMonth = [];

        daysInMonth.push(
            <td className = "days-field-common-item" 
                key={workerNumber}>
                {workers[workerNumber].name}
            </td>
        )

        let classNames = "days-field__item";

        const {weekend, worked, vacation, selected} = workers[workerNumber].days[0];

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

        for (let i = 1; i <= days.length; i++) {
            daysInMonth.push(
                <td className = {classNames} 
                    key={i}
                    onClick={() => onChangeDayType(i, "selected")}>
                        <DaysFieldItem
                            workingHours={workers[workerNumber].days[workerNumber].workingHours}
                            onMakeDayWorking={() => onChangeDayType(i, "worked")}
                            onMakeDayWeekend={() => onChangeDayType(i, "weekend")}
                            onMakeDayVacation={() => onChangeDayType(i, "vacation")}/>
                </td>
            )
        }

        return (
            daysInMonth
        )
    }

    // const daysFieldElements = workers[0].map((item) => {
    //     const {id, ...itemProps} = item;
    //     const {weekend, worked, vacation, selected} = item;
    //     let classNames = "days-field__item";

    //     if(selected) {
    //         classNames += " selected";
    //     }

    //     if(worked) {
    //         classNames += " worked";
    //     }
        
    //     if(weekend) {
    //         classNames += " weekend";
    //     }

    //     if(vacation) {
    //         classNames += " vacation";
    //     }

    //     return (
    //         <td
    //         className={classNames}
    //         key = {id}
    //         onClick={() => onChangeDayType(id, "selected")}>
    //             <DaysFieldItem
    //             {...itemProps}
    //             onMakeDayWorking={() => onChangeDayType(id, "worked")}
    //             onMakeDayWeekend={() => onChangeDayType(id, "weekend")}
    //             onMakeDayVacation={() => onChangeDayType(id, "vacation")}/>
    //         </td>
    //     )
    // })

    return (
        <table className = "days-field-common">
        <tr className = "days-field-common-items-row">
            <th className = "days-field-common-item">
            </th>
            {daysNumbers}
        </tr>
        <tr className = "days-field-common-items-row">
            {getWorkerPresonalDays(0)}
        </tr>
    </table>
    // <div className = "days-field">
    //     {daysFieldElements}
    // </div>
    )
}

DaysField.propTypes = {
    onChangeDayType: PropTypes.func,
}

export default DaysField;

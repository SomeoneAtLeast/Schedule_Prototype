import React from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from "react-redux"
import {SelectWorker, ChangeDayType, ChangeMonth, SelectDay, ChangeScheduleText} from "../../store/actions"
import "./days-field-common.scss"

const DaysFieldCommon = ({workers, currentMonth, SelectWorker, SelectDay, ChangeDayType, ChangeScheduleText, ChangeMonth}) => {

    const getWorkerElement = (workerNumber) => {
        const targetWorker = workers[workerNumber];
        let daysInMonth = [];

        daysInMonth.push(
            <td className = "days-field-common-item" 
                key={workerNumber}
                onClick={() => SelectWorker(workerNumber)}>
                    <Link to={`/personalschedule/${workerNumber + 1}`} className = "days-field-common-item-link">
                        {targetWorker.name}
                    </Link>
            </td>
        )
        
        for (let i = 1; i <= workers[0].months[currentMonth - 1].days.length; i++) {
            let classNames = "days-field-common-item";
            const targetDay = targetWorker.months[currentMonth - 1].days[i - 1];

            if (targetDay.selected) {
                classNames += " selected";
            }

            if (targetDay.worked) {
                classNames += ` worked-${targetDay.workingShiftDay}`;
            }

            if (targetDay.weekend) {
                classNames += " weekend";
            }

            if (targetDay.vacation) {
                classNames += " vacation";
            }

            const SelectDayAndChangeDayType = () => {
                SelectDay(targetWorker.id, targetDay.id);
                ChangeDayType(targetWorker.id, targetDay.id, "selected")
            }

            daysInMonth.push(
                <td className = {classNames}
                    key={i + 1000}
                    onClick={() => SelectDayAndChangeDayType()}>
                        <div className="days-field-common-item-input-wrapper">
                            <input 
                                className="days-field-common-item-input"
                                type="text"
                                maxLength={2}
                                value={targetDay.workingHours}
                                onChange={(e) => ChangeScheduleText(targetWorker.id, targetDay.id, "workingHours", e)}
                            />
                        </div>
                </td>
            )
        }

        return (
            daysInMonth
        )
    }

    const getWorkersElements = () => {
        let i = 0;

        const WorkersElements = workers.map((worker) => {
            i++
            return (
                <tr 
                    className = "days-field-common-items-row"
                    key={worker.name}>
                    {getWorkerElement(i - 1)}
                </tr>
            )
        });

        return (
            WorkersElements
        )
    }



    return (
        <div className="days-field-common-wrapper">
            <div className = "days-field-common-years">
                        2021
            </div>
            <table className = "days-field-common">
                <tbody>
                    <tr className = "days-field-common-items-row">
                        <th className = "days-field-common-days-item">
                            <div className = "days-field-common-days-item-btn-group">
                                <button
                                    className = "days-field-common-days-item-btn days-field-common-days-item-btn-left"
                                    onClick={() => ChangeMonth("back")}>
                                    ←
                                </button>
                                <div className = "days-field-common-days-item-month">
                                    {workers[0].months[currentMonth - 1].name}
                                </div>
                                <button
                                    className = "days-field-common-days-item-btn days-field-common-days-item-btn-right"
                                    onClick={() => ChangeMonth("next")}>
                                    →
                                </button>
                            </div>
                        </th>
                            {
                                workers[0].months[currentMonth - 1].days.map((item) => {
                                    return (
                                        <th className = "days-field-common-days-item" 
                                            key={item.id}>
                                            <div>
                                                {item.id}
                                            </div>
                                            <div>
                                                {item.dayName}
                                            </div>
                                        </th>
                                    )
                                })
                            }
                    </tr>
                    {getWorkersElements()}
                </tbody>
            </table>
        </div>
    )
}

DaysFieldCommon.propTypes = {
    workers: PropTypes.array,
    SelectWorker: PropTypes.func,
    SelectDay: PropTypes.func,
    ChangeDayType: PropTypes.func,
    ChangeScheduleText: PropTypes.func
}

const mapDispatchToProps = {
    SelectWorker, 
    ChangeDayType,
    SelectDay,
    ChangeScheduleText,
    ChangeMonth
}

const mapStateToProps = ({workers, currentMonth}) => {
    return {
        workers,
        currentMonth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysFieldCommon);
import React, {useEffect, useState, useCallback} from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from "react-redux"
import {SelectWorker, ChangeDayType, ChangeMonth, ChangeYear, SelectDay, ChangeScheduleText, ClearAllDays, WorkersLoaded} from "../../store/actions"
import {useHttp} from "../../hooks/http.hook"
import DualBall from "../dual-ball";

import "./days-field-common.scss"

const DaysFieldCommon = ({workers, currentYear, currentMonth, SelectWorker, SelectDay, ChangeDayType, ChangeScheduleText, ChangeMonth, ChangeYear, ClearAllDays, WorkersLoaded}) => {

    const [loading, setLoading] = useState(true);

    const {request} = useHttp();

    const getWorkers = useCallback(async () => {
        try {
            const data = await request("/api/workers/workers", "GET", null, {year: currentYear});
            console.log(data)
            WorkersLoaded(data);
            setLoading(false)
        } catch (e) {}
    }, [request, WorkersLoaded, currentYear]);

    useEffect(() => {
        getWorkers();
    }, [getWorkers]);

    useEffect(() => {
        ClearAllDays();
    }, [currentMonth, currentYear, ClearAllDays]);

    const getWorkerElement = (workerNumber) => {
        const targetWorker = workers[workerNumber];
        let daysInMonth = [];

        daysInMonth.push(
            <td className = "days-field-common__item" 
                key={workerNumber}
                onClick={() => SelectWorker(workerNumber)}>
                    <Link to={`/personalschedule/${workerNumber + 1}`} className = "days-field-common__item-link">
                        {targetWorker.name}
                    </Link>
            </td>
        )
        
        for (let i = 1; i <= workers[0].years[0].months[currentMonth - 1].days.length; i++) {
            let classNames = "days-field-common__item";
            const targetDay = targetWorker.years[0].months[currentMonth - 1].days[i - 1];

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
                        <div className="days-field-common__item-input-wrapper">
                            <input 
                                className="days-field-common__item-input"
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
                    className = "days-field-common__items-row"
                    key={worker.name}>
                    {getWorkerElement(i - 1)}
                </tr>
            )
        });

        return (
            WorkersElements
        )
    }

    if (loading) {
        return (
            <DualBall className={"dual-ball-days-field"}/>
        )
    }

    return (
        <>
            <div className = "days-field-common-years">
                <div className = "days-field-common__days-item-btn-group days-field-common__days-item-btn-group--year">
                    <button
                        className = "days-field-common__days-item-btn days-field-common__days-item-btn-left"
                        onClick={() => ChangeYear("back")}>
                        ←
                    </button>
                    <div className = "days-field-common__days-item-year">
                        {workers[0].years[0].name}
                    </div>
                    <button
                        className = "days-field-common__days-item-btn days-field-common__days-item-btn-right"
                        onClick={() => ChangeYear("next")}>
                        →
                    </button>
                </div>
            </div>
            <div className="days-field-common-wrapper">
                <table className = "days-field-common">
                    <tbody>
                        <tr className = "days-field-common__items-row">
                            <th className = "days-field-common__days-item">
                                <div className = "days-field-common__days-item-btn-group">
                                    <button
                                        className = "days-field-common__days-item-btn days-field-common__days-item-btn-left"
                                        onClick={() => ChangeMonth("back")}>
                                        ←
                                    </button>
                                    <div className = "days-field-common__days-item-month">
                                        {workers[0].years[0].months[currentMonth - 1].name}
                                    </div>
                                    <button
                                        className = "days-field-common__days-item-btn days-field-common__days-item-btn-right"
                                        onClick={() => ChangeMonth("next")}>
                                        →
                                    </button>
                                </div>
                            </th>
                                {
                                    workers[0].years[0].months[currentMonth - 1].days.map((item) => {
                                        return (
                                            <th className = "days-field-common__days-item" 
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
        </>
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
    ChangeMonth,
    ChangeYear,
    ClearAllDays,
    WorkersLoaded
}

const mapStateToProps = ({workers, currentYear, currentMonth}) => {
    return {
        workers,
        currentYear,
        currentMonth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysFieldCommon);
import React, {useEffect, useState, useCallback} from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from "react-redux"
import {SelectWorker, ChangeDayType, ChangeMonth, ChangeYear, SelectDay, ChangeScheduleText, ClearAllDays, WorkersLoaded, GetWorkersOnServer, UnsavedChangesStatus} from "../../store/actions"
import {useHttp} from "../../hooks/http.hook"
import DualBall from "../dual-ball";
import UnsavedChangesModal from "../unsaved-changes-modal";

import "./days-field-common.scss"

const DaysFieldCommon = ({workers, unsavedChanges, currentYear, currentMonth, SelectWorker, SelectDay, ChangeDayType, ChangeScheduleText, ChangeMonth, ChangeYear, ClearAllDays, WorkersLoaded, GetWorkersOnServer, UnsavedChangesStatus}) => {
    const [loading, setLoading] = useState(true);
    const [loadingYear, setloadingYear] = useState(true);
    const {request} = useHttp();

    const getWorkers = useCallback(async () => {
        try {
            setloadingYear(true);
            const data = await request("/api/workers/workers", "GET", null, {year: currentYear});
            WorkersLoaded(data);
            setLoading(false);
            setloadingYear(false);
        } catch (e) {}
    }, [request, WorkersLoaded, currentYear]);

    const tryChangeYear = async (value) => {
        try {
            ClearAllDays();
            const data = await request("/api/workers/workers", "GET", null, {year: currentYear});
            GetWorkersOnServer(data);
            ChangeYear(value);
        } catch (e) {}
    };

    const tryChangeMonth = async (value) => {
        try {
            ClearAllDays();
            const data = await request("/api/workers/workers", "GET", null, {year: currentYear});
            GetWorkersOnServer(data);
            ChangeMonth(value);
        } catch (e) {}
    };

    useEffect(() => {
        getWorkers();

        return () => {
            UnsavedChangesStatus(false);
          };
    }, [getWorkers, UnsavedChangesStatus]);

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
            <DualBall className={"dual-ball--days-field-common"}/>
        )
    }

    return (
        <>
            {unsavedChanges ? <UnsavedChangesModal className={"unsaved-changes-modal--days-field-common"}/> : null}
            <div className = "days-field-common-years">
                <div className = "days-field-common__days-item-btn-group days-field-common__days-item-btn-group--year">
                    <button
                        className = "days-field-common__days-item-btn days-field-common__days-item-btn-left"
                        onClick={() => tryChangeYear("back")}>
                        ←
                    </button>
                    <div className = "days-field-common__days-item-year">
                        {!loadingYear ?  workers[0].years[0].name : <DualBall className={"dual-ball--days-field-year-and-month"}/>}
                    </div>
                    <button
                        className = "days-field-common__days-item-btn days-field-common__days-item-btn-right"
                        onClick={() => tryChangeYear("next")}>
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
                                        onClick={() => tryChangeMonth("back")}>
                                        ←
                                    </button>
                                    <div className = "days-field-common__days-item-month">
                                        {workers[0].years[0].months[currentMonth - 1].name}
                                    </div>
                                    <button
                                        className = "days-field-common__days-item-btn days-field-common__days-item-btn-right"
                                        onClick={() => tryChangeMonth("next")}>
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
    WorkersLoaded,
    GetWorkersOnServer,
    UnsavedChangesStatus
}

const mapStateToProps = ({workers, currentYear, currentMonth, unsavedChanges}) => {
    return {
        workers,
        currentYear,
        currentMonth,
        unsavedChanges,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysFieldCommon);
import React, {useEffect, useState, useCallback} from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from "react-redux"
import {SelectWorker, ChangeDayType, ChangeMonth, ChangeYear, SelectDay, ChangeScheduleText, ClearAllDays,
WorkersLoaded, GetWorkersOnServer, UnsavedChangesStatus, ChangeMonthlyNorm, ChangeNumberOfShifts, ChangeNumberOfBreaks, ChangeNorm, ChangeWithTrainingAndBreaks,
ChangeAdditionalInformationText, ChangeWithADecreasingCoefficient, ChangeTotalWithTheNight, DatesLoaded, ChangeIncidentsPerHour, ChangeMessagePlan} from "../../store/actions"
import {useHttp} from "../../hooks/http.hook"
import DualBall from "../dual-ball";
import UnsavedChangesModal from "../unsaved-changes-modal";


// Месячная норма по графику = сложить часы каждого дня +
// Сегмент = вручную +
// Смены (день) = количество непустых ячеек +
// Смены (ночь) = количество ячеек имеющих более 3 рабочих часов + 1 +
// Перерывы = смены * 50 / 60 (с округлением до ближайшего целого) +
// Норма = Месячная норма по графику +
// С обучением / перерывами = Норма - Перерывы (до округления) - Обучение +
// С понижающим коэффициентом = С обучением / перерывами * Коэффициент (с округлением до ближайшего целого) +
// Итог с учетом ночи = С понижающим коэффициентом * Коэффициент ночь (с округлением до ближайшего целого) +
// План по сообщениям (День) = С понижающим коэффициентом * на эффективность вверху графика +
// План по сообщениям (Ночь) = (С понижающим коэффициентом / 2 * на эффективность вверху графика) + (С понижающим коэффициентом / 2 * (Коэффициент Ночь * 10)) +
// Благодарности = вручную + СДЕЛАТЬ 3 По-умолчанию + 
// Коэффициент = вручную + СДЕЛАТЬ 1 По-умолчанию +
// Коэффициент Ночь = вручную + СДЕЛАТЬ 1 По-умолчанию +
// Обучение = вручную + СДЕЛАТЬ 8 По-умолчанию +


import "./days-field-common.scss"

const DaysFieldCommon = ({workers, dates, unsavedChanges, currentYear, currentMonth, SelectWorker, SelectDay, ChangeDayType, ChangeScheduleText,
ChangeMonth, ChangeYear, ClearAllDays, WorkersLoaded, GetWorkersOnServer, UnsavedChangesStatus, ChangeMonthlyNorm, ChangeNumberOfShifts,
ChangeNumberOfBreaks, ChangeNorm, ChangeWithTrainingAndBreaks, ChangeAdditionalInformationText, ChangeWithADecreasingCoefficient, ChangeTotalWithTheNight, DatesLoaded, ChangeIncidentsPerHour, ChangeMessagePlan}) => {
    const [loading, setLoading] = useState(true);
    const [loadingYear, setloadingYear] = useState(true);

    const {request} = useHttp();

    const getWorkers = useCallback(async () => {
        try {
            const data = await request("/api/workers/workers", "GET", null, {year: currentYear});
            WorkersLoaded(data);
            setLoading(false);
            console.log("getWorkers")
        } catch (e) {}
    }, [request, WorkersLoaded, currentYear]);

    
    const getDates = useCallback(async () => {
        try {
            const data = await request("/api/dates/dates", "GET", null, {year: currentYear});
            DatesLoaded(data);
            setloadingYear(false);
            console.log("getDates")
        } catch (e) {}
    }, [request, currentYear, DatesLoaded]);

    const tryChangeYear = async (value) => {
        try {
            ClearAllDays();
            const data = await request("/api/workers/workers", "GET", null, {year: currentYear});
            GetWorkersOnServer(data);
            ChangeYear(value);
            console.log("tryChangeYear")
        } catch (e) {}
    };

    const tryChangeMonth = async (value) => {
        try {
            ClearAllDays();
            const data = await request("/api/workers/workers", "GET", null, {year: currentYear});
            GetWorkersOnServer(data);
            ChangeMonth(value);
            console.log("tryChangeMonth")
        } catch (e) {}
    };

    useEffect(() => {

            getDates();
            getWorkers();  
            setloadingYear(true);
            console.log("useEffect")
        return () => {
            UnsavedChangesStatus(false);
            console.log("UnsavedChangesStatus")
          };
    }, [getWorkers, getDates, UnsavedChangesStatus]);
    
    useEffect(() => {
        ClearAllDays();
        console.log("ClearAllDays")
    }, [currentMonth, currentYear, ClearAllDays]);

    const getWorkerElement = (workerNumber) => {
        const targetWorker = workers[workerNumber];
        let monthData = [];

        monthData.push(
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

            monthData.push(
                <td className = {classNames}
                    key={i + 1000}
                    onClick={() => SelectDayAndChangeDayType()}>
                        <div className="days-field-common__item-input-wrapper">
                            <input 
                                className="days-field-common__item-input"
                                type="text"
                                maxLength={2}
                                value={targetDay.workingHours}
                                onChange={(e) =>  {ChangeScheduleText(targetWorker.id, targetDay.id, "workingHours", e); ChangeMonthlyNorm(); ChangeNumberOfShifts(); ChangeNumberOfBreaks(); ChangeNorm(); ChangeWithTrainingAndBreaks(); ChangeWithADecreasingCoefficient(); ChangeTotalWithTheNight(); ChangeMessagePlan()}}
                            />
                        </div>
                </td>
            )
        }

        for (let i = 1; i <= workers[0].years[0].months[currentMonth - 1].additionalInformation.length; i++) {
            let classNames = "days-field-common__item";
            const targetInformation = targetWorker.years[0].months[currentMonth - 1].additionalInformation[i - 1];

            monthData.push(
                <td className = {classNames}
                    key={i + 2000}>
                        <div className="days-field-common__item-input-wrapper">
                            <input 
                                className="days-field-common__item-input"
                                type="text"
                                maxLength={4}
                                value={targetInformation.value}
                                onChange={(e) => {ChangeAdditionalInformationText(targetWorker.id - 1, targetInformation.name, e); ChangeMonthlyNorm(); ChangeNumberOfShifts(); ChangeNumberOfBreaks(); ChangeNorm(); ChangeWithTrainingAndBreaks(); ChangeWithADecreasingCoefficient(); ChangeTotalWithTheNight(); ChangeMessagePlan()}}/>
                        </div>
                </td>
            )
        }

        return (
            monthData
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

    if (loading && loadingYear) {
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
                        {!loadingYear ?  dates[0].name : <DualBall className={"dual-ball--days-field-year-and-month"}/>}
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
                                        {dates[0].months[currentMonth - 1].name}
                                    </div>
                                    <button
                                        className = "days-field-common__days-item-btn days-field-common__days-item-btn-right"
                                        onClick={() => tryChangeMonth("next")}>
                                        →
                                    </button>
                                </div>
                            </th>
                            {
                                dates[0].months[currentMonth - 1].days.map((item) => {
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
                            {
                                dates[0].months[currentMonth - 1].additionalInformation.map((item) => {

                                    if (item.name === "messagePlan") {
                                        return (
                                            <th className = "days-field-common__additional-information-item" 
                                                key={item.id}>
                                                <div>
                                                    {item.title}
                                                </div>
                                                <div className="days-field-common__incidents-per-hour-group">
                                                    <button
                                                        className = "days-field-common__incidents-per-hour-btn days-field-common__incidents-per-hour-btn-left"
                                                        onClick={() => {ChangeIncidentsPerHour("back"); ChangeMessagePlan()}}>
                                                        ←
                                                    </button>
                                                    <div className = "days-field-common__incidents-per-hour-value">
                                                        {dates[0].months[currentMonth - 1].efficiencyPerHour}
                                                    </div>
                                                    <button
                                                        className = "days-field-common__incidents-per-hour-btn days-field-common__incidents-per-hour-btn-right"
                                                        onClick={() => {ChangeIncidentsPerHour("next"); ChangeMessagePlan()}}>
                                                        →
                                                    </button>

                                                </div>
                                            </th>
                                        )
                                    }

                                    return (
                                        <th className = "days-field-common__additional-information-item" 
                                            key={item.id}>
                                            <div>
                                                {item.title}
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
    UnsavedChangesStatus,
    ChangeMonthlyNorm,
    ChangeNumberOfShifts,
    ChangeNumberOfBreaks,
    ChangeNorm,
    ChangeWithTrainingAndBreaks,
    ChangeAdditionalInformationText,
    ChangeWithADecreasingCoefficient,
    ChangeTotalWithTheNight,
    DatesLoaded,
    ChangeIncidentsPerHour,
    ChangeMessagePlan
}

const mapStateToProps = ({workers, currentYear, currentMonth, unsavedChanges, dates}) => {
    return {
        workers,
        currentYear,
        currentMonth,
        unsavedChanges,
        dates
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysFieldCommon);
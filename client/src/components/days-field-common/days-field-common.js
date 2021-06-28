import React, {useEffect, useState, useCallback, useContext} from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from "react-redux"
import {useHttp} from "../../hooks/http.hook"
import {SelectWorker, ChangeDayType, ChangeMonth, ChangeYear, SelectDay, ChangeScheduleText, ClearAllDays,
WorkersLoaded, GetWorkersOnServer, UnsavedChangesStatus, ChangeMonthlyNorm, ChangeNumberOfShifts, ChangeNumberOfBreaks, ChangeNorm, ChangeWithTrainingAndBreaks,
ChangeAdditionalInformationText, ChangeWithADecreasingCoefficient, ChangeTotalWithTheNight, DatesLoaded, ChangeIncidentsPerHour, ChangeMessagePlan, ChangeAdjustment,
ChangeNumberOfAcknowledgements, ChangeShiftAndTeamText, ChangeAcknowledgements, ChangeSecondBreaks, GetDatesOnServer} from "../../store/actions"
import DualBall from "../dual-ball";
import UnsavedChangesModal from "../unsaved-changes-modal";
import WorkerSettingsModal from "../worker-settings-modal";

import moonImg from "./../../global-imgs/moon.svg"
import sunImg from "./../../global-imgs/sun.svg"

import Context from "../../context";

// auth.middleware еще не задействован
// Убрать отправку данных в ответе у некоторых запросов
// поменять number на +, работает быстрее. 

import "./days-field-common.scss"

const DaysFieldCommon = ({workers, dates, unsavedChanges, currentYear, currentMonth, SelectWorker, SelectDay, ChangeDayType, ChangeScheduleText,
ChangeMonth, ChangeYear, ClearAllDays, WorkersLoaded, GetWorkersOnServer, UnsavedChangesStatus, ChangeMonthlyNorm, ChangeNumberOfShifts,
ChangeNumberOfBreaks, ChangeNorm, ChangeWithTrainingAndBreaks, ChangeAdditionalInformationText, ChangeWithADecreasingCoefficient, ChangeTotalWithTheNight,
DatesLoaded, ChangeIncidentsPerHour, ChangeMessagePlan, ChangeAdjustment, ChangeNumberOfAcknowledgements, ChangeShiftAndTeamText, ChangeAcknowledgements, ChangeSecondBreaks, GetDatesOnServer}) => {

    const context = useContext(Context);
    const roleSupervisor = context.role === "Супервайзер";
    const roleNotSupervisor = context.role !== "Супервайзер";
    const [loading, setLoading] = useState(true);
    const [loadingYear, setloadingYear] = useState(true);
    const [loadingMonth, setloadingMonth] = useState(true);
    const [showWorkerSettingsModal, setShowWorkerSettingsModal] = useState(false);

    const {request} = useHttp();

    const getWorkers = useCallback(async () => {
        try {
            const data = await request("/api/workers/workers", "GET", null, {year: currentYear, month: currentMonth});
            WorkersLoaded(data);
            setLoading(false);
        } catch (e) {}
    }, [request, WorkersLoaded, currentYear, currentMonth]);

    
    const getDates = useCallback(async () => {
        try {
            const data = await request("/api/dates/dates", "GET", null, {year: currentYear, month: currentMonth});
            DatesLoaded(data);
            setloadingYear(false);
            setloadingMonth(false);
        } catch (e) {}
    }, [request, currentYear, DatesLoaded, currentMonth]);

    const tryChangeYear = async value => {
        try {
            ClearAllDays();
            const data = await request("/api/workers/workers", "GET", null, {year: currentYear, month: currentMonth});
            const datesData = await request("/api/dates/dates", "GET", null, {year: currentYear, month: currentMonth});
            GetWorkersOnServer(data);
            GetDatesOnServer(datesData);
            ChangeYear(value);
        } catch (e) {}
    };

    const tryChangeMonth = async value => {
        try {
            ClearAllDays();
            const data = await request("/api/workers/workers", "GET", null, {year: currentYear, month: currentMonth});
            const datesData = await request("/api/dates/dates", "GET", null, {year: currentYear, month: currentMonth});
            GetWorkersOnServer(data);
            GetDatesOnServer(datesData);
            ChangeMonth(value);
        } catch (e) {}
    };

    useEffect(() => {
        getDates();
        getWorkers();  
        return () => {
            UnsavedChangesStatus(false);
          };
    }, [getWorkers, getDates, UnsavedChangesStatus]);
    
    useEffect(() => {
        setloadingMonth(true); 
    }, [currentMonth]);

    useEffect(() => {
        setloadingYear(true);
    }, [currentYear]);


    useEffect(() => {
        ClearAllDays();
    }, [currentMonth, currentYear, ClearAllDays]);

    const getWorkerElement = workerNumber => {
        const targetWorker = workers[workerNumber];
        const targetMonth = targetWorker.years[0].months[0];
        let monthData = [];
        let linkClassNames = "days-field-common__item-link";
        let tdClassNames = "days-field-common__item";
        let workingShift = targetMonth.monthlyShiftData.workingShiftMonth;

        if (workingShift &&
            workingShift !== "Не задано") {
            let verifiedWorkingShift = workingShift;

            if (verifiedWorkingShift === "Руководитель") verifiedWorkingShift = "director";

            linkClassNames += ` days-field-common__item-link--${verifiedWorkingShift}`;
            tdClassNames += " days-field-common__item--specified";
        }

        monthData.push(
            <td className = {tdClassNames}
                key={workerNumber}>
                    { (roleSupervisor) ?
                        <button 
                            className = "days-field-common__item-worker-settings-btn"
                            onClick={() => {setShowWorkerSettingsModal(true); SelectWorker(workerNumber)}}>
                                <svg className = "days-field-common__item-worker-settings-btn-img" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/>
                                    <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25
                                    2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98
                                    0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0
                                    .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0
                                    .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21
                                    1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41
                                    1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                                </svg>
                        </button>                            
                        :
                        null
                    }
                    <Link 
                        to={`/personalschedule/${workerNumber + 1}`}
                        className = {linkClassNames}
                        onClick={() => SelectWorker(workerNumber)}>
                            <span className = "days-field-common__item-link-text">
                                {targetWorker.name}
                            </span>
                    </Link>
            </td>
        )
        
        for (let i = 1; i <= workers[0].years[0].months[0].shiftAndTeam.length; i++) {
            const targetInformation = targetWorker.years[0].months[0].shiftAndTeam[i - 1];
            monthData.push(
                <td className={(roleSupervisor) ? "days-field-common__shift-and-team-item" : "days-field-common__shift-and-team-item days-field-common__shift-and-team-item--read-only"}
                    key={i + 3000}>
                        <div className="days-field-common__shift-and-team-item-input-wrapper">
                            <input 
                                className={(roleSupervisor) ? "days-field-common__shift-and-team-item-input" : "days-field-common__shift-and-team-item-input days-field-common__shift-and-team-item-input--read-only"}
                                type="text"
                                maxLength={2}
                                readOnly={(roleSupervisor) ? false : true}
                                onChange={
                                     (roleSupervisor) ?
                                    (e) => {ChangeShiftAndTeamText(targetWorker.id, targetInformation.name, e); ChangeMonthlyNorm();
                                    ChangeNumberOfShifts(); ChangeNumberOfBreaks(); ChangeNorm(); ChangeWithTrainingAndBreaks(); ChangeWithADecreasingCoefficient();
                                    ChangeTotalWithTheNight(); ChangeMessagePlan(); ChangeAdjustment(); ChangeAcknowledgements(); ChangeSecondBreaks()}
                                    :
                                    null
                                }
                                value={targetInformation.value ? targetInformation.value : "-"}/>
                        </div>
                </td>
            )
        }

        for (let i = 1; i <= workers[0].years[0].months[0].days.length; i++) {
            let classNames = "days-field-common__item";
            const targetDay = targetWorker.years[0].months[0].days[i - 1];
            let verifiedWorkingTime = targetDay.workingShiftDay;
                                            
            if (verifiedWorkingTime === "Руководитель") verifiedWorkingTime = "director";
            if (targetDay.selected) classNames += " selected";
            if (targetDay.worked) classNames += ` worked-${verifiedWorkingTime}`;
            if (targetDay.weekend) classNames += " weekend";
            if (targetDay.vacation) classNames += " vacation";

            const SelectDayAndChangeDayType = () => {
                SelectDay(targetWorker.id, targetDay.id);
                ChangeDayType(targetWorker.id, targetDay.id, "selected")
            }

            if (roleNotSupervisor) classNames += " days-field-common__item--read-only";

            monthData.push(
                <td className={classNames}
                    key={i + 1000}
                    onClick={(roleSupervisor) ? () => SelectDayAndChangeDayType() : null}>
                        <div className="days-field-common__item-input-wrapper">
                            <input 
                                className={(roleSupervisor) ? "days-field-common__item-input" : "days-field-common__item-input days-field-common__item-input--read-only"}
                                type="text"
                                maxLength={2}
                                readOnly={(roleSupervisor) ? false : true}
                                value={targetDay.workingHours}
                                onChange={(roleSupervisor) ?
                                (e) =>  {ChangeScheduleText(targetWorker.id, targetDay.id, "workingHours", e); ChangeMonthlyNorm();
                                ChangeNumberOfShifts(); ChangeNumberOfBreaks(); ChangeNorm(); ChangeWithTrainingAndBreaks(); ChangeWithADecreasingCoefficient();
                                ChangeTotalWithTheNight(); ChangeMessagePlan(); ChangeAdjustment(); ChangeAcknowledgements(); ChangeSecondBreaks()}
                                :
                                null}
                            />
                        </div>
                </td>
            )
        }

        for (let i = 1; i <= workers[0].years[0].months[0].additionalInformation.length; i++) {
            let classNames = "days-field-common__item";
            const targetInformation = targetWorker.years[0].months[0].additionalInformation[i - 1];
            const targInfName = targetInformation.name;
            const groupLeader = targetMonth.monthlyShiftData.groupLeader;
            const kmGroupLeader = targetMonth.monthlyShiftData.kmGroupLeader;
            const nonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
            const director = targetMonth.monthlyShiftData.director;
            let readOnly = false;
            let maxLength = 4;

            if (groupLeader || kmGroupLeader || nonLinearWorker || director) {
                readOnly = true;
                classNames += " days-field-common__item--management";
                classNames += " days-field-common__item--non-clickable";
            }

            if (!groupLeader && !kmGroupLeader && !nonLinearWorker && !director) classNames += " days-field-common__item--linear-worker";
            if (groupLeader || kmGroupLeader) classNames += " days-field-common__item--groupLeader";
            if ((groupLeader || director) && targInfName === "messagePlan") classNames += " days-field-common__item--blue";
            if (targetMonth.monthlyShiftData.nightWorker && targInfName === "messagePlan") classNames += " days-field-common__item--night";
            if (kmGroupLeader && targInfName === "messagePlan") classNames += " days-field-common__item--km-color";
            if (targInfName === "monthlyNorm") classNames += " days-field-common__item--monthlyNorm";
            if (targInfName === "segment") classNames += " days-field-common__item--segment";

            if (targInfName === "shifts" || targInfName === "breaks" || targInfName === "norm" ||
                targInfName === "withTraining/Breaks" || targInfName === "withADecreasingCoefficient" || 
                targInfName === "totalWithTheNight" || targInfName === "monthlyNorm" || targInfName === "segment" ||
                targInfName === "messagePlan" || targInfName === "acknowledgements" || targInfName === "adjustment"
                ) classNames += " days-field-common__item--non-clickable";
 
            if (targInfName === "messagePlan") classNames += " days-field-common__item--messagePlan";
            if (targInfName === "coefficient") classNames += " days-field-common__item--coefficient";
            if (targInfName === "coefficientNight") classNames += " days-field-common__item--coefficientNight";
            if (targInfName === "adjustment") classNames += " days-field-common__item--adjustment";

            if (targInfName === "training") {
                classNames += " days-field-common__item--training";
                maxLength = 2;
            }

            if (roleNotSupervisor) {
                readOnly = true;
                classNames += " days-field-common__item--read-only";
            }

            monthData.push(
                <td className = {classNames}
                    key={i + 2000}>
                        <div className="days-field-common__item-input-wrapper">
                            <input 
                                className={(roleSupervisor) ? "days-field-common__item-input days-field-common__item-input--additionalInformation" :
                                "days-field-common__item-input days-field-common__item-input--additionalInformation days-field-common__item-input--read-only"}
                                type="text"
                                maxLength={maxLength}
                                readOnly={readOnly}
                                value={targetInformation.value ? targetInformation.value : "-"}
                                onChange={(roleSupervisor) ?
                                (e) => {ChangeAdditionalInformationText(targetWorker.id, targInfName, e); ChangeMonthlyNorm();
                                ChangeNumberOfShifts(); ChangeNumberOfBreaks(); ChangeNorm(); ChangeWithTrainingAndBreaks(); ChangeWithADecreasingCoefficient();
                                 ChangeTotalWithTheNight(); ChangeMessagePlan(); ChangeAdjustment(); ChangeAcknowledgements(e); ChangeSecondBreaks()}
                                :
                                null}/>
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
                    key={worker.id}>
                    {getWorkerElement(i - 1)}
                </tr>
            )
        });

        return (
            WorkersElements
        )
    }

    if ((loading && loadingYear) || (loadingYear && loadingMonth)) {
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
                                        {!loadingMonth ?  dates[0].months[0].name : <DualBall className={"dual-ball--days-field-year-and-month"}/>}
                                    </div>
                                    <button
                                        className = "days-field-common__days-item-btn days-field-common__days-item-btn-right"
                                        onClick={() => tryChangeMonth("next")}>
                                        →
                                    </button>
                                </div>
                            </th>
                            {
                                dates[0].months[0].shiftAndTeam.map((item) => {
                                    return (
                                        <th className = "days-field-common__shift-and-team-title-item" 
                                            key={item.name}>
                                            <div>
                                                {item.name}
                                            </div>
                                        </th>
                                    )
                                })
                            }
                            {
                                dates[0].months[0].days.map((item) => {
                                    let classNames = "days-field-common__days-item";

                                    if (item.dayName === "сб" || item.dayName === "вс") classNames += " days-field-common__days-item--weekend";

                                    return (
                                        <th className = {classNames}
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
                                dates[0].months[0].additionalInformation.map((item) => {

                                    if (item.name === "messagePlan" || item.name === "acknowledgements" ) {
                                        let funcLeft = null;
                                        let funcRight = null;
                                        let value = null;
                                        let classNames = "days-field-common__additional-information-item";

                                        if (item.name === "messagePlan") {
                                            classNames += " days-field-common__additional-information-item--messagePlan";
                                            funcLeft = () => {ChangeIncidentsPerHour("back"); ChangeMessagePlan()};
                                            funcRight = () => {ChangeIncidentsPerHour("next"); ChangeMessagePlan()};
                                            value = dates[0].months[0].efficiencyPerHour;
                                        } 

                                        if (item.name === "acknowledgements") {
                                            classNames += " days-field-common__additional-information-item--acknowledgements";
                                            funcLeft = () => {ChangeNumberOfAcknowledgements("back"); ChangeMessagePlan()};
                                            funcRight = () => {ChangeNumberOfAcknowledgements("next"); ChangeMessagePlan()};
                                            value = dates[0].months[0].numberOfAcknowledgements;
                                        } 
                                        
                                        return (
                                            <th className = {classNames}
                                                key={item.id}>
                                                <div className = "days-field-common__incidents-per-hour-title">
                                                    {item.title}
                                                </div>
                                                <div className="days-field-common__incidents-per-hour-group">
                                                    {(roleSupervisor) ?
                                                        <button
                                                            className = "days-field-common__incidents-per-hour-btn days-field-common__incidents-per-hour-btn-left"
                                                            onClick={funcLeft}>
                                                            ←
                                                        </button>
                                                        :
                                                        null
                                                    }
                                                    <div className = "days-field-common__incidents-per-hour-value">
                                                        {value}
                                                    </div>
                                                    {(roleSupervisor) ?
                                                        <button
                                                            className = "days-field-common__incidents-per-hour-btn days-field-common__incidents-per-hour-btn-right"
                                                            onClick={funcRight}>
                                                            →
                                                        </button>
                                                        :
                                                        null
                                                    }

                                                </div>
                                            </th>
                                        )
                                    }
                                    
                                    let classNames = "days-field-common__additional-information-item";
                                    const moon = <img className = "days-field-common__additional-information-item-img" width="16" src={moonImg} alt="Ночь"/>;
                                    const sun = <img className = "days-field-common__additional-information-item-img" width="16" src={sunImg} alt="День"/>;
                                    const name = item.name;

                                    if (name === "monthlyNorm") classNames += " days-field-common__additional-information-item--monthlyNorm";
                                    if (name === "coefficient") classNames += " days-field-common__additional-information-item--coefficient";
                                    if (name === "coefficientNight") classNames += " days-field-common__additional-information-item--coefficientNight";
                                    if (name === "adjustment") classNames += " days-field-common__additional-information-item--adjustment";
                                    if (name === "training") classNames += " days-field-common__additional-information-item--training";
                                    if (name === "breaks") classNames += " days-field-common__additional-information-item--breaks";
                                    if (name === "segment") classNames += " days-field-common__additional-information-item--segment";
                                    if (name === "shifts") classNames += " days-field-common__additional-information-item--shifts";
                                    if (name === "norm") classNames += " days-field-common__additional-information-item--norm";
                                    if (name === "withTraining/Breaks") classNames += " days-field-common__additional-information-item--withTrainingBreaks";
                                    if (name === "withADecreasingCoefficient") classNames += " days-field-common__additional-information-item--withADecreasingCoefficient";
                                    if (name === "totalWithTheNight") classNames += " days-field-common__additional-information-item--totalWithTheNight";

                                    return (
                                        <th className = {classNames}
                                            key={item.id}>
                                            <div>
                                                {item.title}
                                                {name === "coefficientNight" ? moon : null}
                                                {name === "coefficient" ? sun : null}
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
            {showWorkerSettingsModal ? <WorkerSettingsModal setShowWorkerSettingsModal={setShowWorkerSettingsModal}/> : null}
        </>
    )
}

DaysFieldCommon.propTypes = {workers: PropTypes.array, SelectWorker: PropTypes.func, SelectDay: PropTypes.func, ChangeDayType: PropTypes.func, ChangeScheduleText: PropTypes.func}

const mapDispatchToProps = {
    SelectWorker, ChangeDayType, SelectDay, ChangeScheduleText, ChangeMonth, ChangeYear, ClearAllDays, WorkersLoaded, GetWorkersOnServer, UnsavedChangesStatus,ChangeMonthlyNorm, ChangeNumberOfShifts,
    ChangeNumberOfBreaks, ChangeNorm, ChangeWithTrainingAndBreaks, ChangeAdditionalInformationText, ChangeWithADecreasingCoefficient, ChangeTotalWithTheNight, DatesLoaded, ChangeIncidentsPerHour,
    ChangeMessagePlan, ChangeAdjustment, ChangeNumberOfAcknowledgements, ChangeShiftAndTeamText, ChangeAcknowledgements, ChangeSecondBreaks, GetDatesOnServer
}

const mapStateToProps = ({workers, currentYear, currentMonth, unsavedChanges, dates}) => {
    return {workers, currentYear, currentMonth, unsavedChanges, dates}
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysFieldCommon);
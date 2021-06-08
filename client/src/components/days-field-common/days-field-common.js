import React, {useEffect, useState, useCallback} from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from "react-redux"
import {useHttp} from "../../hooks/http.hook"
import {SelectWorker, ChangeDayType, ChangeMonth, ChangeYear, SelectDay, ChangeScheduleText, ClearAllDays,
WorkersLoaded, GetWorkersOnServer, UnsavedChangesStatus, ChangeMonthlyNorm, ChangeNumberOfShifts, ChangeNumberOfBreaks, ChangeNorm, ChangeWithTrainingAndBreaks,
ChangeAdditionalInformationText, ChangeWithADecreasingCoefficient, ChangeTotalWithTheNight, DatesLoaded, ChangeIncidentsPerHour, ChangeMessagePlan, ChangeAdjustment,
ChangeNumberOfAcknowledgements, ChangeShiftAndTeamText, ChangeAcknowledgements, ChangeSecondBreaks} from "../../store/actions"
import DualBall from "../dual-ball";
import UnsavedChangesModal from "../unsaved-changes-modal";
import WorkerSettingsModal from "../worker-settings-modal";


// Месячная норма по графику = сложить часы каждого дня +
// Сегмент = вручную +

// Смены (день) = количество непустых ячеек +
// Смены (ночь) = количество ячеек имеющих более 3 рабочих часов +
// Смены (KM) = количество ячеек имеющих более 3 рабочих часов + 1 +
// Смены (ГЛ) = не задаются +
// Смены (Нелинейный) = не задаются +

// Перерывы = смены * 50 / 60 (с округлением до ближайшего целого) +
// Перерывы (ГЛ) = не задаются +
// Перерывы (Нелинейный) = не задаются +

// Норма = Месячная норма по графику +
// Норма (Нелинейный) = Месячная норма по графику +
// Норма (ГЛ) = ищем всех сотрудников с тем же номером команды, что и у гл и суммируем их нормы, часы ГЛ не учитываются +

// С обучением / перерывами = Норма - Перерывы (до округления) - Обучение +
// С обучением / перерывами (Нелинейный) = Месячная норма по графику +
// С обучением / перерывами (ГЛ) = ищем всех сотрудников с тем же номером команды,
// что и у гл и суммируем их С обучением / перерывами, гл не учитывается, потом округление до ближайшего целого +

// С понижающим коэффициентом = С обучением / перерывами * Коэффициент (с округлением до ближайшего целого) +
// С понижающим коэффициентом (Нелинейный) = Месячная норма по графику +
// С понижающим коэффициентом (ГЛ) = ищем всех сотрудников с тем же номером команды, что и у гл и суммируем С понижающим коэффициентом, часы ГЛ не учитываются
// (с округлением до ближайшего целого) +

// Итог с учетом ночи = С понижающим коэффициентом * Коэффициент ночь (с округлением до ближайшего целого) +
// Итог с учетом ночи (Нелинейный) = Месячная норма по графику +
// Итог с учетом ночи (ГЛ) = ищем всех сотрудников с тем же номером команды, что и у гл и складываем Итог с учетом ночи, часы ГЛ не учитываются
// (с округлением до ближайшего целого) +

// План по сообщениям (День) = С понижающим коэффициентом * на эффективность вверху графика +
// План по сообщениям (Ночь) = (С понижающим коэффициентом / 2 * на эффективность вверху графика) + (С понижающим коэффициентом / 2 * (Коэффициент Ночь * 10)) +
// План по сообщениям (КМ) = С понижающим коэффициентом * благодарности вверху +
// План по сообщениям (Нелинейный) = Не задется +
// План по сообщениям (ГЛ) = ищем всех сотрудников с тем же номером команды, что и у гл и складываем План по сообщениям , план ГЛ не учитываются
// (с округлением до ближайшего целого) +

// Благодарности = вручную + СДЕЛАТЬ 3 По-умолчанию + 
// Благодарности (Нелинейный) = Не задется +
// Благодарности (ГЛ) = ищем всех сотрудников с тем же номером команды, что и у гл и складываем Благодарности , Благодарности ГЛ не учитываются + 

// Вторые перерывы (Нелинейный) = Не задется +
// Вторые перерывы (ГЛ) = ищем всех сотрудников с тем же номером команды, что и у гл и складываем Перерывы + 

// Коэффициент = вручную + СДЕЛАТЬ 1 По-умолчанию +
// Коэффициент (Нелинейный) = Не задется +
// Коэффициент (ГЛ) = Не задается +

// Коэффициент Ночь = вручную + СДЕЛАТЬ 1 По-умолчанию +
// Коэффициент Ночь (ночь) = вручную + СДЕЛАТЬ 0.75 По-умолчанию +
// Коэффициент Ночь (Нелинейный) = Не задется +
// Коэффициент Ночь (ГЛ) = Не задается +

// Корректировка = Итог с учетом ночи / Месячная норма по графику +
// Корректировка (Нелинейный) = Не задется +
// Корректировка (ГЛ) = Не задается +

// Обучение = вручную + СДЕЛАТЬ 8 По-умолчанию +
// Обучение (Нелинейный) = Не задется +
// Обучение (ГЛ) = Не задается +

// При смене роли некоторые показатели сбрасываются на базовые для это роли.
// Коэф ночь, обучение, коэфф, благодарности а для ГЛ многие


// Не все корректно откатывается после смены роли. Например, план, благодарности.
// После открытия попапа не работает назначение
// После снятия выделения последний день все еще селектед
// Коэфф сбрасиывается не на 0, а на -

import "./days-field-common.scss"

const DaysFieldCommon = ({workers, dates, unsavedChanges, currentYear, currentMonth, SelectWorker, SelectDay, ChangeDayType, ChangeScheduleText,
ChangeMonth, ChangeYear, ClearAllDays, WorkersLoaded, GetWorkersOnServer, UnsavedChangesStatus, ChangeMonthlyNorm, ChangeNumberOfShifts,
ChangeNumberOfBreaks, ChangeNorm, ChangeWithTrainingAndBreaks, ChangeAdditionalInformationText, ChangeWithADecreasingCoefficient, ChangeTotalWithTheNight,
DatesLoaded, ChangeIncidentsPerHour, ChangeMessagePlan, ChangeAdjustment, ChangeNumberOfAcknowledgements, ChangeShiftAndTeamText, ChangeAcknowledgements, ChangeSecondBreaks}) => {
    const [loading, setLoading] = useState(true);
    const [loadingYear, setloadingYear] = useState(true);
    const [showWorkerSettingsModal, setShowWorkerSettingsModal] = useState(false);

    const {request} = useHttp();

    const getWorkers = useCallback(async () => {
        try {
            const data = await request("/api/workers/workers", "GET", null, {year: currentYear});
            WorkersLoaded(data);
            setLoading(false);
        } catch (e) {}
    }, [request, WorkersLoaded, currentYear]);

    
    const getDates = useCallback(async () => {
        try {
            const data = await request("/api/dates/dates", "GET", null, {year: currentYear});
            DatesLoaded(data);
            setloadingYear(false);
        } catch (e) {}
    }, [request, currentYear, DatesLoaded]);

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
            getDates();
            getWorkers();  
            setloadingYear(true);
        return () => {
            UnsavedChangesStatus(false);
          };
    }, [getWorkers, getDates, UnsavedChangesStatus]);
    
    useEffect(() => {
        ClearAllDays();
    }, [currentMonth, currentYear, ClearAllDays]);

    const getWorkerElement = (workerNumber) => {
        const targetWorker = workers[workerNumber];
        const targetMonth = targetWorker.years[0].months[currentMonth - 1];
        let monthData = [];
        let linkClassNames = "days-field-common__item-link";
        let tdClassNames = "days-field-common__item";
        let workingShift = targetMonth.monthlyShiftData.workingShiftMonth;

        if (workingShift &&
            workingShift !== "Не задано") {
            let verifiedWorkingShift = workingShift;
            console.log(verifiedWorkingShift)    

            if (verifiedWorkingShift === "Руководитель") {
                verifiedWorkingShift = "director"
            }

            linkClassNames += ` days-field-common__item-link--${verifiedWorkingShift}`;
            tdClassNames += " days-field-common__item--specified";
        }

        monthData.push(
            <td className = {tdClassNames}
                key={workerNumber}>
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
                    <Link 
                        to={`/personalschedule/${workerNumber + 1}`}
                        className = {linkClassNames}
                        onClick={() => SelectWorker(workerNumber)}>
                        {targetWorker.name}
                    </Link>
            </td>
        )
        
        for (let i = 1; i <= workers[0].years[0].months[currentMonth - 1].shiftAndTeam.length; i++) {
            const targetInformation = targetWorker.years[0].months[currentMonth - 1].shiftAndTeam[i - 1];

            monthData.push(
                <td className = "days-field-common__item"
                    key={i + 3000}>
                        <div className="days-field-common__item-input-wrapper">
                            <input 
                                className="days-field-common__item-input"
                                type="text"
                                maxLength={2}
                                onChange={(e) => {ChangeShiftAndTeamText(targetWorker.id - 1, targetInformation.name, e); ChangeMonthlyNorm();
                                    ChangeNumberOfShifts(); ChangeNumberOfBreaks(); ChangeNorm(); ChangeWithTrainingAndBreaks(); ChangeWithADecreasingCoefficient();
                                    ChangeTotalWithTheNight(); ChangeMessagePlan(); ChangeAdjustment(); ChangeAcknowledgements(); ChangeSecondBreaks()}}
                                value={targetInformation.value}/>
                        </div>
                </td>
            )
        }

        for (let i = 1; i <= workers[0].years[0].months[currentMonth - 1].days.length; i++) {
            let classNames = "days-field-common__item";
            const targetDay = targetWorker.years[0].months[currentMonth - 1].days[i - 1];
            let verifiedWorkingTime = targetDay.workingShiftDay;
                                            
            if (verifiedWorkingTime === "Руководитель") {
                verifiedWorkingTime = "director"
            }

            if (targetDay.selected) {
                classNames += " selected";
            }

            if (targetDay.worked) {
                classNames += ` worked-${verifiedWorkingTime}`;
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
                                onChange={(e) =>  {ChangeScheduleText(targetWorker.id, targetDay.id, "workingHours", e); ChangeMonthlyNorm();
                                ChangeNumberOfShifts(); ChangeNumberOfBreaks(); ChangeNorm(); ChangeWithTrainingAndBreaks(); ChangeWithADecreasingCoefficient();
                                ChangeTotalWithTheNight(); ChangeMessagePlan(); ChangeAdjustment(); ChangeAcknowledgements(); ChangeSecondBreaks()}}
                            />
                        </div>
                </td>
            )
        }

        for (let i = 1; i <= workers[0].years[0].months[currentMonth - 1].additionalInformation.length; i++) {
            let classNames = "days-field-common__item";
            const targetInformation = targetWorker.years[0].months[currentMonth - 1].additionalInformation[i - 1];
            let readOnly = false;

            if (targetMonth.monthlyShiftData.groupLeader || targetMonth.monthlyShiftData.nonLinearWorker) {
                readOnly = true;
            }

            monthData.push(
                <td className = {classNames}
                    key={i + 2000}>
                        <div className="days-field-common__item-input-wrapper">
                            <input 
                                className="days-field-common__item-input"
                                type="text"
                                maxLength={4}
                                readOnly={readOnly}
                                value={targetInformation.value ? targetInformation.value : "-"}
                                onChange={(e) => {ChangeAdditionalInformationText(targetWorker.id - 1, targetInformation.name, e); ChangeMonthlyNorm();
                                ChangeNumberOfShifts(); ChangeNumberOfBreaks(); ChangeNorm(); ChangeWithTrainingAndBreaks(); ChangeWithADecreasingCoefficient();
                                 ChangeTotalWithTheNight(); ChangeMessagePlan(); ChangeAdjustment(); ChangeAcknowledgements(); ChangeSecondBreaks()}}/>
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
                                dates[0].months[currentMonth - 1].shiftAndTeam.map((item) => {
                                    return (
                                        <th className = "days-field-common__days-item" 
                                            key={item.name}>
                                            <div>
                                                {item.name}
                                            </div>
                                        </th>
                                    )
                                })
                            }
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

                                    if (item.name === "messagePlan" || item.name === "acknowledgements" ) {
                                        let funcLeft = null;
                                        let funcRight = null;
                                        let value = null;

                                        if (item.name === "messagePlan") {
                                            funcLeft = () => {ChangeIncidentsPerHour("back"); ChangeMessagePlan()};
                                            funcRight = () => {ChangeIncidentsPerHour("next"); ChangeMessagePlan()};
                                            value = dates[0].months[currentMonth - 1].efficiencyPerHour;
                                        } 

                                        if (item.name === "acknowledgements") {
                                            funcLeft = () => {ChangeNumberOfAcknowledgements("back"); ChangeMessagePlan()};
                                            funcRight = () => {ChangeNumberOfAcknowledgements("next"); ChangeMessagePlan()};
                                            value = dates[0].months[currentMonth - 1].numberOfAcknowledgements;
                                        } 

                                        return (
                                            <th className = "days-field-common__additional-information-item" 
                                                key={item.id}>
                                                <div>
                                                    {item.title}
                                                </div>
                                                <div className="days-field-common__incidents-per-hour-group">
                                                    <button
                                                        className = "days-field-common__incidents-per-hour-btn days-field-common__incidents-per-hour-btn-left"
                                                        onClick={funcLeft}>
                                                        ←
                                                    </button>
                                                    <div className = "days-field-common__incidents-per-hour-value">
                                                        {value}
                                                    </div>
                                                    <button
                                                        className = "days-field-common__incidents-per-hour-btn days-field-common__incidents-per-hour-btn-right"
                                                        onClick={funcRight}>
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
            {showWorkerSettingsModal ? <WorkerSettingsModal setShowWorkerSettingsModal={setShowWorkerSettingsModal}/> : null}
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
    ChangeMessagePlan,
    ChangeAdjustment,
    ChangeNumberOfAcknowledgements,
    ChangeShiftAndTeamText,
    ChangeAcknowledgements,
    ChangeSecondBreaks
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
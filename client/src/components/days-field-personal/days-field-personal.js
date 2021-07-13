import React, {useEffect, useState, useCallback} from "react";
import {connect} from "react-redux"
import {ClearAllDays, ChangeDayType, SelectWorker, ChangeMonth, ChangeYear, WorkersLoaded, GetWorkersOnServer, UnsavedChangesStatus, DatesLoaded, GetDatesOnServer} from "../../store/actions"
import {useHttp} from "../../hooks/http.hook"

import "./days-field-personal.scss"

import DaysFieldItemPersonal from "../days-field-personal-item";
import UnsavedChangesModal from "../unsaved-changes-modal";
import DualBall from "../dual-ball";

const DaysFieldPresonal = ({workers, dates, unsavedChanges, currentYear, currentMonth, ChangeDayType, ChangeMonth, ChangeYear, selectedWorker, SelectWorker, WorkersLoaded, ClearAllDays, filter, id, GetWorkersOnServer, UnsavedChangesStatus, DatesLoaded, GetDatesOnServer}) => {

    const [loading, setLoading] = useState(true);
    const [loadingYear, setloadingYear] = useState(true);
    const [loadingMonth, setloadingMonth] = useState(true);
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
    }, [request, DatesLoaded, currentYear, currentMonth]);

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
            console.log("tryChangeMonth")
        } catch (e) {}
    };

    useEffect(() => {
        SelectWorker(id);
        getWorkers();
        getDates();
        return () => {
            UnsavedChangesStatus(false);
          };
    }, [getWorkers, getDates, UnsavedChangesStatus, SelectWorker, id]);

    useEffect(() => {
        setloadingMonth(true); 
    }, [currentMonth]);

    useEffect(() => {
        setloadingYear(true);
    }, [currentYear]);
    
    useEffect(() => {
        ClearAllDays();
    }, [currentMonth, currentYear, ClearAllDays]);

    const filterDays = (worker, dates, filter) => {
        const workerDays = worker.years[0].months[0].days;
        const datesDays = dates[0].months[0].days;
        let filteredWorkerDays = workerDays;
        let visibleDaysArr = [];

        if (filter === "worked") filteredWorkerDays = workerDays.filter(item => item.worked);
        if (filter === "weekends") filteredWorkerDays = workerDays.filter(item => item.weekend);
        if (filter === "vacation") filteredWorkerDays = workerDays.filter(item => item.vacation);

        if (filteredWorkerDays !== datesDays) {
            datesDays.forEach((item) => {
                if (filteredWorkerDays.some(({id}) => id === item.id)) visibleDaysArr.push(item);
            });
        }

        return visibleDaysArr;
    }

    const filterWorkers = (workersArr, selectedWorker, filter) => {

        const targetWorker = workers[selectedWorker];
        const oldMonth = {...targetWorker.years[0].months[0]};
        let newMonth;

        if (filter === "worked") {
            const workedDays = workersArr.filter(item => item.worked);
            newMonth = {...oldMonth, days: workedDays};
        } else if (filter === "weekends") {
            const weekendDays = workersArr.filter(item => item.weekend);
            newMonth = {...oldMonth, days: weekendDays};
        } else if (filter === "vacation") {
            const vacationDays = workersArr.filter(item => item.vacation);
            newMonth = {...oldMonth, days: vacationDays};
        } else {
            return  workers
        }
        
        const newMonths = [...targetWorker.years[0].months.slice(0, 0), newMonth, ...targetWorker.years[0].months.slice(currentMonth)];
        const oldYear = {...targetWorker.years[0]};
        const newYear = {...oldYear, months: newMonths};
        const newYears = [...targetWorker.years.slice(0, currentYear - 1), newYear, ...targetWorker.years.slice(currentYear)];
        const newWorker = {...targetWorker, years: newYears}
        const newWorkers = [...workers.slice(0, selectedWorker), newWorker, ...workers.slice(selectedWorker + 1)];

        return  newWorkers
    }

    const getWorkerPresonalDays = (workerNumber) => {

        const visibleWorkers = filterWorkers(workers[selectedWorker].years[0].months[0].days, selectedWorker, filter)
        const visibleWorker = visibleWorkers[workerNumber];
        const targetWorker = workers[workerNumber];
        let daysInMonth = [];

        if (visibleWorker.years[0].months[0].days.length === 0) {
            daysInMonth.push(
                <td className = "days-field-personal__item days-field-personal__no-items" 
                    key={workerNumber}>
                        Здесь пусто
                </td>
            )
        } else {
            let classNames = "days-field-personal__item";
            let {workingShiftMonth} = visibleWorker.years[0].months[0].monthlyShiftData;

            if (workingShiftMonth === "Руководитель") workingShiftMonth = "director";

            classNames += ` days-field-personal__item--${workingShiftMonth}`;

            daysInMonth.push(
                <td className = {classNames} 
                    key={workerNumber}>
                    {targetWorker.name}
                </td>
            )
        }

        for (let i = 1; i <= workers[0].years[0].months[0].shiftAndTeam.length; i++) {
            const targetInformation = targetWorker.years[0].months[0].shiftAndTeam[i - 1];
            daysInMonth.push(
                <td className="days-field-personal__item"
                    key={i + 3000}>
                        <div className="days-field-common__shift-and-team-item-input-wrapper">
                            <span>{targetInformation.value ? targetInformation.value : "-"}</span>
                        </div>
                </td>
            )
        }
        

        const daysFieldElements = visibleWorker.years[0].months[0].days.map((item) => {
            
            let classNames = "days-field-personal__item";
            const {weekend, vacation, worked, selected, changeShiftMenuOpen} = item;
            let {workingShiftDay} = item;

            if (workingShiftDay === "Руководитель") workingShiftDay = "director";

            if (selected) {
                classNames += " days-field-personal--selected ";
            }

            if (changeShiftMenuOpen) {
                classNames += " days-field-personal--show-working-hours";
            }
            
            if (worked) {
                classNames += ` days-field-personal--worked-${workingShiftDay}`;
            }

            if(weekend) {
                classNames += " days-field-personal--weekend";
            }

            if(vacation) {
                classNames += " days-field-personal--vacation";
            }

            return (
                <td className = {classNames} 
                    key = {item.id}>
                        <DaysFieldItemPersonal
                            workingHours = {item.workingHours}
                            workerNumber = {targetWorker.id}
                            dayNumber = {item.id}
                            openDayMenu = {() => ChangeDayType(targetWorker.id, item.id, "selected", null, null, "personal")}
                            openChangeShiftMenu = {() => ChangeDayType(targetWorker.id, item.id, "changeShiftMenuOpen", null, null, "personal")}
                            onMakeDayWeekend = {() => ChangeDayType(targetWorker.id, item.id, "weekend", null, null, "personal")}
                            onMakeDayVacation = {() => ChangeDayType(targetWorker.id, item.id, "vacation", null, null, "personal")}
                            closeDayMenu = {() => ChangeDayType(targetWorker.id, item.id, "selected", null, null, "personal")}
                            takeOff = {() => ChangeDayType(targetWorker.id, item.id, "takeOf", null, null, "personal")}/>
                </td>
            )
        })

        daysInMonth.push (
            daysFieldElements
        )

        return (
            daysInMonth
        )
    }
    
    if (loading) return <DualBall className={"dual-ball--days-field-personal"}/>

    const visibleDays = filterDays(workers[selectedWorker], dates, filter);

    const daysNumbers = visibleDays.map(item => {
        let classNames = "days-field-personal__item"
        if (item.dayName === "сб" || item.dayName === "вс") classNames += " days-field-personal__item--weekend";

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

    return (
        <div className="days-field-personal-wrapper">
            {unsavedChanges ? <UnsavedChangesModal className={"unsaved-changes-modal--days-field-personal"}/> : null}
            <div className = "days-field-personal-years">
                <div className = "days-field-personal__item-btn-group days-field-personal__item-btn-group--year">
                    <button
                        className = "days-field-personal__item-btn days-field-personal__item-btn-left"
                        onClick={() => tryChangeYear("back")}>
                        ←
                    </button>
                    <div className = "days-field-personal__item-year">
                        {!loadingYear ?  dates[0].name : <DualBall className={"dual-ball--days-field-year-and-month"}/>}
                    </div>
                    <button
                        className = "days-field-personal__item-btn days-field-personal__item-btn-right"
                        onClick={() => tryChangeYear("next")}>
                        →
                    </button>
                </div>
            </div>
            <div className="days-field-personal-content-field">
                <table className = "days-field-personal">
                    <tbody>
                        <tr className = "days-field-personal__items-row">
                            <th className = "days-field-personal__item">
                                <div className = "days-field-personal__item-btn-group days-field-personal__item-btn-group--month">
                                    <button
                                        className = "days-field-personal__item-btn days-field-personal__item-btn-left"
                                        onClick={() => tryChangeMonth("back")}>
                                        ←
                                    </button>
                                    <div className = "days-field-personal__item-month">
                                        {!loadingMonth ?  dates[0].months[0].name : <DualBall className={"dual-ball--days-field-year-and-month"}/>}
                                    </div>
                                    <button
                                        className = "days-field-personal__item-btn days-field-personal__item-btn-right"
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
                            {daysNumbers}
                        </tr>
                        <tr className = "days-field-personal__items-row">
                            {getWorkerPresonalDays(id)}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )  
}

const mapDispatchToProps = {ClearAllDays, ChangeDayType, SelectWorker, ChangeMonth, ChangeYear, WorkersLoaded, GetWorkersOnServer, UnsavedChangesStatus, DatesLoaded, GetDatesOnServer}

const mapStateToProps = ({workers, dates, selectedDay, filter, selectedWorker, makeWorkingBtnActive, currentMonth, currentYear, unsavedChanges}) => {
    return {workers, dates, selectedWorker, selectedDay, filter, makeWorkingBtnActive, currentMonth, currentYear, unsavedChanges}
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysFieldPresonal);
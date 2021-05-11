/* eslint-disable react/prop-types */
import React, {useEffect, useState, useCallback} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux"
import {FilterSelect, MakeFilterActive, SelectWorker, WorkersLoaded} from "../../store/actions"
import {useHttp} from "../../hooks/http.hook"

import "./filter-list.scss"

import FilterItem from "../filter-item";
import allImg from "./../../global-imgs/all.svg"
import workImg from "./../../global-imgs/work.svg"
import weekendImg from "./../../global-imgs/weekend.svg"
import vacationdImg from "./../../global-imgs/vacation.svg"

import DualBall from "../dual-ball";

const FilterList = ({WorkersLoaded, SelectWorker, match, workers, currentYear, currentMonth, selectedWorker, FilterSelect, MakeFilterActive, allActive,
    workedActive, weekendsActive, vacationActive}) => {

    const [loading, setLoading] = useState(true);

    const {request} = useHttp();

    const getWorkers = useCallback(async () => {
        try {
            const data = await request("/api/workers/workers", "GET", null, {year: currentYear});
            WorkersLoaded(data);
            setLoading(false);
        } catch (e) {}
    }, [request, WorkersLoaded, currentYear]);

    useEffect(() => {
        SelectWorker(match.params.id - 1);
        getWorkers();
        return () => FilterSelect("all")
    }, [getWorkers, SelectWorker, match.params.id, FilterSelect]);

    if (loading) {
        return (
            <DualBall className={"dual-ball--days-filter-list"}/>
        )
    }

    const workedQuantity = workers[selectedWorker].years[0].months[currentMonth - 1].days.filter(item => item.worked).length;
    const weekendsQuantity = workers[selectedWorker].years[0].months[currentMonth - 1].days.filter(item => item.weekend).length;
    const vacationQuantity = workers[selectedWorker].years[0].months[currentMonth - 1].days.filter(item => item.vacation).length;
    const allDaysQuantity = workers[selectedWorker].years[0].months[currentMonth - 1].days.length;

    const buttons = [
        {name: "all",  label: "Все дни", img: allImg, id: -1, quantity: allDaysQuantity, active: allActive},
        {name: "worked",  label: "Рабочие", img: workImg, id: -2, quantity: workedQuantity, active: workedActive},
        {name: "weekends",  label: "Выходные", img: weekendImg, id: -3, quantity: weekendsQuantity, active: weekendsActive},
        {name: "vacation",  label: "Отпуск", img: vacationdImg, id: -4, quantity: vacationQuantity, active: vacationActive}
    ]

    return (
        <ul className = "filter-list">
            {
                buttons.map((item) => {
                    const {label, quantity, id, img, active, name} = item;
                    return (
                        <FilterItem
                            btnText={label}
                            btnQuantity={quantity}
                            id = {id}
                            key = {id}
                            img={img}
                            active={active}
                            FilterSelect={() => FilterSelect(name)}
                            MakeFilterActive={() => MakeFilterActive(id)}
                        />
                    )
                })
            }
        </ul>
    )
}

FilterList.propTypes = {
    workers: PropTypes.array,
    selectedWorker: PropTypes.number,
    workedQuantity: PropTypes.number,
    allDaysQuantity: PropTypes.number,
    weekendsQuantity: PropTypes.number,
    vacationQuantity: PropTypes.number,
    FilterSelect: PropTypes.func,
    MakeFilterActive: PropTypes.func,
    allActive: PropTypes.bool,
    workedActive: PropTypes.bool,
    weekendsActive: PropTypes.bool,
    vacationActive: PropTypes.bool,
}

const mapDispatchToProps = {
    FilterSelect,
    MakeFilterActive,
    SelectWorker, 
    WorkersLoaded
}

const mapStateToProps = ({workers, selectedWorker, allActive, workedActive, weekendsActive, vacationActive, currentMonth, currentYear}) => {
    return {
        workers,
        selectedWorker,
        allActive,
        workedActive,
        weekendsActive,
        vacationActive,
        currentMonth,
        currentYear
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterList);
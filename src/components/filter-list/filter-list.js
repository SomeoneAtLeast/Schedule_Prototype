/* eslint-disable react/prop-types */
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux"
import {FilterSelect, MakeFilterActive, SelectWorker} from "../../store/actions"

import "./filter-list.scss"

import FilterItem from "../filter-item";
import allImg from "./../../global-imgs/all.svg"
import workImg from "./../../global-imgs/work.svg"
import weekendImg from "./../../global-imgs/weekend.svg"
import vacationdImg from "./../../global-imgs/vacation.svg"

class FilterList extends Component {

    componentDidMount() {
        this.props.SelectWorker(this.props.match.params.id - 1)
    }

    componentDidUpdate() {
        this.props.SelectWorker(this.props.match.params.id - 1)
        console.log(this.props.match.params.id - 1 + "update");  
    }

    componentWillUnmount() {
        this.props.FilterSelect("all")
    }

    render() {
        const {workers, selectedWorker, FilterSelect, MakeFilterActive, allActive,
              workedActive, weekendsActive, vacationActive} = this.props;

        const workedQuantity = workers[selectedWorker].days.filter(item => item.worked).length;
        const weekendsQuantity = workers[selectedWorker].days.filter(item => item.weekend).length;
        const vacationQuantity = workers[selectedWorker].days.filter(item => item.vacation).length;
        const allDaysQuantity = workers[selectedWorker].days.length;

        console.log(selectedWorker)

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
    SelectWorker
}

const mapStateToProps = ({workers, selectedWorker, allActive, workedActive, weekendsActive, vacationActive}) => {
    return {
        workers,
        selectedWorker,
        allActive,
        workedActive,
        weekendsActive,
        vacationActive
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterList);
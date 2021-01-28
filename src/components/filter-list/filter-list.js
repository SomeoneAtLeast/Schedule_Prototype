/* eslint-disable react/prop-types */
import React, {Component} from "react";

import "./filter-list.scss"

import Filter from "../filter";
import allImg from "./../../global-imgs/all.svg"
import workImg from "./../../global-imgs/work.svg"
import weekendImg from "./../../global-imgs/weekend.svg"
import vacationdImg from "./../../global-imgs/vacation.svg"

// const FilterList = ({workedQuantity, allDaysQuantity, weekendsQuantity, onFilterSelect}) => {
export default class FilterList extends Component {
    constructor() {
        super();

        this.state = {
            allActive: true,
            workedActive: false,
            weekendsActive: false,
            vacationActive: false
        }
    }

    onActive (id) {
        if (id === -1) {
            this.setState({
                allActive: true,
                workedActive: false,
                weekendsActive: false,
                vacationActive: false
            })
        } else if (id === -2) {
            this.setState({
                workedActive: true,
                allActive: false,
                weekendsActive: false,
                vacationActive: false
            })
        } else if (id === -3) {
            this.setState({
                weekendsActive: true,
                workedActive: false,
                allActive: false,
                vacationActive: false
            })
        } else if (id === -4) {
            this.setState({
                vacationActive: true,
                workedActive: false,
                allActive: false,
                weekendsActive: false
            })
        }
    }

    render() {
        const {workedQuantity, allDaysQuantity, weekendsQuantity, vacationQuantity, onFilterSelect} = this.props;
        const {allActive, workedActive, weekendsActive, vacationActive} = this.state;
        const buttons = [
            {name: "all",  label: "Все дни", img: allImg, id: -1, quantity: allDaysQuantity, active: allActive},
            {name: "worked",  label: "Рабочие", img: workImg, id: -2, quantity: workedQuantity, active: workedActive},
            {name: "weekends",  label: "Выходные", img: weekendImg, id: -3, quantity: weekendsQuantity, active: weekendsActive},
            {name: "vacation",  label: "Отпуск", img: vacationdImg, id: -4, quantity: vacationQuantity, active: vacationActive}
        ]

        return (
            <ul className = "filter-list">
                <Filter
                    btnText={buttons[0].label}
                    btnQuantity={buttons[0].quantity}
                    id = {buttons[0].id}
                    img={buttons[0].img}
                    active={buttons[0].active}
                    onFilterSelect={() => onFilterSelect(buttons[0].name)}
                    onActive={() => this.onActive(buttons[0].id)}
                    />
                <Filter
                    btnText={buttons[1].label}
                    btnQuantity={buttons[1].quantity}
                    id = {buttons[1].id}
                    img={buttons[1].img}
                    active={buttons[1].active}
                    onFilterSelect={() => onFilterSelect(buttons[1].name)}
                    onActive={() => this.onActive(buttons[1].id)}
                    />
                <Filter
                    btnText={buttons[2].label}
                    btnQuantity={buttons[2].quantity}
                    id = {buttons[2].id}
                    img={buttons[2].img}
                    active={buttons[2].active}
                    onFilterSelect={() => onFilterSelect(buttons[2].name)}
                    onActive={() => this.onActive(buttons[2].id)}
                    />
                <Filter
                    btnText={buttons[3].label}
                    btnQuantity={buttons[3].quantity}
                    id = {buttons[3].id}
                    img={buttons[3].img}
                    active={buttons[3].active}
                    onFilterSelect={() => onFilterSelect(buttons[3].name)}
                    onActive={() => this.onActive(buttons[3].id)}
                    />
            </ul>
            )
    }
}

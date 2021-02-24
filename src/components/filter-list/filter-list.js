import React, {Component} from "react";
import PropTypes from 'prop-types';

import "./filter-list.scss"

import Filter from "../filter";
import allImg from "./../../global-imgs/all.svg"
import workImg from "./../../global-imgs/work.svg"
import weekendImg from "./../../global-imgs/weekend.svg"
import vacationdImg from "./../../global-imgs/vacation.svg"

export default class FilterList extends Component {

    render() {
        const {workedQuantity, allDaysQuantity, weekendsQuantity,
              vacationQuantity, onFilterSelect, onActive, allActive,
              workedActive, weekendsActive, vacationActive} = this.props;
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
                    onActive={() => onActive(buttons[0].id)}
                    />
                <Filter
                    btnText={buttons[1].label}
                    btnQuantity={buttons[1].quantity}
                    id = {buttons[1].id}
                    img={buttons[1].img}
                    active={buttons[1].active}
                    onFilterSelect={() => onFilterSelect(buttons[1].name)}
                    onActive={() => onActive(buttons[1].id)}
                    />
                <Filter
                    btnText={buttons[2].label}
                    btnQuantity={buttons[2].quantity}
                    id = {buttons[2].id}
                    img={buttons[2].img}
                    active={buttons[2].active}
                    onFilterSelect={() => onFilterSelect(buttons[2].name)}
                    onActive={() => onActive(buttons[2].id)}
                    />
                <Filter
                    btnText={buttons[3].label}
                    btnQuantity={buttons[3].quantity}
                    id = {buttons[3].id}
                    img={buttons[3].img}
                    active={buttons[3].active}
                    onFilterSelect={() => onFilterSelect(buttons[3].name)}
                    onActive={() => onActive(buttons[3].id)}
                    />
            </ul>
        )
    }
}

FilterList.propTypes = {
    workedQuantity: PropTypes.number,
    allDaysQuantity: PropTypes.number,
    weekendsQuantity: PropTypes.number,
    vacationQuantity: PropTypes.number,
    onFilterSelect: PropTypes.func,
    onActive: PropTypes.func,
    allActive: PropTypes.bool,
    workedActive: PropTypes.bool,
    weekendsActive: PropTypes.bool,
    vacationActive: PropTypes.bool,
}
/* eslint-disable react/prop-types */
import React, {Component} from "react";

import "./filter-list.scss"

import Filter from "../filter";

// const FilterList = ({workedQuantity, allDaysQuantity, weekendsQuantity, onFilterSelect}) => {
export default class FilterList extends Component {
    constructor() {
        super();

        this.state = {
            allActive: true,
            workedActive: false,
            weekendsActive: false
        }
    }

    onActive (id) {
        if (id === -1) {
            this.setState({
                allActive: !this.state.allActive,
                workedActive: false,
                weekendsActive: false
            })
        } else if (id === -2) {
            this.setState({
                workedActive: !this.state.workedActive,
                allActive: false,
                weekendsActive: false
            })
        } else if (id === -3) {
            this.setState({
                weekendsActive: !this.state.weekendsActive,
                workedActive: false,
                allActive: false
            })
        }
    }

    render() {
        const {workedQuantity, allDaysQuantity, weekendsQuantity, onFilterSelect} = this.props;
        const {allActive, workedActive, weekendsActive} = this.state;
        const buttons = [
            {name: "all",  label: "Все дни", id: -1, quantity: `(${allDaysQuantity})`, active: allActive},
            {name: "worked",  label: "Рабочие", id: -2, quantity: `(${workedQuantity})`, active: workedActive},
            {name: "weekends",  label: "Выходные", id: -3, quantity: `(${weekendsQuantity})`, active: weekendsActive},
        ]

        return (
            <ul className = "filter-list">
                <Filter
                    btnText={buttons[0].label}
                    btnQuantity={buttons[0].quantity}
                    id = {buttons[0].id}
                    active={buttons[0].active}
                    onFilterSelect={() => onFilterSelect(buttons[0].name)}
                    onActive={() => this.onActive(buttons[0].id)}
                    />
                <Filter
                    btnText={buttons[1].label}
                    btnQuantity={buttons[1].quantity}
                    id = {buttons[1].id}
                    active={buttons[1].active}
                    onFilterSelect={() => onFilterSelect(buttons[1].name)}
                    onActive={() => this.onActive(buttons[1].id)}
                    />
                <Filter
                    btnText={buttons[2].label}
                    btnQuantity={buttons[2].quantity}
                    id = {buttons[2].id}
                    active={buttons[2].active}
                    onFilterSelect={() => onFilterSelect(buttons[2].name)}
                    onActive={() => this.onActive(buttons[2].id)}
                    />
            </ul>
            )
    }
}

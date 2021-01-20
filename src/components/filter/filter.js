/* eslint-disable react/prop-types */
import React, {Component} from "react";

import "./filter.scss"

export default class Filter extends Component {
    constructor (props) {
        super(props);

        this.state = {
            active: false,
        };

        this.onActive = this.onActive.bind(this);

        this.onClick = this.onClick.bind(this);
    }

    onActive () {
        this.setState(({active}) => ({
            active: !active
        }))
    }

    onClick () {
        this.onActive();
        this.props.onSort()
    }

    render () {
        const {btnText, btnQuantity, id} = this.props;
        const {active} = this.state;
        let classNames = "filter-list__filter";

        if (active) {
            classNames += " active";
        }

        return (
            <li className={classNames}>
                <button
                className="filter-list__filter-btn"
                key = {id}
                onClick = {this.onClick}>
                    <span className="filter-list__left-text">
                    {btnText}
                    </span>
                    <span className="filter-list__right-text">
                    {btnQuantity}
                    </span>
                </button>
            </li>
        )
    }
}
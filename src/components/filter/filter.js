/* eslint-disable react/prop-types */
import React, {Component} from "react";

import "./filter.scss"

export default class Filter extends Component {
    constructor (props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onFilterSelect() {
        this.props.onFilterSelect();
        this.props.onActive();
    }

    onClick () {
        this.onFilterSelect();
    }

    render () {
        const {btnText, btnQuantity, id, active, img} = this.props;
        let classNames = "filter-list__filter";

        if (active) {
            classNames += " active-filter";
        }

        return (
            <li className={classNames}>
                <button
                className="filter-list__filter-btn"
                key = {id}
                onClick = {this.onClick}>   
                    <img className="filter-list__filter-img" src={img} alt={btnText}></img>
                    <span className="filter-list__text">
                    {btnText} - {btnQuantity}
                    </span>
                </button>
            </li>
        )
    }
}
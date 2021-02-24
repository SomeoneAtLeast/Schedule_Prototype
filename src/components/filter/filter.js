import React, {Component} from "react";
import PropTypes from 'prop-types';

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

Filter.propTypes = {
    onFilterSelect: PropTypes.func,
    onActive: PropTypes.func,
    btnText: PropTypes.string,
    btnQuantity: PropTypes.number,
    id: PropTypes.number,
    active: PropTypes.bool,
    img: PropTypes.string,
}
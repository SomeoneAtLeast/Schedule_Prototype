import React from "react";
import {connect} from "react-redux"
import PropTypes from 'prop-types';

import "./filter-item.scss"

const FilterItem = ({btnText, btnQuantity, id, active, img, onActive, FilterSelect}) => {

    const onFilterSelect = () => {
        FilterSelect();
        onActive();
    }

    const onClick = () =>  {
        onFilterSelect();
    }

    let classNames = "filter-list__filter";

    if (active) {
        classNames += " active-filter";
    }

    return (
        <li className={classNames}>
            <button
            className="filter-list__filter-btn"
            key = {id}
            onClick = {onClick}>   
                <img className="filter-list__filter-img" src={img} alt={btnText}></img>
                <span className="filter-list__text">
                {btnText} - {btnQuantity}
                </span>
            </button>
        </li>
    )
}

FilterItem.propTypes = {
    FilterSelect: PropTypes.func,
    onActive: PropTypes.func,
    btnText: PropTypes.string,
    btnQuantity: PropTypes.number,
    id: PropTypes.number,
    active: PropTypes.bool,
    img: PropTypes.string,
}

export default connect()(FilterItem);
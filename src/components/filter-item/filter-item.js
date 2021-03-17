import React from "react";
import {connect} from "react-redux"
import PropTypes from 'prop-types';

import "./filter-item.scss"

const FilterItem = ({btnText, btnQuantity, id, active, img, MakeFilterActive, FilterSelect}) => {

    const onFilterSelect = () => {
        FilterSelect();
        MakeFilterActive();
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
                <div className="filter-list__text">
                    <span>
                        {btnText}
                    </span>
                    <span>
                        {btnQuantity}
                    </span>
                </div>
            </button>
        </li>
    )
}

FilterItem.propTypes = {
    FilterSelect: PropTypes.func,
    MakeFilterActive: PropTypes.func,
    btnText: PropTypes.string,
    btnQuantity: PropTypes.number,
    id: PropTypes.number,
    active: PropTypes.bool,
    img: PropTypes.string,
}

export default connect()(FilterItem);
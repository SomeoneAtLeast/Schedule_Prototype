import React, {Component} from "react";

import "./app-filter.css"

export default class Filter extends Component {

    render () {
        // eslint-disable-next-line react/prop-types
        const {btnText} = this.props;
        return (
            <li className="filter-list__filter">
                <button className="filter-list__filter-btn">
                    {btnText}
                </button>
            </li>
        )
    }
}
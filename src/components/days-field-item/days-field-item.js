import React, {Component} from "react";

import "./days-field-item.scss";

export default class DaysFieldItem extends Component {
    render () {
        // eslint-disable-next-line react/prop-types
        const {dayNumber} = this.props;

        return (
            <div className = "days-field__item-body">
                <span className="days-field__item-number">
                    {dayNumber}
                </span>
            </div>
        )
    }
}
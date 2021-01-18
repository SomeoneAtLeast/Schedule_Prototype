/* eslint-disable react/prop-types */
import React, {Component} from "react";

import "./days-field-item.scss";

export default class DaysFieldItem extends Component {
    constructor (props) {
        super(props);

        this.state = {
            work: false
        };

        this.onMakeDayWorking = this.onMakeDayWorking.bind(this);
    }

    onMakeDayWorking () {
        const {changeState} = this.props;
        changeState();
        this.setState(({work}) => ({
            // здесь мы просто меняем на противоположное
            // чтобы работало в обе стороны
            work: !work
        }))
    }


    render () {
        // eslint-disable-next-line react/prop-types
        const {dayNumber} = this.props;
        const {work} = this.state;
        let classNames = "days-field__item-body";
        if(work) {
            classNames += " worked";
        }
        return (
            <div 
            className = {classNames}
            onClick = {this.onMakeDayWorking}>
                <span className="days-field__item-number">
                    {dayNumber}
                </span>
            </div>
        )
    }
}
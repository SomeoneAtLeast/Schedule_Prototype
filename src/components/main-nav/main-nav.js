import PropTypes from 'prop-types';
import React, {Component} from "react";
import {Link} from 'react-router-dom';

import  "./main-nav.scss"

import schedule from "./../../global-imgs/schedule.svg"
import shifts from "./../../global-imgs/shifts.svg"
import seat from "./../../global-imgs/seat.svg"

export default class MainNav extends Component {
    constructor() {
        super();

        this.state = {
            scheduleActive: true,
            seatsActive: false,
            workingshiftsActive: false
        }
    }
    
    componentDidMount() {
        if(this.props.location.pathname === "/seats/") {
            this.setState({
                scheduleActive: false,
                workingshiftsActive: false,
                seatsActive: true
            })
        } else if (this.props.location.pathname === "/workingshifts/") {
            this.setState({
                scheduleActive: false,
                workingshiftsActive: true,
                seatsActive: false
            })
        }
    }

    onActive (btnName) {
        if (btnName === "scheduleBtn") {
            this.setState({
                scheduleActive: true,
                seatsActive: false,
                workingshiftsActive: false
            })
        } else if (btnName === "seatsBtn") {
            this.setState({
                scheduleActive: false,
                workingshiftsActive: false,
                seatsActive: true
            })
        } else if (btnName === "workingshiftsBtn") {
            this.setState({
                scheduleActive: false,
                seatsActive: false,
                workingshiftsActive: true
            })
        }
    }
    
    render() {
        let scheduleClass = "main-nav__item";
        let seatsClass = "main-nav__item";
        let workingshiftsClass = "main-nav__item";
        const {scheduleActive, seatsActive, workingshiftsActive} = this.state;

        if (scheduleActive) {
            scheduleClass += " active-main-nav__item";
        } 
        
        if (seatsActive) {
            seatsClass += " active-main-nav__item";
        }

        if (workingshiftsActive) {
            workingshiftsClass += " active-main-nav__item";
        }

        return (
            <ul className="main-nav">
                <li 
                    className={scheduleClass}
                    onClick={() => this.onActive("scheduleBtn")}>
                    <Link to="/" className="main-nav__item-link">
                        <img
                            className="main-nav__item-link-img"
                            src={schedule} 
                            alt="График"/>
                        График
                    </Link> 
                </li>
                <li 
                    className={workingshiftsClass}
                    onClick={() => this.onActive("workingshiftsBtn")}>
                    <Link to="/workingshifts/" className="main-nav__item-link">
                        <img
                            className="main-nav__item-link-img"
                            src={shifts} 
                            alt="График"/>
                        Смены
                    </Link>
                </li>
                <li 
                    className={seatsClass}
                    onClick={() => this.onActive("seatsBtn")}>  
                    <Link to="/seats/" className="main-nav__item-link">
                        <img
                            className="main-nav__item-link-img"
                            src={seat} 
                            alt="График"/>  
                        Места
                    </Link>
                </li>
            </ul>
        )
    }
}

MainNav.propTypes = {
    location: PropTypes.object,
}
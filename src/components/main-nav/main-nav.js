import PropTypes from 'prop-types';
import React from "react";
import {Link, Route} from 'react-router-dom';
import {connect} from "react-redux"
import {MakeActiveNavBtn} from "../../store/actions"

import  "./main-nav.scss"

import schedule from "./../../global-imgs/schedule.svg"
import shifts from "./../../global-imgs/shifts.svg"
import seat from "./../../global-imgs/seat.svg"

const MainNav = ({scheduleActive, seatsActive, workingshiftsActive, MakeActiveNavBtn}) => {

    let scheduleClass = "main-nav__item";
    let seatsClass = "main-nav__item";
    let workingshiftsClass = "main-nav__item";

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
        <>

            <ul className="main-nav">
                <li 
                    className={scheduleClass}
                    onClick={() => MakeActiveNavBtn("scheduleBtn")}>
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
                    onClick={() => MakeActiveNavBtn("workingshiftsBtn")}>
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
                    onClick={() => MakeActiveNavBtn("seatsBtn")}>  
                    <Link to="/seats/" className="main-nav__item-link">
                        <img
                            className="main-nav__item-link-img"
                            src={seat} 
                            alt="График"/>  
                        Места
                    </Link>
                </li>
            </ul>
            <Route path="/workingshifts/" exact render={() => {
                    return (
                    <div className="main-nav__empty-block-for-visual">
                    </div>
                    )
                }}/>
            <Route path="/seats/" exact render={() => {
                    return (
                    <div className="main-nav__empty-block-for-visual">
                    </div>
                    )
                }}/>
        </>
    )
}

MainNav.propTypes = {
    location: PropTypes.object,
    scheduleActive: PropTypes.bool,
    seatsActive: PropTypes.bool,
    workingshiftsActive: PropTypes.bool,
    MakeActiveNavBtn: PropTypes.func,
}

const mapDispatchToProps = {
    MakeActiveNavBtn
}

const mapStateToProps = ({scheduleActive, seatsActive, workingshiftsActive}) => {
    return {
        scheduleActive,
        seatsActive,
        workingshiftsActive
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);
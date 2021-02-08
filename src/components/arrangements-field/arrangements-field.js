import React, {Component} from "react";

import "./arrangements-field.scss"

import ArrangementsItem from "../arrangements-item";

const seatsData = [
    {oldIp: "10.120.170.251", newIp: "10.120.110.11", seatNumber: "3019.66 (129)", selected: false, id: 10},
    {oldIp: "10.120.170.111", newIp: "10.120.119.221", seatNumber: "3019.65 (127)", selected: false, id: 11},
    {oldIp: "10.120.171.86", newIp: "10.120.110.20", seatNumber: "3019.64 (126)", selected: false, id: 12},
    {oldIp: "10.120.171.172", newIp: "10.120.119.155", seatNumber: "3019.63 (122)", selected: false, id: 13},
    {oldIp: "10.120.170.189", newIp: "10.120.119.208", seatNumber: "3019.62 (120)", selected: false, id: 14},
    {oldIp: "10.120.173.121", newIp: "10.120.119.199", seatNumber: "3019.61 (119)", selected: false, id: 15},
    {oldIp: "10.120.173.122", newIp: "10.120.193.192", seatNumber: "3019.60 (118)", selected: false, id: 16},
    {oldIp: "10.120.173.123", newIp: "10.120.193.193", seatNumber: "3019.59 (117)", selected: false, id: 17},
    {oldIp: "10.120.173.124", newIp: "10.120.193.194", seatNumber: "3019.58 (116)", selected: false, id: 18},
    {oldIp: "10.120.173.125", newIp: "10.120.193.195", seatNumber: "3019.57 (115)", selected: false, id: 19},
    {oldIp: "10.120.173.126", newIp: "10.120.193.196", seatNumber: "3019.56 (114)", selected: false, id: 20},
    {oldIp: "10.120.173.127", newIp: "10.120.193.197", seatNumber: "3019.55 (113)", selected: false, id: 21},
    {oldIp: "10.120.173.128", newIp: "10.120.193.198", seatNumber: "3019.54 (112)", selected: false, id: 22},
    {oldIp: "10.120.173.123", newIp: "10.120.193.193", seatNumber: "3019.59 (117)", selected: false, id: 23},
    {oldIp: "10.120.173.124", newIp: "10.120.193.194", seatNumber: "3019.58 (116)", selected: false, id: 24},
    {oldIp: "10.120.173.125", newIp: "10.120.193.195", seatNumber: "3019.57 (115)", selected: false, id: 25},
    {oldIp: "10.120.173.126", newIp: "10.120.193.196", seatNumber: "3019.56 (114)", selected: false, id: 26},
    {oldIp: "10.120.173.127", newIp: "10.120.193.197", seatNumber: "3019.55 (113)", selected: false, id: 27},
    {oldIp: "10.120.173.128", newIp: "10.120.193.198", seatNumber: "3019.54 (112)", selected: false, id: 28},
    {oldIp: "10.120.173.123", newIp: "10.120.193.193", seatNumber: "3019.59 (117)", selected: false, id: 29},
    {oldIp: "10.120.173.124", newIp: "10.120.193.194", seatNumber: "3019.58 (116)", selected: false, id: 30},
    {oldIp: "10.120.173.125", newIp: "10.120.193.195", seatNumber: "3019.57 (115)", selected: false, id: 31},
    {oldIp: "10.120.173.126", newIp: "10.120.193.196", seatNumber: "3019.56 (114)", selected: false, id: 32},
    {oldIp: "10.120.173.127", newIp: "10.120.193.197", seatNumber: "3019.55 (113)", selected: false, id: 33},
    {oldIp: "10.120.173.128", newIp: "10.120.193.198", seatNumber: "3019.54 (112)", selected: false, id: 34},
];



const seats = seatsData;

export default class ArrangementsField extends Component {
    constructor() {
        super();

        this.state = {
            seats: seats
        }
    }
    
    onTextWrapperChangeShow(id) {
        this.setState(({seats}) => {
            const index = seats.findIndex(elem => elem.id === id); 
            const oldSeat = seats[index];
            const newSeat = {...oldSeat, selected: !oldSeat.selected}
            const newSeats = [...seats.slice(0, index), newSeat, ...seats.slice(index + 1)];
            newSeats.forEach(item => {
                if (item.id !== (index + 10)) {
                    item.selected = false
                    }  
              });
              console.log(newSeats)
            return {
                seats: newSeats
            }
        })
    }
    
    render() {
        const arrangementsFieldElements = this.state.seats.map((item) => {
            const {oldIp, newIp, seatNumber, id, selected} = item;

            let classNames = "arrangements-table__сell";
            console.log(selected);
            if(selected) {
                classNames += " selected-seat";
            }

            return (
                <td 
                    className={classNames}
                    key={id}
                    onClick={() => this.onTextWrapperChangeShow(id)}>
                    <ArrangementsItem
                        oldIp={oldIp}
                        newIp={newIp}
                        seatNumber={seatNumber}/>
                </td>
            )
        })
        
        const table = (upfrom, upTo, lower) => {
            const upseats = arrangementsFieldElements.filter((item) => {
                return item.key >= upfrom && item.key <= upTo;
            })
        
            const lowerseats = arrangementsFieldElements.filter((item) => {
                return item.key > upTo && item.key < lower;
            })

            return (
             <table className="arrangements-table">
                 <tbody>
                    <tr className="arrangements-table__row">
                        {upseats}
                    </tr>
                    <tr className="arrangements-table__row">
                        {lowerseats}
                    </tr>
                 </tbody>
             </table>
            )
        }

        return (
            <div className="arrangements-field">
                {table(10, 12, 16)}
                {table(16, 18, 22)}
                {table(22, 24, 28)}
                {table(28, 30, 34)}
            </div>
        )
    }
}

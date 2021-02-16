/* eslint-disable react/prop-types */
import React, {Component} from "react";

import "./arrangements-field.scss"

import ArrangementsItem from "../arrangements-item";

const seatsData = [
    {oldIp: "10.120.170.251", newIp: "10.120.110.11", seatNumber: "3019.66 (129)", id: 10},
    {oldIp: "10.120.170.111", newIp: "10.120.119.221", seatNumber: "3019.65 (127)", id: 11},
    {oldIp: "10.120.171.86", newIp: "10.120.110.20", seatNumber: "3019.64 (126)", id: 12},
    {oldIp: "10.120.171.172", newIp: "10.120.119.155", seatNumber: "3019.63 (122)", id: 13},
    {oldIp: "10.120.170.189", newIp: "10.120.119.208", seatNumber: "3019.62 (120)", id: 14},
    {oldIp: "10.120.173.121", newIp: "10.120.119.199", seatNumber: "3019.61 (119)", id: 15},
    {oldIp: "10.120.173.122", newIp: "10.120.193.192", seatNumber: "3019.60 (118)", id: 16},
    {oldIp: "10.120.173.123", newIp: "10.120.193.193", seatNumber: "3019.59 (117)", id: 17},
    {oldIp: "10.120.173.124", newIp: "10.120.193.194", seatNumber: "3019.58 (116)", id: 18},
    {oldIp: "10.120.173.125", newIp: "10.120.193.195", seatNumber: "3019.57 (115)", id: 19},
    {oldIp: "10.120.173.126", newIp: "10.120.193.196", seatNumber: "3019.56 (114)", id: 20},
    {oldIp: "10.120.173.127", newIp: "10.120.193.197", seatNumber: "3019.55 (113)", id: 21},
    {oldIp: "10.120.173.128", newIp: "10.120.193.198", seatNumber: "3019.54 (112)", id: 22},
    {oldIp: "10.120.173.123", newIp: "10.120.193.193", seatNumber: "3019.59 (117)", id: 23},
    {oldIp: "10.120.173.124", newIp: "10.120.193.194", seatNumber: "3019.58 (116)", id: 24},
    {oldIp: "10.120.173.125", newIp: "10.120.193.195", seatNumber: "3019.57 (115)", id: 25},
    {oldIp: "10.120.173.126", newIp: "10.120.193.196", seatNumber: "3019.56 (114)", id: 26},
    {oldIp: "10.120.173.127", newIp: "10.120.193.197", seatNumber: "3019.55 (113)", id: 27},
    {oldIp: "10.120.173.128", newIp: "10.120.193.198", seatNumber: "3019.54 (112)", id: 28},
    {oldIp: "10.120.173.123", newIp: "10.120.193.193", seatNumber: "3019.59 (117)", id: 29},
    {oldIp: "10.120.173.124", newIp: "10.120.193.194", seatNumber: "3019.58 (116)", id: 30},
    {oldIp: "10.120.173.125", newIp: "10.120.193.195", seatNumber: "3019.57 (115)", id: 31},
    {oldIp: "10.120.173.126", newIp: "10.120.193.196", seatNumber: "3019.56 (114)", id: 32},
    {oldIp: "10.120.173.127", newIp: "10.120.193.197", seatNumber: "3019.55 (113)", id: 33},
    {oldIp: "10.120.173.128", newIp: "10.120.193.198", seatNumber: "3019.54 (112)", id: 34},
];



const seats = seatsData;

export default class ArrangementsField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            seats: seats
        }

        this.onChangeSeatText = this.onChangeSeatText.bind(this);
    }

    onChangeSeatText(id, NewOldIp, NewNewIp, NewSeatNumber) {
        this.setState(({seats}) => {
            const index = seats.findIndex(elem => elem.id === id); 
            const oldSeat = seats[index];
            const newSeat = {...oldSeat, oldIp: NewOldIp, newIp: NewNewIp, seatNumber: NewSeatNumber}
            const newSeats = [...seats.slice(0, index), newSeat, ...seats.slice(index + 1)];

            return {
                seats: newSeats
            }
        })
    }

    table (elements, upfrom, upTo, lower) {
        const upseats = elements.filter((item) => {
            return item.key >= upfrom && item.key <= upTo;
        })
    
        const lowerseats = elements.filter((item) => {
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

    render() {
        const arrangementsFieldElements = this.state.seats.map((item) => {
            const {oldIp, newIp, seatNumber, id} = item;

            return (
                <td 
                    className="arrangements-table__сell"
                    key={id}>
                    <ArrangementsItem
                        id={id}
                        oldIp={oldIp}
                        newIp={newIp}
                        seatNumber={seatNumber}
                        onChangeSeatText={this.onChangeSeatText}/>
                </td>
            )
        })
        
        return (
            <div className="arrangements-field">
                {this.table(arrangementsFieldElements, 10, 12, 16)}
                {this.table(arrangementsFieldElements, 16, 18, 22)}
                {this.table(arrangementsFieldElements, 22, 24, 28)}
                {this.table(arrangementsFieldElements, 28, 30, 34)}
            </div>
        )
    }
}

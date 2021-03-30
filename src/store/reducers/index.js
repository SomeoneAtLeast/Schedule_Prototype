import {workers} from "../../models/schedule-model"
import {shifts, kmShifts, kmArr, glTable, workTeamsNames, months} from "../../models/shift-model/shift-model"
import {seats} from "../../models/seats-model"

const initialState = {
    workers,
    selectedWorker: 0,
    selectedDay: 0,
    filter: "all",
    allActive: true,
    workedActive: false,
    weekendsActive: false,
    vacationActive: false,
    shifts,
    glTable,
    kmTable: kmArr,
    kmShifts,
    workTeamsNames,
    months,
    seats,
    scheduleActive: true,
    seatsActive: false,
    workingshiftsActive: false,
    makeWorkingBtnActive: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "Select-Worker":
            return {
                ...state,
                selectedWorker: action.id
            }
        case "Clear-All-Days": {
            const newWorkers = [...state.workers]
            newWorkers.forEach((item) => {
                item.days.forEach((item) => {
                    item.selected = false;
                    item.changeShiftMenuOpen = false
                })
            })
            return {
                ...state,
                workers: newWorkers
            }
        }
        case "Change-Day-Type": {

            if (action.workerId === 0 || action.dayId === 0) {
                return {
                    ...state 
                }
            }

            if (action.workingTime === undefined) {
                action.workingTime = null;
            }

            const {workers} = state;
            const workerIndex = workers.findIndex(elem => elem.id === action.workerId);
            const dayIndex = workers[workerIndex].days.findIndex(elem => elem.id === action.dayId); 
            const newWorkers = [...workers.slice()];

            if (action.objKey === "selected" && newWorkers[workerIndex].days[dayIndex].changeShiftMenuOpen === true) {
                newWorkers[workerIndex].days[dayIndex].changeShiftMenuOpen = false
            }
            
            let selectedWorker = state.selectedWorker;
            let selectedDay = state.selectedDay;
            const targetDay = newWorkers[workerIndex].days[dayIndex];

            if (action.objKey === "worked") {
                targetDay.worked = true;
                targetDay.weekend = false;
                targetDay.vacation = false;
                targetDay.changeShiftMenuOpen = false;
                targetDay.selected = false;
                targetDay.workingShiftDay = action.workingTime;
                targetDay.workingHours = action.hoursCount;
                selectedWorker = 0;
                selectedDay = 0;
            } else if (action.objKey === "weekend") {
                targetDay.weekend = true;
                targetDay.worked = false;
                targetDay.vacation = false;
                targetDay.changeShiftMenuOpen = false;
                targetDay.selected = false;
                targetDay.workingShiftDay = null
                targetDay.workingHours = 0;
                selectedWorker = 0;
                selectedDay = 0;
            } else if (action.objKey === "vacation") {
                targetDay.vacation = true;
                targetDay.worked = false;
                targetDay.weekend = false;
                targetDay.changeShiftMenuOpen = false;
                targetDay.selected = false;
                targetDay.workingShiftDay = null
                targetDay.workingHours = 0;
                selectedWorker = 0;
                selectedDay = 0;
            } else if (action.objKey === "selected") {
                targetDay.selected = !targetDay.selected;
            } else if (action.objKey === "changeShiftMenuOpen") {
                targetDay.changeShiftMenuOpen = !targetDay.changeShiftMenuOpen;
            } else if (action.objKey === "takeOf") {
                targetDay.weekend = false;
                targetDay.worked = false;
                targetDay.vacation = false;
                targetDay.changeShiftMenuOpen = false;
                targetDay.selected = false;
                targetDay.workingShiftDay = null
                targetDay.workingHours = 0;
                selectedWorker = 0;
                selectedDay = 0;
            }

            if (action.scheduleType === "common") {
                if (action.objKey === "worked") {
                    newWorkers.forEach((item) => {
                        item.days.forEach((item) => {
                            if (item.selected) {
                                item.worked = true;
                                item.weekend = false;
                                item.vacation = false;
                                item.selected = false;
                                item.workingShiftDay = action.workingTime;
                                item.workingHours = action.hoursCount;
                                selectedWorker = 0;
                                selectedDay = 0;
                            }
                        })
                    })
                } else if (action.objKey === "weekend") {
                    newWorkers.forEach((item) => {
                        item.days.forEach((item) => {
                            if (item.selected) {
                                item.weekend = true
                                item.worked = false;
                                item.vacation = false;
                                item.selected = false;
                                item.workingShiftDay = null;
                                item.workingHours = 0;
                                selectedWorker = 0;
                                selectedDay = 0;
                            }
                        })
                    })
                } else if (action.objKey === "vacation") {
                    newWorkers.forEach((item) => {
                        item.days.forEach((item) => {
                            if (item.selected) {
                                item.vacation = true
                                item.worked = false;
                                item.weekend = false;
                                item.selected = false;
                                item.workingShiftDay = null;
                                item.workingHours = 0;
                                selectedWorker = 0;
                                selectedDay = 0;
                            }
                        })
                    })
                } else if (action.objKey === "takeOf") {
                    newWorkers.forEach((item) => {
                        item.days.forEach((item) => {
                            if (item.selected) {
                                item.vacation = false
                                item.worked = false;
                                item.weekend = false;
                                item.selected = false;
                                item.workingShiftDay = null;
                                item.workingHours = 0;
                                selectedWorker = 0;
                                selectedDay = 0;
                            }
                        })
                    })
                } else if (action.objKey === "clear") {
                    newWorkers.forEach((item) => {
                        item.days.forEach((item) => {
                            if (item.selected) {
                                item.selected = false;
                                selectedWorker = 0;
                                selectedDay = 0;
                            }
                        })
                    })
                }
            }

            if (action.scheduleType === "personal") {
                if (action.objKey === "selected") {
                    newWorkers[workerIndex].days.forEach(item => {
                        if (item.id !== (dayIndex + 1)) {
                            item[action.objKey] = false;
                            item.changeShiftMenuOpen = false;
                        }  
                    });
                }
            }
            return {
                ...state,
                selectedWorker: selectedWorker,
                selectedDay: selectedDay,
                workers: newWorkers
            }
        }
        case "Filter-Select": {
            return {
                ...state,
                filter: action.filter,
                allActive: true,
                workedActive: false,
                weekendsActive: false,
                vacationActive: false
            }
        }
        case "Make-Filter-Active": {
            if (action.id === -1) {
                return {
                    ...state,
                    allActive: true,
                    workedActive: false,
                    weekendsActive: false,
                    vacationActive: false
                }
            } else if (action.id === -2) {
                return {
                    ...state,
                    workedActive: true,
                    allActive: false,
                    weekendsActive: false,
                    vacationActive: false
                }
            } else if (action.id === -3) {
                return {
                    ...state,
                    weekendsActive: true,
                    workedActive: false,
                    allActive: false,
                    vacationActive: false
                }
            } else if (action.id === -4) {
                return {
                    ...state,
                    vacationActive: true,
                    workedActive: false,
                    allActive: false,
                    weekendsActive: false
                }
            }
        }
        break;
        case "Select-Day": {
            return {
                ...state,
                selectedWorker: action.selectedWorker,
                selectedDay: action.selectedDay,
            }
        }
        case "Change-Shift-Text": {
            const index = action.dataArr.findIndex(elem => elem.id === action.id); 
            const obj = action.dataArr[index];
            const newObj = {...obj};
            newObj[action.objKey] = action.e.target.value;
            const newArr = [...action.dataArr.slice(0, index), newObj, ...action.dataArr.slice(index + 1)];
            if (action.dataArr === state.shifts) {
                return {
                    ...state,
                    shifts: newArr
                } 
            } else if (action.dataArr === state.glTable) {
                return {
                    ...state,
                    glTable: newArr
                } 
            } else if (action.dataArr === state.kmShifts) {
                return {
                    ...state,
                    kmShifts: newArr
                } 
            } else if (action.dataArr === state.kmTable) {
                return {
                    ...state,
                    kmTable: newArr
                } 
            } else if (action.dataArr === state.workTeamsNames) {
                return {
                    ...state,
                    workTeamsNames: newArr
                } 
            } else if (action.dataArr === state.months) {
                return {
                    ...state,
                    months: newArr
                } 
            } else if (action.dataArr === state.workers) {
                return {
                    ...state,
                    workers: newArr
                } 
            }
        }
        break;
        case "Change-Seat-Text": {
            const index = state.seats.findIndex(elem => elem.id === action.id); 
            const oldSeat = state.seats[index];
            const newSeat = {...oldSeat, oldIp: action.NewOldIp, newIp: action.NewNewIp, seatNumber: action.NewSeatNumber}
            const newSeats = [...state.seats.slice(0, index), newSeat, ...state.seats.slice(index + 1)];
    
            return {
                ...state,
                seats: newSeats
            }
        }
        case "Make-Active-Nav-Btn": {
            if (action.btnName === "scheduleBtn") {
                return {
                    ...state,
                    scheduleActive: true,
                    seatsActive: false,
                    workingshiftsActive: false
                }
            } else if (action.btnName === "seatsBtn") {
                return {
                    ...state,
                    scheduleActive: false,
                    workingshiftsActive: false,
                    seatsActive: true
                }
            } else if (action.btnName === "workingshiftsBtn") {
                return {
                    ...state,
                    scheduleActive: false,
                    seatsActive: false,
                    workingshiftsActive: true
                }
            }
        }
        break;
        case "Change-Selected-Page": {
            if(action.location.pathname === "/seats/") {
                return {
                    ...state,
                    scheduleActive: false,
                    workingshiftsActive: false,
                    seatsActive: true
                }
            } else if (action.location.pathname === "/workingshifts/") {
                return {
                    ...state,
                    scheduleActive: false,
                    workingshiftsActive: true,
                    seatsActive: false
                }
            } else if (action.location.pathname === "/") {
                return {
                    ...state,
                    scheduleActive: true,
                    workingshiftsActive: false,
                    seatsActive: false
                }
            } else {
                return {
                    ...state
                }
            }
        }
        case "Show-Or-Close-Working-Hours": {
            return {
                ...state,
                makeWorkingBtnActive: !state.makeWorkingBtnActive
            }
        }
        case "Change-Schedule-Text": {
            const {workers} = state;
            const workerIndex = workers.findIndex(elem => elem.id === action.workerId);
            const dayIndex = workers[workerIndex].days.findIndex(elem => elem.id === action.dayId); 
            const oldDay = workers[workerIndex].days[dayIndex];
            const newDay = {...oldDay}
            newDay[action.objKey] = action.e.target.value;
            const newDays = [...workers[workerIndex].days.slice(0, dayIndex), newDay, ...workers[workerIndex].days.slice(dayIndex + 1)];
            const newWorker = {...workers[workerIndex], days: newDays}
            const newWorkers = [...workers.slice(0, workerIndex), newWorker, ...workers.slice(workerIndex + 1)];

            return {
                ...state,
                workers: newWorkers
            }
        }
        default:
            return state;    
    }
}
export default reducer;
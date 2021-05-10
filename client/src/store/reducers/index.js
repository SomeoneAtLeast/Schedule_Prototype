// import {workers} from "../../models/schedule-model"
import isEqual from 'lodash-es/isEqual';
import {kmArr, glTable, workTeamsNames, months} from "../../models/shift-model/shift-model"

const initialState = {
    workersOnServer: [],
    workers: [],
    unsavedChanges: false,
    currentYear: 1,
    currentMonth: 1,
    selectedWorker: 0,
    selectedDay: 0,
    selectedMonth: 0,
    filter: "all",
    allActive: true,
    workedActive: false,
    weekendsActive: false,
    vacationActive: false,
    shifts: [],
    glTable,
    kmTable: kmArr,
    kmShifts: [],
    workTeamsNames,
    months,
    seats: [],
    scheduleActive: true,
    seatsActive: false,
    workingshiftsActive: false,
    makeWorkingBtnActive: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "Workers-Loaded":
            return {
                ...state,
                workers: action.workers,
                loading: false
            }
        case "Get-Workers-On-Server":
            return {
                ...state,
                workersOnServer: action.workers
            }
        case "Seats-Loaded":
            return {
                ...state,
                seats: action.seats,
                loading: false
            }
        case "Shifts-Loaded":
            return {
                ...state,
                shifts: action.shifts,
                kmShifts: action.shiftsKm,
                loading: false
            }
        case "Select-Worker":
            return {
                ...state,
                selectedWorker: action.id
            }
        case "Clear-All-Days": {
            const newWorkers = [...state.workers]
            newWorkers.forEach((item) => {
                item.years[0].months[state.currentMonth - 1].days.forEach((item) => {
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

            const objKey = action.objKey;
            const workerId = action.workerId;
            const dayId = action.dayId;
            const scheduleType = action.scheduleType;
            let workingTime = action.workingTime;
            let hoursCount = action.hoursCount;

            if (workerId === 0 || dayId === 0) {
                return {
                    ...state 
                }
            }

            if (workingTime === undefined) {
                workingTime = null;
            }

            const {workers, selectedWorker, currentMonth, selectedDay} = state;
            const workerIndex = workers.findIndex(elem => elem.id === workerId);
            const dayIndex = workers[workerIndex].years[0].months[currentMonth - 1].days.findIndex(elem => elem.id === dayId); 
            const newWorkers = [...workers.slice()];

            const targetDay = newWorkers[workerIndex].years[0].months[currentMonth - 1].days[dayIndex];

            if (objKey === "selected" && targetDay.changeShiftMenuOpen === true) {
                targetDay.changeShiftMenuOpen = false
            }

            if (objKey === "worked") {
                targetDay.worked = true;
                targetDay.weekend = false;
                targetDay.vacation = false;
                targetDay.changeShiftMenuOpen = false;
                targetDay.selected = false;
                targetDay.workingShiftDay = workingTime;
                targetDay.workingHours = hoursCount;
            } else if (objKey === "weekend") {
                targetDay.weekend = true;
                targetDay.worked = false;
                targetDay.vacation = false;
                targetDay.changeShiftMenuOpen = false;
                targetDay.selected = false;
                targetDay.workingShiftDay = null
                targetDay.workingHours = 0;
            } else if (objKey === "vacation") {
                targetDay.vacation = true;
                targetDay.worked = false;
                targetDay.weekend = false;
                targetDay.changeShiftMenuOpen = false;
                targetDay.selected = false;
                targetDay.workingShiftDay = null
                targetDay.workingHours = 0;
            } else if (objKey === "selected") {
                targetDay.selected = !targetDay.selected;
            } else if (objKey === "changeShiftMenuOpen") {
                targetDay.changeShiftMenuOpen = !targetDay.changeShiftMenuOpen;
            } else if (objKey === "takeOf") {
                targetDay.weekend = false;
                targetDay.worked = false;
                targetDay.vacation = false;
                targetDay.changeShiftMenuOpen = false;
                targetDay.selected = false;
                targetDay.workingShiftDay = null
                targetDay.workingHours = 0;
            }

            if (scheduleType === "common") {
                if (objKey === "worked") {
                    newWorkers.forEach((item) => {
                        item.years[0].months[currentMonth - 1].days.forEach((item) => {
                            if (item.selected) {
                                item.worked = true;
                                item.weekend = false;
                                item.vacation = false;
                                item.selected = false;
                                item.workingShiftDay = workingTime;
                                item.workingHours = hoursCount;
                            }
                        })
                    })
                } else if (objKey === "weekend") {
                    newWorkers.forEach((item) => {
                        item.years[0].months[currentMonth - 1].days.forEach((item) => {
                            if (item.selected) {
                                item.weekend = true
                                item.worked = false;
                                item.vacation = false;
                                item.selected = false;
                                item.workingShiftDay = null;
                                item.workingHours = 0;
                            }
                        })
                    })
                } else if (objKey === "vacation") {
                    newWorkers.forEach((item) => {
                        item.years[0].months[currentMonth - 1].days.forEach((item) => {
                            if (item.selected) {
                                item.vacation = true
                                item.worked = false;
                                item.weekend = false;
                                item.selected = false;
                                item.workingShiftDay = null;
                                item.workingHours = 0;
                            }
                        })
                    })
                } else if (objKey === "takeOf") {
                    newWorkers.forEach((item) => {
                        item.years[0].months[currentMonth - 1].days.forEach((item) => {
                            if (item.selected) {
                                item.vacation = false
                                item.worked = false;
                                item.weekend = false;
                                item.selected = false;
                                item.workingShiftDay = null;
                                item.workingHours = 0;
                            }
                        })
                    })
                } else if (objKey === "clear") {
                    newWorkers.forEach((item) => {
                        item.years[0].months[currentMonth - 1].days.forEach((item) => {
                            if (item.selected) {
                                item.selected = false;
                            }
                        })
                    })
                }
            }

            if (scheduleType === "personal") {
                if (objKey === "selected") {
                    newWorkers[workerIndex].years[0].months[currentMonth - 1].days.forEach(item => {
                        if (item.id !== (dayIndex + 1)) {
                            item[objKey] = false;
                            item.changeShiftMenuOpen = false;
                        }  
                    });
                }
            }
            return {
                ...state,
                selectedWorker,
                selectedDay,
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
        case "Make-Filter-Active": 
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
        break;
        case "Select-Day": {
            return {
                ...state,
                selectedWorker: action.selectedWorker,
                selectedDay: action.selectedDay,
            }
        }
        case "Select-Month": {
            return {
                ...state,
                selectedWorker: action.selectedWorker,
                selectedMonth: action.selectedMonth,
            }
        }
        case "Change-Shift-Text": {
            const dataArr = action.dataArr;
            const index = dataArr.findIndex(elem => elem.id === action.id); 
            const obj = dataArr[index];
            const newObj = {...obj};
            newObj[action.objKey] = action.e.target.value;
            const newArr = [...dataArr.slice(0, index), newObj, ...dataArr.slice(index + 1)];
            if (dataArr === state.shifts) {
                return {
                    ...state,
                    shifts: newArr
                } 
            } else if (dataArr === state.glTable) {
                return {
                    ...state,
                    glTable: newArr
                } 
            } else if (dataArr === state.kmShifts) {
                return {
                    ...state,
                    kmShifts: newArr
                } 
            } else if (dataArr === state.kmTable) {
                return {
                    ...state,
                    kmTable: newArr
                } 
            } else if (dataArr === state.workTeamsNames) {
                return {
                    ...state,
                    workTeamsNames: newArr
                } 
            } else if (dataArr === state.months) {
                return {
                    ...state,
                    months: newArr
                } 
            } else if (dataArr === state.workers) {
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
        case "Make-Active-Nav-Btn":
            if (action.btnName === "scheduleBtn") {
                return {
                    ...state,
                    scheduleActive: true,
                    seatsActive: false,
                    workingshiftsActive: false
                }
            } 

            if (action.btnName === "seatsBtn") {
                return {
                    ...state,
                    scheduleActive: false,
                    workingshiftsActive: false,
                    seatsActive: true
                }
            }

            if (action.btnName === "workingshiftsBtn") {
                return {
                    ...state,
                    scheduleActive: false,
                    seatsActive: false,
                    workingshiftsActive: true
                }
            }
        break;
        case "Change-Selected-Page": {

            const url = action.location.pathname;

            if(url === "/seats/") {
                return {
                    ...state,
                    scheduleActive: false,
                    workingshiftsActive: false,
                    seatsActive: true
                }
            } else if (url === "/workingshifts/") {
                return {
                    ...state,
                    scheduleActive: false,
                    workingshiftsActive: true,
                    seatsActive: false
                }
            } else if (url === "/") {
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
            const {workers, currentYear, currentMonth} = state;
            const workerIndex = workers.findIndex(elem => elem.id === action.workerId);
            const targetWorker = workers[workerIndex];
            const dayIndex = targetWorker.years[0].months[currentMonth - 1].days.findIndex(elem => elem.id === action.dayId); 
            const oldDay = targetWorker.years[0].months[currentMonth - 1].days[dayIndex];
            const newDay = {...oldDay};
            newDay[action.objKey] = action.e.target.value;
            const newDays = [...targetWorker.years[0].months[currentMonth - 1].days.slice(0, dayIndex), newDay, ...targetWorker.years[0].months[currentMonth - 1].days.slice(dayIndex + 1)];
            const oldMonth = {...targetWorker.years[0].months[currentMonth - 1]};
            const newMonth = {...oldMonth, days: newDays};
            const newMonths = [...targetWorker.years[0].months.slice(0, currentMonth - 1), newMonth, ...targetWorker.years[0].months.slice(currentMonth)];


            const oldYear = {...targetWorker.years[0]};
            const newYear = {...oldYear, months: newMonths};

            const newYears = [...targetWorker.years.slice(0, 0), newYear, ...targetWorker.years.slice(currentYear)];


            const newWorker = {...targetWorker, years: newYears};
            const newWorkers = [...workers.slice(0, workerIndex), newWorker, ...workers.slice(workerIndex + 1)];

            return {
                ...state,
                workers: newWorkers
            }
        }
        case "Change-Month": {

            let {currentMonth, workers, workersOnServer} = state;

            if (!isEqual(workers, workersOnServer)) {
                return {
                    ...state,
                    unsavedChanges: true
                }
            }

            if (action.direction === "back" && currentMonth >= 2) {
                return {
                    ...state,
                    unsavedChanges: false,
                    currentMonth: --currentMonth
                }
            }

            if (action.direction === "next" && currentMonth <= 11) {
                return {
                    ...state,
                    unsavedChanges: false,
                    currentMonth: ++currentMonth
                }
            }

            return state; 
        }
        case "Change-Year": {

            let {currentYear, workers, workersOnServer} = state;
            
            if (!isEqual(workers, workersOnServer)) {
                return {
                    ...state,
                    unsavedChanges: true
                }
            }

            if (action.direction === "back" && currentYear >= 2) {
                return {
                    ...state,
                    unsavedChanges: false,
                    currentYear: --currentYear
                }
            }

            if (action.direction === "next" && currentYear <= 1) {
                return {
                    ...state,
                    unsavedChanges: false,
                    currentYear: ++currentYear
                }
            }

            return state; 
        }
        case "Unsaved-Changes-Status": {
            return {
                ...state,
                unsavedChanges: action.status
            }
        }          
        default:
            return state;    
    }
}

export default reducer;
import isEqual from 'lodash-es/isEqual';
import {kmArr, glTable, workTeamsNames, months} from "../../models/shift-model/shift-model"

const initialState = {
    workersOnServer: [],
    workers: [],
    dates: [],
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
            }
        case "Dates-Loaded":
            return {
                ...state,
                dates: action.dates,
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
            }
        case "Shifts-Loaded":
            return {
                ...state,
                shifts: action.shifts,
                kmShifts: action.shiftsKm,
            }
        case "Select-Worker":
            return {
                ...state,
                selectedWorker: action.id
            }
        case "Change-Monthly-Norm": {
            const {workers, currentMonth} = state;
            const newWorkers = [...workers.slice()];

            newWorkers.forEach((worker) => {
                let workingHours = 0;
                const targetMonth = worker.years[0].months[currentMonth - 1];
                const targetDays = worker.years[0].months[currentMonth - 1].days;

                targetDays.forEach((day) => {
                    workingHours = workingHours + day.workingHours

                })
                targetMonth.additionalInformation[0].value = workingHours;
            })


            return {
                ...state,
                workers: newWorkers
            }
        }
        case "Change-Number-Of-Shifts": {
            const {workers, currentMonth} = state;
            const newWorkers = [...workers.slice()];
        
            newWorkers.forEach((worker) => {

                const targetMonth = worker.years[0].months[currentMonth - 1];
                const targetDays = worker.years[0].months[currentMonth - 1].days;
                const isNightWorker = targetMonth.monthlyShiftData.nightWorker;
                const isKmWorker = targetMonth.monthlyShiftData.kmWorker;
                const groupLeader = targetMonth.monthlyShiftData.groupLeader;
                const nonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
                const director = targetMonth.monthlyShiftData.director;

                let shifts = 0;

                if (groupLeader || nonLinearWorker || director) {
                    targetMonth.additionalInformation[2].value = "-";
                } else if (isNightWorker) {

                    targetDays.forEach((day) => {
                        if (day.workingHours > 3) {
                            shifts = shifts + 1
                        }
                    })

                    targetMonth.additionalInformation[2].value = shifts + 1;
                } else if (isKmWorker) {

                    targetDays.forEach((day) => {
                        if (day.workingHours > 3) {
                            shifts = shifts + 1
                        }
                    })

                    targetMonth.additionalInformation[2].value = shifts;
                } else {
                    targetDays.forEach((day) => {
                        if (day.workingHours > 0) {
                            shifts = shifts + 1
                        }
                    })

                    targetMonth.additionalInformation[2].value = shifts;
                }
            })
        
        
            return {
                ...state,
                workers: newWorkers
            }
        }
        case "Change-Number-Of-Breaks": {
            const {workers, currentMonth} = state;
            const newWorkers = [...workers.slice()];
        
            newWorkers.forEach((worker) => {

                const targetMonth = worker.years[0].months[currentMonth - 1];
                const targetDays = worker.years[0].months[currentMonth - 1].days;
                const isNightWorker = targetMonth.monthlyShiftData.nightWorker;
                const isKmWorker = targetMonth.monthlyShiftData.kmWorker;
                const nonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
                const groupLeader = targetMonth.monthlyShiftData.groupLeader;
                const director = targetMonth.monthlyShiftData.director;

                let shifts = 0;

                if (isNightWorker) {

                    targetDays.forEach((day) => {
                        if (day.workingHours > 3) {
                            shifts = shifts + 1
                        }
                    })

                    shifts = shifts + 1;
                } else if (isKmWorker) {

                    targetDays.forEach((day) => {
                        if (day.workingHours > 3) {
                            shifts = shifts + 1
                        }
                    })

                } else {
                    targetDays.forEach((day) => {
                        if (day.workingHours > 0) {
                            shifts = shifts + 1
                        }
                    })
                }

                const initialValue = shifts * 50 / 60;
                let breaksOrgignal = Number(initialValue.toFixed(1));
                let breaks = Math.round(initialValue);

                if (groupLeader || nonLinearWorker|| director) {
                    breaksOrgignal = "-";
                    breaks = "-";
                }

                targetMonth.additionalInformation[3].value = breaks;
                targetMonth.additionalInformation[10].value = breaksOrgignal;
            })
        
        
            return {
                ...state,
                workers: newWorkers
            }
        }
        case "Change-Norm": {
            const {workers, currentMonth} = state;
            const newWorkers = [...workers.slice()];

            newWorkers.forEach((worker) => {
                const targetMonth = worker.years[0].months[currentMonth - 1];
                const groupLeader = targetMonth.monthlyShiftData.groupLeader;
                const director = targetMonth.monthlyShiftData.director;
                let norm = targetMonth.additionalInformation[0].value;

                if (groupLeader) {
                    const groupLeaderTeamNumber = worker.years[0].months[currentMonth - 1].shiftAndTeam[1].value;
                    let normAllWorkers = 0;

                    newWorkers.forEach((worker) => {
                        const targetMonth = worker.years[0].months[currentMonth - 1];
                        const isGroupLeader = targetMonth.monthlyShiftData.groupLeader;
                        const isNonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
                        const isDirector = targetMonth.monthlyShiftData.director;

                        if (targetMonth.shiftAndTeam[1].value === groupLeaderTeamNumber &&
                            !isGroupLeader && !isNonLinearWorker && !isDirector) {
                            let workingHours = 0;
                            const targetDays = worker.years[0].months[currentMonth - 1].days;
        
                            targetDays.forEach((day) => {
                                workingHours = workingHours + day.workingHours
            
                            })
    
                            normAllWorkers = normAllWorkers + workingHours;
                        }
                    })

                    norm = normAllWorkers;
                }
  
                if (director) {
                    let normAllGroupLeaders = 0;

                    newWorkers.forEach((worker) => {
                        const targetMonth = worker.years[0].months[currentMonth - 1];
                        const isGroupLeader = targetMonth.monthlyShiftData.groupLeader;
                        const isNonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
                        const isDirector = targetMonth.monthlyShiftData.director;

                        if (!isGroupLeader && !isNonLinearWorker && !isDirector) {
                            let workingHours = 0;
                            const targetDays = worker.years[0].months[currentMonth - 1].days;
        
                            targetDays.forEach((day) => {
                                workingHours = workingHours + day.workingHours
                            })
    
                            normAllGroupLeaders = normAllGroupLeaders + workingHours;
                        }
                    })

                    norm = normAllGroupLeaders;
                }

                targetMonth.additionalInformation[4].value = norm;
            })
        
        
            return {
                ...state,
                workers: newWorkers
            }
        }
        case "Change-With-Training/Breaks": {
            const {workers, currentMonth} = state;
            const newWorkers = [...workers.slice()];
        
            newWorkers.forEach((worker) => {
                let shifts = 0;

                const targetMonth = worker.years[0].months[currentMonth - 1];
                const targetDays = worker.years[0].months[currentMonth - 1].days;
                const isNightWorker = targetMonth.monthlyShiftData.nightWorker;
                const isKmWorker = targetMonth.monthlyShiftData.kmWorker;
                const nonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
                const groupLeader = targetMonth.monthlyShiftData.groupLeader;
                const director = targetMonth.monthlyShiftData.director;

                if (isNightWorker) {

                    targetDays.forEach((day) => {
                        if (day.workingHours > 3) {
                            shifts = shifts + 1
                        }
                    })

                    shifts = shifts + 1;
                } else if (isKmWorker) {

                    targetDays.forEach((day) => {
                        if (day.workingHours > 3) {
                            shifts = shifts + 1
                        }
                    })

                } else {
                    targetDays.forEach((day) => {
                        if (day.workingHours > 0) {
                            shifts = shifts + 1
                        }
                    })
                }

                const initialBreaks = shifts * 50 / 60;
                const norm = targetMonth.additionalInformation[0].value;
                const training = targetMonth.additionalInformation[14].value;
                const withTrainingBreaksOrigin = norm - initialBreaks - training;

                let withTrainingBreaks = Number(withTrainingBreaksOrigin.toFixed(2));

                if (withTrainingBreaks < 0) {
                    withTrainingBreaks = 0;
                }

                if (groupLeader) {
                    const groupLeaderTeamNumber = worker.years[0].months[currentMonth - 1].shiftAndTeam[1].value;
                    let withTrainingBreaksAllWorkers = 0;

                    newWorkers.forEach((worker) => {
                        const targetMonth = worker.years[0].months[currentMonth - 1];
                        const isGroupLeader = targetMonth.monthlyShiftData.groupLeader;
                        const isNonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
                        const isDirector = targetMonth.monthlyShiftData.director;

                        if (targetMonth.shiftAndTeam[1].value === groupLeaderTeamNumber &&
                            !isGroupLeader && !isNonLinearWorker && !isDirector) {
                            let shifts = 0;
                            const targetDays = worker.years[0].months[currentMonth - 1].days;
        
                            if (isNightWorker) {
                                targetDays.forEach((day) => {
                                    if (day.workingHours > 3) {
                                        shifts = shifts + 1
                                    }
                                })
            
                                shifts = shifts + 1;
                            } else if (isKmWorker) {
                                targetDays.forEach((day) => {
                                    if (day.workingHours > 3) {
                                        shifts = shifts + 1
                                    }
                                })
            
                            } else {
                                targetDays.forEach((day) => {
                                    if (day.workingHours > 0) {
                                        shifts = shifts + 1
                                    }
                                })
                            }
            
                            const initialBreaks = shifts * 50 / 60;

                            const norm = targetMonth.additionalInformation[0].value;
                            const training = targetMonth.additionalInformation[14].value;
                            let withTrainingBreaks = norm - initialBreaks - training;
            
                            if (withTrainingBreaks < 0) {
                                withTrainingBreaks = 0;
                            }


                            withTrainingBreaksAllWorkers = withTrainingBreaksAllWorkers + withTrainingBreaks;
                        }
                    })

                    withTrainingBreaks = Number(withTrainingBreaksAllWorkers.toFixed(0));
                }

                if (nonLinearWorker) {
                    withTrainingBreaks = norm;
                }

                if (director) {
                    let withTrainingBreaksAllGroupLeaders = 0;

                    newWorkers.forEach((worker) => {
                        const targetMonth = worker.years[0].months[currentMonth - 1];
                        const isGroupLeader = targetMonth.monthlyShiftData.groupLeader;
                        const isNonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
                        const isDirector = targetMonth.monthlyShiftData.director;

                        if (!isGroupLeader && !isNonLinearWorker && !isDirector) {

                            let shifts = 0;
                            const targetDays = worker.years[0].months[currentMonth - 1].days;
        
                            if (isNightWorker) {
                                targetDays.forEach((day) => {
                                    if (day.workingHours > 3) {
                                        shifts = shifts + 1
                                    }
                                })
            
                                shifts = shifts + 1;
                            } else if (isKmWorker) {
                                targetDays.forEach((day) => {
                                    if (day.workingHours > 3) {
                                        shifts = shifts + 1
                                    }
                                })
            
                            } else {
                                targetDays.forEach((day) => {
                                    if (day.workingHours > 0) {
                                        shifts = shifts + 1
                                    }
                                })
                            }
            
                            const initialBreaks = shifts * 50 / 60;

                            const norm = targetMonth.additionalInformation[0].value;
                            const training = targetMonth.additionalInformation[14].value;
                            let withTrainingBreaks = norm - initialBreaks - training;
            
                            if (withTrainingBreaks < 0) {
                                withTrainingBreaks = 0;
                            }


                            withTrainingBreaksAllGroupLeaders = withTrainingBreaksAllGroupLeaders + withTrainingBreaks;
                        }
                    })

                    withTrainingBreaks = Number(withTrainingBreaksAllGroupLeaders.toFixed(0));
                }


                targetMonth.additionalInformation[5].value = withTrainingBreaks;
            })
        
            
            return {
                ...state,
                workers: newWorkers
            }
        }
        case "Change-With-A-Decreasing-Coefficient": {
            const {workers, currentMonth} = state;
            const newWorkers = [...workers.slice()];
        
            newWorkers.forEach((worker) => {
                const targetMonth = worker.years[0].months[currentMonth - 1];
                const withTrainingBreaks = targetMonth.additionalInformation[5].value;
                let withADecreasingCoefficient = withTrainingBreaks * targetMonth.additionalInformation[11].value;
                const nonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
                const groupLeader = targetMonth.monthlyShiftData.groupLeader;
                const director = targetMonth.monthlyShiftData.director;

                if (groupLeader) {
                    const groupLeaderTeamNumber = worker.years[0].months[currentMonth - 1].shiftAndTeam[1].value;
                    let withADecreasingCoefficientAllWorkers = 0;

                    newWorkers.forEach((worker) => {
                        const targetMonth = worker.years[0].months[currentMonth - 1];
                        const isGroupLeader = targetMonth.monthlyShiftData.groupLeader;
                        const isNonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
                        const isDirector = targetMonth.monthlyShiftData.director;

                        if (targetMonth.shiftAndTeam[1].value === groupLeaderTeamNumber &&
                            !isGroupLeader && !isNonLinearWorker && !isDirector) {
                            const withTrainingBreaks = targetMonth.additionalInformation[5].value;
                            const workingHours = withTrainingBreaks.toFixed() * targetMonth.additionalInformation[11].value;

    
                            withADecreasingCoefficientAllWorkers = withADecreasingCoefficientAllWorkers + workingHours;
                        }
                    })

                    withADecreasingCoefficient = Number(withADecreasingCoefficientAllWorkers);
                }

                if (nonLinearWorker) {
                    withADecreasingCoefficient = withTrainingBreaks;
                }

                if (director) {

                    let withADecreasingCoefficientAllGroupLeaders = 0;

                    newWorkers.forEach((worker) => {
                        const targetMonth = worker.years[0].months[currentMonth - 1];
                        const isGroupLeader = targetMonth.monthlyShiftData.groupLeader;
                        const isNonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
                        const isDirector = targetMonth.monthlyShiftData.director;

                        if (!isGroupLeader && !isNonLinearWorker && !isDirector) {
                            const withTrainingBreaks = targetMonth.additionalInformation[5].value;
                            const workingHours = withTrainingBreaks.toFixed() * targetMonth.additionalInformation[11].value;

    
                            withADecreasingCoefficientAllGroupLeaders = withADecreasingCoefficientAllGroupLeaders + workingHours;
                        }
                    })

                    withADecreasingCoefficient = Number(withADecreasingCoefficientAllGroupLeaders);
                }

                targetMonth.additionalInformation[6].value = withADecreasingCoefficient.toFixed();
            })
        
            
            return {
                ...state,
                workers: newWorkers
            }
        }
        case "Change-Total-With-The-Night": {
            const {workers, currentMonth} = state;
            const newWorkers = [...workers.slice()];

            newWorkers.forEach((worker) => {
                const targetMonth = worker.years[0].months[currentMonth - 1];
                const withADecreasingCoefficient = targetMonth.additionalInformation[6].value;
                const coefficientNight = targetMonth.additionalInformation[12].value;
                let totalWithTheNight = withADecreasingCoefficient * coefficientNight;
                const nonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
                const groupLeader = targetMonth.monthlyShiftData.groupLeader;

                if (groupLeader) {
                    const groupLeaderTeamNumber = worker.years[0].months[currentMonth - 1].shiftAndTeam[1].value;
                    let totalWithTheNightAllWorkers = 0;

                    newWorkers.forEach((worker) => {
                        const targetMonth = worker.years[0].months[currentMonth - 1];
                        const withADecreasingCoefficient = targetMonth.additionalInformation[6].value;
                        const coefficientNight = targetMonth.additionalInformation[12].value;
                        const isGroupLeader = targetMonth.monthlyShiftData.groupLeader;
                        const isNonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
                        const isDirector = targetMonth.monthlyShiftData.director;

                        if (targetMonth.shiftAndTeam[1].value === groupLeaderTeamNumber &&
                            !isGroupLeader && !isNonLinearWorker && !isDirector) {

                            const workingHours = withADecreasingCoefficient * coefficientNight;

    
                            totalWithTheNightAllWorkers = totalWithTheNightAllWorkers + workingHours;
                        }
                    })

                    totalWithTheNight = Number(totalWithTheNightAllWorkers);
                }

                if (nonLinearWorker) {
                    totalWithTheNight = Number(withADecreasingCoefficient);
                }

                if (isNaN(totalWithTheNight)) {
                    return {
                        ...state
                    }
                }
                
                targetMonth.additionalInformation[7].value = totalWithTheNight.toFixed(1);
            })
        
            
            return {
                ...state,
                workers: newWorkers
            }
        }
        case "Change-Message-Plan": {
            const {workers, dates, currentMonth} = state;
            const newWorkers = [...workers.slice()];
        
            newWorkers.forEach((worker) => {
                const targetMonth = worker.years[0].months[currentMonth - 1];
                const isNightWorker = targetMonth.monthlyShiftData.nightWorker;
                const isKmWorker = targetMonth.monthlyShiftData.kmWorker;
                const nonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
                const groupLeader = targetMonth.monthlyShiftData.groupLeader;
                const withADecreasingCoefficient = targetMonth.additionalInformation[6].value;
                const efficiencyPerHour = dates[0].months[currentMonth - 1].efficiencyPerHour;
                const numberOfAcknowledgements = dates[0].months[currentMonth - 1].numberOfAcknowledgements;
                const coefficientNight = targetMonth.additionalInformation[12].value;


                if (isNightWorker) {

                    const messagePlan = (withADecreasingCoefficient / 2 * efficiencyPerHour) + (withADecreasingCoefficient / 2 * (coefficientNight * 10));

                    if (isNaN(messagePlan)) {
                        return {
                            ...state
                        }
                    }

                    targetMonth.additionalInformation[8].value = messagePlan.toFixed();


                    return {
                        ...state,
                        workers: newWorkers
                    }
                }

                if (isKmWorker) {

                    const messagePlan = withADecreasingCoefficient * numberOfAcknowledgements;
                    targetMonth.additionalInformation[8].value = messagePlan.toFixed(2);

                    return {
                        ...state,
                        workers: newWorkers
                    }
                }

                if (nonLinearWorker) {

                    const messagePlan = "-";
                    targetMonth.additionalInformation[8].value = messagePlan;

                    return {
                        ...state,
                        workers: newWorkers
                    }
                }

                let messagePlan = withADecreasingCoefficient * efficiencyPerHour;


                if (groupLeader) {
                    const groupLeaderTeamNumber = worker.years[0].months[currentMonth - 1].shiftAndTeam[1].value;
                    let messagePlanAllWorkers = 0;

                    newWorkers.forEach((worker) => {
                        const targetMonth = worker.years[0].months[currentMonth - 1];
                        const withADecreasingCoefficient = targetMonth.additionalInformation[6].value;
                        const efficiencyPerHour = dates[0].months[currentMonth - 1].efficiencyPerHour;
                        const numberOfAcknowledgements = dates[0].months[currentMonth - 1].numberOfAcknowledgements;
                        const coefficientNight = targetMonth.additionalInformation[12].value;
                        const isGroupLeader = targetMonth.monthlyShiftData.groupLeader;
                        const isNonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
                        const isDirector = targetMonth.monthlyShiftData.director;
                        let messagePlanOneWorker = 0;
                        
                        if (targetMonth.shiftAndTeam[1].value === groupLeaderTeamNumber &&
                            !isGroupLeader && !isNonLinearWorker && !isDirector) {

                            if (isNightWorker) {
                                messagePlanOneWorker = (withADecreasingCoefficient / 2 * efficiencyPerHour) + (withADecreasingCoefficient / 2 * (coefficientNight * 10));
                            }
            
                            if (isKmWorker) {
                                messagePlanOneWorker = withADecreasingCoefficient * numberOfAcknowledgements;
                            }
            
                            messagePlanOneWorker = withADecreasingCoefficient * efficiencyPerHour;
                            messagePlanAllWorkers = messagePlanAllWorkers + messagePlanOneWorker;
                        }
                    })

                    messagePlan = messagePlanAllWorkers
                }

                targetMonth.additionalInformation[8].value = messagePlan.toFixed();
            })
        
            
            return {
                ...state,
                workers: newWorkers
            }
        }
        case "Change-Acknowledgements": {
            const {workers, currentMonth} = state;
            const newWorkers = [...workers.slice()];
        
            newWorkers.forEach((worker) => {
                const targetMonth = worker.years[0].months[currentMonth - 1];
                const nonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
                const groupLeader = targetMonth.monthlyShiftData.groupLeader;
                let acknowledgements = 3;

                if (groupLeader) {
                    const groupLeaderTeamNumber = worker.years[0].months[currentMonth - 1].shiftAndTeam[1].value;
                    let acknowledgementsAllWorkers = 0;

                    newWorkers.forEach((worker) => {
                        const targetMonth = worker.years[0].months[currentMonth - 1];
                        const isGroupLeader = targetMonth.monthlyShiftData.groupLeader;
                        const isNonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
                        const isDirector = targetMonth.monthlyShiftData.director;

                        if (targetMonth.shiftAndTeam[1].value === groupLeaderTeamNumber &&
                            !isGroupLeader && !isNonLinearWorker && !isDirector) {
                            const acknowledgementsOneWorker = targetMonth.additionalInformation[9].value;
    
                            acknowledgementsAllWorkers = acknowledgementsAllWorkers + Number(acknowledgementsOneWorker);
                        }
                    })

                    acknowledgements = acknowledgementsAllWorkers;
                }

                if (nonLinearWorker) {
                    acknowledgements = "-";
                }

                targetMonth.additionalInformation[9].value = acknowledgements;
            })
        
            
            return {
                ...state,
                workers: newWorkers
            }
        }
        case "Change-Second-Breaks": {
            const {workers, currentMonth} = state;
            const newWorkers = [...workers.slice()];
        
            newWorkers.forEach((worker) => {
                const targetMonth = worker.years[0].months[currentMonth - 1];
                const groupLeader = targetMonth.monthlyShiftData.groupLeader;
                let secondBreaks = 0;

                if (groupLeader) {
                    const groupLeaderTeamNumber = worker.years[0].months[currentMonth - 1].shiftAndTeam[1].value;
                    let secondBreaksAllWorkers = 0;

                    newWorkers.forEach((worker) => {
                        const targetMonth = worker.years[0].months[currentMonth - 1];
                        const isGroupLeader = targetMonth.monthlyShiftData.groupLeader;
                        const isNonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
                        const isDirector = targetMonth.monthlyShiftData.director;

                        if (targetMonth.shiftAndTeam[1].value === groupLeaderTeamNumber &&
                            !isGroupLeader && !isNonLinearWorker && !isDirector) {
                            const secondBreaksOneWorker = targetMonth.additionalInformation[10].value;
    
                            secondBreaksAllWorkers = secondBreaksAllWorkers + secondBreaksOneWorker;
                        }
                    })

                    secondBreaks = secondBreaksAllWorkers;
                    targetMonth.additionalInformation[10].value = secondBreaks;
                }

            })
        
            
            return {
                ...state,
                workers: newWorkers
            }
        }
        case "Change-Сoefficient": {
            const {workers, currentMonth, selectedWorker} = state;
            const newWorkers = [...workers.slice()];
            const targetMonth = newWorkers[selectedWorker].years[0].months[currentMonth - 1];
            const nonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
            const groupLeader = targetMonth.monthlyShiftData.groupLeader;


            if (groupLeader || nonLinearWorker) {
                targetMonth.additionalInformation[11].value = "-";
            } else {   
                targetMonth.additionalInformation[11].value = 1; 
            }
    

            return {
                ...state,
                workers: newWorkers
            }
        }
        case "Change-Сoefficient-Night": {
            const {workers, currentMonth, selectedWorker} = state;
            const newWorkers = [...workers.slice()];
            const targetMonth = newWorkers[selectedWorker].years[0].months[currentMonth - 1];
            const isNightWorker = targetMonth.monthlyShiftData.nightWorker;
            const nonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
            const groupLeader = targetMonth.monthlyShiftData.groupLeader;


            if (groupLeader || nonLinearWorker) {
                targetMonth.additionalInformation[12].value = "-";
            } else if (isNightWorker) {
                targetMonth.additionalInformation[12].value = 0.75; 
            }
            else {   
                targetMonth.additionalInformation[12].value = 1; 
            }
    

            return {
                ...state,
                workers: newWorkers
            }
        }
        case "Change-Adjustment": {
            const {workers, currentMonth} = state;
            const newWorkers = [...workers.slice()];
        
            newWorkers.forEach((worker) => {
                const targetMonth = worker.years[0].months[currentMonth - 1];
                const monthlyNorm = targetMonth.additionalInformation[0].value;
                const totalWithTheNight = targetMonth.additionalInformation[7].value;
                const nonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
                const groupLeader = targetMonth.monthlyShiftData.groupLeader;
                let adjustment = totalWithTheNight / monthlyNorm;

                if (isNaN(adjustment)) {
                    return {
                        ...state
                    }
                }

                if (groupLeader || nonLinearWorker) {
                    targetMonth.additionalInformation[13].value = "-";
                } else {
                    targetMonth.additionalInformation[13].value = adjustment.toFixed(2);
                }
            })
        
            
            return {
                ...state,
                workers: newWorkers
            }
        }
        case "Change-Training": {
            const {workers, currentMonth, selectedWorker} = state;
            const newWorkers = [...workers.slice()];
            const targetMonth = newWorkers[selectedWorker].years[0].months[currentMonth - 1];
            const nonLinearWorker = targetMonth.monthlyShiftData.nonLinearWorker;
            const groupLeader = targetMonth.monthlyShiftData.groupLeader;


            if (groupLeader || nonLinearWorker) {
                targetMonth.additionalInformation[14].value = "-";
            } else {   
                targetMonth.additionalInformation[14].value = 8; 
            }
    

            return {
                ...state,
                workers: newWorkers
            }
        }
        case "Save-Worker-Settings": {

            const workerData = action.workerData;

            const {workers, selectedWorker, currentMonth} = state;
            const newWorkers = [...workers.slice()];
            const targetWorker = newWorkers[selectedWorker];
            const targetMonth = newWorkers[selectedWorker].years[0].months[currentMonth - 1];

            targetWorker.name = workerData.workerName;

            targetMonth.monthlyShiftData.nightWorker = null;
            targetMonth.monthlyShiftData.kmWorker = null;
            targetMonth.monthlyShiftData.groupLeader = null;
            targetMonth.monthlyShiftData.nonLinearWorker = null;
            targetMonth.monthlyShiftData.director = null;

            if (workerData.workerType === "Ночная смена SMM") {
                targetMonth.monthlyShiftData.nightWorker = true;
            }

            if (workerData.workerType === "КМ") {
                targetMonth.monthlyShiftData.kmWorker = true;
            }

            if (workerData.workerType === "Групп Лидер") {
                targetMonth.monthlyShiftData.groupLeader = true;
            }

            if (workerData.workerType === "Нелинейный сотрудник") {
                targetMonth.monthlyShiftData.nonLinearWorker = true;
            }

            if (workerData.workerType === "Руководитель") {
                targetMonth.monthlyShiftData.director = true;
            }

            if (workerData.workingShiftMonth) {
                targetMonth.monthlyShiftData.workingShiftMonth = workerData.workingShiftMonth;
            }

            targetMonth.additionalInformation[1].value = workerData.segment;

            return {
                ...state,
                workers: newWorkers
            }

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
            const {workers, currentMonth} = state;
            const newWorkers = [...workers.slice()];
            const workerIndex = newWorkers.findIndex(elem => elem.id === action.workerId);
            const targetWorker = newWorkers[workerIndex];
            const dayIndex = targetWorker.years[0].months[currentMonth - 1].days.findIndex(elem => elem.id === action.dayId); 
            const targetDay = targetWorker.years[0].months[currentMonth - 1].days[dayIndex];
            
            if (isNaN(action.e.target.value)) {
                return {
                    ...state
                }
            }

            targetDay[action.objKey] = +action.e.target.value;

            return {
                ...state,
                workers: newWorkers
            }
        }
        case "Change-Additional-Information-Text": {
            const {workers, currentMonth} = state;
            const newWorkers = [...workers.slice()];
            const targetMonth = newWorkers[action.workerId].years[0].months[currentMonth - 1];
            
            if (isNaN(action.e.target.value)) {
                return {
                    ...state
                }
            }

            if (action.objKey === "coefficient") {
                targetMonth.additionalInformation[11].value = action.e.target.value;

                return {
                    ...state,
                    workers: newWorkers
                }
            }

            if (action.objKey === "acknowledgements") {
                targetMonth.additionalInformation[9].value = action.e.target.value;

                return {
                    ...state,
                    workers: newWorkers
                }
            }

            if (action.objKey === "coefficientNight") {
                targetMonth.additionalInformation[12].value = action.e.target.value;

                return {
                    ...state,
                    workers: newWorkers
                }
            }

            if (action.objKey === "training") {
                targetMonth.additionalInformation[14].value = action.e.target.value;

                return {
                    ...state,
                    workers: newWorkers
                }
            }

            return {
                ...state,
            }
        }
        case "Change-Shift-And-Team-Text": {
            const {workers, currentMonth} = state;
            const newWorkers = [...workers.slice()];
            const targetMonth = newWorkers[action.workerId].years[0].months[currentMonth - 1];
        
            if (isNaN(action.e.target.value)) {
                return {
                    ...state
                }
            }
            
            if (action.objKey === "shift№") {
                targetMonth.shiftAndTeam[0].value = Number(action.e.target.value);

                return {
                    ...state,
                    workers: newWorkers
                }
            }

            if (action.objKey === "team№") {
                targetMonth.shiftAndTeam[1].value = Number(action.e.target.value);

                return {
                    ...state,
                    workers: newWorkers
                }
            }

            return {
                ...state,
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
        case "Change-Incidents-Per-Hour": {

            const {dates, currentMonth} = state;
            const newDates = [...dates]
            let targetValue = newDates[0].months[currentMonth - 1].efficiencyPerHour;

            if (action.direction === "back" && targetValue > 0) {
                newDates[0].months[currentMonth - 1].efficiencyPerHour = --targetValue;

                return {
                    ...state,
                    dates: newDates
                }
            }

            if (action.direction === "next") {
                newDates[0].months[currentMonth - 1].efficiencyPerHour = ++targetValue;

                return {
                    ...state,
                    dates: newDates
                }
            }

            return state; 
        }
        case "Change-Number-Of-Acknowledgements": {

            const {dates, currentMonth} = state;
            const newDates = [...dates]
            let targetValue = newDates[0].months[currentMonth - 1].numberOfAcknowledgements;

            if (action.direction === "back" && targetValue > 0) {
                targetValue = targetValue - 0.1;
            }

            if (action.direction === "next") {
                targetValue = targetValue + 0.1;
            }

            newDates[0].months[currentMonth - 1].numberOfAcknowledgements = Number(targetValue.toFixed(1));

            return {
                ...state,
                dates: newDates
            }
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
const WorkersLoaded = (workers) => {
    return {
        type: "Workers-Loaded",
        workers
    }
}

const DatesLoaded = (dates) => {
    return {
        type: "Dates-Loaded",
        dates
    }
}

const GetWorkersOnServer = (workers) => {
    return {
        type: "Get-Workers-On-Server",
        workers
    }
}

const GetDatesOnServer = (dates) => {
    return {
        type: "Get-Dates-On-Server",
        dates
    }
}

const SeatsLoaded = (seats) => {
    return {
        type: "Seats-Loaded",
        seats
    }
}

const ShiftsLoaded = (shifts, shiftsKm) => {
    return {
        type: "Shifts-Loaded",
        shifts,
        shiftsKm
    }
}

const SelectWorker = (id) => {
    return {
        type: "Select-Worker",
        id
    }
}

const ClearAllDays = () => {
    return {
        type: "Clear-All-Days"
    }
}

const ChangeDayType = (workerId, dayId, objKey, workingTime, hoursCount, scheduleType = "common") => {
    return {
        type: "Change-Day-Type",
        workerId,
        dayId,
        objKey,
        workingTime,
        hoursCount,
        scheduleType
    }
}

const ChangeMonthlyNorm = () => {
    return {
        type: "Change-Monthly-Norm",
    }
}

const ChangeNumberOfShifts = () => {
    return {
        type: "Change-Number-Of-Shifts",
    }
}

const ChangeNumberOfBreaks = () => {
    return {
        type: "Change-Number-Of-Breaks"
    }
}

const ChangeNorm = () => {
    return {
        type: "Change-Norm"
    }
}

const ChangeWithTrainingAndBreaks = () => {
    return {
        type: "Change-With-Training/Breaks"
    }
}

const ChangeWithADecreasingCoefficient = () => {
    return {
        type: "Change-With-A-Decreasing-Coefficient"
    }
}

const ChangeTotalWithTheNight = () => {
    return {
        type: "Change-Total-With-The-Night"
    }
}

const ChangeMessagePlan = () => {
    return {
        type: "Change-Message-Plan"
    }
}

const ChangeAcknowledgements = (e) => {
    return {
        type: "Change-Acknowledgements",
        e
    }
}

const ChangeSecondBreaks = () => {
    return {
        type: "Change-Second-Breaks"
    }
}

const ChangeСoefficient = () => {
    return {
        type: "Change-Сoefficient",
    }
}

const ChangeСoefficientNight = () => {
    return {
        type: "Change-Сoefficient-Night",
    }
}

const ChangeAdjustment = () => {
    return {
        type: "Change-Adjustment"
    }
}

const ChangeTraining = () => {
    return {
        type: "Change-Training"
    }
}

const SaveWorkerSettings = (workerData) => {
    return {
        type: "Save-Worker-Settings",
        workerData
    }
}

const ChangeMonth = (direction) => {
    return {
        type: "Change-Month",
        direction
    }
}

const ChangeYear = (direction) => {
    return {
        type: "Change-Year",
        direction
    }
}

const ChangeIncidentsPerHour = (direction) => {
    return {
        type: "Change-Incidents-Per-Hour",
        direction
    }
}

const ChangeNumberOfAcknowledgements = (direction) => {
    return {
        type: "Change-Number-Of-Acknowledgements",
        direction
    }
}


const FilterSelect = (filter) => {
    return {
        type: "Filter-Select",
        filter
    }
}

const MakeFilterActive = (id) => {
    return {
        type: "Make-Filter-Active",
        id
    }
}

const SelectDay = (selectedWorker, selectedDay) => {
    return {
        type: "Select-Day",
        selectedWorker, 
        selectedDay,
    }
}

const ChangeScheduleText = (workerId, dayId, objKey, e) => {
    return {
        type: "Change-Schedule-Text",
        workerId,
        dayId,
        objKey,
        e 
    }
}

const ChangeAdditionalInformationText = (workerId, objKey, e) => {
    return {
        type: "Change-Additional-Information-Text",
        workerId,
        objKey,
        e 
    }
}

const ChangeShiftAndTeamText = (workerId, objKey, e) => {
    return {
        type: "Change-Shift-And-Team-Text",
        workerId,
        objKey,
        e 
    }
}

const ChangeShiftText = (id, dataArr, objKey, e) => {
    return {
        type: "Change-Shift-Text",
        id, 
        dataArr,
        objKey,
        e
    }
}

const ChangeSeatText = (id, NewOldIp, NewNewIp, NewSeatNumber) => {
    return {
        type: "Change-Seat-Text",
        NewOldIp, 
        NewNewIp,
        NewSeatNumber,
        id
    }
}


const MakeActiveNavBtn = (btnName) => {
    return {
        type: "Make-Active-Nav-Btn",
        btnName
    }
}

const ChangeSelectedPage = (location) => {
    return {
        type: "Change-Selected-Page",
        location
    }
}

const ShowOrCloseWorkingHours = () => {
    return {
        type: "Show-Or-Close-Working-Hours",
    }
}

const UnsavedChangesStatus = (status) => {
    return {
        type: "Unsaved-Changes-Status",
        status
    }
}

export {
    WorkersLoaded,
    DatesLoaded,
    SeatsLoaded,
    ShiftsLoaded,
    SelectWorker,
    ClearAllDays,
    ChangeDayType,
    ChangeMonth,
    ChangeYear,
    FilterSelect,
    MakeFilterActive,
    SelectDay,
    ChangeShiftText,
    ChangeSeatText,
    MakeActiveNavBtn,
    ChangeSelectedPage,
    ShowOrCloseWorkingHours,
    ChangeScheduleText,
    GetWorkersOnServer,
    UnsavedChangesStatus,
    ChangeMonthlyNorm,
    ChangeNumberOfShifts,
    ChangeNumberOfBreaks,
    ChangeNorm,
    ChangeWithTrainingAndBreaks,
    ChangeAdditionalInformationText,
    ChangeWithADecreasingCoefficient,
    ChangeTotalWithTheNight,
    ChangeIncidentsPerHour,
    ChangeMessagePlan,
    ChangeAdjustment,
    ChangeNumberOfAcknowledgements,
    SaveWorkerSettings,
    ChangeShiftAndTeamText,
    ChangeAcknowledgements,
    ChangeSecondBreaks,
    ChangeСoefficient,
    ChangeСoefficientNight,
    ChangeTraining,
    GetDatesOnServer
}
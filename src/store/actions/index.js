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

const ChangeDayType = (workerId, dayId, objKey, scheduleType = "common") => {
    return {
        type: "Change-Day-Type",
        workerId,
        dayId,
        objKey,
        scheduleType
    }
}

const FilterSelect = (filter) => {
    return {
        type: "Filter-Select",
        filter
    }
}

const MakeActive = (id) => {
    return {
        type: "Make-Active",
        id
    }
}

const SelectDay = (selectedWorker, selectedDay, ChangeDayType) => {
    return {
        type: "Select-Day",
        selectedWorker, 
        selectedDay,
        ChangeDayType
    }
}

const TextChange = (id, dataArr, objKey) => (e) => {
    return {
        type: "Text-Change",
        id, 
        dataArr,
        objKey,
        e
    }
}

export {
    SelectWorker,
    ClearAllDays,
    ChangeDayType,
    FilterSelect,
    MakeActive,
    SelectDay,
    TextChange
}
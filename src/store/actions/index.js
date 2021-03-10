const SelectWorker = (id) => {
    return {
        type: "Select-Worker",
        selectedWorker: id
    }
}

const filterDays = (workers, filter) => {
    return {
        type: "Filter-Days",
        workers,
        filter
    }
}

const filterWorker = (workers, selectedWorker, filter) => {
    return {
        type: "Filter-Worker",
        workers,
        filter,
        selectedWorker
    }
}


export {
    SelectWorker,
    filterDays,
    filterWorker
}

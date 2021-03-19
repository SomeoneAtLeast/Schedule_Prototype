const totalShifts = 6;
let emptyShifts = [];
const getRandomNumber = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }


for (let i = 0; i <= totalShifts; i++) {
    if (i === 0) {
        emptyShifts.push(
            {
                startTime: "08",
                finishTime: 20,
                firstShiftNumber: 1,
                secondShiftNumber: 2,
                thirdShiftNumber: 1,
                fourthShiftNumber: 2,
                id: i + 100
            }
        )
    } else if (i === 1) {
        emptyShifts.push(
            {
                startTime: "09",
                finishTime: 21,
                firstShiftNumber: 1,
                secondShiftNumber: 2,
                thirdShiftNumber: 1,
                fourthShiftNumber: 2,
                id: i + 100
            }
        )
    } else if (i <= 4) {
        emptyShifts.push(
            {
                startTime: 8 + i,
                finishTime: 20 + i,
                firstShiftNumber: 1,
                secondShiftNumber: 2,
                thirdShiftNumber: 1,
                fourthShiftNumber: 2,
                id: i + 100
            }
        )
    } else if (i === 5) {
        emptyShifts.push(
            {
                startTime: 14,
                finishTime: "02",
                firstShiftNumber: 1,
                secondShiftNumber: 2,
                thirdShiftNumber: 1,
                fourthShiftNumber: 2,
                id: 105
            }
        )
    } else if (i === 6) {
        emptyShifts.push(
            {
                startTime: 21,
                finishTime: "09",
                firstShiftNumber: 1,
                secondShiftNumber: 2,
                thirdShiftNumber: 1,
                fourthShiftNumber: 2,
                id: 106
            }
        )
    }
}

const totalWorkers = 12;

emptyShifts.forEach(item => {
    for (let i = 0; i <= totalWorkers; i++) {
        item[`worker${i}`] = getRandomNumber(0, 1) ? "Иванов Иван Иванович" : "-";
    }
});

const shifts = emptyShifts;


const totalKmShifts = 6;
let emptyKmShifts = [];

for (let i = 0; i <= totalKmShifts; i++) {
        emptyKmShifts.push(
            {   
                worker: getRandomNumber(0, 1) ? "Иванов Иван Иванович" : "-",
                shiftNumber: 1,
                id: i + 100
            }
        )
}

const kmShifts = emptyKmShifts;

const glArr = [
    {
        name: "Групп-лидер 1",
        teamName: "Команда 1",
        shiftNumber: "Смена 1",
        nameMaxLength: 31,
        id: 1001
    },
    {
        name: "Групп-лидер 2",
        teamName: "Команда 2",
        shiftNumber: "Смена 2",
        nameMaxLength: 31,
        id: 1002
    },
    {
        name: "Групп-лидер 3",
        teamName: "Команда 3",
        shiftNumber: "Смена 1 и 2",
        nameMaxLength: 31,
        id: 1003
    },
    {
        name: "№ Смены",
        teamName: "1",
        shiftNumber: "2",
        nameMaxLength: 6,
        id: 1004
    }
];

const kmArr = [
    {
        name: "Групп-лидер",
        shiftName: "№ Смены",
        nameMaxLength: 31,
        shiftNameMaxLength: 6,
        id: 1005
    }, 
]


const glTable = glArr;

const workTeamsNames = [
    {
        workTeamsName: "Социальные Сети",
        id: 1
    },
    {
        workTeamsName: "КМ",
        id: 2
    },
]

const months = [
    {
        month: "Февраль",
        id: 2
    },
]

export {shifts, kmShifts, kmArr, glTable, workTeamsNames, months}
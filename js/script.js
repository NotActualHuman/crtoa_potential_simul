const upperImg = document.querySelector('.upper-grade');
const lowerImg = document.querySelector('.lower-grade');
const upperString = document.querySelector('.upper-option');
const lowerString = document.querySelector('.lower-option');
const coinString = document.querySelector('.coins');
const scrollString = document.querySelector('.scrolls');
const cashString = document.querySelector('.cash');

let equipSlot = '무기';
let scrollType = '일반';

let targetUpperGrade = 'SuperEpic';
let targetLowerGrade = 'SuperEpic';
let targetUpperOption = '공격력';
let targetLowerOption = '공격력';

document.addEventListener('DOMContentLoaded', () => {
    const selectElement = document.querySelector('#equip');
    const scrollElement = document.querySelector('#type');

    selectElement.addEventListener('change', (event) => {
        equipSlot = event.target.value;
    });

    scrollElement.addEventListener('change', (event) => {
        scrollType = event.target.value;
    })

    const upperGradeElement = document.querySelector('#upper-grade');
    const lowerGradeElement = document.querySelector('#lower-grade');
    const upperOptionElement = document.querySelector('#upper-option');
    const lowerOptionElement = document.querySelector('#lower-option');

    upperGradeElement.addEventListener('change', (event) => {
        targetUpperGrade = event.target.value;
    })
    lowerGradeElement.addEventListener('change', (event) => {
        targetLowerGrade = event.target.value;
    })
    upperOptionElement.addEventListener('change', (event) => {
        targetUpperOption = event.target.value;
    })
    lowerOptionElement.addEventListener('change', (event) => {
        targetLowerOption = event.target.value;
    })
});

function getRandomIntInclusive(min, max) {
    const randomBuffer = new Uint32Array(1);

    window.crypto.getRandomValues(randomBuffer);

    let randomNumber = randomBuffer[0] / (0xffffffff + 1);

    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(randomNumber * (max - min + 1)) + min;
}

function getRandomFloatInclusive(min, max) {
    const randomBuffer = new Uint32Array(1);

    window.crypto.getRandomValues(randomBuffer);

    let randomNumber = randomBuffer[0] / (0xffffffff + 1);
    let result = randomNumber * (max - min) + min;

    return Math.round(result * 10) / 10;
}


function getGrade(num) {
    switch (true) {
        case (num <= 5):
            return 'SuperEpic';
        case (num <= 15):
            return 'Epic';
        case (num <= 35):
            return 'Rare';
        case (num <= 65):
            return 'Uncommon';
        default:
            return 'Common';
    }
}

function getGradeHigh(num) {
    switch (true) {
        case (num <= 30):
            return 'SuperEpic';
        case (num <= 40):
            return 'Epic';
        default:
            return 'Rare';
    }
}

function getOption(num, slot) {
    if (slot === '상/하의') {
        switch (true) {
            case (num <= 909):  // 9.09% 확률
                return '공격력';
            case (num <= 1818): // 18.18% 확률
                return 'HP';
            case (num <= 2727): // 27.27% 확률
                return '방어력';
            case (num <= 3636): // 36.36% 확률
                return '치명타 확률';
            case (num <= 4545): // 45.45% 확률
                return '치명타 피해';
            case (num <= 5454): // 54.54% 확률
                return '회복량';
            case (num <= 6363): // 63.63% 확률
                return '보호막량';
            case (num <= 7272): // 72.72% 확률
                return '버프 증폭';
            case (num <= 8181): // 81.81% 확률
                return '디버프 증폭';
            case (num <= 9090): // 90.90% 확률
                return '방어력 관통';
            default:
                return '받는 피해 감소'; // 나머지 9.09% 확률
        }
    } else if (slot === '무기') {
        switch (true) {
            case (num <= 909):  // 9.09% 확률
                return '공격력';
            case (num <= 1818): // 18.18% 확률
                return 'HP';
            case (num <= 2727): // 27.27% 확률
                return '방어력';
            case (num <= 3636): // 36.36% 확률
                return '치명타 확률';
            case (num <= 4545): // 45.45% 확률
                return '치명타 피해';
            case (num <= 5454): // 54.54% 확률
                return '불 속성 공격력';
            case (num <= 6363): // 63.63% 확률
                return '물 속성 공격력';
            case (num <= 7272): // 72.72% 확률
                return '바람 속성 공격력';
            case (num <= 8181): // 81.81% 확률
                return '대지 속성 공격력';
            case (num <= 9090): // 90.90% 확률
                return '빛 속성 공격력';
            default:
                return '어둠 속성 공격력'; // 나머지 9.09% 확률
        }
    } else if (slot === '모자') {
        switch (true) {
            case (num <= 909):  // 9.09% 확률
                return '공격력';
            case (num <= 1818): // 18.18% 확률
                return 'HP';
            case (num <= 2727): // 27.27% 확률
                return '방어력';
            case (num <= 3636): // 36.36% 확률
                return '치명타 확률';
            case (num <= 4545): // 45.45% 확률
                return '치명타 피해';
            case (num <= 5454): // 54.54% 확률
                return '불 속성 피해';
            case (num <= 6363): // 63.63% 확률
                return '물 속성 피해';
            case (num <= 7272): // 72.72% 확률
                return '바람 속성 피해';
            case (num <= 8181): // 81.81% 확률
                return '대지 속성 피해';
            case (num <= 9090): // 90.90% 확률
                return '빛 속성 피해';
            default:
                return '어둠 속성 피해'; // 나머지 9.09% 확률
        }
    }
}

function getValues(option, slot) {
    let optionName = option.split('-');
    let baseValue;
    let value;
    if (slot === '상/하의') {
        function getBaseValue(grade, type) {
            const baseValues = {
                '공격력':    { 'Common': 11.0, 'Uncommon': 13.0, 'Rare': 15.0, 'Epic': 17.0, 'SuperEpic': 19.0 },
                'HP':        { 'Common': 11.0, 'Uncommon': 13.0, 'Rare': 15.0, 'Epic': 17.0, 'SuperEpic': 19.0 },
                '방어력':    { 'Common': 11.0, 'Uncommon': 13.0, 'Rare': 15.0, 'Epic': 17.0, 'SuperEpic': 19.0 },
                '치명타 확률': { 'Common': 8.25, 'Uncommon': 9.75, 'Rare': 11.25, 'Epic': 12.75, 'SuperEpic': 14.25 },
                '치명타 피해': { 'Common': 13.75, 'Uncommon': 16.25, 'Rare': 18.75, 'Epic': 21.25, 'SuperEpic': 23.75 },
                '회복량':    { 'Common': 8.8, 'Uncommon': 10.4, 'Rare': 12.0, 'Epic': 13.6, 'SuperEpic': 15.2 },
                '보호막량':  { 'Common': 8.8, 'Uncommon': 10.4, 'Rare': 12.0, 'Epic': 13.6, 'SuperEpic': 15.2 },
                '버프 증폭': { 'Common': 5.5, 'Uncommon': 6.5, 'Rare': 7.5, 'Epic': 8.5, 'SuperEpic': 9.5 },
                '디버프 증폭': { 'Common': 5.5, 'Uncommon': 6.5, 'Rare': 7.5, 'Epic': 8.5, 'SuperEpic': 9.5 },
                '방어력 관통': { 'Common': 4.4, 'Uncommon': 5.2, 'Rare': 6.0, 'Epic': 6.8, 'SuperEpic': 7.6 },
                '받는 피해 감소': { 'Common': 4.4, 'Uncommon': 5.2, 'Rare': 6.0, 'Epic': 6.8, 'SuperEpic': 7.6 }
            };

            return baseValues[type] ? baseValues[type][grade] : 0;
        }

        baseValue = getBaseValue(optionName[0], optionName[1]);

        switch (optionName[1]) {
            case '공격력':
            case 'HP':
            case '방어력':
                value = baseValue + getRandomFloatInclusive(0.0, 1.0);
                break;
            case '치명타 확률':
                value = baseValue + getRandomFloatInclusive(0.0, 0.75);
                break;
            case '치명타 피해':
                value = baseValue + getRandomFloatInclusive(0.0, 1.25);
                break;
            case '회복량':
            case '보호막량':
                value = baseValue + getRandomFloatInclusive(0.0, 0.8);
                break;
            case '버프 증폭':
            case '디버프 증폭':
                value = baseValue + getRandomFloatInclusive(0.0, 0.5);
                break;
            case '방어력 관통':
            case '받는 피해 감소':
                value = baseValue + getRandomFloatInclusive(0.0, 0.4);
                break;
            default:
                value = 0;
                break;
        }
    } else if (slot === '모자') {
        function getBaseValue(grade, type) {
            const baseValues = {
                '공격력':    { 'Common': 11.0, 'Uncommon': 13.0, 'Rare': 15.0, 'Epic': 17.0, 'SuperEpic': 19.0 },
                'HP':        { 'Common': 11.0, 'Uncommon': 13.0, 'Rare': 15.0, 'Epic': 17.0, 'SuperEpic': 19.0 },
                '방어력':    { 'Common': 11.0, 'Uncommon': 13.0, 'Rare': 15.0, 'Epic': 17.0, 'SuperEpic': 19.0 },
                '치명타 확률': { 'Common': 8.25, 'Uncommon': 9.75, 'Rare': 11.25, 'Epic': 12.75, 'SuperEpic': 14.25 },
                '치명타 피해': { 'Common': 13.75, 'Uncommon': 16.25, 'Rare': 18.75, 'Epic': 21.25, 'SuperEpic': 23.75 },
                '불 속성 피해':    { 'Common': 8.25, 'Uncommon': 9.75, 'Rare': 11.25, 'Epic': 12.75, 'SuperEpic': 14.25 },
                '물 속성 피해':  { 'Common': 8.25, 'Uncommon': 9.75, 'Rare': 11.25, 'Epic': 12.75, 'SuperEpic': 14.25 },
                '바람 속성 피해': { 'Common': 8.25, 'Uncommon': 9.75, 'Rare': 11.25, 'Epic': 12.75, 'SuperEpic': 14.25 },
                '대지 속성 피해': { 'Common': 8.25, 'Uncommon': 9.75, 'Rare': 11.25, 'Epic': 12.75, 'SuperEpic': 14.25 },
                '빛 속성 피해': { 'Common': 8.25, 'Uncommon': 9.75, 'Rare': 11.25, 'Epic': 12.75, 'SuperEpic': 14.25 },
                '어둠 속성 피해': { 'Common': 8.25, 'Uncommon': 9.75, 'Rare': 11.25, 'Epic': 12.75, 'SuperEpic': 14.25 }
            };

            return baseValues[type] ? baseValues[type][grade] : 0;
        }

        baseValue = getBaseValue(optionName[0], optionName[1]);

        switch (optionName[1]) {
            case '공격력':
            case 'HP':
            case '방어력':
                value = baseValue + getRandomFloatInclusive(0.0, 1.0);
                break;
            case '치명타 확률':
                value = baseValue + getRandomFloatInclusive(0.0, 0.75);
                break;
            case '치명타 피해':
                value = baseValue + getRandomFloatInclusive(0.0, 1.25);
                break;
            case '불 속성 피해':
            case '물 속성 피해':
            case '바람 속성 피해':
            case '대지 속성 피해':
            case '빛 속성 피해':
            case '어둠 속성 피해':
                value = baseValue + getRandomFloatInclusive(0.0, 0.75);
                break;
            default:
                value = 0;
                break;
        }
    }  else if (slot === '무기') {
        function getBaseValue(grade, type) {
            const baseValues = {
                '공격력':    { 'Common': 11.0, 'Uncommon': 13.0, 'Rare': 15.0, 'Epic': 17.0, 'SuperEpic': 19.0 },
                'HP':        { 'Common': 11.0, 'Uncommon': 13.0, 'Rare': 15.0, 'Epic': 17.0, 'SuperEpic': 19.0 },
                '방어력':    { 'Common': 11.0, 'Uncommon': 13.0, 'Rare': 15.0, 'Epic': 17.0, 'SuperEpic': 19.0 },
                '치명타 확률': { 'Common': 8.25, 'Uncommon': 9.75, 'Rare': 11.25, 'Epic': 12.75, 'SuperEpic': 14.25 },
                '치명타 피해': { 'Common': 13.75, 'Uncommon': 16.25, 'Rare': 18.75, 'Epic': 21.25, 'SuperEpic': 23.75 },
                '불 속성 공격력':    { 'Common': 35, 'Uncommon': 45, 'Rare': 55, 'Epic': 65, 'SuperEpic': 75 },
                '물 속성 공격력':  { 'Common': 35, 'Uncommon': 45, 'Rare': 55, 'Epic': 65, 'SuperEpic': 75 },
                '바람 속성 공격력': { 'Common': 35, 'Uncommon': 45, 'Rare': 55, 'Epic': 65, 'SuperEpic': 75 },
                '대지 속성 공격력': { 'Common': 35, 'Uncommon': 45, 'Rare': 55, 'Epic': 65, 'SuperEpic': 75 },
                '빛 속성 공격력': { 'Common': 35, 'Uncommon': 45, 'Rare': 55, 'Epic': 65, 'SuperEpic': 75 },
                '어둠 속성 공격력': { 'Common': 35, 'Uncommon': 45, 'Rare': 55, 'Epic': 65, 'SuperEpic': 75 }
            };

            return baseValues[type] ? baseValues[type][grade] : 0;
        }

        baseValue = getBaseValue(optionName[0], optionName[1]);

        switch (optionName[1]) {
            case '공격력':
            case 'HP':
            case '방어력':
                value = baseValue + getRandomFloatInclusive(0.0, 1.0);
                break;
            case '치명타 확률':
                value = baseValue + getRandomFloatInclusive(0.0, 0.75);
                break;
            case '치명타 피해':
                value = baseValue + getRandomFloatInclusive(0.0, 1.25);
                break;
            case '불 속성 공격력':
            case '물 속성 공격력':
            case '바람 속성 공격력':
            case '대지 속성 공격력':
            case '빛 속성 공격력':
            case '어둠 속성 공격력':
                value = baseValue + getRandomIntInclusive(0, 5);
                break;
            default:
                value = 0;
                break;
        }
    }
    return value.toFixed(2);
}

const gradeDetails = {
    'Common': { imgSrc: './img/Common.png', color: '#8D664D' },
    'Uncommon': { imgSrc: './img/Uncommon.png', color: '#66FF66' },
    'Rare': { imgSrc: './img/Rare.png', color: '#3399FF' },
    'Epic': { imgSrc: './img/Epic.png', color: '#9933FF' },
    'SuperEpic': { imgSrc: './img/SuperEpic.png', color: '#CF3D3D' }
};

function setGradeDetails(imgElement, colorElement, grade) {
    const details = gradeDetails[grade] || { imgSrc: './img/Common.png', color: '#FFFFFF' };
    imgElement.src = details.imgSrc;
    colorElement.style.color = details.color;
}

let paidAmount = 0;
let usedScrolls;
let usedCash = 0;
function getOptionGrade() {
    // console.log(equipSlot);
    let upper = getRandomIntInclusive(0, 99);
    let lower = getRandomIntInclusive(0, 99);
    let upperGrade;
    let lowerGrade;
    if (scrollType === '일반') {
        upperGrade = getGrade(upper);
        lowerGrade = getGrade(lower);
    } else if (scrollType === '상급') {
        upperGrade = getGradeHigh(upper);
        lowerGrade = getGradeHigh(lower);
    }
    let upperOpt = getRandomIntInclusive(0, 9999);
    let lowerOpt = getRandomIntInclusive(0, 9999);
    let upperOption = getOption(upperOpt, equipSlot);
    let lowerOption = getOption(lowerOpt, equipSlot);
    let rawUpperOption = `${upperGrade}-${upperOption}`;
    let rawLowerOption = `${lowerGrade}-${lowerOption}`;
    // console.log(`${upperGrade}-${upperOption} +${getValues(rawUpperOption)}%|${lowerGrade}-${lowerOption} +${getValues(rawLowerOption)}%`);
    setGradeDetails(upperImg, upperString, upperGrade);
    setGradeDetails(lowerImg, lowerString, lowerGrade);

    paidAmount += 20000;
    usedScrolls = paidAmount / 20000;
    usedCash += 275;
    // console.log(upperOption + lowerOption);
    if (upperOption.search('속성 공격력') !== -1)
        upperString.innerText = upperOption + ' +' + getValues(rawUpperOption, equipSlot) + '';
    else
        upperString.innerText = upperOption + ' +' + getValues(rawUpperOption, equipSlot) + '%';
    if (lowerOption.search('속성 공격력') !== -1)
        lowerString.innerText = lowerOption + ' +' + getValues(rawLowerOption, equipSlot) + '';
    else
        lowerString.innerText = lowerOption + ' +' + getValues(rawLowerOption, equipSlot) + '%';
    coinString.innerText = paidAmount;
    scrollString.innerText = usedScrolls;
    cashString.innerText = usedCash;
}

function autoScrolls() {
    const delay = 10; // 딜레이 시간 (밀리초 단위)

    function generateScrolls() {
        let upper = getRandomIntInclusive(0, 99);
        let lower = getRandomIntInclusive(0, 99);
        let upperGrade;
        let lowerGrade;
        if (scrollType === '일반') {
            upperGrade = getGrade(upper);
            lowerGrade = getGrade(lower);
        } else if (scrollType === '상급') {
            upperGrade = getGradeHigh(upper);
            lowerGrade = getGradeHigh(lower);
        }
        let upperOpt = getRandomIntInclusive(0, 9999);
        let lowerOpt = getRandomIntInclusive(0, 9999);
        let upperOption = getOption(upperOpt, equipSlot);
        let lowerOption = getOption(lowerOpt, equipSlot);
        let rawUpperOption = `${upperGrade}-${upperOption}`;
        let rawLowerOption = `${lowerGrade}-${lowerOption}`;

        function meetsCriteria(grade, option, targetGrade, targetOption) {
            if (targetGrade === 'Common' && (grade === 'Common' || grade === 'Uncommon' || grade === "Rare" || grade === "Epic" || grade === "SuperEpic"))
                return targetOption === option;

            if (targetGrade === 'Uncommon' && (grade === 'Uncommon' || grade === "Rare" || grade === "Epic" || grade === "SuperEpic"))
                return targetOption === option;

            if (targetGrade === 'Rare' && (grade === 'Rare' || grade === 'Epic' || grade === 'SuperEpic'))
                return targetOption === option;

            if (targetGrade === 'Epic' && (grade === 'Epic' || grade === 'SuperEpic'))
                return targetOption === option;

            if (targetGrade === 'SuperEpic' && grade === 'SuperEpic')
                return targetOption === option;

            return false;
        }
        // console.log("targetUpperGrade: " + targetUpperGrade + " targetUpperOption: " + targetUpperOption + "\ntargetLowerGrade: " + targetLowerGrade + " targetLowerOption: " + targetLowerOption);
        if (meetsCriteria(upperGrade, upperOption, targetUpperGrade, targetUpperOption) &&
            meetsCriteria(lowerGrade, lowerOption, targetLowerGrade, targetLowerOption)) {

            setGradeDetails(upperImg, upperString, upperGrade);
            setGradeDetails(lowerImg, lowerString, lowerGrade);

            if (upperOption.search('속성 공격력') !== -1)
                upperString.innerText = upperOption + ' +' + getValues(rawUpperOption, equipSlot) + '';
            else
                upperString.innerText = upperOption + ' +' + getValues(rawUpperOption, equipSlot) + '%';
            if (lowerOption.search('속성 공격력') !== -1)
                lowerString.innerText = lowerOption + ' +' + getValues(rawLowerOption, equipSlot) + '';
            else
                lowerString.innerText = lowerOption + ' +' + getValues(rawLowerOption, equipSlot) + '%';

            paidAmount += 20000;
            usedScrolls = paidAmount / 20000;
            usedCash += 275;

            coinString.innerText = paidAmount;
            scrollString.innerText = usedScrolls;
            cashString.innerText = usedCash + '\u20A9';
            return; // 조건을 만족하면 종료
        } else {
            paidAmount += 20000;
            usedScrolls = paidAmount / 20000;
            usedCash += 275;

            coinString.innerText = paidAmount;
            scrollString.innerText = usedScrolls;
            cashString.innerText = usedCash + '\u20A9';
            setTimeout(generateScrolls, delay); // 딜레이 후 재귀 호출
        }
    }
    paidAmount = 0;
    usedScrolls = 0;
    usedCash = 0;
    coinString.innerText = 0;
    scrollString.innerText = 0;
    cashString.innerText = 0 + '\u20A9';
    generateScrolls(); // 최초 호출
}

function resetAll() {
    setGradeDetails(upperImg, upperString, 'Common');
    setGradeDetails(lowerImg, lowerString, 'Common');
    lowerString.innerText = '';
    upperString.innerText = '';
    paidAmount = 0;
    usedScrolls = 0;
    usedCash = 0;
    coinString.innerText = 0;
    scrollString.innerText = 0;
    cashString.innerText = 0 + '\u20A9';
}

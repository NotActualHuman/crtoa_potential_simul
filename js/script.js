let upperImg = document.querySelector('.upper-grade');
let lowerImg = document.querySelector('.lower-grade');
let upperString = document.querySelector('.upper-option');
let lowerString = document.querySelector('.lower-option');
let coinString = document.querySelector('.coins');
let scrollString = document.querySelector('.scrolls');

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
            break;
        case (num <= 15):
            return 'Epic';
            break;
        case (num <= 35):
            return 'Rare';
            break;
        case (num <= 65):
            return 'Uncommon';
            break;
        default:
            return 'Common';
            break;
    }
}

function getOption(num) {
    switch (true) {
        case (num <= 909):  // 9.09% 확률
            return '공격력';
            break;
        case (num <= 1818): // 18.18% 확률
            return 'HP';
            break;
        case (num <= 2727): // 27.27% 확률
            return '방어력';
            break;
        case (num <= 3636): // 36.36% 확률
            return '치명타 확률';
            break;
        case (num <= 4545): // 45.45% 확률
            return '치명타 피해';
            break;
        case (num <= 5454): // 54.54% 확률
            return '회복량';
            break;
        case (num <= 6363): // 63.63% 확률
            return '보호막량';
            break;
        case (num <= 7272): // 72.72% 확률
            return '버프 증폭';
            break;
        case (num <= 8181): // 81.81% 확률
            return '디버프 증폭';
            break;
        case (num <= 9090): // 90.90% 확률
            return '방어력 관통';
            break;
        default:
            return '받는 피해 감소'; // 나머지 9.09% 확률
            break;
    }
}

function getValues(option) {
    let optionName = option.split('-');
    let baseValue;
    let value;

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

    return value.toFixed(2);
}

let paidAmount = 0;
let usedScrolls;
function getOptionGrade() {
    let upper = getRandomIntInclusive(0, 99);
    let lower = getRandomIntInclusive(0, 99);
    let upperGrade = getGrade(upper);
    let lowerGrade = getGrade(lower);
    let upperOpt = getRandomIntInclusive(0, 9999);
    let lowerOpt = getRandomIntInclusive(0, 9999);
    let upperOption = getOption(upperOpt);
    let lowerOption = getOption(lowerOpt);
    let rawUpperOption = `${upperGrade}-${upperOption}`;
    let rawLowerOption = `${lowerGrade}-${lowerOption}`;
    // console.log(`${upperGrade}-${upperOption} +${getValues(rawUpperOption)}%|${lowerGrade}-${lowerOption} +${getValues(rawLowerOption)}%`);
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

    setGradeDetails(upperImg, upperString, upperGrade);
    setGradeDetails(lowerImg, lowerString, lowerGrade);

    paidAmount += 20000;
    usedScrolls = paidAmount / 20000;

    upperString.innerText = upperOption + ' +' + getValues(rawUpperOption) + '%';
    lowerString.innerText = lowerOption + ' +' + getValues(rawLowerOption) + '%';

    coinString.innerText = paidAmount;
    scrollString.innerText = usedScrolls;
}
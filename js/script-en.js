const upperImgEn = document.querySelector('.upper-grade-en');
const lowerImgEn = document.querySelector('.lower-grade-en');
const upperStringEn = document.querySelector('.upper-option-en');
const lowerStringEn = document.querySelector('.lower-option-en');
const coinStringEn = document.querySelector('.coins-en');
const scrollStringEn = document.querySelector('.scrolls-en');

let equipSlotEn = 'Weapon';
let scrollTypeEn = 'Normal';

let targetUpperGradeEn = 'SuperEpic';
let targetLowerGradeEn = 'SuperEpic';
let targetUpperOptionEn = 'ATK';
let targetLowerOptionEn = 'ATK';

document.addEventListener('DOMContentLoaded', () => {
    const selectElement = document.querySelector('#equip-en');
    const scrollElement = document.querySelector('#type-en');

    selectElement.addEventListener('change', (event) => {
        equipSlotEn = event.target.value;
    });

    scrollElement.addEventListener('change', (event) => {
        scrollTypeEn = event.target.value;
    })

    const upperGradeElement = document.querySelector('#upper-grade-en');
    const lowerGradeElement = document.querySelector('#lower-grade-en');
    const upperOptionElement = document.querySelector('#upper-option-en');
    const lowerOptionElement = document.querySelector('#lower-option-en');

    upperGradeElement.addEventListener('change', (event) => {
        targetUpperGradeEn = event.target.value;
    })
    lowerGradeElement.addEventListener('change', (event) => {
        targetLowerGradeEn = event.target.value;
    })
    upperOptionElement.addEventListener('change', (event) => {
        targetUpperOptionEn = event.target.value;
    })
    lowerOptionElement.addEventListener('change', (event) => {
        targetLowerOptionEn = event.target.value;
    })
});

function getGradeEn(num) {
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

function getGradeHighEn(num) {
    switch (true) {
        case (num <= 30):
            return 'SuperEpic';
        case (num <= 40):
            return 'Epic';
        default:
            return 'Rare';
    }
}

function getOptionEn(num, slot) {
    if (slot === 'Top/Bottom') {
        switch (true) {
            case (num <= 909):  // 9.09% 확률
                return 'ATK';
            case (num <= 1818): // 18.18% 확률
                return 'HP';
            case (num <= 2727): // 27.27% 확률
                return 'DEF';
            case (num <= 3636): // 36.36% 확률
                return 'CRIT Rate';
            case (num <= 4545): // 45.45% 확률
                return 'CRIT DMG';
            case (num <= 5454): // 54.54% 확률
                return 'Buff AMP';
            case (num <= 6363): // 63.63% 확률
                return 'Debuff AMP';
            case (num <= 7272): // 72.72% 확률
                return 'Healing';
            case (num <= 8181): // 81.81% 확률
                return 'Shield';
            case (num <= 9090): // 90.90% 확률
                return 'DEF Penetration';
            default:
                return 'DMG Reduction'; // 나머지 9.09% 확률
        }
    } else if (slot === 'Weapon') {
        switch (true) {
            case (num <= 909):  // 9.09% 확률
                return 'ATK';
            case (num <= 1818): // 18.18% 확률
                return 'HP';
            case (num <= 2727): // 27.27% 확률
                return 'DEF';
            case (num <= 3636): // 36.36% 확률
                return 'CRIT Rate';
            case (num <= 4545): // 45.45% 확률
                return 'CRIT DMG';
            case (num <= 5454): // 54.54% 확률
                return 'Fire Elem ATK';
            case (num <= 6363): // 63.63% 확률
                return 'Water Elem ATK';
            case (num <= 7272): // 72.72% 확률
                return 'Wind Elem ATK';
            case (num <= 8181): // 81.81% 확률
                return 'Earth Elem ATK';
            case (num <= 9090): // 90.90% 확률
                return 'Light Elem ATK';
            default:
                return 'Dark Elem ATK'; // 나머지 9.09% 확률
        }
    } else if (slot === 'Hat') {
        switch (true) {
            case (num <= 909):  // 9.09% 확률
                return 'ATK';
            case (num <= 1818): // 18.18% 확률
                return 'HP';
            case (num <= 2727): // 27.27% 확률
                return 'DEF';
            case (num <= 3636): // 36.36% 확률
                return 'CRIT Rate';
            case (num <= 4545): // 45.45% 확률
                return 'CRIT DMG';
            case (num <= 5454): // 54.54% 확률
                return 'Fire DMG';
            case (num <= 6363): // 63.63% 확률
                return 'Water DMG';
            case (num <= 7272): // 72.72% 확률
                return 'Wind DMG';
            case (num <= 8181): // 81.81% 확률
                return 'Earth DMG';
            case (num <= 9090): // 90.90% 확률
                return 'Light DMG';
            default:
                return 'Dark DMG'; // 나머지 9.09% 확률
        }
    }
}

function getValuesEn(option, slot) {
    let optionName = option.split('-');
    console.log(option + ' ' + slot)
    let baseValue;
    let value;
    if (slot === 'Top/Bottom') {
        function getBaseValue(grade, type) {
            const baseValues = {
                'ATK':    { 'Common': 11.0, 'Uncommon': 13.0, 'Rare': 15.0, 'Epic': 17.0, 'SuperEpic': 19.0 },
                'HP':        { 'Common': 11.0, 'Uncommon': 13.0, 'Rare': 15.0, 'Epic': 17.0, 'SuperEpic': 19.0 },
                'DEF':    { 'Common': 11.0, 'Uncommon': 13.0, 'Rare': 15.0, 'Epic': 17.0, 'SuperEpic': 19.0 },
                'CRIT Rate': { 'Common': 8.25, 'Uncommon': 9.75, 'Rare': 11.25, 'Epic': 12.75, 'SuperEpic': 14.25 },
                'CRIT DMG': { 'Common': 13.75, 'Uncommon': 16.25, 'Rare': 18.75, 'Epic': 21.25, 'SuperEpic': 23.75 },
                'Healing':    { 'Common': 8.8, 'Uncommon': 10.4, 'Rare': 12.0, 'Epic': 13.6, 'SuperEpic': 15.2 },
                'Shield':  { 'Common': 8.8, 'Uncommon': 10.4, 'Rare': 12.0, 'Epic': 13.6, 'SuperEpic': 15.2 },
                'Buff AMP': { 'Common': 5.5, 'Uncommon': 6.5, 'Rare': 7.5, 'Epic': 8.5, 'SuperEpic': 9.5 },
                'Debuff AMP': { 'Common': 5.5, 'Uncommon': 6.5, 'Rare': 7.5, 'Epic': 8.5, 'SuperEpic': 9.5 },
                'DEF Penetration': { 'Common': 4.4, 'Uncommon': 5.2, 'Rare': 6.0, 'Epic': 6.8, 'SuperEpic': 7.6 },
                'DMG Reduction': { 'Common': 4.4, 'Uncommon': 5.2, 'Rare': 6.0, 'Epic': 6.8, 'SuperEpic': 7.6 }
            };

            return baseValues[type] ? baseValues[type][grade] : 0;
        }

        baseValue = getBaseValue(optionName[0], optionName[1]);

        switch (optionName[1]) {
            case 'ATK':
            case 'HP':
            case 'DEF':
                value = baseValue + getRandomFloatInclusive(0.0, 1.0);
                break;
            case 'CRIT Rate':
                value = baseValue + getRandomFloatInclusive(0.0, 0.75);
                break;
            case 'CRIT DMG':
                value = baseValue + getRandomFloatInclusive(0.0, 1.25);
                break;
            case 'Healing':
            case 'Shield':
                value = baseValue + getRandomFloatInclusive(0.0, 0.8);
                break;
            case 'Buff AMP':
            case 'Debuff AMP':
                value = baseValue + getRandomFloatInclusive(0.0, 0.5);
                break;
            case 'DEF Penetration':
            case 'DMG Reduction':
                value = baseValue + getRandomFloatInclusive(0.0, 0.4);
                break;
            default:
                value = 0;
                break;
        }
    } else if (slot === 'Hat') {
        function getBaseValue(grade, type) {
            const baseValues = {
                'ATK':    { 'Common': 11.0, 'Uncommon': 13.0, 'Rare': 15.0, 'Epic': 17.0, 'SuperEpic': 19.0 },
                'HP':        { 'Common': 11.0, 'Uncommon': 13.0, 'Rare': 15.0, 'Epic': 17.0, 'SuperEpic': 19.0 },
                'DEF':    { 'Common': 11.0, 'Uncommon': 13.0, 'Rare': 15.0, 'Epic': 17.0, 'SuperEpic': 19.0 },
                'CRIT Rate': { 'Common': 8.25, 'Uncommon': 9.75, 'Rare': 11.25, 'Epic': 12.75, 'SuperEpic': 14.25 },
                'CRIT DMG': { 'Common': 13.75, 'Uncommon': 16.25, 'Rare': 18.75, 'Epic': 21.25, 'SuperEpic': 23.75 },
                'Fire DMG':    { 'Common': 8.25, 'Uncommon': 9.75, 'Rare': 11.25, 'Epic': 12.75, 'SuperEpic': 14.25 },
                'Water DMG':  { 'Common': 8.25, 'Uncommon': 9.75, 'Rare': 11.25, 'Epic': 12.75, 'SuperEpic': 14.25 },
                'Wind DMG': { 'Common': 8.25, 'Uncommon': 9.75, 'Rare': 11.25, 'Epic': 12.75, 'SuperEpic': 14.25 },
                'Earth DMG': { 'Common': 8.25, 'Uncommon': 9.75, 'Rare': 11.25, 'Epic': 12.75, 'SuperEpic': 14.25 },
                'Light DMG': { 'Common': 8.25, 'Uncommon': 9.75, 'Rare': 11.25, 'Epic': 12.75, 'SuperEpic': 14.25 },
                'Dark DMG': { 'Common': 8.25, 'Uncommon': 9.75, 'Rare': 11.25, 'Epic': 12.75, 'SuperEpic': 14.25 }
            };

            return baseValues[type] ? baseValues[type][grade] : 0;
        }

        baseValue = getBaseValue(optionName[0], optionName[1]);

        switch (optionName[1]) {
            case 'ATK':
            case 'HP':
            case 'DEF':
                value = baseValue + getRandomFloatInclusive(0.0, 1.0);
                break;
            case 'CRIT Rate':
                value = baseValue + getRandomFloatInclusive(0.0, 0.75);
                break;
            case 'CRIT DMG':
                value = baseValue + getRandomFloatInclusive(0.0, 1.25);
                break;
            case 'Fire DMG':
            case 'Water DMG':
            case 'Wind DMG':
            case 'Earth DMG':
            case 'Light DMG':
            case 'Dark DMG':
                value = baseValue + getRandomFloatInclusive(0.0, 0.75);
                break;
            default:
                value = 0;
                break;
        }
    } else if (slot === 'Weapon') {
        function getBaseValue(grade, type) {
            const baseValues = {
                'ATK':    { 'Common': 11.0, 'Uncommon': 13.0, 'Rare': 15.0, 'Epic': 17.0, 'SuperEpic': 19.0 },
                'HP':        { 'Common': 11.0, 'Uncommon': 13.0, 'Rare': 15.0, 'Epic': 17.0, 'SuperEpic': 19.0 },
                'DEF':    { 'Common': 11.0, 'Uncommon': 13.0, 'Rare': 15.0, 'Epic': 17.0, 'SuperEpic': 19.0 },
                'CRIT Rate': { 'Common': 8.25, 'Uncommon': 9.75, 'Rare': 11.25, 'Epic': 12.75, 'SuperEpic': 14.25 },
                'CRIT DMG': { 'Common': 13.75, 'Uncommon': 16.25, 'Rare': 18.75, 'Epic': 21.25, 'SuperEpic': 23.75 },
                'Fire Elem ATK':    { 'Common': 35, 'Uncommon': 45, 'Rare': 55, 'Epic': 65, 'SuperEpic': 75 },
                'Water Elem ATK':  { 'Common': 35, 'Uncommon': 45, 'Rare': 55, 'Epic': 65, 'SuperEpic': 75 },
                'Wind Elem ATK': { 'Common': 35, 'Uncommon': 45, 'Rare': 55, 'Epic': 65, 'SuperEpic': 75 },
                'Earth Elem ATK': { 'Common': 35, 'Uncommon': 45, 'Rare': 55, 'Epic': 65, 'SuperEpic': 75 },
                'Light Elem ATK': { 'Common': 35, 'Uncommon': 45, 'Rare': 55, 'Epic': 65, 'SuperEpic': 75 },
                'Dark Elem ATK': { 'Common': 35, 'Uncommon': 45, 'Rare': 55, 'Epic': 65, 'SuperEpic': 75 }
            };

            return baseValues[type] ? baseValues[type][grade] : 0;
        }

        baseValue = getBaseValue(optionName[0], optionName[1]);

        switch (optionName[1]) {
            case 'ATK':
            case 'HP':
            case 'DEF':
                value = baseValue + getRandomFloatInclusive(0.0, 1.0);
                break;
            case 'CRIT Rate':
                value = baseValue + getRandomFloatInclusive(0.0, 0.75);
                break;
            case 'CRIT DMG':
                value = baseValue + getRandomFloatInclusive(0.0, 1.25);
                break;
            case 'Fire Elem ATK':
            case 'Water Elem ATK':
            case 'Wind Elem ATK':
            case 'Earth Elem ATK':
            case 'Light Elem ATK':
            case 'Dark Elem ATK':
                value = baseValue + getRandomIntInclusive(0, 5);
                break;
            default:
                value = 0;
                break;
        }
    }
    return value.toFixed(2);
}

function getOptionGradeEn() {
    let upperEn = getRandomIntInclusive(0, 99);
    let lowerEn = getRandomIntInclusive(0, 99);
    let upperGradeEn;
    let lowerGradeEn;
    if (scrollTypeEn === 'Normal') {
        upperGradeEn = getGradeEn(upperEn);
        lowerGradeEn = getGradeEn(lowerEn);
    } else if (scrollTypeEn === 'Advanced') {
        upperGradeEn = getGradeHighEn(upperEn);
        lowerGradeEn = getGradeHighEn(lowerEn);
    }
    let upperOpt = getRandomIntInclusive(0, 9999);
    let lowerOpt = getRandomIntInclusive(0, 9999);
    let upperOption = getOptionEn(upperOpt, equipSlotEn);
    let lowerOption = getOptionEn(lowerOpt, equipSlotEn);
    let rawUpperOption = `${upperGradeEn}-${upperOption}`;
    let rawLowerOption = `${lowerGradeEn}-${lowerOption}`;
    //console.log(rawUpperOption + rawLowerOption);
    //console.log(`${upperGradeEn}-${upperOption} +${getValuesEn(rawUpperOption)}%|${lowerGradeEn}-${lowerOption} +${getValuesEn(rawLowerOption)}%`);
    setGradeDetails(upperImgEn, upperStringEn, upperGradeEn);
    setGradeDetails(lowerImgEn, lowerStringEn, lowerGradeEn);

    paidAmount += 20000;
    usedScrolls = paidAmount / 20000;
    console.log(rawUpperOption + rawLowerOption);
    if (upperOption.search('Elem ATK') !== -1)
        upperStringEn.innerText = upperOption + ' +' + getValuesEn(rawUpperOption, equipSlotEn) + '';
    else
        upperStringEn.innerText = upperOption + ' +' + getValuesEn(rawUpperOption, equipSlotEn) + '%';
    if (lowerOption.search('Elem ATK') !== -1)
        lowerStringEn.innerText = lowerOption + ' +' + getValuesEn(rawLowerOption, equipSlotEn) + '';
    else
        lowerStringEn.innerText = lowerOption + ' +' + getValuesEn(rawLowerOption, equipSlotEn) + '%';
    coinStringEn.innerText = paidAmount;
    scrollStringEn.innerText = usedScrolls;
}

function autoScrollsEn() {
    const delay = 10; // 딜레이 시간 (밀리초 단위)

    function generateScrollsEn() {
        let upperEn = getRandomIntInclusive(0, 99);
        let lowerEn = getRandomIntInclusive(0, 99);
        let upperGradeEn;
        let lowerGradeEn;
        if (scrollTypeEn === 'Normal') {
            upperGradeEn = getGradeEn(upperEn);
            lowerGradeEn = getGradeEn(lowerEn);
        } else if (scrollTypeEn === 'Advanced') {
            upperGradeEn = getGradeHighEn(upperEn);
            lowerGradeEn = getGradeHighEn(lowerEn);
        }
        let upperOpt = getRandomIntInclusive(0, 9999);
        let lowerOpt = getRandomIntInclusive(0, 9999);
        let upperOption = getOptionEn(upperOpt, equipSlotEn);
        let lowerOption = getOptionEn(lowerOpt, equipSlotEn);
        let rawUpperOption = `${upperGradeEn}-${upperOption}`;
        let rawLowerOption = `${lowerGradeEn}-${lowerOption}`;

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
        if (meetsCriteria(upperGradeEn, upperOption, targetUpperGradeEn, targetUpperOptionEn) &&
            meetsCriteria(lowerGradeEn, lowerOption, targetLowerGradeEn, targetLowerOptionEn)) {

            setGradeDetails(upperImgEn, upperStringEn, upperGradeEn);
            setGradeDetails(lowerImgEn, lowerStringEn, lowerGradeEn);

            if (upperOption.search('Elem ATK') !== -1)
                upperStringEn.innerText = upperOption + ' +' + getValuesEn(rawUpperOption, equipSlotEn) + '';
            else
                upperStringEn.innerText = upperOption + ' +' + getValuesEn(rawUpperOption, equipSlotEn) + '%';
            if (lowerOption.search('Elem ATK') !== -1)
                lowerStringEn.innerText = lowerOption + ' +' + getValuesEn(rawLowerOption, equipSlotEn) + '';
            else
                lowerStringEn.innerText = lowerOption + ' +' + getValuesEn(rawLowerOption, equipSlotEn) + '%';

            paidAmount += 20000;
            usedScrolls = paidAmount / 20000;
            usedCash += 275;

            coinStringEn.innerText = paidAmount;
            scrollStringEn.innerText = usedScrolls;
        } else {
            paidAmount += 20000;
            usedScrolls = paidAmount / 20000;
            usedCash += 275;

            coinStringEn.innerText = paidAmount;
            scrollStringEn.innerText = usedScrolls;
            setTimeout(generateScrollsEn, delay); // 딜레이 후 재귀 호출
        }
    }
    paidAmount = 0;
    usedScrolls = 0;
    usedCash = 0;
    coinString.innerText = 0;
    scrollString.innerText = 0;
    cashString.innerText = 0 + '\u20A9';
    generateScrollsEn(); // 최초 호출
}
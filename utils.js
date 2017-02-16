'use strict'
const random = () => {
    return Math.floor((Math.random() * 10) + 1);
}
function generateDummy() {
    let arr = [];
    for (var i = 0; i < 100000; i++) {
        let o = {age: random(), answer: random(), gender: random(), country: random(), brand: random()};
        arr[i] = o;
    }
    return arr;
}

// rename it:
// this function check if one obj has all props values included inside other object
function isInclude(obj, other) {
    for (var prop in obj) {
        if (other.hasOwnProperty(prop) && obj.hasOwnProperty(prop)) {
            if (other[prop].indexOf(obj[prop]) === -1) {
                return false;
            }
        }
    }
    return true;
}

/*
  think of error handling.
*/
function filterData(data, filters) {
    return data.filter(row => isInclude(row, filters));
}


function filterData2(array, filters) {
    let filteredData = [];
    for (var i = 0; i < array.length; i++) {
        const row = array[i];
        if (isInclude(row, filters)) {
            filteredData.push(row);
        }
    }
    return filteredData;
}


// can be shorted.
function recode(value, mapper) {
    if (mapper.hasOwnProperty(value)) {
        return mapper[value]
    }
    if (mapper.hasOwnProperty('default')) {
        return mapper.default;
    }
    return value;
}

function testRecode(array, mapper) {
    for (var i = 0; i < array.length; i++) {
        let obj = array[i];
        for (var prop in obj) {
            if (mapper.hasOwnProperty(prop) && obj.hasOwnProperty(prop)) {
                obj[prop] = recode(obj[prop], mapper[prop]);
            }
        }
    }
}

//maybe merge with cleanData?
function cleanData(by=[keys], drop='any||all') {

}

function sortData({}) {

}

function getRecodedFilters(filters, recoder) {

}

const data = generateDummy();
const recoder = {
    age: {2: 1, 3: 1, 5: 2, 6: 2, 7:2, 1:1},
    gender: {2: 1, 3: 1, 5: 2, 6: 2, 7:2, 1:1, default: -1},
}
const filters = {age: [1, 2, 3], gender: [6, 4, 2 ,1]}


// console.time('filterData');
// const filteredData = filterData(data, filters);
// console.timeEnd('filterData');
console.time('filterData2');
const filteredData2 = filterData2(data, filters);
console.timeEnd('filterData2');
console.time('testRecode');
const testedRecoded = testRecode(data, recoder);
console.timeEnd('testRecode');
// console.log(filteredData.length);
console.log(filteredData2.length);



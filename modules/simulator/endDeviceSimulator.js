const seedrandom = require('seedrandom');
const rng = seedrandom();
function getRandomInteger(min, max){
    return Math.floor(rng() * (max - min + 1)) + min;
}
function requestTask(){
    let check = Array.from({length: getRandomInteger(1,10)}, () => getRandomInteger(1, 10));
    check = [...new Set(check)];
    check.sort(function(a,b){
        if(a.length == b.length) return (a < b ? -1 : 1);
        return (a.lenght < b.length ? -1 : 1);
    });
    const task = {
        id: getRandomInteger(1000, 10000),
        name: 'dummyname',
        swList : check
    }
    console.log(`Request to execute task id: ${task.id}`);
    console.log(`The array is: ${task.swList}`)
}
setInterval(requestTask,getRandomInteger(2000,3000));
"use strict"

const weather = {
    Monday: 20.5,
    Tuesday: 17.3,
    Wednesday: 14.3,
    Thursday: 19.1,
    Friday: 17.2,
    Saturday: 16.5,
    Sunday: 22.1,
    getAverageTemp: function(){
       const averageTemp = (this.Monday + this.Tuesday + this.Wednesday + this.Thursday + this.Friday + this.Saturday + this.Sunday) / 7;
       return averageTemp.toFixed(1);
    },
    getHighestTemp: function(){
        const highestTemp = Math.max(this.Monday, this.Tuesday, this.Wednesday, this.Thursday, this.Friday, this.Saturday, this.Sunday);
        return highestTemp;
    },
    getLowestTemp: function(){
        const lowestTemp = Math.min(this.Monday, this.Tuesday, this.Wednesday, this.Thursday, this.Friday, this.Saturday, this.Sunday);
        return lowestTemp;
    },
    [Symbol.toPrimitive](hint) {
        if (hint === "string") {
            const days = Object.keys(this).splice(0,7);
            const shortDays = days.map((day) => {
               return day.substring(0, 2)
            });
            const result = `(${shortDays.join('-')})`
            return console.log(result);
        }
        if (hint === "number") {
            return this.getAverageTemp();
        }
        return 'Choose string or number for result';
    }
};
// В начале  просто сделал функцию под обьект но потом прочитал что именно обьект должен находить значения и переделал.
// function getAverageTemp(weatherObject){
//     const totalTemp = Object.values(weatherObject).reduce((accumulator, temp) => {
//             const result = accumulator + temp
//             return result
//         }, 0)
//         const averageTemp = (totalTemp / 7).toFixed(2)
//     return console.log(averageTemp);
// При этом у меня есть ощущение что есть вариант где ненадо вписывать все эти this. + this. + this. + ..... и можно сделать как то красивее, но не доходит как.
// нельзя как то сделать это через спрэд оператор ... ? Если честно то тема сама по себе громоздкая для одного урока. Учитывая что я читал сам, потом смотрел урок, 
// потом смотрел ютуб, я все равно понимаю что прямо вот очень плохо ознакомился с этим. Если ты говоришь что в целом работа с обьектами, конструктор функций
// и так далее - является достаточно важными элементами в js , то хотелось бы с тобой пройти побольше практических задач, потому что вроде все понятно,
// но как эти знания на практике использовать - на текущий момент просто трудно представить, а я еще даже не садился за библиотеку (таск 2)

    

console.log(weather.getAverageTemp());
console.log(weather.getHighestTemp());
console.log(weather.getLowestTemp());
String(weather);
console.log(Number(weather));
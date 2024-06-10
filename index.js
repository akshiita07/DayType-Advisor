//1. npm init
//2. npm i express
//3. npm install ejs
// in package.json type:module

import express from 'express';
const app = express();
const port = 3000;

import ejs from 'ejs';
var isWeeknd = false;

//create our own middleware to check current day using getDay() function of JS
function checkDayMiddleware(req, res, next) {

    // const day = new Date("June 9, 2024");       //to test for sunday
    const day = new Date();
    var todayDay = day.getDay();
    console.log(todayDay); //gives output 0 to 6...0-sun 1-mon 2-tues

    if (todayDay === 0 || todayDay === 6) {
        //it is weekend
        isWeeknd = true;
    }
    else {
        //weekday
        isWeeknd = false;
    }
    next();
}
app.use(checkDayMiddleware);

app.get('/', (req, res) => {
    if (isWeeknd) {
        res.render("index.ejs", {
            dayType: "the Weekend",
            advice: "have fun"
        });
    }
    else {
        res.render("index.ejs", {
            dayType: "the Weekday",
            advice: "work hard"
        });
    }

})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
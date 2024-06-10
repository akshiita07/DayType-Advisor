### Project Name: DayType Advisor

### Project Brief:
DayType Advisor is a Node.js application built using Express and EJS to dynamically display messages based on whether the current day is a weekend or a weekday. The application utilizes custom middleware to check the current day and render appropriate advice on the homepage.

### Implementations:

#### 1. Project Initialization and Dependencies:
First, the project is initialized with `npm init`, and the required packages are installed:
```sh
npm init
npm install express ejs
```
The `package.json` file is configured to use ES6 modules by adding `"type": "module"`.

#### 2. Setting Up the Express Server:
An Express server is created and set to listen on port 3000.
```js
import express from 'express';
const app = express();
const port = 3000;
```

#### 3. EJS Templating Engine:
EJS is imported and set up to render HTML templates.
```js
import ejs from 'ejs';
app.set('view engine', 'ejs');
```

#### 4. Custom Middleware:
A middleware function `checkDayMiddleware` is created to check the current day using JavaScript’s `getDay()` function. It sets a flag `isWeeknd` based on whether the day is a weekend (Saturday or Sunday) or a weekday.
```js
var isWeeknd = false;

function checkDayMiddleware(req, res, next) {
    const day = new Date();
    var todayDay = day.getDay();
    
    if (todayDay === 0 || todayDay === 6) {
        isWeeknd = true;
    } else {
        isWeeknd = false;
    }
    next();
}
app.use(checkDayMiddleware);
```

#### 5. Route Handling:
A GET route for the root URL `/` is set up to render an EJS template with different messages based on whether it’s a weekend or a weekday.
```js
app.get('/', (req, res) => {
    if (isWeeknd) {
        res.render("index.ejs", {
            dayType: "the Weekend",
            advice: "have fun"
        });
    } else {
        res.render("index.ejs", {
            dayType: "the Weekday",
            advice: "work hard"
        });
    }
});
```

#### 6. Starting the Server:
The server is started and listens on the specified port.
```js
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```

#### 7. EJS Template (index.ejs):
An EJS template (`index.ejs`) is created to dynamically display the message based on the data passed from the server.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ejs1</title>
</head>
<body>
    <h1>Hey! It's <%= dayType %>, it's time to <%= advice %>!</h1>
</body>
</html>
```

### How It Works:
1. When a user visits the root URL, the middleware `checkDayMiddleware` determines the current day.
2. Based on the day, the middleware sets the `isWeeknd` flag.
3. The GET route renders the `index.ejs` template with the appropriate message for the weekend or weekday.
4. The server listens on port 3000, and users can access the dynamic message by visiting `http://localhost:3000`.

This setup provides a simple yet effective way to display dynamic content based on the current day using Node.js, Express, and EJS.

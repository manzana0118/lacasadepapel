console.clear();

window.onload = function () {
    // Greetings
    const loginForm = document.querySelector("#login-form");
    const loginInput = document.querySelector("#login-form input");
    const greeting = document.querySelector("#greeting");

    const HIDDEN_CLASSNAME = "hidden";
    const USERNAME_KEY = "username";

    function onLoginSubmit(event) {
        event.preventDefault();
        loginForm.classList.add(HIDDEN_CLASSNAME);
        const username = loginInput.value;
        localStorage.setItem(USERNAME_KEY, username);
        paintGreetings(username);
    }

    function paintGreetings(username) {
        greeting.innerText = `Hello ${username}!`;
        greeting.classList.remove(HIDDEN_CLASSNAME);
    }

    const savedUsername = localStorage.getItem(USERNAME_KEY);

    if (savedUsername === null) {
        loginForm.classList.remove(HIDDEN_CLASSNAME);
        loginForm.addEventListener("submit", onLoginSubmit);
    } else {
        paintGreetings(savedUsername);
    }


    // Background
    const wrap = document.querySelector("#wrap");
    const images = ["bg01.jpg", "bg02.jpg", "bg03.jpg", "bg04.jpg", "bg05.jpg", "bg06.jpg", "bg07.jpg"];
    const chosenImage = images[Math.floor(Math.random() * images.length)];
    const bgImage = document.createElement("img");
    bgImage.src = `images/${chosenImage}`;
    document.body.appendChild(bgImage);




    // Clock
    const clock = document.querySelector("h2#clock");

    function getClock() {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        clock.innerText = `${hours}:${minutes}:${seconds}`;
    }

    getClock();
    setInterval(getClock, 1000);




    // Quotes
    const quotes = [{
            quote: "The way to get started is to quit talking and begin doing.",
            author: "Walt Disney",
        },
        {
            quote: "Life is what happens when you're busy making other plans.",
            author: "John Lennon",
        },
        {
            quote: "The world is a book and those who do not travel read only one page.",
            author: "Saint Augustine",
        },
        {
            quote: "Life is either a daring adventure or nothing at all.",
            author: "Helen Keller",
        },
        {
            quote: "To Travel is to Live",
            author: "Hans Christian Andersen",
        },
        {
            quote: "Only a life lived for others is a life worthwhile.",
            author: "Albert Einstein",
        },
        {
            quote: "You only live once, but if you do it right, once is enough.",
            author: "Mae West",
        },
        {
            quote: "Never go on trips with anyone you do not love.",
            author: "Hemmingway",
        },
        {
            quote: "We wander for distraction, but we travel for fulfilment.",
            author: "Hilaire Belloc",
        },
        {
            quote: "Travel expands the mind and fills the gap.",
            author: "Sheda Savage",
        },
    ];

    const quote = document.querySelector("#quote span:first-child");
    const author = document.querySelector("#quote span:last-child");
    const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

    quote.innerText = todaysQuote.quote;
    author.innerText = todaysQuote.author;




    // Todos 
    const toDoForm = document.getElementById("todo-form");
    const toDoInput = document.querySelector("#todo-form input");
    const toDoList = document.getElementById("todo-list");

    const TODOS_KEY = "todos";

    let toDos = [];

    function saveToDos() {
        localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
    }

    function deleteToDo(event) {
        const li = event.target.parentElement;
        li.remove();
        toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
        saveToDos();
    }

    function paintToDo(newTodo) {
        const li = document.createElement("li");
        li.id = newTodo.id;
        const span = document.createElement("span");
        span.innerText = newTodo.text;
        const button = document.createElement("button");
        button.innerText = "❌";
        button.addEventListener("click", deleteToDo);
        li.appendChild(span);
        li.appendChild(button);
        toDoList.appendChild(li);
    }

    function handleToDoSubmit(event) {
        event.preventDefault();
        const newTodo = toDoInput.value;
        toDoInput.value = "";
        const newTodoObj = {
            text: newTodo,
            id: Date.now(),
        };
        toDos.push(newTodoObj);
        paintToDo(newTodoObj);
        saveToDos();
    };

    toDoForm.addEventListener("submit", handleToDoSubmit);

    const savedToDos = localStorage.getItem(TODOS_KEY);

    if (savedToDos !== null) {
        const parsedToDos = JSON.parse(savedToDos);
        toDos = parsedToDos;
        parsedToDos.forEach(paintToDo);
    };




    // Weather
    const weather = document.querySelector("#weather span:first-child");
    const city = document.querySelector("#weather span:last-child");
    const API_KEY = "ea24c2269fc06231a4de91e64bee606a";

    function onGeoOk(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                city.innerText = data.name;
                weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
            });
    }

    function onGeoError() {
        alert("Can't find you. No weather for you.");
    }

    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
};
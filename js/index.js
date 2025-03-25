'use strict'
// <    >  =>

    const toggle = document.getElementById("toggle-dark-mode");
    const quizToggle = document.querySelector(".container-quiz");

    toggle.addEventListener("change", () => {
        quizToggle.classList.toggle("dark-theme");
    });

    const questions = {
        html: [
            { question: "¿Qué significa HTML?", options: ["Hyper Text Markup Language", "High Text Machine Learning", "Hyperlinks and Text Markup Language"], correct: 0 },
            { question: "¿Cuál es la etiqueta para un enlace?", options: ["<link>", "<a>", "<href>"], correct: 1 },
            { question: "¿Qué etiqueta se usa para listas ordenadas?", options: ["<ol>", "<ul>", "<li>"], correct: 0 },
            { question: "¿Cuál es el atributo para imágenes?", options: ["alt", "src", "href"], correct: 1 },
            { question: "¿Qué etiqueta representa un título?", options: ["<h1>", "<title>", "<header>"], correct: 0 }
        ],
        css: [
            { question: "¿Qué propiedad cambia el color de fondo?", options: ["color", "background", "bgcolor"], correct: 1 },
            { question: "¿Cuál es la unidad relativa de fuente?", options: ["px", "em", "cm"], correct: 1 },
            { question: "¿Qué propiedad cambia el tipo de letra?", options: ["font-style", "font-family", "text-style"], correct: 1 },
            { question: "¿Cómo se hace un comentario en CSS?", options: ["// comentario", "/* comentario */", "<!-- comentario -->"], correct: 1 },
            { question: "¿Qué propiedad cambia el color del texto?", options: ["text-color", "color", "font-color"], correct: 1 }
        ],
        javascript: [
            { question: "¿Cómo se declara una variable?", options: ["var nombre;", "variable nombre;", "v nombre;"], correct: 0 },
            { question: "¿Qué función muestra un mensaje en consola?", options: ["console.log()", "print()", "echo()"], correct: 0 },
            { question: "¿Cómo se define una función?", options: ["function myFunction()", "def myFunction()", "fn myFunction()"], correct: 0 },
            { question: "¿Qué símbolo se usa para concatenar strings?", options: ["&", "+", "-"], correct: 1 },
            { question: "¿Cómo convertir string a número?", options: ["parseInt()", "stringToNumber()", "toNumber()"], correct: 0 }
        ]
    };
    
    let currentQuestionIndex = 0;
    let currentCategory = "";
    let score = 0;
    
    const questionElement = document.getElementById("question");
    const optionsElements = document.querySelectorAll(".answer");
    const quizContainer = document.getElementById("quizContainer");
    const welcomeContainer = document.getElementById("containerWelcome");
    const resultContainer = document.getElementById("resultContainer");
    const resultText = document.getElementById("resultText");
    const restartButton = document.getElementById("restartButton");
    
    // Función para cargar la pregunta actual
    function loadQuestion() {
        const currentQuestion = questions[currentCategory][currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        
        optionsElements.forEach((option, index) => {
            option.textContent = currentQuestion.options[index];
            option.classList.remove("correct", "incorrect"); // Limpiar estilos
            option.onclick = () => checkAnswer(index);
        });
    }
    
    // Función para verificar la respuesta
    function checkAnswer(selectedIndex) {
        const currentQuestion = questions[currentCategory][currentQuestionIndex];
        
        if (selectedIndex === currentQuestion.correct) {
            optionsElements[selectedIndex].classList.add("correct"); // Verde si es correcta
            score++; // Aumenta el puntaje
        } else {
            optionsElements[selectedIndex].classList.add("incorrect"); // Rojo si es incorrecta
        }
    
        // Deshabilitar todas las opciones para evitar cambios
        optionsElements.forEach(option => {
            option.onclick = null;
        });
    
        // Pasar a la siguiente pregunta después de 500ms
        setTimeout(() => {
            currentQuestionIndex++;
    
            if (currentQuestionIndex < questions[currentCategory].length) {
                loadQuestion();
            } else {
                showResults(); // Mostrar resultados cuando termine el cuestionario
            }
        }, 500);
    }
    
    // Función para mostrar los resultados
    function showResults() {
        quizContainer.style.display = "none";
        resultContainer.style.display = "flex";
        resultText.textContent = `Puntaje: ${score} / ${questions[currentCategory].length}`;
    }
    
    // Iniciar el quiz cuando se elige una categoría
    document.getElementById("html").onclick = () => startQuiz("html");
    document.getElementById("css").onclick = () => startQuiz("css");
    document.getElementById("javascript").onclick = () => startQuiz("javascript");
    
    // Función para iniciar el quiz
    function startQuiz(category) {
        currentCategory = category;
        currentQuestionIndex = 0;
        score = 0;
        welcomeContainer.style.display = "none";
        quizContainer.style.display = "block";
        loadQuestion();
    };
    
    // Reiniciar el quiz
    restartButton.onclick = () => location.reload();

    // Reiniciar el quiz sin recargar la página
restartButton.onclick = () => {
    resultContainer.style.display = "none"; // Oculta resultados
    containerWelcome.style.display = "flex"; // Muestra pantalla inicial
    quizContainer.style.display = "none"; // Oculta el quiz

    // Resetear variables
    currentQuestionIndex = 0;
    score = 0;
    currentCategory = "";
};

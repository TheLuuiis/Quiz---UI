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
            { question: "¿Qué etiqueta representa un título?", options: ["<h1>", "<title>", "<header>"], correct: 0 },
            { question: "¿Cuál es la estructura básica de un documento HTML?", options: ["html-head-body", "header-main-footer", "doctype-html"], correct: 0 },
            { question: "¿Cómo se define un comentario en HTML?", options: ["// comentario", "<!-- comentario -->", "/* comentario */"], correct: 1 },
            { question: "¿Cuál es la etiqueta para insertar una imagen?", options: ["<img>", "<picture>", "<image>"], correct: 0 },
            { question: "¿Cómo se define una tabla en HTML?", options: ["<table>", "<tab>", "<grid>"], correct: 0 },
            { question: "¿Qué etiqueta se usa para un campo de entrada de texto?", options: ["<input>", "<textarea>", "<text>"], correct: 0 },
            { question: "¿Cuál es el atributo para especificar un enlace en <a>?", options: ["href", "link", "src"], correct: 0 },
            { question: "¿Qué etiqueta se usa para dividir el contenido en secciones?", options: ["<section>", "<div>", "<article>"], correct: 1 },
            { question: "¿Cuál es la etiqueta para agregar una lista desordenada?", options: ["<ul>", "<ol>", "<list>"], correct: 0 },
            { question: "¿Qué etiqueta define el pie de una tabla?", options: ["<tfoot>", "<bottom>", "<foot>"], correct: 0 },
            { question: "¿Cómo se enlaza un archivo CSS externo?", options: ["<link>", "<style>", "<css>"], correct: 0 }
        ],
        css: [
            { question: "¿Qué propiedad cambia el color de fondo?", options: ["color", "background", "bgcolor"], correct: 1 },
            { question: "¿Cuál es la unidad relativa de fuente?", options: ["px", "em", "cm"], correct: 1 },
            { question: "¿Qué propiedad cambia el tipo de letra?", options: ["font-style", "font-family", "text-style"], correct: 1 },
            { question: "¿Cómo se hace un comentario en CSS?", options: ["// comentario", "/* comentario */", "<!-- comentario -->"], correct: 1 },
            { question: "¿Qué propiedad cambia el color del texto?", options: ["text-color", "color", "font-color"], correct: 1 },
            { question: "¿Qué propiedad define el ancho de un borde?", options: ["border-width", "width", "border-size"], correct: 0 },
            { question: "¿Cómo se alinea el texto al centro?", options: ["align-center", "text-align: center;", "center"], correct: 1 },
            { question: "¿Cuál es la propiedad para ocultar un elemento?", options: ["display: none;", "visibility: hidden;", "opacity: 0;"], correct: 0 },
            { question: "¿Qué valor de display hace que un elemento sea un bloque?", options: ["inline", "block", "flex"], correct: 1 },
            { question: "¿Qué propiedad se usa para el espacio interno de un elemento?", options: ["padding", "margin", "spacing"], correct: 0 },
            { question: "¿Cómo se hace una transición de color?", options: ["transition", "animation", "transform"], correct: 0 },
            { question: "¿Qué propiedad define la altura de un elemento?", options: ["height", "size", "max-height"], correct: 0 },
            { question: "¿Cuál es la propiedad para definir un grid?", options: ["display: grid;", "grid-template", "grid"], correct: 0 },
            { question: "¿Qué propiedad establece un fondo degradado?", options: ["gradient", "background-gradient", "background"], correct: 1 },
            { question: "¿Cómo se aplica una sombra al texto?", options: ["shadow-text", "text-shadow", "font-shadow"], correct: 1 }
        ],
        javascript: [
            { question: "¿Cómo se declara una variable?", options: ["var nombre;", "variable nombre;", "v nombre;"], correct: 0 },
            { question: "¿Qué función muestra un mensaje en consola?", options: ["console.log()", "print()", "echo()"], correct: 0 },
            { question: "¿Cómo se define una función?", options: ["function myFunction()", "def myFunction()", "fn myFunction()"], correct: 0 },
            { question: "¿Qué símbolo se usa para concatenar strings?", options: ["&", "+", "-"], correct: 1 },
            { question: "¿Cómo convertir string a número?", options: ["parseInt()", "stringToNumber()", "toNumber()"], correct: 0 },
            { question: "¿Cómo se define una constante en JavaScript?", options: ["const", "constant", "let"], correct: 0 },
            { question: "¿Qué método convierte un array en string?", options: ["join()", "toString()", "stringify()"], correct: 0 },
            { question: "¿Cómo obtener la longitud de un array?", options: ["size", "length", "count"], correct: 1 },
            { question: "¿Qué evento detecta un clic?", options: ["onClick", "click", "addEventListener('click')"], correct: 2 },
            { question: "¿Cómo se obtiene un elemento por su id?", options: ["getElementById()", "querySelector()", "getById()"], correct: 0 }
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
    };
    
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

/* Animaciones */
document.addEventListener("DOMContentLoaded", function () {
    const loader = document.createElement("div");
    loader.classList.add("loader");
    document.body.appendChild(loader);

    // Estilos del loader
    const style = document.createElement("style");
    style.innerHTML = `
        .loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(49, 62, 81, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            transition: opacity 0.8s ease-out;
        }
        .spinner {
            width: 80px;
            height: 80px;
            border: 8px solid rgba(49, 62, 81, 0.9);
            border-top: 8px solid white;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Añadir el spinner
    const spinner = document.createElement("div");
    spinner.classList.add("spinner");
    loader.appendChild(spinner);

    // Esperar a que la página cargue completamente
    window.onload = function () {
        loader.style.opacity = "9";
        setTimeout(() => loader.remove(), 1000);
    };

});

    // Configuración de ScrollReveal
    ScrollReveal().reveal('.question-container', {
        origin: 'bottom',
        distance: '50px',
        duration: 500,
        easing: 'ease-in-out',
        reset: true
    });
    
    function showNextQuestion() {
        const questionContainer = document.querySelector('.question-container');
    
        questionContainer.style.opacity = '0.9';
    
        setTimeout(() => {
            questionContainer.style.opacity = '1';
            ScrollReveal().reveal('.question-container'); 
        }, 200); 
    };
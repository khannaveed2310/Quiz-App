const question = [
    {
        question:"What is the most common surname in the United States?",
        answer: [
            {text: "Anderson", correct: false},
            {text: "Smith", correct: true},
            {text: "Broad", correct: false},
            {text: "Lynn", correct: false},
        ]
    },
    {
        question:"What company was originally called Cadabra?",
        answer: [
            {text: "Amazon", correct: true},
            {text: "Flipkart", correct: false},
            {text: "Netflix", correct: false},
            {text: "Hotstar", correct: false},
        ]
    },    {
        question:"How many elements are in the periodic table? ",
        answer: [
            {text: "120", correct: false},
            {text: "128", correct: false},
            {text: "119", correct: false},
            {text: "118", correct: true},
        ]
    },    {
        question:"What country has won the most FootBall World Cups?",
        answer: [
            {text: "Argentina", correct: false},
            {text: "Portugal", correct: false},
            {text: "India", correct: false},
            {text: "Brazil", correct: true},
        ]
    },    {
        question:"How many bones do we have in an ear?",
        answer: [
            {text: "1", correct: false},
            {text: "2", correct: false},
            {text: "3", correct: true},
            {text: "4", correct: false},
        ]
    }
];


const questionElement = document.getElementById("question")
const answerButton = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score= 0;
    nextButton.innerHtml = "NEXT";
    showQuestion()
}

function showQuestion(){
    resetState()
    let currentQuestion = question[currentQuestionIndex]
    let questionNo= currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;


    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState(){
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true"
    if(isCorrect){
        selectBtn.classList.add("correct")
        score ++;
    }else{
        selectBtn.classList.add("incorrect")
    }
        Array.from(answerButton.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct")
            }
            button.disabled = true;
        });
        nextButton.style.display = "block"

}
function showScore(){
    resetState()
    questionElement.innerHTML = `you scored ${score } out of ${question.length}`

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}

function handleNextButton() {
    currentQuestionIndex++;
    if( currentQuestionIndex < question.length){
        showQuestion()
    }else{
        showScore()
    }
}

nextButton.addEventListener("click" , () => {
    if(currentQuestionIndex < question.length){
        handleNextButton()
    }else{
        startQuiz()
    }
})

startQuiz()
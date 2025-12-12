// クイズの質問データ
const quizData = [
    {
        question: "日本の首都はどこですか？",
        answers: [
            { text: "東京", correct: true },
            { text: "大阪", correct: false },
            { text: "京都", correct: false },
            { text: "名古屋", correct: false }
        ]
    },
    {
        question: "1 + 1 は何ですか？",
        answers: [
            { text: "1", correct: false },
            { text: "2", correct: true },
            { text: "3", correct: false },
            { text: "4", correct: false }
        ]
    },
    {
        question: "地球上で一番大きな海洋は？",
        answers: [
            { text: "大西洋", correct: false },
            { text: "インド洋", correct: false },
            { text: "太平洋", correct: true },
            { text: "北極海", correct: false }
        ]
    },
    {
        question: "富士山の高さは約何メートルですか？",
        answers: [
            { text: "約2,776メートル", correct: false },
            { text: "約3,776メートル", correct: true },
            { text: "約4,776メートル", correct: false },
            { text: "約5,776メートル", correct: false }
        ]
    },
    {
        question: "人間の体には何本の骨がありますか？",
        answers: [
            { text: "約106本", correct: false },
            { text: "約156本", correct: false },
            { text: "約206本", correct: true },
            { text: "約256本", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const quizContent = document.getElementById('quiz-content');
const scoreContainer = document.getElementById('score-container');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-btn');

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
});
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startButton.classList.add('hide');
    nextButton.classList.remove('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = `問題 ${currentQuestionIndex + 1}/${quizData.length}: ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer, button));
        answerButtonsElement.appendChild(button);
    });

    nextButton.classList.add('hide');
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(answer, button) {
    const isCorrect = answer.correct;
    
    if (isCorrect) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('wrong');
        // 正解のボタンを緑色に
        Array.from(answerButtonsElement.children).forEach(btn => {
            const answerText = btn.textContent;
            const correctAnswer = quizData[currentQuestionIndex].answers.find(a => a.correct);
            if (answerText === correctAnswer.text) {
                btn.classList.add('correct');
            }
        });
    }

    // すべてのボタンを無効化
    Array.from(answerButtonsElement.children).forEach(btn => {
        btn.classList.add('disabled');
    });

    nextButton.classList.remove('hide');
}

function showResults() {
    quizContent.classList.add('hide');
    scoreContainer.classList.remove('hide');
    
    const percentage = Math.round((score / quizData.length) * 100);
    let message = '';
    
    if (percentage === 100) {
        message = '完璧です！🎉';
    } else if (percentage >= 80) {
        message = '素晴らしい！👏';
    } else if (percentage >= 60) {
        message = '良くできました！👍';
    } else if (percentage >= 40) {
        message = 'もう少しです！💪';
    } else {
        message = '頑張りましょう！📚';
    }
    
    finalScoreElement.textContent = `${message}\n\nスコア: ${score}/${quizData.length} (${percentage}%)`;
}

function restartQuiz() {
    quizContent.classList.remove('hide');
    scoreContainer.classList.add('hide');
    startButton.classList.remove('hide');
    nextButton.classList.add('hide');
    resetState();
    questionElement.textContent = '質問がここに表示されます';
}

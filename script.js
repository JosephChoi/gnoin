// 퀴즈 데이터
const quizData = [
    {
        question: "몸과 마음은 깊이 연결되어 있어 마음의 스트레스가 몸의 건강까지 해칠 수 있다",
        answer: "O",
        feedback: "신체 건강과 함께 마음 돌봄도 꾸준히 하여 건강히 지내시기 바랍니다"
    },
    {
        question: "마음이 힘들 때 상담이나 도움을 청하는 것은 문제가 심각한 사람이거나 나약한 것이다.",
        answer: "X",
        feedback: "움츠리고만 있기보다는 마음의 문을 열 수 있다는 것은 자신을 위한 적극적이고 매우 용기있는 선택일 수 있습니다"
    },
    {
        question: "경기도노인종합상담센터 노인온상담번호는 1888-2255이다.",
        answer: "X",
        feedback: "1833-2255(이리오오)"
    }
];

// DOM 요소 참조
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const questionEl = document.getElementById('question');
const btnO = document.getElementById('btn-o');
const btnX = document.getElementById('btn-x');
const resultImageEl = document.getElementById('result-image');
const resultMessageEl = document.getElementById('result-message');
const btnRetry = document.getElementById('btn-retry');

let currentQuiz = null;

// 랜덤 문제 선택 함수
function getRandomQuiz() {
    const randomIndex = Math.floor(Math.random() * quizData.length);
    return quizData[randomIndex];
}

// 퀴즈 로드 함수
function loadQuiz() {
    currentQuiz = getRandomQuiz();
    questionEl.textContent = currentQuiz.question;
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
}

// 답변 체크 함수
function checkAnswer(answer) {
    const isCorrect = answer === currentQuiz.answer;
    
    // 결과 화면 표시
    resultImageEl.src = isCorrect ? 'images/ok.jpg' : 'images/onemoretime.jpg';
    resultMessageEl.textContent = isCorrect 
        ? currentQuiz.feedback 
        : '한번 더 도전해보세요';
    
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
}

// 이벤트 리스너 설정
btnO.addEventListener('click', () => checkAnswer('O'));
btnX.addEventListener('click', () => checkAnswer('X'));
btnRetry.addEventListener('click', loadQuiz);

// 초기 퀴즈 로드
window.addEventListener('DOMContentLoaded', loadQuiz); 
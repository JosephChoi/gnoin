// 퀴즈 데이터
const quizData = [
    {
        question: "몸과 마음은 깊이 연결되어 있어\n마음의 스트레스가 몸의 건강까지\n해칠 수 있다",
        answer: "O",
        feedback: "신체 건강과 함께 마음 돌봄도\n꾸준히 하여 건강히 지내시기 바랍니다"
    },
    {
        question: "마음이 힘들 때 상담이나\n도움을 청하는 것은 문제가 심각한\n사람이거나 나약한 것이다.",
        answer: "X",
        feedback: "움츠리고만 있기보다는 마음의 문을\n열 수 있다는 것은 자신을 위한\n적극적이고 매우 용기있는 선택일 수 있습니다"
    },
    {
        question: "경기도노인종합상담센터\n노인온상담번호는\n1888-2255이다.",
        answer: "X",
        feedback: "1833-2255\n(이리오오)"
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
const btnRetrySame = document.getElementById('btn-retry-same');
const btnRetryNew = document.getElementById('btn-retry-new');
const resultButtons = document.querySelector('.result-buttons');

let currentQuiz = null;
let previousQuizIndex = -1;

// 랜덤 문제 선택 함수
function getRandomQuiz(excludeIndex = -1) {
    // 이전 문제 인덱스를 제외하고 랜덤 선택
    let availableIndices = [];
    
    // 가능한 인덱스 목록 생성
    for (let i = 0; i < quizData.length; i++) {
        if (i !== excludeIndex) {
            availableIndices.push(i);
        }
    }
    
    // 남은 문제가 없으면 전체 목록에서 랜덤 선택
    if (availableIndices.length === 0) {
        const randomIndex = Math.floor(Math.random() * quizData.length);
        return quizData[randomIndex];
    }
    
    // 가능한 인덱스 중에서 랜덤 선택
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    return quizData[availableIndices[randomIndex]];
}

// 현재 퀴즈의 인덱스 찾기
function findQuizIndex(quiz) {
    return quizData.findIndex(q => q.question === quiz.question);
}

// 퀴즈 로드 함수
function loadQuiz(getNewQuiz = true) {
    if (getNewQuiz) {
        // 이전 문제와 다른 새 문제 로드
        previousQuizIndex = currentQuiz ? findQuizIndex(currentQuiz) : -1;
        currentQuiz = getRandomQuiz(previousQuizIndex);
    }
    
    questionEl.textContent = currentQuiz.question;
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
}

// 같은 문제 다시 로드
function reloadSameQuiz() {
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
    
    // 정답일 때는 '다시 풀기' 버튼 숨김, 오답일 때는 두 버튼 모두 표시
    if (isCorrect) {
        btnRetrySame.style.display = 'none';
        btnRetryNew.style.width = '80%';
        resultButtons.style.flexDirection = 'column';
        resultButtons.style.alignItems = 'center';
    } else {
        btnRetrySame.style.display = 'block';
        btnRetryNew.style.width = '';
        
        // 화면 크기에 따라 버튼 배치 조정
        if (window.innerWidth <= 768) {
            resultButtons.style.flexDirection = 'column';
            resultButtons.style.alignItems = 'center';
        } else {
            resultButtons.style.flexDirection = 'row';
            resultButtons.style.alignItems = 'center';
        }
    }
    
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
}

// 화면 크기 변경 시 버튼 배치 조정
window.addEventListener('resize', function() {
    // 결과 화면이 표시된 상태에서만 처리
    if (!resultContainer.classList.contains('hidden')) {
        if (btnRetrySame.style.display === 'none') {
            // 정답 상태일 때는 항상 세로 배치
            resultButtons.style.flexDirection = 'column';
            resultButtons.style.alignItems = 'center';
        } else {
            // 오답 상태일 때는 화면 크기에 따라 배치 변경
            if (window.innerWidth <= 768) {
                resultButtons.style.flexDirection = 'column';
                resultButtons.style.alignItems = 'center';
            } else {
                resultButtons.style.flexDirection = 'row';
                resultButtons.style.alignItems = 'center';
            }
        }
    }
});

// 이벤트 리스너 설정
btnO.addEventListener('click', () => checkAnswer('O'));
btnX.addEventListener('click', () => checkAnswer('X'));
btnRetrySame.addEventListener('click', reloadSameQuiz);
btnRetryNew.addEventListener('click', () => loadQuiz(true));

// 초기 퀴즈 로드
window.addEventListener('DOMContentLoaded', () => loadQuiz(true)); 
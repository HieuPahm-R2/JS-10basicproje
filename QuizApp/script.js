const quizData = [
  {
    question: "What is HUST stand for?",
    a: "Hanoi University of Science and Technology",
    b: "Bach khoa Ha noi",
    c: "Nha an A15",
    d: "Hanoi University of science and Translation",
    correct: "a",
  },
  {
    question: "Cách để làm chủ GT trong 1 đêm?",
    a: "Có cái đb",
    b: "Học HTMLOL",
    c: "Học Javalorant",
    d: "Trôn gần D3",
    correct: "a",
  },
  {
    question: "Who is best girl in this season on AnimeCorner?",
    a: "Anna Yanami",
    b: "Hanazono hahari",
    c: "Nakano Nino",
    d: "Akane Kurokawa",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "2002",
    b: "1995",
    c: "2017",
    d: "none of the above",
    correct: "b",
  },
  {
    question: "What is the most used programming language in 2024?",
    a: "Java",
    b: "Golang",
    c: "Python",
    d: "JavaScript",
    correct: "a",
  },
];
const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const text_a = document.getElementById("text-a");
const text_b = document.getElementById("text-b");
const text_c = document.getElementById("text-c");
const text_d = document.getElementById("text-d");
const submitBtn = document.getElementById("submit");
let currentQ = 0;
let score = 0;
//initial
load();
function load() {
  deselectA();
  const currentQuizData = quizData[currentQ];
  questionEl.innerHTML = currentQuizData.question;
  text_a.innerHTML = currentQuizData.a;
  text_b.innerHTML = currentQuizData.b;
  text_c.innerHTML = currentQuizData.c;
  text_d.innerHTML = currentQuizData.d;
}
function getSelected() {
  let ans = undefined;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      ans = answerEl.id;
    }
  });
  return ans;
}
function deselectA() {
  answerEls.forEach((e) => {
    e.checked = false;
  });
}
submitBtn.addEventListener("click", () => {
  const ans = getSelected();
  if (ans) {
    if (ans === quizData[currentQ].correct) {
      score++;
    }
    currentQ++;
    if (currentQ < quizData.length) {
      load();
    } else {
      quiz.innerHTML = `<h2> Bạn đã trả lời được ${score}/ ${quizData.length} câu
      <button onclick="location.reload()">Reload Question</button>`;
    }
  }
});

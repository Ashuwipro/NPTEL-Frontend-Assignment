//getting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = document.querySelector(".buttons .quit");
const continue_btn = document.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

const option_list = document.querySelector(".option_list");

let optionsSelected = [];
let correctAns;
let userAns;
let totalTime = 0;

//if start quiz button clicked
start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); //show the info box
};

//if exit button clicked
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //hide the info box
};

//if continue button clicked
continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //hide the info box
  quiz_box.classList.add("activeQuiz"); //show the quiz box

  //getting the total time
  for (let i = 0; i < questions.length; i++) {
    totalTime += questions[i].time;
  }

  showQuestions(0);
  queCounter(1);
  startTimer(totalTime);
  startTimerLine(0);
};

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = totalTime;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz");
  result_box.classList.remove("activeResult");
  optionsSelected = [];
  option_list.textContent = "";

  que_count = 0;
  que_numb = 1;
  timeValue = totalTime;
  widthValue = 0;
  userScore = 0;

  showQuestions(que_count);
  queCounter(que_numb);
  clearInterval(counter);
  startTimer(timeValue);
  clearInterval(counterLine);
  startTimerLine(widthValue);
  next_btn.style.display = "none";
  timeOff.textContent = "Time Left";
};

quit_quiz.onclick = () => {
  window.location.reload();
};

//if next button clicked
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    if (questions[que_count].type === "MAQ") {
      correctAns = questions[que_count].answers;
      if (areEqual(optionsSelected, correctAns)) {
        userScore += 1;
      }
    } else if (questions[que_count].type === "MCQ") {
      correctAns = questions[que_count].answer;
      if (optionsSelected.includes(correctAns)) {
        userScore += 1;
      }
    } else if (questions[que_count].type === "FITB1") {
      correctAns = questions[que_count].answers;
      if (areEqual(optionsSelected, correctAns)) {
        userScore += 1;
      }
    }

    que_count++;
    que_numb++;
    optionsSelected = [];
    showQuestions(que_count);
    queCounter(que_numb);
    // clearInterval(counter);
    // startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Time Left";
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    if (que_count <= questions.length - 1) {
      if (questions[que_count].type === "MAQ") {
        correctAns = questions[que_count].answers;
        if (areEqual(optionsSelected, correctAns)) {
          userScore += 1;
        }
      } else if (questions[que_count].type === "MCQ") {
        correctAns = questions[que_count].answer;
        if (optionsSelected.includes(correctAns)) {
          userScore += 1;
        }
      } else if (questions[que_count].type === "FITB1") {
        correctAns = questions[que_count].answers;
        if (areEqual(optionsSelected, correctAns)) {
          userScore += 1;
        }
      }
    }
    showResultBox(userScore);
  }
};

//getting questions and options from array
function showQuestions(index) {
  const que_text = document.querySelector(".que_text");

  let que_tag;
  if (questions[index].type === "MAQ" || questions[index].type === "MCQ") {
    que_tag =
      "<span>" +
      questions[index].numb +
      ". " +
      questions[index].question +
      "</span>";
  } else {
    que_tag =
      "<span>" +
      questions[index].numb +
      ". " +
      questions[index].question.substring(
        0,
        questions[index].question.indexOf("{") - 1
      ) +
      " " +
      '<input type="text" id="FITB1" required />' +
      " " +
      questions[index].question.substring(
        questions[index].question.indexOf("}") + 1
      ) +
      "</span>";
  }

  let option_tag;
  if (questions[index].type === "MAQ" || questions[index].type === "MCQ") {
    option_tag =
      '<div class="option"><span>' +
      questions[index].answer_choices[0] +
      "</span></div>";

    for (let i = 1; i < questions[index].answer_choices.length; i++) {
      option_tag +=
        '<div class="option"><span>' +
        questions[index].answer_choices[i] +
        "</span></div>";
    }
  }
  que_text.innerHTML = que_tag;
  if (questions[index].type === "MAQ" || questions[index].type === "MCQ") {
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
      option[i].setAttribute("onclick", "optionSelected(this)");
    }
  } else if (document.getElementById("FITB1")) {
    document.getElementById("FITB1").setAttribute("onchange", "valueEntered()");
  }
}

// let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
// let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function areEqual(array1, array2) {
  if (array1.length === array2.length) {
    return array1.every((element, index) => {
      if (element === array2[index]) {
        return true;
      }
      return false;
    });
  }
  return false;
}

function valueEntered() {
  if (
    document.getElementById("FITB1") &&
    document.getElementById("FITB1").value
  ) {
    userAns = document.getElementById("FITB1").value;
    next_btn.style.display = "block";
    if (questions[que_count].type === "FITB1") {
      optionsSelected.push(userAns);
    }
  } else {
    next_btn.style.display = "none";
  }
}

function optionSelected(answer) {
  //   clearInterval(counter);
  clearInterval(counterLine);
  userAns = answer.textContent;
  if (questions[que_count].type === "MAQ") {
    optionsSelected.push(userAns);

    if (answer.classList.contains("selected")) {
      answer.classList.remove("selected");
    } else {
      answer.classList.add("selected");
    }
  } else if (questions[que_count].type === "MCQ") {
    optionsSelected = [];
    optionsSelected.push(userAns);

    let list = document.getElementsByClassName("selected");
    for (let i = 0; i < list.length; i++) {
      list[i].classList.remove("selected");
    }
    answer.classList.add("selected");
  }
  console.log(answer);

  next_btn.style.display = "block";
}

function showResultBox(userScore) {
  info_box.classList.remove("activeInfo"); //hide the info box
  quiz_box.classList.remove("activeQuiz"); //hide the quiz box
  result_box.classList.add("activeResult"); //show the result box
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 3) {
    let scoreTag =
      "<span> and congrats! You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag =
      "<span> and nice, You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span> and sorry, You got only <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
      timeOff.textContent = "Time Off";

      let correctAns = questions[que_count].answer;
      let allOptions = option_list.children.length;

      for (let i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correctAns) {
          option_list.children[i].setAttribute("class", "option correct");
          option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
        }
      }
      for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
      }
      next_btn.style.display = "block";
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time++;
    timeLine.style.width = time + "px";
    if (time > 549) {
      clearInterval(counterLine);
    }
  }
}

function queCounter(index) {
  const bottom_ques_counter = quiz_box.querySelector(".total_que");
  let totalQuesCountTag =
    "<span><p>" +
    index +
    "</p> of <p>" +
    questions.length +
    "</p> Questions</span>";

  bottom_ques_counter.innerHTML = totalQuesCountTag;
}

import '../assets/css/password_progress_bar.css';
import './Register.js';

let timer;

window.onload = function () {
  const password = document.querySelector("#pw");
  const strengthBar = document.querySelector("#meter");
  const display = document.querySelector(".textbox");

  if (!password || !strengthBar || !display) {
    console.error("필수 DOM 요소를 찾을 수 없습니다. HTML을 확인하세요.");
    return;
  }

  password.addEventListener("focus", () => {
    strengthBar.style.display = "block";
    display.style.display = "block";
  });

  password.addEventListener("blur", () => {
    strengthBar.style.display = "none";
    display.style.display = "none";
  });

  password.addEventListener("keyup", function () {
    checkPassword(password.value);
  });

  function checkPassword(password) {
    let strength = 0;
    const regexes = [/[a-z]+/, /[A-Z]+/, /[0-9]+/, /[$@#&!]+/];

    regexes.forEach((regex, index) => {
      strength += password.match(regex) ? 1 : 0;
    });

    strengthBar.value = strength;

    if (strength > 3 && password.length < 6) {
      display.textContent = "최소 6자 이상 입력해주세요.";
      strengthBar.style.setProperty("--c", "red");
    } else if (strength > 3 && password.length > 15) {
      display.textContent = "최대 15자 이하로 입력해주세요.";
      strengthBar.style.setProperty("--c", "red");
    } else {
      switch (strength) {
        case 1:
          strengthBar.style.setProperty("--c", "red");
          display.textContent = "영문 대소문자, 숫자, 특수문자 포함";
          break;
        case 2:
          display.textContent = "영문 대소문자, 숫자, 특수문자 포함";
          break;
        case 3:
          strengthBar.style.setProperty("--c", "orange");
          display.textContent = "영문 대소문자, 숫자, 특수문자 포함";
          break;
        case 4:
          strengthBar.style.setProperty("--c", "green");
          display.textContent = "";
          break;
      }
    }
  }
}
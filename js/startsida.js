const startPage = document.getElementById("startPage");
const omOss = document.getElementById("omOss");
const teamEnkelt = document.getElementById("teamEnkelt");
const backStartPage = document.getElementById("backStart");
const backStartPage2 = document.getElementById("backStart2");
const btnHowToPlay = document.getElementById("btnHowToPlay");
const howToPlay = document.getElementById("howtoplay");

btnHowToPlay.addEventListener("click", function () {
  startPage.style.display = "none";
  howToPlay.style.display = "block";
  buttonClick();
});

teamEnkelt.addEventListener("click", function () {
  startPage.style.display = "none";
  omOss.style.display = "block";
  buttonClick();
});

backStartPage.addEventListener("click", function () {
  startPage.style.display = "block";
  omOss.style.display = "none";
  buttonClick();
});

backStartPage2.addEventListener("click", function () {
  startPage.style.display = "block";
  howToPlay.style.display = "none";
  buttonClick();
});

function buttonClick() {
  let audio = new Audio();
  audio.src = "/sounds/click.mp3";
  audio.play();
}

//Länkar till game.html via js + setTimout för att ljudet ska låta på knappen
const playNow = document.getElementById("playnow");

playNow.addEventListener("click", function () {
  buttonClick();
  setTimeout(function () {
    window.location.href = "game.html";
  }, 250);
});

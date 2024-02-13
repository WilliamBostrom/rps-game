// Deklarerade varibler för knappar ska göra display=none/block

const closeChoosePlayer = document.querySelector(".close-1");
const openLastStep = document.querySelector(".close-2");
const closeLastStep = document.querySelector(".close-3");

const back1 = document.getElementById("back1");
const back2 = document.getElementById("back2");

// första sidan där man väljer figur, samt figur-img
//alltså bilden som ska bytas vid val av figur
const pickCat = document.querySelector("#pick-cat");
const pickRobot = document.querySelector("#pick-robot");
const pickUnknown = document.querySelector("#pick-unknown");
const figurImg = document.querySelectorAll("#figur-img");
let selectedFigure = "robot"; // för att komma åt rätt mapp-namn för spel-bilder

// variablar för spel-sidan (knappar och handen)
const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");
const playerHand = document.querySelector(".player-hand");

// lagt till eventlistner med blidkällor till alla
//bilder som ska synas direkt på sidan  till alla figurer
//.pickRobot osv är klassen på knapparna till att välja de olika figurerna

pickRobot.addEventListener("click", function () {
  selectedFigure = "robot"; // Här ligger alla selectedFigure för att följa med
  playerMusic();
  lastStep(
    "images/robots.avif",
    "/img/Robot-Rock-B2T.avif",
    "../img/Robot-Paper-B2T.avif",
    "../img/Robot-Scissors-B2T.avif",
    "../assets/robot/rock.avif"
  );
});
pickCat.addEventListener("click", function () {
  selectedFigure = "cat";
  playerMusic();

  lastStep(
    "../images/cats.avif",
    "../img/cat-Rock-B2T.avif",
    "../img/cat-Paper-B2T.avif",
    "../img/cat-Scissors-B2T.avif",
    "../assets/cat/rock.avif"
  );
});
pickUnknown.addEventListener("click", function () {
  selectedFigure = "human";
  playerMusic();
  lastStep(
    "images/old-man.avif",
    "../img/human-Rock-B2T.avif",
    "../img/human-Paper-B2T.avif",
    "../img/human-Scissors-B2T.avif",
    "../assets/human/rock.avif"
  );
});

// funktionen som kallas efter figuren är vald
// som gör att rätt bilder följer med för den figuren
function lastStep(
  newImgSrc,
  rockImgSrc,
  paperImgSrc,
  scissorsImgSrc,
  playerHandSrc
) {
  closeChoosePlayer.style.display = "none";
  openLastStep.style.display = "block";

  figurImg.forEach(function (img) {
    img.src = newImgSrc;
  });

  playerHand.querySelector("img").src = playerHandSrc;
  rockButton.querySelector("img").src = rockImgSrc;
  paperButton.querySelector("img").src = paperImgSrc;
  scissorsButton.querySelector("img").src = scissorsImgSrc;
}

// Lagt in olika ljud när man väljer varje figur i lastStep

function playerMusic() {
  let audio = new Audio();
  audio.src = "/sounds/" + selectedFigure + ".mp3";
  audio.play();
}

// Efter Lets Play! ---> till spelet

// Bara lagt in här att man kommer vidare till spelet / .start-game är classen på knappen
const rsp = document.querySelector(".start-game");

rsp.addEventListener("click", function () {
  console.log("rsp knappen funkar");
  closeChoosePlayer.style.display = "none";
  openLastStep.style.display = "none";
  closeLastStep.style.display = "block";
  newGame();
  buttonClick();
});

// Så man kommer vidare till secret dice game
const closeRspButton = document.getElementById("close-rsp");
const openDice = document.querySelector(".open-dice");

closeRspButton.addEventListener("click", function () {
  openDice.style.display = "block";
  closeLastStep.style.display = "none";
  winnerDice.textContent = "Secret dice game, good luck!";
  pScore = 0;
  cScore = 0;
  updateScore();
  buttonClick();
});

const closeDice = document.querySelector(".open-rsp");

closeDice.addEventListener("click", function () {
  openDice.style.display = "none";
  closeLastStep.style.display = "block";
  buttonClick();
});

// 1. Fixa så att spelet funkar

// Spelet är igång här med animationer (ska även försöka få till att det är alltid hand i animationen när den körs)
const playerHands = document.getElementById("players-hand");
const computerHand = document.querySelector(".comp-hand");
const winner = document.querySelector(".winner");
const playerHandAnimationDuration = 2500; // Animation
const computerHandAnimationDuration = 2500;

// ljud för alla knappar
function buttonClick() {
  let audio = new Audio();
  audio.src = "/sounds/click.mp3";
  audio.play();
}

function buttonGame() {
  let audio = new Audio();
  audio.src = "/sounds/countdownrsp.mp3";
  audio.play();
}

// Event för knapp-valen
document.getElementById("rock").addEventListener("click", function () {
  playRSP("rock");
  buttonGame();
});
document.getElementById("paper").addEventListener("click", function () {
  playRSP("paper");
  buttonGame();
});
document.getElementById("scissors").addEventListener("click", function () {
  playRSP("scissors");
  buttonGame();
});

function playRSP(playerChoice) {
  // För random val av datorn  (codeEnkelt är ifall det är med fusk)
  let computerOptions;
  if (codeEnkelt) {
    computerOptions = ["scissors"];
  } else {
    computerOptions = ["rock", "paper", "scissors"];
  }

  let computerNumber;
  if (codeEnkelt) {
    computerNumber = null;
  } else {
    computerNumber = Math.floor(Math.random() * 3);
  }

  let computerChoice;
  if (codeEnkelt) {
    computerChoice = ["scissors"];
  } else {
    computerChoice = computerOptions[computerNumber];
  }

  // Använd "rock.png" i själva animationen

  playerHands.src = "assets/" + selectedFigure + "/rock.avif";
  computerHand.src = `./assets/dator/rock.avif`;

  //Nedräkning direkt efter knapptryck
  setTimeout(() => {
    winner.textContent = "3..";
  }, 0);

  setTimeout(() => {
    winner.textContent = "2..";
  }, 800);

  setTimeout(() => {
    winner.textContent = "1..";
  }, 1600);

  //  Animationen
  animateHand(playerHands, "shakePlayer", playerHandAnimationDuration);
  animateHand(computerHand, "shakeComputer", computerHandAnimationDuration);

  // Vänta på att animationen ska sluta
  setTimeout(() => {
    // Hitta vinnaren - via funktionen nedan
    if (codeEnkelt) {
      compareHands(playerChoice, "scissors");
    } else {
      compareHands(playerChoice, computerChoice);
    }

    // Uppdatera spelarens hand med det faktiska valet
    playerHands.src = "assets/" + selectedFigure + "/" + playerChoice + ".avif";
    // Uppdatera datorns hand med random valet
    computerHand.src = `./assets/dator/${computerChoice}.avif`;
  }, 2500); // animationens längd
}

// Kod från chatgpt för att få händerna att funka
function animateHand(handElement, animationName, animationDuration) {
  handElement.style.animation = `${animationName} ${
    animationDuration / 1250
  }s ease`;
  handElement.addEventListener("animationend", () => {
    handElement.style.animation = "";
  });
}

function compareHands(playerChoice, computerChoice) {
  // compareHands-funktionen jämför vem som vinner
  let result = ""; // det som visas i "Choose carefully"

  if (playerChoice === computerChoice) {
    result = "It's a tie!";
    tieWinMusic();
  } else if (playerChoice === "rock") {
    if (computerChoice === "scissors") {
      result = `Good job ${playerName.textContent}, ${playerChoice} wins over ${computerChoice}!`;
      playerScore++;
      rightChoiceSound();
      updateScoreRsp();
    } else {
      result = " Mr.Enkelt won!";
      computerScore++;
      wrongChoiceSound();
      updateScoreRsp();
    }
  } else if (playerChoice === "paper") {
    if (computerChoice === "scissors") {
      result = " Mr.Enkelt won!";
      computerScore++;
      wrongChoiceSound();
      updateScoreRsp();
    } else {
      result = `Well done ${playerName.textContent}, ${playerChoice} wins over ${computerChoice}!`;
      playerScore++;
      rightChoiceSound();
      updateScoreRsp();
    }
  } else if (playerChoice === "scissors") {
    if (computerChoice === "rock") {
      result = " Mr.Enkelt won!";
      computerScore++;
      wrongChoiceSound();
      updateScoreRsp();
    } else {
      result = `Impressive ${playerName.textContent}, ${playerChoice} wins over ${computerChoice}!`;
      playerScore++;
      rightChoiceSound();
      updateScoreRsp();
    }
  }

  // Visa vinnar-texten i "choose carefully"
  winner.textContent = result;
  CheckWinner();
}

// Fusk kod för RSP och andra koder
let codeEnkelt = false;
document.addEventListener("keydown", function (event) {
  if (event.key === "p") {
    let code = prompt("Skriv din hemliga kod här:");

    // datorn kör endast sax
    if (code === "enkelt") {
      alert("Rätt kod!");
      codeEnkelt = true; // Sätt variabeln till true när "Enkelt" skrivs in

      // allt tillbaka till vanligt
    } else if (code === "tillbaka") {
      console.log("vanligt-spel");
      alert("Vanligt spel");
      codeEnkelt = false;
      document.body.style.transform = "";

      // player vinner
    } else if (code === "win") {
      playerWins();
      winner.textContent = `${playerName.textContent} YOU WON!!🎉`;
      playerWinMusic();

      //datorn vinner
    } else if (code === "lose") {
      computerWins();
      winner.textContent = "Mr.Enkelt WON!!🥷🏻";
      computerWinMusic();

      //Vänder upp och ner på hela bodyn
    } else if (code === "wtf") {
      document.body.style.transform = "rotateX(180deg)";

      // alert om fel kod
    } else {
      alert("Fel kod");
    }
  }
});

// Lagt in olika ljud för vem som får poäng

function rightChoiceSound() {
  let audio = new Audio();
  audio.src = "/sounds/rightchoice.mp3";
  audio.play();
}

function wrongChoiceSound() {
  let audio = new Audio();
  audio.src = "/sounds/computerwin.mp3";
  audio.play();
}

function tieWinMusic() {
  let audio = new Audio();
  audio.src = "/sounds/tie.mp3";
  audio.play();
}

// la in så att focus/hover egenskapen när man trycker sten,sax påse sitter i
// ungefär lika länge som animationen

const pickWeapons = document.querySelectorAll(".pick-weapon");

pickWeapons.forEach((pickWeapon) => {
  pickWeapon.addEventListener("click", () => {
    pickWeapon.focus();
    setTimeout(() => {
      pickWeapon.blur(); // blur används för att ta bort fokus
    }, 2200); // 2,2 sekunder sitter fokus
  });
});

// 2. Få in rätt bilder till figurernas händer L2R
// Klart också
// 3. Få in användernamnet på sidan

const updateNameButton = document.getElementById("letsPlay");
const usernameInput = document.getElementById("username");
const playerName = document.querySelectorAll("#playerName");

updateNameButton.addEventListener("click", function () {
  const updateName = usernameInput.value;
  playerName.textContent = updateName;

  playerName.forEach(function (display) {
    display.textContent = updateName;
  });
});

// 4. Gör att scoren uppdateras

// Kod för uppdatera scoren
function updateScoreRsp() {
  const computerScoreDiv = document.querySelector(".computer-score h1");
  const playerScoreDiv = document.querySelector(".player-score h1");
  playerScoreDiv.textContent = playerScore;
  computerScoreDiv.textContent = computerScore;
}

let computerScore = 0;
let playerScore = 0;

// 5. Fixa restart knappen
// Att scoren nollställs när restart trycks
const restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", function () {
  playerScore = 0;
  computerScore = 0;
  updateScoreRsp(); // Uppdatera poängen på skärmen till noll
  buttonClick();
});
// 6. Fixa bakåt-knapparna som nu länkar till andra index.html

back1.addEventListener("click", function () {
  closeChoosePlayer.style.display = "block";
  openLastStep.style.display = "none";
  closeLastStep.style.display = "none";
  buttonClick();
});

back2.addEventListener("click", function () {
  closeChoosePlayer.style.display = "none";
  openLastStep.style.display = "block";
  closeLastStep.style.display = "none";
  buttonClick();
});

const back0 = document.getElementById("backstart");

back0.addEventListener("click", function () {
  buttonClick();
  setTimeout(function () {
    window.location.href = "index.html";
  }, 250);
});

// 7 Fixa så "Choose carefully"-texten så den anpassas efter vem som vinner
// Fixat

// 8. Gör att spelet tar slut efter X-vunna runder och att vinnaren syns
// Overall styling när någon vinner - kallar på denna funktion i playerWins & computerWins
function theWinner() {
  document.getElementById("players-hand").style.display = "none";
  document.querySelector(".restart-btn").style.display = "none";
  document.querySelector(".comp-hand").style.display = "none";
  document.querySelector("#rock").style.display = "none";
  document.querySelector("#paper").style.display = "none";
  document.querySelector("#scissors").style.display = "none";
  document.querySelector(".hidden-button").style.display = "flex";
  document.querySelector(".button-pick").style.height = "0";
  document.querySelector(".center-winner").style.marginTop = "75px";
}
// Special design när Datorn vinner
function computerWins() {
  document.querySelector(".winner-computer").style.display = "block";
  document.querySelector(".computer-figur").style.visibility = "hidden";
  theWinner();
}

// Special design när Player vinner
function playerWins() {
  document.querySelector(".winner-player").style.display = "block";
  document.querySelector(".player-figur").style.visibility = "hidden";
  theWinner();
}

// Här kollar vi vem som vinner och kallar på playerWins / computerWins funktionen
let maxPoints = 0;
function CheckWinner() {
  if (playerScore.toString() === maxPoints) {
    console.log("Player Won");
    winner.textContent = `${playerName.textContent} YOU WON!!🎉`;
    playerWins();
    playerWinMusic();
  } else if (computerScore.toString() === maxPoints) {
    console.log("Computer Won");
    winner.textContent = "Mr.Enkelt WON!!🥷🏻";
    computerWins();
    computerWinMusic();
  }
}
// Lagt in olika ljud för om datorn / spelaren vinner

function playerWinMusic() {
  let audio = new Audio();
  audio.src = "/sounds/youwongame.mp3";
  audio.play();
}

function computerWinMusic() {
  let audio = new Audio();
  audio.src = "/sounds/mrenkeltwon.mp3";
  audio.play();
}

// Knappen "play again" återställer allt
document.getElementById("playAgain").addEventListener("click", function () {
  newGame();
  buttonClick();
});

function newGame() {
  document.getElementById("players-hand").style.display = "block";
  document.querySelector(".restart-btn").style.display = "block";
  document.querySelector(".comp-hand").style.display = "block";
  document.querySelector("#rock").style.display = "block";
  document.querySelector("#paper").style.display = "block";
  document.querySelector("#scissors").style.display = "block";
  document.querySelector(".hidden-button").style.display = "none";
  document.querySelector(".winner-player").style.display = "none";
  document.querySelector(".winner-computer").style.display = "none";
  document.querySelector(".player-figur").style.visibility = "visible";
  document.querySelector(".computer-figur").style.visibility = "visible";
  document.querySelector(".button-pick").style.height = "22vh";
  document.querySelector(".center-winner").style.marginTop = "0";
  winner.textContent = "Choose carefully";
  playerScore = 0;
  computerScore = 0;
  updateScoreRsp();
}

// 9. Eventuellt göra så att texten "Last step" uppdateras när namnet är ifyllt
const radioButtons = document.querySelectorAll('input[type="radio"]');
const firstTo = document.querySelector(".first-to");

// Lagt till så att antal rundor visas på Last Step sidan när knapp trycks
radioButtons.forEach((radioButton) => {
  radioButton.addEventListener("change", () => {
    // Uppdatera texten i <p> baserat på den markerade radio-knappen
    if (radioButton.checked) {
      firstTo.textContent = `First to:  ${radioButton.value}`;
      maxPoints = radioButton.value;
      buttonClick();
    }
  });
});

// Bonus

// har ett tärnings-spel som är nästan klar, där den som får högst vinner - helt random
// Eventuellt göra att om man vinner mot datorn - får man gå vidare till det spelet

const winnerDice = document.getElementById("winnerDice");
function generateRandomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

function updateDice(imgElement) {
  const randomNumber = generateRandomNumber();
  const dicePath = `images/dice${randomNumber}.avif`;
  imgElement.setAttribute("src", dicePath);
}

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function () {
  pScore = 0;
  cScore = 0;
  updateScore(); // Uppdatera poängen på skärmen till noll
  buttonClick();
});

const buttonDice = document.getElementById("buttonDice");

buttonDice.addEventListener("click", function () {
  const playersDice = document.querySelector(".img1");
  const computersDice = document.querySelector(".img2");
  buttonClick();

  updateDice(playersDice);
  updateDice(computersDice);

  const playersRandomNumber = parseInt(
    playersDice.getAttribute("src").match(/\d/)[0]
  );
  const computersRandomNumber = parseInt(
    computersDice.getAttribute("src").match(/\d/)[0]
  );

  if (playersRandomNumber > computersRandomNumber) {
    winnerDice.textContent = ` ${playerName.textContent} won!`;
    pScore++; // plus på playerscore
    updateScore();
  } else if (computersRandomNumber > playersRandomNumber) {
    winnerDice.textContent = "Mr.Enkelt Won!";
    cScore++; // + på datorscore
    updateScore();
  } else {
    winnerDice.textContent = "Tie!";
  }
});

let pScore = 0; // startvärdet på player och datorscore
let cScore = 0;

function updateScore() {
  const playerScore = document.getElementById("player-scores");
  const computerScore = document.getElementById("computer-scores");
  playerScore.textContent = pScore;
  computerScore.textContent = cScore;
}

/* MODAL */
const modal = document.querySelector(".modalContainer");
const modalOpenBtn = document.querySelector(".rules-btn");
const modalCloseBtn = document.querySelector(".closeBtn");

modalOpenBtn.addEventListener("click", function () {
  modal.showModal();
  buttonClick();
});

modalCloseBtn.addEventListener("click", function () {
  modal.close();
  buttonClick();
});
/* END OF MODAL */

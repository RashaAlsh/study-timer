let studyTime = 25 * 60;
let breakTime = 10 * 60;
let timeLeft = studyTime;
let isStudy = true;
let timerInterval = null;

const timerDisplay = document.getElementById("timer");
const modeDisplay = document.getElementById("mode");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const timeButtons = document.getElementById("timeButtons");
const alarmSound = document.getElementById("alarm");

// Initial button visibility
pauseButton.style.display = "none";
resetButton.style.display = "none";

// Request notification permission
if ("Notification" in window) {
  Notification.requestPermission();
}

// Update display
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent =
    `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Sound + notification
function notify(message) {
  alarmSound.play();
  if (Notification.permission === "granted") {
    new Notification(message);
  }
}

// Start timer
function startTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 0) {
      isStudy = !isStudy;

      if (isStudy) {
        modeDisplay.textContent = "Study Time";
        timeLeft = studyTime;
        notify("Break over! Time to study 📚");
      } else {
        modeDisplay.textContent = "Break Time";
        timeLeft = breakTime;
        notify("Study finished! Take a break 🎉");
      }
    }

    updateDisplay();
  }, 1000);
}

// Pause timer
function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// Stop / reset timer
function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;

  isStudy = true;
  timeLeft = studyTime;
  modeDisplay.textContent = "Study Time";

  // Show initial UI
  timeButtons.style.display = "block";
  startButton.style.display = "inline-block";
  pauseButton.style.display = "none";
  resetButton.style.display = "none";

  updateDisplay();
}

// Select study time
function setStudyTime(minutes) {
  clearInterval(timerInterval);
  timerInterval = null;

  studyTime = minutes * 60;
  timeLeft = studyTime;
  isStudy = true;
  modeDisplay.textContent = "Study Time";

  // Hide selection & start
  timeButtons.style.display = "none";
  startButton.style.display = "none";

  // Show pause & stop
  pauseButton.style.display = "inline-block";
  resetButton.style.display = "inline-block";

  updateDisplay();

  // Auto start timer
  startTimer();
}

// Event listeners
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

// Initial render
updateDisplay();

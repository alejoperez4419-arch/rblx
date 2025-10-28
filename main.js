const sendBtn = document.getElementById('sendBtn');
const resendBtn = document.getElementById('resendBtn');
const section1 = document.getElementById('section1');
const section2 = document.getElementById('section2');
const amountInput = document.getElementById('amount');
const displayAmount = document.getElementById('displayAmount');
const spinner = document.getElementById('spinner');

sendBtn.addEventListener('click', () => {
  const amount = amountInput.value.trim();

  if (amount === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount!");
    return;
  }

  sendBtn.textContent = "Sending...";
  sendBtn.disabled = true;
  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";
    section1.classList.remove('active');
    section2.classList.add('active');
    displayAmount.textContent = amount;
    launchConfetti();
  }, 2500);
});

resendBtn.addEventListener('click', () => {
  section2.classList.remove('active');
  section1.classList.add('active');
  sendBtn.textContent = "Send";
  sendBtn.disabled = false;
  spinner.style.display = "none";
  amountInput.value = "";
  document.getElementById('userId').value = "";
  clearEffects();
});

function launchConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.background = randomColor();
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

function randomColor() {
  const colors = ['#FFD700', '#FF5733', '#00FFCC', '#33FF57', '#3366FF', '#FF00FF'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function clearEffects() {
  document.querySelectorAll('.confetti').forEach(el => el.remove());
}

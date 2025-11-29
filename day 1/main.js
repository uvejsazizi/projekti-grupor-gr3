let selectedOdds = {};

const buttons = document.querySelectorAll('.bet-btn');
const totalOddDisplay = document.getElementById('totalOdd');
const stakeInput = document.getElementById('stake');
const possibleWinDisplay = document.getElementById('possibleWin');
const message = document.getElementById('message');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const matchCard = btn.closest('.match-card');
    const matchTitle = matchCard.querySelector('h2').textContent.trim();

    matchCard.querySelectorAll('.bet-btn').forEach(b => b.classList.remove('active'));

    btn.classList.add('active');

    selectedOdds[matchTitle] = parseFloat(btn.dataset.odd);

    updateTotal();
  });
});

function updateTotal() {
  const odds = Object.values(selectedOdds);

  if (odds.length === 0) {
    totalOddDisplay.textContent = "0.00";
    possibleWinDisplay.textContent = "0.00";
    return;
  }

  let total = 1;
  odds.forEach(odd => total *= odd);

  totalOddDisplay.textContent = total.toFixed(2);

  calculateWin();
}

stakeInput.addEventListener('input', calculateWin);

function calculateWin() {
  const stake = parseFloat(stakeInput.value);
  const totalOdd = parseFloat(totalOddDisplay.textContent);

  if (!stake || totalOdd === 0) {
    possibleWinDisplay.textContent = "0.00";
    return;
  }

  const win = stake * totalOdd;
  possibleWinDisplay.textContent = win.toFixed(2);
}

document.getElementById('placeBet').addEventListener('click', () => {
  const stake = parseFloat(stakeInput.value);
  const totalOdd = parseFloat(totalOddDisplay.textContent);

  if (!stake || totalOdd === 0) {
    message.textContent = "⚠️ Zgjidh të paktën një ndeshje dhe shkruaj shumën!";
    message.style.color = "red";
    return;
  }

  const win = (stake * totalOdd).toFixed(2);
  message.textContent = `✅ Bast i vendosur! Fitimi i mundshëm: ${win} €`;
  message.style.color = "#00ff88";
});

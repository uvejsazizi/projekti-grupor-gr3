let totalOdd = 0;

const buttons = document.querySelectorAll('.bet-btn');
const totalOddDisplay = document.getElementById('totalOdd');
const stakeInput = document.getElementById('stake');
const possibleWinDisplay = document.getElementById('possibleWin');
const message = document.getElementById('message');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    totalOdd = parseFloat(btn.dataset.odd);
    totalOddDisplay.textContent = totalOdd.toFixed(2);
    calculateWin();
  });
});

stakeInput.addEventListener('input', calculateWin);

function calculateWin() {
  const stake = parseFloat(stakeInput.value);
  if (!stake || totalOdd === 0) {
    possibleWinDisplay.textContent = "0.00";
    return;
  }
  const win = stake * totalOdd;
  possibleWinDisplay.textContent = win.toFixed(2);
}

document.getElementById('placeBet').addEventListener('click', () => {
  const stake = parseFloat(stakeInput.value);
  if (!stake || totalOdd === 0) {
    message.textContent = "⚠️ Zgjidh një koeficient dhe shkruaj shumën!";
    message.style.color = "red";
    return;
  }
  message.textContent = `✅ Bast i vendosur me sukses! Fitimi i mundshëm: ${(stake * totalOdd).toFixed(2)} €`;
  message.style.color = "#00ff88";
});

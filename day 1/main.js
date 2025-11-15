let selectedOdds = {}; // Ruaj koeficientet e zgjedhura për çdo ndeshje

const buttons = document.querySelectorAll('.bet-btn');
const totalOddDisplay = document.getElementById('totalOdd');
const stakeInput = document.getElementById('stake');
const possibleWinDisplay = document.getElementById('possibleWin');
const message = document.getElementById('message');

// Kur klikon një buton basti
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const matchCard = btn.closest('.match-card');
    const matchTitle = matchCard.querySelector('h2').textContent.trim();

    // Hiq active nga butonat e tjerë të asaj ndeshjeje
    matchCard.querySelectorAll('.bet-btn').forEach(b => b.classList.remove('active'));

    // Vendos active tek butoni i klikuar
    btn.classList.add('active');

    // Ruaj koeficientin
    selectedOdds[matchTitle] = parseFloat(btn.dataset.odd);

    updateTotal();
  });
});

// Llogarit koeficientin total
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

// Llogarit fitimin e mundshëm
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

// Kur vendos bastin
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

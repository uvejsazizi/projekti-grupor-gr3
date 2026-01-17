/*
  main.js
  - Keeps existing betting logic but adds jQuery usage, arrays, loops, conditionals
  - Demonstrates manipulating input values and styling elements via JS
*/

$(function(){
  // Selected odds stored by match title
  const selectedOdds = {};

  // Use event delegation for buttons
  $(document).on('click', '.bet-btn', function(){
    const $btn = $(this);
    const $card = $btn.closest('.match-card, .card');
    const matchTitle = $card.find('h4, h2').first().text().trim();

    // Remove active class in this card and set on clicked
    $card.find('.bet-btn').removeClass('active btn-warning').addClass('btn-outline-warning');
    $btn.removeClass('btn-outline-warning').addClass('active btn-warning');

    selectedOdds[matchTitle] = parseFloat($btn.data('odd'));
    updateTotal();
  });

  // Update total coefficient and possible win
  function updateTotal(){
    const odds = Object.values(selectedOdds);
    const $totalOdd = $('#totalOdd');
    const $possible = $('#possibleWin');

    if(odds.length === 0){
      $totalOdd.text('0.00');
      $possible.text('0.00');
      return;
    }

    // multiply using reduce (array function)
    const total = odds.reduce((acc, val) => acc * val, 1);
    $totalOdd.text(total.toFixed(2));
    calculateWin();
  }

  // When stake changes
  $('#stake').on('input', calculateWin);

  function calculateWin(){
    const stake = parseFloat($('#stake').val()) || 0;
    const totalOdd = parseFloat($('#totalOdd').text()) || 0;
    if(!stake || totalOdd === 0){
      $('#possibleWin').text('0.00');
      return;
    }
    $('#possibleWin').text((stake * totalOdd).toFixed(2));
  }

  // Place bet
  $('#placeBet').on('click', function(){
    const stake = parseFloat($('#stake').val()) || 0;
    const totalOdd = parseFloat($('#totalOdd').text()) || 0;
    const $msg = $('#message');

    if(!stake || totalOdd === 0){
      $msg.text('⚠️ Zgjidh të paktën një ndeshje dhe shkruaj shumën!').css('color','red');
      return;
    }

    const win = (stake * totalOdd).toFixed(2);
    $msg.text(`✅ Bast i vendosur! Fitimi i mundshëm: ${win} €`).css('color','#00ff88');

    // Example array/loop: store bet summary and show in console
    const betSummary = Object.keys(selectedOdds).map((match)=>({match, odd:selectedOdds[match]}));
    console.log('Bet summary:', betSummary);

    // Simple conditional example
    if(betSummary.length > 5){
      alert('Keni zgjedhur shumë ndeshje — konsideroni reduktimin e tyre.');
    }
  });

  // Small UI enhancement: animate active buttons
  setInterval(()=>{
    $('.bet-btn.active').each(function(i,el){
      const $el = $(el);
      $el.toggleClass('pulse');
    });
  }, 1000);

  // Example of reading/manipulating inputs on page load
  const exampleInputs = ['stake','someOther'];
  exampleInputs.forEach(id => {
    const $el = $('#'+id);
    if($el.length && !$el.val()) $el.val('');
  });
});

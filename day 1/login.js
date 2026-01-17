$(function(){
	const bannedUsers = ['admin','root','test'];

	$('#loginForm').on('submit', function(e){
		e.preventDefault();
		const user = $('#username').val().trim();
		const pass = $('#password').val().trim();
		const $msg = $('#message');

		// Basic validation
		if(user.length < 3){
			$msg.text('Emri i përdoruesit duhet të ketë të paktën 3 karaktere').css('color','red');
			$('#username').addClass('is-invalid');
			return;
		}
		if(pass.length < 6){
			$msg.text('Fjalëkalimi duhet të jetë të paktën 6 karaktere').css('color','red');
			$('#password').addClass('is-invalid');
			return;
		}

		// Check banned usernames (array + loop)
		let allowed = true;
		for(let i=0;i<bannedUsers.length;i++){
			if(user.toLowerCase() === bannedUsers[i]){ allowed = false; break; }
		}

		if(!allowed){
			$msg.text('Ky përdorues nuk lejohet.').css('color','red');
			return;
		}

		// Fake authentication example and manipulate input values
		if(user === 'demo' && pass === 'demo123'){
			$msg.text('Mirësevini, ' + user + '!').css('color','green');
			$('body').css('background','linear-gradient(135deg,#042a2b,#072227)');
			// Redirect to main page after a short delay
			setTimeout(()=> window.location.href = 'kryefaqja.html', 900);
			return;
		}

		// Conditionals and feedback
		if(pass === 'password'){
			$msg.text('Fjalëkalim i pasigurt, zgjidh dikë tjetër').css('color','orange');
			return;
		}

		// Default fake failure
		$msg.text('Gebuar: Emri ose fjalëkalimi nuk është i saktë').css('color','red');
	});

	// Clear invalid state on input
	$('#username, #password').on('input', function(){
		$(this).removeClass('is-invalid');
		$('#message').text('');
	});
});

document.querySelector('.banner_btn').addEventListener('click', function (e) {
	e.preventDefault();
	document.querySelector(this.getAttribute('href')).scrollIntoView({
		behavior: 'smooth'
	});
});

document.addEventListener('DOMContentLoaded', function () {
	const emailIcon = document.getElementById('email');
	const sendMessageArea = document.getElementById('send_message');
	emailIcon.addEventListener('click', function (event) {
		// Prevent the event from propagating to the document click listener
		event.stopPropagation();

		// Toggle active state
		emailIcon.classList.toggle('active');

		// Toggle visibility of the send message box
		if (emailIcon.classList.contains('active')) {
			sendMessageArea.style.display = 'flex';
			sendMessageArea.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Smooth scroll to keep view centered
		} else {
			sendMessageArea.style.display = 'none';
		}
	});

	// Hide send message area when clicking outside of it
	document.addEventListener('click', function (event) {
		// Check if the click was outside the send message area and email icon
		if (!sendMessageArea.contains(event.target) && !emailIcon.contains(event.target)) {
			// Hide send message area and remove active state from email icon
			sendMessageArea.style.display = 'none';
			emailIcon.classList.remove('active');
		}
	});
});

emailjs.init("tX2JzeODKQ6zvpxzi");

document.getElementById("contact-form").addEventListener("submit", function (event) {
	event.preventDefault();

	const messageStatus = document.getElementById("message-status");
	const sendButton = document.getElementById("send-button");

	// Clear any existing timeout to reset the timer
	clearTimeout(window.messageStatusTimeout);

	// Show "Sending..." status
	messageStatus.innerHTML = "Sending...";
	messageStatus.style.color = ""; // Default color for sending
	messageStatus.style.display = "block";

	// Disable the send button to prevent multiple submissions
	sendButton.disabled = true;

	var params = {
		name: document.getElementById("name").value,
		subject: document.getElementById("subject").value,
		email: document.getElementById("email-address").value,
		message: document.getElementById("message").value
	};

	emailjs.send("service_reciever", "template_reciever", params)
		.then(function (res) {
			console.log(res);
			// Update status to success
			messageStatus.innerHTML = "Your message has been sent successfully!";

			// Start a timer to reset the form and hide the success message after 5 seconds
			setTimeout(() => {
				document.getElementById("contact-form").reset();
				messageStatus.style.display = "none";
			}, 5000);
		})
		.catch(function (err) {
			console.log(err);
			// Update status to failure
			messageStatus.innerHTML = "Failed to send message. Please try again.";
			messageStatus.style.color = "rgb(255, 78, 78)"; // Error color

			// Keep the error message displayed for 10 seconds
			window.messageStatusTimeout = setTimeout(() => {
				messageStatus.style.display = "none";
			}, 10000); // 10 seconds
		})
		.finally(function () {
			// Re-enable the send button after the process is complete
			sendButton.disabled = false;
		});
});

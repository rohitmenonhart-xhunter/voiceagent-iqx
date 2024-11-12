// Circuit background animation
const circuitContainer = document.querySelector('.circuit-background');
for (let i = 0; i < 30; i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.left = `${Math.random() * 100}vw`;
    line.style.height = `${Math.random() * 200 + 100}px`;
    line.style.animationDuration = `${Math.random() * 5 + 2}s`;
    circuitContainer.appendChild(line);
}

// Server busy status
let isBusy = false;

function initiateCall() {
    const callButton = document.getElementById('callButton');
    const statusMessage = document.getElementById('statusMessage');
    let phoneNumber = document.getElementById('phoneNumber').value;

    // Check if server is busy
    if (isBusy) {
        statusMessage.textContent = "Server is busy. Please try again later.";
        return;
    }

    // Validate phone number (only 10 digits)
    if (!phoneNumber.match(/^\d{10}$/)) {
        statusMessage.textContent = "Please enter a valid 10-digit phone number.";
        return;
    }

    // Append country code +91 to the phone number
    phoneNumber = `+91${phoneNumber}`;

    // Set busy status and disable button
    isBusy = true;
    callButton.disabled = true;
    statusMessage.textContent = "Initiating call...";

    // Make the POST request to initiate the call
    fetch("https://5c7f-2405-201-e01b-e149-d936-4b7d-b6ca-824.ngrok-free.app/start-call/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            phone_number: phoneNumber,
            room_name: "Test SIP Room"
        })
    })
    .then(response => {
        if (response.ok) {
            statusMessage.textContent = "Call initiated! Please check your phone.";
        } else {
            statusMessage.textContent = "Failed to initiate call. Please try again.";
        }
    })
    .catch(error => {
        statusMessage.textContent = "Error connecting to server. Please try again.";
    })
    .finally(() => {
        // Release busy status after 2 minutes
        setTimeout(() => {
            isBusy = false;
            callButton.disabled = false;
            statusMessage.textContent = "";
        }, 120000); // 2 minutes in milliseconds
    });
}

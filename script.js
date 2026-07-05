document.addEventListener('DOMContentLoaded', function() {  // Wait for HTML to fully load before running code
    console.log('JavaScript is now running!');              // Print message to browser console for debugging
    
    // Find HTML elements by their IDs
    const button = document.getElementById("demoButton");

    const message = document.getElementById("messageDisplay");

    const messages = [

    "🚀 Mission Launched",

    "🪐 Orbit Achieved",

    "✨ Future Activated",

    "🌎 Welcome to Tomorrow",

    "🛰 Transmission Received"

    ];

    button.addEventListener("click", () => {

    message.innerHTML =
    messages[Math.floor(Math.random()*messages.length)];

    });
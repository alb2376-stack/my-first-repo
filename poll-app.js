// Firebase Poll App - Tutorial JavaScript
// This script demonstrates how to integrate Firebase Realtime Database with a simple web app
// It shows real-time data synchronization across multiple users

// Wait for the DOM (Document Object Model) to be fully loaded before running any code
// This ensures all HTML elements exist before we try to access them
document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // STEP 1: FIREBASE CONFIGURATION
  // ========================================
  // Firebase configuration object - this connects your app to your Firebase project
  // You get these values from your Firebase Console (https://console.firebase.google.com)
  // 
  // To set up Firebase:
  // 1. Go to Firebase Console and create a new project
  // 2. Add a web app to your project
  // 3. Copy the config object that Firebase provides
  // 4. Replace the values below with your actual Firebase config
  
  const firebaseConfig = {
    // Your Firebase project configuration goes here
    // For this tutorial, we'll use a demo configuration
    // In a real app, you would replace these with your actual Firebase project settings
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://poll-tutorial-8887d-default-rtdb.firebaseio.com/",
    projectId: "poll-tutorial-8887d",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "1:169534792875:web:46f129050b7a69592943ee"
  };

  // Initialize Firebase - this connects your app to Firebase services
  // firebase.initializeApp() sets up the connection using your configuration
  firebase.initializeApp(firebaseConfig);

  // Get a reference to the Firebase Realtime Database
  // This is like getting a "handle" to your database that you can use to read/write data
  const database = firebase.database();

  // ========================================
  // STEP 2: GET REFERENCES TO HTML ELEMENTS
  // ========================================
  // We need to get references to the HTML elements we want to update
  // This is like getting "handles" to the parts of the webpage we want to change
  
  const yesButton = document.getElementById('vote-yes');
  const noButton = document.getElementById('vote-no');
  const yesCount = document.getElementById('yes-count');
  const noCount = document.getElementById('no-count');
  const totalVotes = document.getElementById('total-votes');
  const connectionStatus = document.getElementById('connection-status');

  // ========================================
  // STEP 3: SET UP REAL-TIME DATABASE LISTENERS
  // ========================================
  // Firebase Realtime Database can automatically update your app when data changes
  // We use .on('value') to listen for any changes to our poll data
  
  // Listen for changes to the 'yes' votes in the database
  // This function runs every time the 'yes' vote count changes in Firebase
  database.ref('poll/yes').on('value', function(snapshot) {
    // snapshot.val() gets the current value from the database
    const count = snapshot.val() || 0; // If no value exists, default to 0
    
    // Update the display on our webpage
    yesCount.textContent = count;
    
    // Update the total votes display
    updateTotalVotes();
    
    console.log('Yes votes updated:', count); // For debugging
  });

  // Listen for changes to the 'no' votes in the database
  // This function runs every time the 'no' vote count changes in Firebase
  database.ref('poll/no').on('value', function(snapshot) {
    const count = snapshot.val() || 0; // If no value exists, default to 0
    
    // Update the display on our webpage
    noCount.textContent = count;
    
    // Update the total votes display
    updateTotalVotes();
    
    console.log('No votes updated:', count); // For debugging
  });

  // ========================================
  // STEP 4: SET UP BUTTON EVENT LISTENERS
  // ========================================
  // When users click the vote buttons, we need to update the database
  // Firebase will then automatically update all other connected users
  
  // Handle "Yes" vote button clicks
  yesButton.addEventListener('click', function() {
    console.log('Yes button clicked'); // For debugging
    
    // Get the current count from the database and increment it
    // We use .once('value') to get the current value once, then update it
    database.ref('poll/yes').once('value')
      .then(function(snapshot) {
        const currentCount = snapshot.val() || 0; // Current count, or 0 if none exists
        const newCount = currentCount + 1; // Add 1 to the current count
        
        // Update the database with the new count
        // This will trigger the .on('value') listener above, updating all connected users
        return database.ref('poll/yes').set(newCount);
      })
      .then(function() {
        console.log('Yes vote recorded successfully');
        showToast('Thank you for voting "Yes"!', '#4CAF50');
      })
      .catch(function(error) {
        console.error('Error recording vote:', error);
        showToast('Failed to record vote. Please try again.', '#f44336');
      });
  });

  // Handle "No" vote button clicks
  noButton.addEventListener('click', function() {
    console.log('No button clicked'); // For debugging
    
    // Get the current count from the database and increment it
    database.ref('poll/no').once('value')
      .then(function(snapshot) {
        const currentCount = snapshot.val() || 0; // Current count, or 0 if none exists
        const newCount = currentCount + 1; // Add 1 to the current count
        
        // Update the database with the new count
        return database.ref('poll/no').set(newCount);
      })
      .then(function() {
        console.log('No vote recorded successfully');
        showToast('Thank you for voting "No"!', '#4CAF50');
      })
      .catch(function(error) {
        console.error('Error recording vote:', error);
        showToast('Failed to record vote. Please try again.', '#f44336');
      });
  });

  // ========================================
  // STEP 5: SURVEY QUESTIONS 2-5
  // ========================================
  // Unlike the Yes/No poll, these questions are only saved once the user
  // clicks "Submit Survey" - each submission is pushed as its own record
  // under 'survey/responses' so nothing gets overwritten.

  const wordInput = document.getElementById('survey-word');
  const improvementsOptions = document.getElementById('improvements-options');
  const improvementsOtherCheck = document.getElementById('improvements-other-check');
  const improvementsOtherText = document.getElementById('improvements-other-text');
  const safetySlider = document.getElementById('safety-slider');
  const safetySliderValue = document.getElementById('safety-slider-value');
  const usageOptions = document.getElementById('usage-options');
  const usageOtherCheck = document.getElementById('usage-other-check');
  const usageOtherText = document.getElementById('usage-other-text');
  const surveySubmitBtn = document.getElementById('survey-submit-btn');

  // Reveal the "Other" text field only while its checkbox is checked
  function wireOtherToggle(checkbox, textInput) {
    checkbox.addEventListener('change', function() {
      textInput.hidden = !checkbox.checked;
      if (!checkbox.checked) {
        textInput.value = '';
      }
    });
  }
  wireOtherToggle(improvementsOtherCheck, improvementsOtherText);
  wireOtherToggle(usageOtherCheck, usageOtherText);

  // Keep the number badge next to the slider in sync while dragging
  safetySlider.addEventListener('input', function() {
    safetySliderValue.textContent = safetySlider.value;
    safetySliderValue.classList.add('updated');
    setTimeout(function() {
      safetySliderValue.classList.remove('updated');
    }, 300);
  });

  // Collect the checked values (plus an "Other: ..." entry) from a checkbox group
  function getCheckedValues(container, otherCheck, otherText) {
    const values = [];
    container.querySelectorAll('input[type="checkbox"]:checked').forEach(function(box) {
      if (box === otherCheck) {
        if (otherText.value.trim()) {
          values.push('Other: ' + otherText.value.trim());
        }
      } else {
        values.push(box.value);
      }
    });
    return values;
  }

  surveySubmitBtn.addEventListener('click', function() {
    const response = {
      firstWord: wordInput.value.trim(),
      improvements: getCheckedValues(improvementsOptions, improvementsOtherCheck, improvementsOtherText),
      safetyRating: parseInt(safetySlider.value, 10),
      usage: getCheckedValues(usageOptions, usageOtherCheck, usageOtherText),
      submittedAt: firebase.database.ServerValue.TIMESTAMP
    };

    surveySubmitBtn.disabled = true;

    database.ref('survey/responses').push(response)
      .then(function() {
        console.log('Survey response recorded successfully');
        showToast('Thanks for completing the survey!', '#4CAF50');

        // Reset the form for the next respondent
        wordInput.value = '';
        improvementsOptions.querySelectorAll('input[type="checkbox"]').forEach(function(box) {
          box.checked = false;
        });
        improvementsOtherText.hidden = true;
        improvementsOtherText.value = '';
        usageOptions.querySelectorAll('input[type="checkbox"]').forEach(function(box) {
          box.checked = false;
        });
        usageOtherText.hidden = true;
        usageOtherText.value = '';
        safetySlider.value = 5;
        safetySliderValue.textContent = '5';
      })
      .catch(function(error) {
        console.error('Error recording survey response:', error);
        showToast('Failed to submit survey. Please try again.', '#f44336');
      })
      .finally(function() {
        surveySubmitBtn.disabled = false;
      });
  });

  // ========================================
  // STEP 6: HELPER FUNCTIONS
  // ========================================
  // These functions help us manage the user interface and provide feedback

  /**
   * updateTotalVotes Function
   * Purpose: Calculate and display the total number of votes
   * This function runs whenever either vote count changes
   */
  function updateTotalVotes() {
    // Get the current values from our display elements
    const yesVotes = parseInt(yesCount.textContent) || 0;
    const noVotes = parseInt(noCount.textContent) || 0;
    const total = yesVotes + noVotes;

    // Update the total display
    totalVotes.textContent = total;
  }

  /**
   * showToast Function
   * Purpose: Show a brief, colored confirmation/error message in the corner of the screen
   * @param {string} message - The text to display
   * @param {string} color - Background color, e.g. '#4CAF50' (success) or '#f44336' (error)
   */
  function showToast(message, color) {
    const toast = document.createElement('div');
    toast.className = 'vote-confirmation';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${color};
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      font-size: 14px;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(toast);

    setTimeout(function() {
      toast.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(function() {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  // ========================================
  // STEP 7: CONNECTION STATUS MONITORING
  // ========================================
  // Firebase provides connection status information
  // This helps us know if we're connected to the database
  
  // Listen for connection state changes
  database.ref('.info/connected').on('value', function(snapshot) {
    const connected = snapshot.val();
    
    if (connected) {
      // We're connected to Firebase
      connectionStatus.innerHTML = '<p style="color: #4CAF50;">✅ Connected to Firebase</p>';
      console.log('Connected to Firebase');
    } else {
      // We're not connected to Firebase
      connectionStatus.innerHTML = '<p style="color: #f44336;">❌ Disconnected from Firebase</p>';
      console.log('Disconnected from Firebase');
    }
  });

  // ========================================
  // STEP 8: INITIALIZATION
  // ========================================
  // Set up any initial state when the page loads
  
  // Initialize vote counts to 0 if they don't exist in the database
  // This ensures we start with a clean slate
  database.ref('poll').once('value')
    .then(function(snapshot) {
      if (!snapshot.exists()) {
        // If no poll data exists, initialize it with zeros
        return database.ref('poll').set({
          yes: 0,
          no: 0
        });
      }
    })
    .then(function() {
      console.log('Poll initialized successfully');
    })
    .catch(function(error) {
      console.error('Error initializing poll:', error);
    });

  // Add CSS animations for the vote confirmation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  console.log('Firebase Poll App initialized successfully!');
  console.log('Tutorial: This app demonstrates real-time data synchronization with Firebase');
});

// ========================================
// FIREBASE TUTORIAL SUMMARY
// ========================================
/*
This tutorial demonstrates several key Firebase concepts:

1. CONFIGURATION: Setting up Firebase with your project credentials
2. DATABASE REFERENCE: Getting a handle to your Realtime Database
3. REAL-TIME LISTENERS: Using .on('value') to automatically update UI when data changes
4. DATA WRITING: Using .set() to save data to the database
5. DATA READING: Using .once('value') to read data once
6. ERROR HANDLING: Managing connection issues and errors
7. CONNECTION MONITORING: Checking if your app is connected to Firebase

Key Benefits of Firebase Realtime Database:
- Automatic synchronization across all connected users
- No server management required
- Real-time updates without page refreshes
- Built-in offline support
- Scalable and secure

To use this in your own project:
1. Create a Firebase project at https://console.firebase.google.com
2. Replace the firebaseConfig object with your actual project settings
3. Set up your database rules in the Firebase Console
4. Deploy your app to Firebase Hosting (optional but recommended)
*/ 
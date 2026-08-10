// agents.js: minimal chat interface against the OpenAI chat completions API.
// Page: agents.html
// SECURITY: never hardcode a real API key here. This file is public on GitHub.
// Instead, each visitor is prompted for their own key, kept only in this browser's localStorage.

document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const output = document.getElementById('output');

  const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

  function getApiKey() {
    let key = localStorage.getItem('openai_api_key');
    if (!key) {
      key = window.prompt('Enter your OpenAI API key (stored only in this browser):');
      if (key) localStorage.setItem('openai_api_key', key.trim());
    }
    return key ? key.trim() : null;
  }

  async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    const apiKey = getApiKey();
    if (!apiKey) {
      output.textContent = 'No API key provided.';
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';
    output.textContent = 'Thinking...';

    try {
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful AI assistant. Keep your responses concise and friendly.' },
            { role: 'user', content: message }
          ],
          max_tokens: 150,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 401) {
          localStorage.removeItem('openai_api_key');
          throw new Error('Invalid API key. It has been cleared. Try sending again to re-enter it.');
        }
        throw new Error(`API request failed: ${response.status} ${response.statusText}\n${errorText}`);
      }

      const data = await response.json();
      output.textContent = data.choices[0].message.content;
    } catch (error) {
      output.textContent = 'Error: ' + error.message;
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send';
      input.value = '';
    }
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  });
});

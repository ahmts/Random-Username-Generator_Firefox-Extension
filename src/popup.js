document.addEventListener("DOMContentLoaded", function() {
  generateUsername();
  document.getElementById("username").addEventListener("click", copyUsername);
});

document.getElementById("generate").addEventListener("click", generateUsername);
document.getElementById("copy").addEventListener("click", copyUsername);
document.getElementById("length").addEventListener("input", updateLengthValue);
document.getElementById("numbers").addEventListener("input", updateNumbersValue);

function updateLengthValue() {
  const length = document.getElementById("length").value;
  document.getElementById("lengthValue").textContent = length;
}

function updateNumbersValue() {
  const numbers = document.getElementById("numbers").value;
  document.getElementById("numbersValue").textContent = numbers;
}

async function fetchWords(count) {
  try {
    const response = await fetch(`https://random-word-api.herokuapp.com/word?number=${count}`);
    const words = await response.json();
    return words;
  } catch (error) {
    console.error('Veri çekilirken hata oluştu:', error);
    return Array(count).fill('');
  }
}

async function generateUsername() {
  const length = parseInt(document.getElementById("length").value);
  const numCount = parseInt(document.getElementById("numbers").value);

  if (isNaN(length) || isNaN(numCount) || length <= 0 || numCount < 0) {
    document.getElementById("username").textContent = 'Invalid entry.';
    return;
  }

  let [word1, word2] = await fetchWords(2);
  let username = word1 + word2;

  if (username.length > length) {
    username = username.substring(0, length);
  }

  if (numCount > 0) {
    let numbers = '';
    for (let i = 0; i < numCount; i++) {
      numbers += Math.floor(Math.random() * 10).toString();
    }
    username += numbers;
  }

  document.getElementById("username").textContent = username;
}

function copyUsername() {
  const username = document.getElementById("username").textContent;
  if (!username) return;

  const textarea = document.createElement("textarea");
  textarea.value = username;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  showNotification();
}

function showNotification() {
  const notification = document.getElementById("notification");
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

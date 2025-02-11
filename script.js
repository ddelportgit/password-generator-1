const characterAmountRange = document.getElementById("character-amount-range");
const characterAmountNumber = document.getElementById("character-amount-number");
const form = document.getElementById("password-generator-form");
const includeUppercaseElement = document.getElementById("include-uppercase");
const includeNumbersElement = document.getElementById("include-numbers");
const includeSymbolsElement = document.getElementById("include-symbols");
const passwordDisplay = document.getElementById("password-display");

const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

characterAmountRange.addEventListener("input", syncCharacterAmount);
characterAmountNumber.addEventListener("input", syncCharacterAmount);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const characterAmount = characterAmountNumber.value;
  const includeUppercase = includeUppercaseElement.checked;
  const includeNumbers = includeNumbersElement.checked;
  const includeSymbols = includeSymbolsElement.checked;

  const password = generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );
  typePassword(password);
});

function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
  let charCodes = LOWERCASE_CHAR_CODES;
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);

  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);

  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);

  const passwordCharacters = [];

  for (i = 0; i < characterAmount; i++) {
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
}

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

function syncCharacterAmount(e) {
  const value = e.target.value;
  characterAmountNumber.value = value;
  characterAmountRange.value = value;
}

// COPY TO CLIPBOARD

const copyButton = document.getElementById("copy-password");

copyButton.addEventListener("click", (e) => {
  e.preventDefault();
  const password = document.getElementById("password-display").textContent;
  navigator.clipboard
    .writeText(password)
    .then(() => {
      const toast = document.getElementById("copy-toast");
      toast.classList.add("show-toast");
      setTimeout(() => {
        toast.classList.remove("show-toast");
      }, 2000);
    })
    .catch((e) => {
      console.error("Failed to copy", e);
    });
});

// TYPING EFFECT FOR PASSWORD

function typePassword(password) {
  passwordDisplay.textContent = "";
  let index = 0;

  const interval = setInterval(() => {
    if (index < password.length) {
      passwordDisplay.textContent += password[index];
      index++;
    } else {
      clearInterval(interval);
    }
  }, 75);
}

// DARKMODE

const darkmode = document.getElementById("darkmode-button");

darkmode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.querySelector(".container").classList.toggle("dark-mode");
});

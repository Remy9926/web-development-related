/**
 * Updates the Caesar Cipher portion of the page to ensure that
 * it is matching with the user's input. Also ensures that the slider value
 * is being updated as well.
*/
function updateCaesar() {
    slider_display.innerText = slider.value;
    caesar.innerText = caesarShuffle(input.value.toUpperCase());
}

/**
 * Takes a string and encrypts it with the Caesar Cipher.
 * 
 * @param {[string]} str is the string that you want to encrypt with the Caesar Cipher
 * @return {[string]} a string that is the encrypted message
*/
function caesarShuffle(str) {
    var result = "";
    for (i in str) {
        if (str[i] in charToInt) {
            let code = charToInt[str[i]];
            code += parseInt(slider.value);
            code %= 26;
            code += 65;
            result += String.fromCharCode(code);
        } else {
            result += str[i];
        }
    }
    return result
}
/**
 * Algorithm for randomly shuffling an array. In this case,
 * an array was used to represent the letters A-Y. To perform
 * the Square Cipher, the array had to be shuffled in order
 * for the message to be encrypted.
*/ 
function shuffleArray() {
    for (let i = letters.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    for (i in tableArray) {
        tableArray[i].innerText = letters[i];
    }
}

/**
 * Takes a string and encrypts it with the Square Cipher.
 * 
 * @param {[string]} str is the string that you want to encrypt
 * @return {[string]} a string that is the encrypted message
*/
function squareShuffle(str) {
    var result = "";
    for (i in str) {
        if (str[i] in charToInt && str[i] != "Z") {
            let index = charToInt[str[i]];
            result += letters[index];
        } else {
            result += str[i];
        }
    }
    return result;
}

/**
 * Updates the Square Cipher portion of the page so that it is
 * matching with the user's input.
*/
function updateSquare() {
    square.innerText = squareShuffle(input.value.toUpperCase());
}

function main() {
    charToInt = {}
    for (var i = 0; i < 26; i++) {      //creates a mapping of letters to integer values
        charToInt[String.fromCharCode(65 + i)] = i;
    }

    letters = [];
    for (var i = 0; i < 25; i++) {      //creates an array that contains the capital letters A-Y
        letters.push(String.fromCharCode(65 + i));
    }

    input = document.getElementsByTagName("textarea")[0];
    caesar = document.getElementsByClassName("caesar_message")[0];
    square = document.getElementsByClassName("square_message")[0];

    slider_display = document.getElementsByTagName("span")[0];
    slider = document.getElementsByTagName("input")[0];

    button = document.getElementsByTagName("button")[0];
    
    tableArray = document.getElementsByTagName("td");
    
    shuffleArray(letters);
    window.setInterval(updateCaesar);
    window.setInterval(updateSquare);
}

main();

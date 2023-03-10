/**
 * Ethan Huang
 * CSC 337
 * This is a script that will monitor what a user inputs into the translation service and send
 * this information to a server so that the server can return the proper translation to the
 * client-side.
 */

/**
 * Takes the text that a user inputs into the translation service as well as the language to
 * translate to and from and receives the translation from the server and displays it in the
 * output.
 */
function copyText() {
    if (input.value != "") {
        var path = "/dynamic/" + input.value + "/" + from.value + "/" + to.value;
        
        fetch(path)
            .then(function (response) {
                return response.text();
            })
            .then(function (translation) {
                output.value = translation;
            })
            .catch(() => {
                console.log("Something went wrong!");
            })
    } else {
        output.value = "";
    }
}

const input = document.getElementById("input");
const output = document.getElementById("output");
/**
 * Ethan Huang
 * CSC 337
 * This is an express server that will get translations requests from the client and send back
 * the appropriate translation. If the URL that a user inputs specifies a certain path, then
 * the server will respond with the static file within the public_html directory that contains
 * the same name as the specified path instead of a translation.
 */

const express = require("express");
const lineReader = require("line-reader");
const app = express();
const port = 5000;

engToSpan = {};
engToGer = {};
gerToEng = {};
spanToEng = {};
gerToSpan = {};
spanToGer = {};

//Displays the page if no path is specified in the URL
app.use(express.static("public_html"));

lineReader.eachLine("./German.txt", function(line) {
    var split_line = line.split("\t");
    var translation = "";
    if (split_line[0][0] != "#") {
        for (i in split_line[1]) {
            if (split_line[1][i] == " " || split_line[1][i].toLowerCase() != split_line[1][i].toUpperCase() || split_line[1][i] == "�") {
                translation += split_line[1][i];
            } else {
                break;
            }
        }
    }
    engToGer[split_line[0].toLowerCase().trim()] = translation.toLowerCase().trim();
    gerToEng[translation.toLowerCase().trim()] = split_line[0].toLowerCase().trim();
    translation = "";
});

lineReader.eachLine("./Spanish.txt", function(line) {
    var split_line = line.split("\t");
    var translation = "";
    if (split_line[0][0] != "#") {
        for (i in split_line[1]) {
            if (split_line[1][i] == " " || split_line[1][i].toLowerCase() != split_line[1][i].toUpperCase() || split_line[1][i] == "�") {
                translation += split_line[1][i];
            } else {
                break;
            }
        }
    }
    engToSpan[split_line[0].toLowerCase().trim()] = translation.toLowerCase().trim();
    spanToEng[translation.toLowerCase().trim()] = split_line[0].toLowerCase().trim();
    translation = "";
});

setTimeout(() => {
    for (i in gerToEng) {
        gerToSpan[i] = engToSpan[gerToEng[i]];
        spanToGer[engToSpan[gerToEng[i]]] = i;
    }
}, 5000);

//If a translation request is received from the client, then the server will
//process the translation. If the from and to language are the same, then the
//server will respond back with the same input. This is done dynamically.
app.get("/dynamic/:text/:from/:to", (req, res) => {
    var input = req.params.text.split(" ");

    if (req.params.from == "english" && req.params.to == "spanish")
        key = engToSpan;
    else if (req.params.from == "english" && req.params.to == "german")
        key = engToGer;
    else if (req.params.from == "spanish" && req.params.to == "english")
        key = spanToEng;
    else if (req.params.from == "spanish" && req.params.to == "german")
        key = spanToGer;
    else if (req.params.from == "german" && req.params.to == "english") 
        key = gerToEng;
    else if (req.params.from == "german" && req.params.to == "spanish")
        key = gerToSpan;
    else
        key = undefined;
    var output = "";
    if (key == undefined) {
        res.end(req.params.text);
    }
    else {
        for (i in input) {
            if (input[i] in key) {
                output += key[input[i]] + " ";
            } else if (input[i] != "") {
                output += "? ";
            }
        }
        res.end(output);
    }
})

//If the user specifies a certain language to translate to and from within the URL path,
//then the server will process the translation request accordingly.
app.get(("/translate/:toFrom/:message"), (req, res) => {
    var input = req.params.message.split("+");
    var translation = "";

    if (req.params.toFrom == "e2s")
        key = engToSpan;
    else if (req.params.toFrom == "e2g")
        key = engToGer;
    else if (req.params.toFrom == "s2e")
        key = spanToEng;
    else if (req.params.toFrom == "s2g")
        key = spanToGer;
    else if (req.params.toFrom == "g2e")
        key = gerToEng;
    else if (req.params.toFrom == "g2s")
        key = gerToSpan;

    for (i in input) {
        translation += key[input[i]] + " ";
    }
    res.end(translation);
})

//If a path is specified in the URL, then the server responds accordingly with the file in the
//public_html directory.
app.get("/:path", (req, res) => {
    res.send("/public_html/" + req.params.path);
})

app.listen(port, () => {
    console.log("You can start translating now!");
});

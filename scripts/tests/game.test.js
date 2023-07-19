/**
 * @jest-environment jsdom
*/

const { game, newGame, showScore } = require("../game");

// load the index.html file into Jest's mock DOM
beforeAll(() => {
    // install the fs library (part of node's default standard library)
    let fs = require("fs");
    // read the index.html file and save it to a variable
    let fileContents = fs.readFileSync("index.html", "utf-8");
    // open document, write file contents to it and close.
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game object contains correct keys", () => {
    // check if the game object contains a key called score
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    // check if the currentGame key exists
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    // check if playerMoves key exists
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    // check if choices key exists
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    // check if choices key contains the relevant ids
    test("choices key contains relevant ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
});

describe("newGame works correctly", () => {
    // set up the game state with some fake values to see if newGame func resets them
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button3"];
        game.currentGame = ["button1", "button4"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    // test if the score has been reset
    test("should set the game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    // check if the playerMoves array has been cleared
    test("should clear the playerMoves array", () => {
        expect(game.playerMoves.length).toEqual(0);
    });
    // check if the currentGame array has been cleared
    test("should clear the currentGame array", () => {
        expect(game.currentGame.length).toEqual(0);
    });
    // check if the score element displays 0
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});

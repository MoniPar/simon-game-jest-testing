/**
 * @jest-environment jsdom
*/

const { game } = require("../game");

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
/**
 * @jest-environment jsdom
*/

const { game, newGame, addTurn, showScore, lightsOn, showTurns, playerTurn } = require("../game");

jest.spyOn(window, "alert").mockImplementation(() => {});

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
    // check if turn number key exists
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
    });
});

describe("newGame works correctly", () => {
    // set up the game state with some fake values to see if newGame func resets them
    beforeAll(() => {
        game.score = 42;
        game.turnNumber = 42;
        game.playerMoves = ["button1", "button3"];
        game.currentGame = ["button1", "button4"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    // test if the score has been reset
    test("should set the game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    // test if the turn number has been reset
    test("should set the turnNumber to zero", () => {
        expect(game.turnNumber).toEqual(0);
    });
    // check if the playerMoves array has been cleared
    test("should clear the playerMoves array", () => {
        expect(game.playerMoves.length).toEqual(0);
    });
    // check if the currentGame sequence contains one element (new turn)
    test("should be one move in the computer's game array", () => {
        expect(game.currentGame.length).toBe(1);
    });
    // check if the score element displays 0
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    // check if data listener attr has been set to true on each circle
    test("data listener to be true", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    });
});

describe("gameplay works correctly", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    // check that there are two elements
    test("adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    // check to see if the correct class has been added to our button to light up
    test("should add correct class to light up the button", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("should increment the score if the turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test("should call an alert if the move is wrong", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong move!");
    });
});

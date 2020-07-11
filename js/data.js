// Every BronzeBingo variant needs at least 16 different phrases! (4x4)

/**
 * This object contains all data and game modes for bronzeBingo
 */
let bronzeBingo = {
    "version" : "1.4.3",
    "versionDate" : "2020-07-11",
    "author" : "Wolfgang Schwendtbauer",
    "toggleDarkMode" : function() {
        this.darkmode = !this.darkmode;
        localStorage.setItem('darkmode', this.darkmode);
        updateColorMode();
    },
    "darkmode" : false,
    "enableJsBingo" : function() {
        "Hello there!";
        "type bronzeBingo.enableJsBingo() to enable JavaScript Bingo";
        
        this.gameModes.javascript = {
            "name" : "JavaScript Bingo",
            "data" : [
                "object Object",
                "[]",
                "{}",
                "NaN",
                "undefined",
                "\"this\" error",
                "== instead of ===",
                "var instead of let",
                "const",
                "getElementById",
                "alert()",
                "console.log",
                "createElement",
                "innerHTML",
                "import",
                "npm"
            ]
        };
        this.gameModeCount++;
        resetGame();
        return "Game reset. JavaScript Bingo is now available."
    },
    "gameModeCount" : 3,
    "gameModes" : {
        // --- Bronze Bingo ---
        "bronze" : {
            "name" : "Bronze Bingo",
            "description" : "Original Bronze Bingo for LoL ranked with toxic teammates",
            "data" : [
                "kys",
                "Bronze",
                "idiot",
                "just a game",
                "u mad?",
                "blind",
                "kid",
                "retard",
                "easy",
                "uninstall",
                "Report",
                "your mom",
                "afk",
                "Noob",
                "cry",
                "suck",
                "****",
                "troll"
            ]
        },
        // --- Mario Kart Bingo ---
        "mariokart" : {
            "name" : "Mario Kart Bingo",
            "description" : "Bingo for Mario Kart singleplayer or multiplayer",
            "data" : [
                "Use a mushroom",
                "Miss an itembox",
                "Hit by a red shell",
                "Fell of the track",
                "Hit a banana",
                "Loose to a com",
                "Avoid a red shell",
                "Launch a blue shell",
                "Finish in first",
                "Hit by a green shell",
                "Drive off the track",
                "Hit a cow",
                "Hit a bat",
                "Start boost failed",
                "Hit someone with a green shell",
                "Hit by your own shell",
                "Perfect Power Slide",
                "Finish in last place",
                "Use a shortcut"
            ]
        },
        // --- Normal Bingo ---
        "bingo" : {
            "name" : "Bingo",
            "description" : "Normalo Bingo",
            "data" : [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16"
            ]
        }
    }
};
/* ======================================== */
/* VARIABELEN                                */
/* Belangrijke gegevens die het spel bijhoudt */
/* ======================================== */

// Dit haalt ALLE elementen op met class "cell" (dus alle 9 vakjes)
// Het resultaat is een soort lijst (NodeList) van alle vakjes
const cells = document.querySelectorAll(".cell");

// Dit houdt bij welke speler er nu aan de beurt is
// We beginnen met speler "X"
let currentPlayer = "X";


/* ======================================== */
/* KLIK-DETECTIE EN SPELERBEURT              */
/* Reageert op een klik en zet de X of O neer */
/* ======================================== */

cells.forEach(function (cell) {
    cell.addEventListener("click", function () {
        // Als dit vakje al een X of O bevat, stop dan direct
        // "return" binnen een functie betekent: stop hier, voer de rest niet uit
        if (cell.textContent !== "") {
            return;
        }

        // Zet de tekst-inhoud van het aangeklikte vakje op de huidige speler (X of O)
        cell.textContent = currentPlayer;

        // Wissel van speler: als de huidige speler "X" is, wordt het "O", en andersom
        // Dit is een "ternary operator": een korte manier om een if/else in één regel te schrijven
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    });
});
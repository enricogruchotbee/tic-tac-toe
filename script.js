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

// Dit houdt bij of het spel afgelopen is (true) of nog bezig is (false)
// We beginnen met false, want het spel is nog niet voorbij bij het opstarten
let gameOver = false;

// Dit is een lijst van alle mogelijke winnende combinaties
// Elke combinatie bestaat uit 3 vakje-nummers (van 0 t/m 8, zoals in de HTML)
// Denk aan het bord zo genummerd:
//   0 | 1 | 2
//   3 | 4 | 5
//   6 | 7 | 8
const winningCombinations = [
    [0, 1, 2], // bovenste rij
    [3, 4, 5], // middelste rij
    [6, 7, 8], // onderste rij
    [0, 3, 6], // linker kolom
    [1, 4, 7], // middelste kolom
    [2, 5, 8], // rechter kolom
    [0, 4, 8], // diagonaal van linksboven naar rechtsonder
    [2, 4, 6]  // diagonaal van rechtsboven naar linksonder
];

/* ======================================== */
/* WINNAAR CHECKEN                           */
/* Controleert of iemand 3 op een rij heeft  */
/* ======================================== */

// Deze functie controleert of er een winnaar is
// Ze geeft "X", "O" terug als iemand gewonnen heeft, of null als (nog) niemand gewonnen heeft
function checkWinner() {
    // We lopen door elke winnende combinatie heen, één voor één
    for (let i = 0; i < winningCombinations.length; i++) {
        // Haal de 3 vakje-nummers van deze combinatie op, bijvoorbeeld [0, 1, 2]
        const combo = winningCombinations[i];

        // Haal de daadwerkelijke tekst (X, O, of leeg) op uit die 3 vakjes
        // We gebruiken combo[0], combo[1], combo[2] om de 3 losse nummers te pakken
        const a = cells[combo[0]].textContent;
        const b = cells[combo[1]].textContent;
        const c = cells[combo[2]].textContent;

        // Als alle 3 dezelfde letter bevatten, EN die letter is niet leeg,
        // dan hebben we een winnaar gevonden
        if (a !== "" && a === b && b === c) {
            return a; // geeft "X" of "O" terug
        }
    }

    // Als we door alle combinaties heen zijn gelopen zonder winnaar te vinden
    return null;
}

// Deze functie controleert of alle 9 vakjes gevuld zijn (dus geen enkel vakje meer leeg)
// Ze geeft "true" terug als het bord vol is, en "false" als er nog een leeg vakje is
function isBoardFull() {
    // We lopen door ELK vakje in "cells" heen
    for (let i = 0; i < cells.length; i++) {
        // Zodra we ÉÉN leeg vakje tegenkomen, weten we genoeg: het bord is niet vol
        if (cells[i].textContent === "") {
            return false;
        }
    }

    // Als we alle vakjes hebben gecontroleerd en geen enkele was leeg, is het bord vol
    return true;
}

/* ======================================== */
/* KLIK-DETECTIE EN SPELERBEURT              */
/* Reageert op een klik en zet de X of O neer */
/* ======================================== */

cells.forEach(function (cell) {
    cell.addEventListener("click", function () {
        // Als het spel al afgelopen is, doe dan niks meer
        if (gameOver) {
            return;
        }

        // Als dit vakje al een X of O bevat, stop dan direct
        // "return" binnen een functie betekent: stop hier, voer de rest niet uit
        if (cell.textContent !== "") {
            return;
        }

        // Zet de tekst-inhoud van het aangeklikte vakje op de huidige speler (X of O)
        cell.textContent = currentPlayer;

        // Controleer na deze zet of er een winnaar is
        const winner = checkWinner();

        // als er een winnaar is, toon dat dan met een simpele melding
        if (winner !== null) {
            // Er is een winnaar: zet gameOver op true, zodat er niet meer geklikt kan worden
            gameOver = true;

            // We gebruiken setTimeout om de browser eerst de tijd te geven
            // om de laatste X/O op het scherm te tekenen, VOORDAT de alert verschijnt
            // We geven de browser nu 200 milliseconden (0,2 seconden) de tijd
            setTimeout(function () {
                alert("Speler " + winner + " heeft gewonnen!");
            }, 200);
            } else if (isBoardFull()) {
            // Geen winnaar, maar het bord is wel vol: gelijkspel
            gameOver = true;

            setTimeout(function () {
                alert("Gelijkspel!");
            }, 200);
        } else {
            // Alleen wisselen van speler als er nog GEEN winnaar is
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    });
});

/* ======================================== */
/* RESET / OPNIEUW SPELEN                    */
/* Zet het spel terug naar de beginstand     */
/* ======================================== */

// Dit zoekt de resetknop op via zijn id, zodat we ernaar kunnen luisteren
const resetButton = document.getElementById("reset-button");

// We voegen een klik-listener toe aan de resetknop
resetButton.addEventListener("click", function () {
    // Loop door elk vakje heen en maak de tekst-inhoud weer leeg
    cells.forEach(function (cell) {
        cell.textContent = "";
    });

    // Zet de speler weer terug op "X" (die begint altijd als eerste)
    currentPlayer = "X";

    // Zet het spel weer op "niet afgelopen"
    gameOver = false;
});
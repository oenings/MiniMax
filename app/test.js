// Ausführen mit: node app/test.js
const assert = require('assert');
const T = require('./minimax.js');
const _ = null;

// Aufgabe 3 aus TicTacToe.pdf: X am Zug, X kann ein Unentschieden erzwingen, aber nicht gewinnen.
const aufgabe3 = ['O', _, 'O', 'X', 'X', 'O', _, _, 'X'];
const s3 = T.scoreMoves(aufgabe3, 'X');
assert.strictEqual(Math.max(...s3.filter((s) => s !== null)), 0);
assert.strictEqual(T.chooseMove(aufgabe3, 'X'), 1); // nur Feld oben Mitte verhindert den Sieg von O

// Aufgabe 6: X X _ / X O _ / O _ _  (O am Zug, da X einen Stein mehr hat)
const aufgabe6 = ['X', _, 'X', 'X', 'O', _, 'O', _, _];
assert.strictEqual(T.chooseMove(aufgabe6, 'O'), 1); // O muss oben Mitte blocken

// Leeres Brett: perfektes Spiel endet unentschieden.
assert.strictEqual(T.minimax(Array(9).fill(null), 'X', 'X'), 0);

// Unbesiegbare KI gegen zufälligen Spieler verliert nie.
for (let g = 0; g < 300; g++) {
  const b = Array(9).fill(null);
  let p = g % 2 ? 'X' : 'O';
  while (!T.winner(b) && !T.isFull(b)) {
    b[T.chooseMove(b, p, p === 'X' ? 'leicht' : 'unbesiegbar')] = p;
    p = T.other(p);
  }
  assert.notStrictEqual(T.winner(b)?.player, 'X');
}
console.log('Alle Tests bestanden.');

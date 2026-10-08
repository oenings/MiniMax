// Tic-Tac-Toe-Logik mit Minimax (ohne DOM, damit sie auch in Node testbar ist).
const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function winner(board) {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line: [a, b, c] };
    }
  }
  return null;
}

function isFull(board) {
  return board.every(Boolean);
}

function other(player) {
  return player === 'X' ? 'O' : 'X';
}

// Bewertung aus Sicht von `me`: +10 - Tiefe = Sieg, -10 + Tiefe = Niederlage, 0 = Unentschieden.
// Die Tiefe sorgt dafür, dass schnelle Siege und späte Niederlagen bevorzugt werden.
function minimax(board, toMove, me, depth = 0) {
  const w = winner(board);
  if (w) return w.player === me ? 10 - depth : depth - 10;
  if (isFull(board)) return 0;

  const maximizing = toMove === me;
  let best = maximizing ? -Infinity : Infinity;
  for (let i = 0; i < 9; i++) {
    if (board[i]) continue;
    board[i] = toMove;
    const score = minimax(board, other(toMove), me, depth + 1);
    board[i] = null;
    best = maximizing ? Math.max(best, score) : Math.min(best, score);
  }
  return best;
}

// Liefert für jedes freie Feld den Minimax-Wert aus Sicht von `player` (null für belegte Felder).
function scoreMoves(board, player) {
  return board.map((cell, i) => {
    if (cell) return null;
    const next = board.slice();
    next[i] = player;
    return minimax(next, other(player), player, 1);
  });
}

// level: 'leicht' (zufällig), 'mittel' (meist optimal), 'unbesiegbar' (immer optimal).
function chooseMove(board, player, level = 'unbesiegbar', rand = Math.random) {
  const free = board.map((c, i) => (c ? -1 : i)).filter((i) => i >= 0);
  if (free.length === 0) return -1;
  const randomMove = () => free[Math.floor(rand() * free.length)];

  if (level === 'leicht') return randomMove();
  if (level === 'mittel' && rand() < 0.35) return randomMove();

  const scores = scoreMoves(board, player);
  const best = Math.max(...free.map((i) => scores[i]));
  const bestMoves = free.filter((i) => scores[i] === best);
  return bestMoves[Math.floor(rand() * bestMoves.length)];
}

const TicTacToe = { LINES, winner, isFull, other, minimax, scoreMoves, chooseMove };
if (typeof module !== 'undefined') module.exports = TicTacToe;
if (typeof window !== 'undefined') window.TicTacToe = TicTacToe;

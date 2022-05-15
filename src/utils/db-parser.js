const Chess = require('chess.js').Chess;
const fs = require('fs');
const path = require('path');

const DATABASE_FILENAME = 'database.json';

const DATABASE = JSON.parse(fs.readFileSync(path.join(process.cwd(), DATABASE_FILENAME), 'utf8'));

const INITIAL_STATE = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

/**
 * Function to parse raw data from database.json file and provide normilized to mongodb
 *
 * @param node
 * @param fenb
 * @param parentFen
 * @param rank
 * @returns
 */
function parse(node, fenb, parentFen, rank) {
  const fenbase = fenb ?? [];
  const chess = new Chess(parentFen ?? INITIAL_STATE);
  if (node.m) {
    chess.move(node.m);
  }
  const fen = chess.fen();
  fenbase.push({
    m: node.m,
    n: node.n,
    e: node.e,
    c: node.c,
    fen: parentFen,
    currentFen: fen,
    r: (rank ?? 0) * 100,
  });
  node.s.forEach((s, i) => {
    parse(s, fenbase, fen, i + 1);
  });
  return fenbase;
}

const fenbase = parse(DATABASE);

fs.writeFileSync('parsed.json', JSON.stringify(fenbase));

console.info(`File is saved. Check 'parsed.json'`);

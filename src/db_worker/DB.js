const MongoClient = require('mongodb').MongoClient;
const config = require('dotenv').config;
config();

class DB {
  uri = process.env.MONGO_URL;
  dbName = 'SAS4TA-chess';
  collectionName = 'chess-collection';
  client = new MongoClient(this.uri);
  db = this.client.db(this.dbName);
  collection = this.db.collection(this.collectionName);
  connection = this.client.connect();

  /**
   * Get data from db using QS
   *
   * @param {String} fen
   * @returns
   */
  async getFen(fen) {
    const fenData = await this.collection.find({ fen }).sort({ r: 1 }).limit(1).toArray();
    const fenRecord = fenData.pop();
    if (!fenRecord) return {};
    return {
      fen: fenRecord.fen,
      bestMove: fenRecord.m,
      score: fenRecord.e.v,
      depth: fenRecord.e.d,
      sp: fenRecord.e.v * 100,
    };
  }

  /**
   * Get base data
   *
   * @returns
   */
  async getFenBase() {
    const data = await this.collection
      .aggregate([
        {
          $sort: { r: 1 },
        },
        {
          $group: {
            _id: '$fen',
            bestMove: { $first: { bestMove: '$m', score: '$e.v', depth: '$e.d' } },
          },
        },
      ])
      .toArray();

    return data.map((fen) => [fen._id, { ...fen.bestMove }]);
  }

  /**
   * Get full db data
   *
   * @returns
   */
  async getBase() {
    const data = await this.collection.find({}).sort({ r: 1 }).limit(0).toArray();
    for (const fenRecord of data) {
      const parentRecord = data.find((fen) => fen.currentFen === fenRecord.fen);
      if (parentRecord) {
        if (!parentRecord.s) {
          parentRecord.s = [];
        }
        parentRecord.s.push(fenRecord);
      }
    }
    const root = data.find((fen) => !fen.m);
    return this._formatBase(root);
  }

  /**
   * Formating of db data
   *
   * @param node
   * @returns
   */
  _formatBase(node) {
    delete node._id;
    delete node.fen;
    delete node.currentFen;
    delete node.r;
    if (node.s) {
      for (const child of node.s) {
        this._formatBase(child);
      }
    }
    return node;
  }
}

module.exports = DB;

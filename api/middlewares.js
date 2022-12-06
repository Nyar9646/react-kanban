/**
 * jsonServer : REST API のバックエンドサーバーを用意できるライブラリ
 *  test起動 >> package.json "start-api"
 */
const jsonServer = require('json-server')

/**
 * ??? ※詳細なし
 * ランダムなレイテンシを再現する。min に近い値が出やすい
 * @param {number} max 遅延の最大値(ms)
 * @param {number} min 遅延の最小値(ms)
 * @returns
 */
function delay(max, min = 0) {
  return (req, res, next) => {
    setTimeout(next, Math.random() ** 2 * (max - min) +min)
  }
}

/**
 * ??? ※詳細なし
 * null になった値を削除。不整合を起こさないよう GET リクエストのタイミングで実行する
 * @param {string} path 対象のパス
 * @returns
 */
function cleanNull(path) {
  return (req, res, next) => {
    try {
      if (req.method !== 'GET') return

      const db = req.app.db
      const { isNull } = db._
      const newValue = db.get(path).omitBy(isNull).value()
      db.set(path, newValue).write()
    } catch (err) {
      console.error(err)
    } finally {
      next()
    }
  }
}

module.exports = [
  /**
   * API エンドポイントのバージョニングを模倣して、HTTPメソッドの GET (/api/v1/cards)s のようにアクセス
   *  ex : http://localhost:3000/api/v1/cards
   * GET 以外の HTTPメソッドを利用する >> cURLコマンド, VSCode拡張「REST Client」
   */
  jsonServer.rewriter({'/api/:var/*': '/$2'}),
  delay(1_000, 100),
  cleanNull('cardsOrder'),
]

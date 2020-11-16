'use strict'

const assert = require('assert')

// テストの前に永続化されているファイルを消す（unlink）
const fs = require('fs')
fs.unlink('./tasks.json', err => {
    const todo = require('./dist/') // こう書けば './dist/index.js' を読み込む。明示的に index.js まで書いてもよい。

    // add と list のテスト
    todo.add('ノートを買う')
    todo.add('鉛筆を買う')
    assert.deepStrictEqual(todo.list(), ['ノートを買う', '鉛筆を買う'])

    // done と donelist のテスト
    todo.done('鉛筆を買う')
    assert.deepStrictEqual(todo.list(), ['ノートを買う'])
    assert.deepStrictEqual(todo.donelist(), ['鉛筆を買う'])

    // del のテスト
    todo.del('ノートを買う')
    todo.del('鉛筆を買う')
    assert.deepStrictEqual(todo.list(), [])
    assert.deepStrictEqual(todo.donelist(), [])

    console.log('テストが正常に完了しました')
})
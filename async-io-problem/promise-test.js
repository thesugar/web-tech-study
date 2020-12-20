'use strict'

/*
new Promise によって Promise オブジェクトが作るときには、引数に resolve と reject が引数となるような関数（`(resolve, reject) => {...}`）を渡す（reject は省略可能）。
resolve, reject はどちらも関数で、 resolve は処理が正常に終了した時に呼ばれ、 reject は処理でエラーが起きた時に呼ばれる。
Promise 内でどちらかが呼ばれると Promise の処理が終わる。
*/

new Promise((resolve) => {
    const nowDate = new Date()
    resolve(nowDate)
}).then(v1 => {
    new Promise((resolve) => {
        const monthAndDate = {
            month: v1.getMonth(),
            date: v1.getDate(),
        }
        resolve(monthAndDate)
    }).then(v2 => {
        new Promise((resolve) => {
            const text = `今日は ${v2.month + 1} 月 ${v2.date} 日です`
            resolve(text)
        }).then(v3 => {
            console.log(v3)
        })
    })
})

// ↑コールバック地獄

// ↓書き換え
// Promise チェーン
// 上のコードだと then() のネストが多重になるが以下の Promise チェーンだと then が都度閉じるので
// コードの見た目は比較的散らからなくなる
new Promise(resolve => {
    const nowDate = new Date()
    resolve(nowDate)
}).then(v1 => {
    const monthAndDate = {
        month: v1.getMonth(),
        date: v1.getDate(),
    }
    return new Promise(resolve => {
        resolve(monthAndDate)
    })
}).then(v2 => {
    const text = `今日は ${v2.month + 1} 月 ${v2.date} 日です！`
    return new Promise(resolve => {
        resolve(text)
    })
}).then(v3 => {
    console.log(v3)
})

// ただし、Promise チェーンも、特に for 文で回すときなど苦労する。
// async / await を使うときれいに書ける。

const fs = require('fs')
const fileName = './asyncawait.txt'
const appendFilePromise = (fileName, str) => {
    return new Promise((resolve) => {
        fs.appendFile(fileName, str, 'utf8', () => resolve())
    })
}

const main = async () => {
    for (let count = 0; count < 500; count++) {
        await appendFilePromise(fileName, 'あ')
        await appendFilePromise(fileName, 'い')
        await appendFilePromise(fileName, 'う')
        await appendFilePromise(fileName, 'え')
        await appendFilePromise(fileName, 'お')
        await appendFilePromise(fileName, '\n')
    }
}

main()
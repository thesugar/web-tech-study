'use strict';

// key: タスクの文字列 value: 完了しているかどうかの真偽値
let tasks = new Map();

const fs = require('fs');
const fileName = './tasks.json';

// 同期的にファイルから復元
try {
    const data = fs.readFileSync(fileName, 'utf8');
    tasks = new Map(JSON.parse(data));
} catch (ignore) {
    console.log(fileName + 'から復元できませんでした');
}


/**
 * タスクをファイルに保存する
 */
const saveTasks = () => {
    fs.writeFileSync(fileName, JSON.stringify(Array.from(tasks)), 'utf8');
}

/**
 * TODO を追加する
 * @param {string} task
 */
const todo = task => {
    tasks.set(task, false);
    saveTasks();
}

/**
 * タスクと完了したかどうかが含まれる配列を受け取り、完了したかを返す
 * @param {array} taskAndIsDonePair
 * @return {boolean} 完了したかどうか
 */
const isDone = taskAndIsDonePair => {
    return taskAndIsDonePair[1];
}

/**
 * タスクと完了したかどうかが含まれる配列を受け取り、完了していないか返す
 * @param {array} taskAndIsDonePair
 * @return {boolean} 完了していないかどうか
 */
const isNotDone = taskAndIsDonePair => {
    return !isDone(taskAndIsDonePair);
}

/**
 * TODO の一覧の配列を取得する
 * @return {array}
 */
const list = () => {
    return Array.from(tasks) // Map を、キーと値で構成される要素 2 つの配列に変換する
        .filter(isNotDone)
        .map(t => t[0]);
}

/**
 * TODO を完了状態にする
 * @param {string} task
 */
const done = task => {
    if (tasks.has(task)) {
        tasks.set(task, true);
        saveTasks();
    }
}

/**
 * 完了済みのタスクの一覧の配列を取得する
 * @return {array}
 */
const donelist = () => {
    return Array.from(tasks)
                .filter(isDone)
                .map(t => t[0]);
}

/**
 * 項目を削除する
 * @param {string} task
 */
const del = task => {
    tasks.delete(task);
    saveTasks();
}

// todo 関数 と list 関数をモジュールの関数として追加する
module.exports = { todo, list, done, donelist, del };
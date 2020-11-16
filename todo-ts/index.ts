'use strict'

type Task = {
    name: string,
    state: boolean,
}

let tasks: Task[] = []

const fs = require('fs')
const fileName = './tasks.json'


// 同期的にファイルから復元
try {
    const data = fs.readFileSync(fileName, 'utf8')
    tasks = JSON.parse(data)
} catch (ignore) {
    console.log(fileName + 'から復元できませんでした')
}

/**
 * タスクをファイルに保存する
 */
const saveTasks = () => {
    fs.writeFileSync(fileName, JSON.stringify(tasks), 'utf8')
}

/**
 * TODO を追加する
 * @param {string} task 
 */
const add = (taskName: string) => {
    tasks.push({ name: taskName, state: false })
    saveTasks()
}

/**
 * タスクと完了したかどうかが含まれるオブジェクトを受け取り、完了したかを返す
 * @param {object} task
 * @return {boolean} 完了したかどうか
 */
const isDone = (task: Task): boolean => {
    return task.state
}

/**
 * タスクと完了したかどうかが含まれるオブジェクトを受け取り、完了していないかを返す
 * @param {object} task 
 * @return {boolean} 完了したかどうか
 */
const isNotDone = (task: Task): boolean => {
    return !isDone(task)
}

/**
 * TODO 一覧の配列を取得する
 * @returns {array}
 */
const list = (): string[] => {
    return tasks
        .filter(task => isNotDone(task))
        .map(task => task.name)
}

/**
 * TODO を完了状態にする
 * @param {string} taskName
 */
const done = (taskName: string) => {
    const indexFound: number = tasks.findIndex(task => task.name === taskName)
    if (indexFound !== -1) {
        tasks[indexFound].state = true
        saveTasks()
    }
}

/**
 * 完了済みのタスクの一覧の配列を取得する
 * @return {array}
 */
const donelist = (): string[] => {
    return tasks.filter(isDone).map(task => task.name)
}

/**
 * 項目を削除する
 * @param {string} taskName 
 */
const del = (taskName: string) => {
    const indexFound: number = tasks.findIndex(task => task.name === taskName)
    if (indexFound !== -1) {
        tasks.splice(indexFound, 1)
        saveTasks()
    }
}

module.exports = { add, list, done, donelist, del }
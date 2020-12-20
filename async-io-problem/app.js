'use strict';

const fs = require('fs');
const fileName = './test.txt';

// 非同期 I/O による実装
for (let count = 0; count < 500; count++) {
    fs.appendFile(fileName, 'あ', 'utf8', () => {});
    fs.appendFile(fileName, 'い', 'utf8', () => {});
    fs.appendFile(fileName, 'う', 'utf8', () => {});
    fs.appendFile(fileName, 'え', 'utf8', () => {});
    fs.appendFile(fileName, 'お', 'utf8', () => {});
    fs.appendFile(fileName, '\n', 'utf8', () => {});
}
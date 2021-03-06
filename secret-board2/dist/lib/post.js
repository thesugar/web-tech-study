'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:postgres@localhost/secret_board2', {
    logging: false // sequelize が出すログの設定をオフにする
});
const Post = sequelize.define('Post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: Sequelize.TEXT
    },
    postedBy: {
        type: Sequelize.STRING
    },
    trackingCookie: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: true,
});
Post.sync(); // Post というオブジェクト自体を DB に適用して同期を取る
module.exports = Post;
//# sourceMappingURL=post.js.map
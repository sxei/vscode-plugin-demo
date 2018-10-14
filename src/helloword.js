const vscode = require('vscode');
module.exports = function(context) {
    // 注册HelloWord命令
    context.subscriptions.push(vscode.commands.registerCommand('extension.sayHello2', () => {
        vscode.window.showInformationMessage('Hello World！你好，小茗同学！');
    }));
};
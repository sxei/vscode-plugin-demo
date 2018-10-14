const vscode = require('vscode');
module.exports = function(context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.demo.testMenuShow', () => {
        vscode.window.showInformationMessage(`你点我干啥，我长得很帅吗？`);
    }));
};
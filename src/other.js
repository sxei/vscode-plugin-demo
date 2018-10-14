/**
 * 其它杂七杂八测试代码都放在这里
 */

const vscode = require('vscode');

module.exports = function(context) {
    // 获取所有命令
    vscode.commands.getCommands().then(allCommands => {
        console.log('所有命令：', allCommands);
    });

    // 编辑器命令
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('extension.testEditorCommand', (textEditor, edit) => {
        console.log('您正在执行编辑器命令！');
        console.log(textEditor, edit);
    }));

    // 执行某个命令
    // vscode.commands.executeCommand('命令', 'params1', 'params2');
};

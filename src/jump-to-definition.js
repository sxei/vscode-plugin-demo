/**
 * 跳转到定义示例，本示例支持`package.json`中`dependencies`、`devDependencies`跳转到对应依赖包。
 */
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const util = require('./util');

/**
 * 查找文件定义的provider，匹配到了就return一个location，否则不做处理
 * 最终效果是，当按住Ctrl键时，如果return了一个location，字符串就会变成一个可以点击的链接，否则无任何效果
 * @param {*} document 
 * @param {*} position 
 * @param {*} token 
 */
function provideDefinition(document, position, token) {
    const fileName    = document.fileName;
    const workDir     = path.dirname(fileName);
    const word        = document.getText(document.getWordRangeAtPosition(position));
    const line        = document.lineAt(position);
    const projectPath = util.getProjectPath(document);

    console.log('====== 进入 provideDefinition 方法 ======');
    console.log('fileName: ' + fileName); // 当前文件名
    console.log('workDir: ' + workDir); // 当前文件所在目录
    console.log('word: ' + word); // 当前光标所在单词
    console.log('line: ' + line.text); // 当前光标所在行
    console.log('projectPath: ' + projectPath); // 当前工程目录
    
    if (/\/package\.json$/.test(fileName)) {
        console.log(word, line.text);
        const json = document.getText();
        // 这里我们偷懒只做一个简单的正则匹配
        if (new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`, 'gm').test(json)) {
            let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/README.md`;
            if (fs.existsSync(destPath)) {
                // new vscode.Position(0, 0) 表示跳转到某个文件的第一行第一列
                return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
            }
        }
    }
}

module.exports = function(context) {
    // 注册如何实现跳转到定义，第一个参数表示仅对json文件生效
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(['json'], {
        provideDefinition
    }));
};
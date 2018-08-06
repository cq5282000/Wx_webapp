const readline = require('readline');

module.exports = function(questionArr, answerObj, callback) {
    let questionItem = {};

    questionItem = questionArr.shift();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: questionItem.question
    });
    rl.prompt();
    rl.on('line', (line) => {
        answerObj[questionItem.value] = line;
        if (questionArr.length) {
            questionItem = questionArr.shift();
            rl.setPrompt(questionItem.question);
            rl.prompt();
            return;
        }
        rl.close();
    }).on('close', () => {
        callback(answerObj);
    });
};

import chalk from "chalk";
const log = console.log;
let infoCount = 1;
let errorCount = 1;
let successCount = 1;
let warnCount = 1;

const infoLog = (msg: string) => {
    log(chalk.blue(`INFO=> ${infoCount}. ${msg}`))
    infoCount++;
}

const errorLog = (msg: string) => {
    log(chalk.red(`ERROR=> ${errorCount}. ${msg}`));
    errorCount++;
}

const successLog = (msg: string) => {
    log(chalk.green(`SUCCESS=> ${successCount}. ${msg}`));
    successCount++;
}

const warnLog = (msg: string) => {
    log(chalk.yellow(`WARNING=> ${warnCount}. ${msg}`));
    warnCount++;
}


export {
    infoLog,
    errorLog,
    successLog,
    warnLog
}
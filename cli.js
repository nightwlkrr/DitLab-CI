const csvLibrary = require('./csvlibrary');
const readline = require('readline');

const rlc = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const readLineAsync = msg => {
    return new Promise(resolve => {
        rlc.question(msg, userRes => {
            rlc.close();
            resolve(userRes);
      });
    });
}

const cli = async() => {
    const filmActors = csvLibrary.readCSV();
    console.log(`Read ${filmActors.length} from file.`);
    const keyword = await readLineAsync('What is the name you want to search on: ');
    let results = filmActors;
    if (keyword != '') {
        results = csvLibrary.search(filmActors, keyword);
    }
    console.log(`Found ${results.length} results in file.`);
    let graphData = csvLibrary.transform(results);
    console.log(graphData);
    csvLibrary.createGraph(graphData);
}

cli();
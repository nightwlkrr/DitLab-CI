const fs = require('fs');

function readCSV() {   
    const lines = fs.readFileSync('film_actors.csv', 'utf-8').split('\n');
    const header = lines.shift().split(';')
    return lines.map(l => {
        let parts = l.split(';')
        let element = {};
        for (let i = 0; i < parts.length; i++) {
            element[header[i]] = parts[i];
        }
        return element;
    });
}

function search(list, keyword) {
    if (keyword.trim().length == 0) {
        return [];
    }
    
    return list.filter(elem => elem['actor_name']
                                .toLowerCase()
                                .includes(keyword.trim().toLowerCase()));
}

function transform(list) {
    // Filter out all names from the objects
    const names = list.map(e => e['actor_name']);
    
    // Get unique names and create dictionary (name1: 0, name2: 0, etc.)
    let counts = {};
    [...new Set(names)].forEach(el => counts[el] = 0);

    // Now get value counts for each name
    names.forEach(el => counts[el] += 1)
    
    // And sort descending by count
    return Object.entries(counts).sort((a, b) => {
        return b[1] - a[1];
    });
}

function createGraph(data) {
    try {
        let content = '';
        for (let item of data) {
            content += `${item[0].padEnd(30)} ${'='.repeat(item[1])}\n`;
        }
        fs.writeFileSync('chart.txt', content);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    readCSV, search, transform, createGraph
};
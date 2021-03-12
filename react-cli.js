const fs = require('fs/promises');
const yargs = require('yargs');

const argv = yargs
  .option("folder", {alias: 'f', string: "true", description: 'Directoria'})
  .option("one", {alias: 'o', number: true, description:'one number'})
  .option("two",{alias: 't', number: true, description: "two number"})
  .option("multiply", {alias: 'ml', string: "true", description: "Multiply two numbers"})
  .command(['component <component>', 'c'], 'create react-component multiplication (example: node react-cli.js c Multiplication --ml=multiply -f=. -o=5 -t=10)',
  {}, (yargs) => {

    let Component = yargs.component[0].toUpperCase() + yargs.component.slice(1);

    fs.appendFile(`${yargs.folder ? yargs.folder : ""}/${Component}.js`,

    `import React from 'react';

    export const ${Component} = ()=> {
        return (
            <div>
            <h1>${yargs.multiply} two numbers:</h1>
            <p>${yargs.one} * ${yargs.two} = <strong>${yargs.one * yargs.two}</strong></p>
           
            </div>

        );
    }`)
    .then(() => console.log('Everything went well'))
    .catch(e => console.error('Problem:', e));
  })
  .argv;
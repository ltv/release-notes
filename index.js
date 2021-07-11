#!/usr/bin/env node

const yargs = require('yargs')
const changelog = require('./lib/changelog')
const writeFile = require('./lib/write-file')

const options = yargs
  .usage('Usage: -t <tag> -p [preset] -o [output]')
  .option('t', { alias: 'tag', describe: 'tag version', type: 'string', demandOption: true })
  .option('p', { alias: 'preset', describe: 'preset file', type: 'string' })
  .option('o', { alias: 'output', describe: 'output file', type: 'string' }).argv

// TODO: custom preset file
changelog(options).then((content) => {
  if (options.output) {
    writeFile(options.output, content.replace(/\n+$/, '\n'))
  } else {
    console.log(`\n---\n${content.trim()}\n---\n`)
  }
})

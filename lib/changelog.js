const conventionalChangelog = require('conventional-changelog')
const presetLoader = require('./preset-loader')

module.exports = (options = {}) =>
  new Promise((resolve, reject) => {
    const context = { version: options.tag }
    const changelogStream = conventionalChangelog(
      {
        preset: presetLoader({}),
        tagPrefix: 'v',
      },
      context,
      { merges: null }
    ).on('error', function (err) {
      return reject(err)
    })

    let content = ''

    changelogStream.on('data', function (buffer) {
      content += buffer.toString()
    })

    changelogStream.on('end', function () {
      resolve(content)
    })
  })

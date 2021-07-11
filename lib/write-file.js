const fs = require('fs')

module.exports = function (filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8')
}

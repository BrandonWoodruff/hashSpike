const mcupws = require('./mcupws.json')
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const fs = require('fs')

let pws = [
    _.sample(mcupws), // 'password'
    _.sample('ABCDEF'), // 'A'
    _.sampleSize('ABCDEF', 2).join('') // 'AB'
]

pws = _.shuffle(pws)

const content = pws
    .map(pw => bcrypt.hashSync(pw, 4))
    .join('\n')


fs.writeFileSync('test.hashes', content)



// console.log(content)

// ELEPHANT CODE GRAVEYARD
// const hashes = pws.map(pw => bcrypt.hashSync(pw, 4))
// for (let pw of pws) {
//     hashes.push(bcrypt.hashSync(pw, 4))
// }

// const content = hashes.join('\n')
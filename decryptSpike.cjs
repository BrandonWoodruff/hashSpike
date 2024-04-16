// console.log('decryptSpike.cjs')

const bcrypt = require('bcryptjs')
const fs = require('fs')
const mcupws = require('./mcupws.json')

const alphabet = 'ABCDEF' // 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function* pwsOfLenN(n) {
    if (n === 1) {
      yield* alphabet
      return
    }
    for (let ch1 of alphabet) {
      for (let ch2 of pwsOfLenN(n - 1)) {
        yield `${ch1}${ch2}`
      }
    }
  }
  
  function* pwsUpToLenN(n) {
    for (let i = 1; i <= n; i++) {
      yield* pwsOfLenN(i)
    }
  }
  
  function* allClearTextPws() {
    yield ''
    yield* mcupws.slice(0, 100)
    yield* pwsUpToLenN(1)
    yield* mcupws.slice(100, 900)
    yield* pwsUpToLenN(2)
    yield* mcupws.slice(900)
    yield* pwsUpToLenN(3)
  }


//load the hashes
const hashes = fs.readFileSync('test.hashes', 'utf8').split(/\r?\n/)
// console.log(hashes)

for (let hash of hashes) {
    for (let pw of allClearTextPws()) {
      if (bcrypt.compareSync(pw, hash)) {
        console.log('Match found:', pw, hash)
        fs.appendFileSync('cracked.hashes', `${hash} ${pw}\n`)
        break
    }
}
}
//for each pw
    //for each hash
        //compareSync()
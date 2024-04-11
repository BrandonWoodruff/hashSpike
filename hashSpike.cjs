const bcrypt = require('bcryptjs')
const samplePws = require('./mcupws.json')

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

samplePws.push('')
samplePws.push(...pwsUpToLenN(2))
// console.log([...pwsUpToLenN(2)])
console.log(samplePws.length) //13891


//TODO make simple sample test hashes file
//TODO crack all pws in sample
//TODO record all cracked pws

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

function main() {
  // for (let pw of pwsUpToLenN(0)) {
  //   console.log(pw)
  // }
  for (let pw of samplePws.slice(-3)) {
    
  }
}

// main()





// ELEPHANT CODE GRAVEYARD

// function* pwsOfLen1() {
//   yield* alphabet;
// }

// function* pwsUpToLen3() {
//   for (let i = 1; i <= 3; i++) {
//     yield* pwsOfLenN(i);
//   }
// }


// function* pwsOfLen2() {
//   for (let ch1 of alphabet) {
//     for (let ch2 of alphabet) {
//       yield `${ch1}${ch2}`;
//     }
//   }
// }

// function* pwsOfLen3() {
//   for (let ch1 of alphabet) {
//     for (let ch2 of pwsOfLen2()) {
//       yield `${ch1}${ch2}`;
//     }
//   }
// }

// //encrypt monkeybutt
// const hash = bcrypt.hashSync('bacon', 8)

// //compare a hash against the hash for monkeybutt
// for (let i = 0; i < 25; i++) {
//   const hash = bcrypt.hashSync('bacon', 4)
//   console.log(hash)

// }

// // console.log(hash)

// console.log(bcrypt.compareSync('bacon', hash)) // true

// console.log(bcrypt.compareSync('monkeybutt', hash)) // false
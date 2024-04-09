const bcrypt = require('bcryptjs')

//encrypt monkeybutt
const hash = bcrypt.hashSync('bacon', 8)

//compare a hash against the hash for monkeybutt
for (let i = 0; i < 25; i++) {
  const hash = bcrypt.hashSync('bacon', 4)
  console.log(hash)

}

// console.log(hash)

// console.log(bcrypt.compareSync('bacon', hash)) // true

// console.log(bcrypt.compareSync('monkeybutt', hash)) // false
const bcrypt = require('bcryptjs')
const fs = require('fs')
const mcupws = require('./mcupws.json')
const _ = require('lodash')
var ProgressBar = require('progress')
let hashes = fs.readFileSync('hashes.txt', 'utf8').split(/\r?\n/)

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

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

function main() {
    hashes = _.takeRight(hashes, 50_000)
    const bar = new ProgressBar('[:bar] :percent :etas', { total: hashes.length })
    var timer = setInterval(function () {
        bar.tick()
        if (bar.complete) {
            clearInterval(timer)
        }
    }, 100)

    console.time('Cracking hashes')
    for (let hash of hashes) {
        for (let pw of allClearTextPws()) {
            if (bcrypt.compareSync(pw, hash)) {
                // console.log('Match found:', pw, hash)
                if (pw === '') {
                    fs.appendFileSync('hashes.answers.txt', `${hash} ${' '}\n`)
                    break
                }
                fs.appendFileSync('hashes.answers.txt', `${hash} ${pw}\n`)
                break
                
            }
        }
    }
    console.timeEnd('Cracking hashes')
}

main()

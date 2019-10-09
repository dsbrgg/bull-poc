'use strict'

module.exports = async function(job) {
  console.log('\n-------------\n')
  console.log('Id:', job.id)
  console.log('Attempt:', job.attemptsMade)
  console.log('Stacktrace:', job.stacktrace)
  console.log('\n-------------\n')

  switch(job.attemptsMade) {
    case 0: throw new Error('first attempt')
    case 1: throw new Error('second attempt')
    case 2: throw new Error('third attempt')
    default: return Promise.resolve('Hello')
  }
}

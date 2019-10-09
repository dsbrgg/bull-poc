'use strict'

// Main site: https://optimalbits.github.io/bull/
// Reference: https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md
// Patterns: https://github.com/OptimalBits/bull/blob/develop/PATTERNS.md

const Queue = require('bull', 'redis://127.0.0.1:6379')

const hooks = new Queue('Webhooks', {
  settings: {
    backoffStrategies: {
      test: function(attemptsMade, err) {
        // The function returns either the time to delay the retry with
        // 0 to retry immediately
        // -1 to fail the job immediately.
        switch(attemptsMade) {
          case 0: return 5000
          case 1: return 15000
          case 2: return 40000
          default: 0
        }
      }
    }
  }
})

hooks.process(`${__dirname}/processor.js`)

hooks.on('progress', function(job, progress) {
  console.log(`Job ${job.id} is ${progress * 100}% ready!`)
})

hooks.on('completed', function(job) {
  // job.returnvalue to get response
  console.log(`Job ${job.id} completed!`)
})

hooks.add({
  test: 'World'
}, {
  attempts: 4,
  backoff: { type: 'test' }
})

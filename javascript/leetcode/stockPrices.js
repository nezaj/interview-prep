const assert = require('assert')

const maxProfit = (prices) => {
  if (prices.length < 2) { return 0 }

  let maxProfit = 0
  let buyPrice = prices[0]
  prices.slice(1).forEach(price => {
    maxProfit = Math.max(price - buyPrice, maxProfit)
    buyPrice = Math.min(price, buyPrice)
  })

  return maxProfit
}

const maxProfit2nd = (prices) => {
  if (prices.length < 2) { return 0 }

  let maxProfit = 0
  let secondProfit = 0
  let temp
  let buyPrice = prices[0]
  prices.slice(1).forEach(price => {
    temp = maxProfit
    maxProfit = Math.max(price - buyPrice, maxProfit)
    secondProfit = maxProfit !== temp
      ? temp
      : Math.max(price - buyPrice, secondProfit)
    buyPrice = Math.min(price, buyPrice)
  })

  return maxProfit + secondProfit
}

const prices = [10, 20, 30, 40, 0, 60]
assert.deepEqual(maxProfit(prices), 60)

assert.deepEqual(maxProfit2nd(prices), 90)

console.log('All tests pass!')

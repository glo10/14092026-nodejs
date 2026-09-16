export const sum = (...args) => {
  let sum = 0
  args.forEach(nb => sum += nb)
  return sum
}

export const divide = (nb1, nb2) => {
  if(nb2 == '0') throw new Error('Divide by 0 impossible')
  return nb1/nb2
}
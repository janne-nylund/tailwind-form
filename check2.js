const reverseLoop = str => {
  let newStr = ''
  for (let i = str.length - 1; i >= 0; i--) {
    newStr += str[i]
  }
  return newStr
}

const recursiveReverse = str => {
  return str ? str[str.length -1] + recursiveReverse(str.slice(0,-1)) : ''
}

const recursiveCountdown = num => (
  num ? (console.log(num), recursiveCountdown(num-1)) : null
)

const checkPalindrome = (str, isPalindrome = true) => {
  for (let i = 0; i < str.length / 2; i++) {
    isPalindrome = str[i] === str[str.length - 1 - i]
  }
  return isPalindrome ? `"${str}" is a palindrome` : `${str} is not a palindrome`
}

console.log(reverseLoop('4321'))
console.log(recursiveReverse('4321'))
recursiveCountdown(7)
console.log(checkPalindrome('noolaviajaivaloon'))


const recursiveReverse2 = str => {
  return str ? str[str.length - 1] + recursiveReverse2(str.slice(0,-1)) : ''
}

console.log(recursiveReverse2('1234'))















/* const reverseLoop = str => {
  let newStr = ''
  for (let i = str.length - 1; i >= 0; i--) {
    newStr += str[i]
  }
  return newStr
}

const recursiveReverse = str => {
  return str ? str[str.length - 1] + recursiveReverse(str.slice(0, -1)) : ''
}

const recursiveCountdown = num => (
  num ? (console.log(num), recursiveCountdown(num - 1)) : null
)
 */







/* const reverseLoop = str => {
  let newStr = ''
  for (let i = str.length - 1; i >= 0; i--) {
    newStr += str[i]
  }
  return newStr
}
const recursiveReverse = str => {
  return str ? str[str.length - 1] + recursiveReverse(str.slice(0, -1)) : ''
}

const recursiveCountdown = num => (
  num ? (console.log(num), recursiveCountdown(num - 1)) : null
) */


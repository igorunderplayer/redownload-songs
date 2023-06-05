/**
 * @author 5antos#4876
 * https://github.com/5antos/JS-Randomness
 * @param {any[]} array Array to be chunked
 * @param {number} count Length of each chunk
 * @returns {any[][]} Chunked array
 */

export default function chunkArray(array, count) {
  const newArr = []
  for (var i = 0; i < array.length; i+=count)
    newArr[i/count] = array.slice(i, i+count)
  return newArr
}
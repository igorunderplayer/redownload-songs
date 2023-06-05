import jsmediatags from 'jsmediatags'

export default function readMediaTags(location) {
  return new Promise((resolve, reject) => {
    jsmediatags.read(location, {
      onSuccess: resolve,
      onError: reject
    })
  })
}
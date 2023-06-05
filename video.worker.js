import { workerData, parentPort } from 'worker_threads'
import { join } from 'path'

import yts from 'yt-search'

import download from './download.js'
import readMediaTags from './util/jsmediatags.js'

const files = workerData.files

for await (const file of files) {

  const data = await readMediaTags(
    join('musics', file)
  )

  let searchTerm = file


  if (data.tags.title) {
    searchTerm = `${data.tags.artist} - ${data.tags.title}`
  }

  console.log(searchTerm)

  const [video] = (await yts(searchTerm.trim())).videos

  await download(video)
}

parentPort.postMessage('done')
import { Worker } from 'worker_threads'
import { readdir } from 'fs/promises'
import { cpus } from 'os'

import chunkArray from './util/chunkArray.js'

const files = await readdir('musics')

const THREAD_COUNT = cpus().length * 2

const chunkedArray = chunkArray(files, Math.ceil(files.length / THREAD_COUNT))

for (const chunk of chunkedArray) {
  const worker = new Worker('./video.worker.js', {
    workerData: {
      files: chunk
    }
  })

  worker.on('message', (m) => {
    if (m == 'done') {
      worker.terminate()
    }
  })

  worker.on('exit', () => {
    console.log('worker exited')
    worker.removeAllListeners()
  })
}


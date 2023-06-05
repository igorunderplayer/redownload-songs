import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg'
import ffmpeg from 'fluent-ffmpeg'
import ytdl from 'ytdl-core'

ffmpeg.setFfmpegPath(ffmpegPath)

export default function download (video) {
  return new Promise((resolve, reject) => {

    const title = video.title
                  .replace(/\W/g, '_')
                  .replace(' ', '_')

    const stream = ytdl(video.url, {
      quality: 'highestaudio'
    })

    ffmpeg(stream)
      .toFormat('mp3')
      .saveToFile(
        `output/${title}.mp3`
        )
      .on('error', reject)
      .on('end', resolve)
  })
}
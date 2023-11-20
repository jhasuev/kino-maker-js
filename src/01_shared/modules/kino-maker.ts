interface IParams {
  container: string
  url: string
  onupdate: Function|null
}
interface IStatus {
  currentTime: number
  percent: number
  duration: number
}
interface IAnimateItem {
  showAt: number
  hideAt: number
  block: any
}

export default class KinoMaker {
  params: IParams
  videoTag: HTMLVideoElement = document.createElement('video')
  status: IStatus
  animates: IAnimateItem[]

  constructor(params: IParams, animates: IAnimateItem[] = []) {
    this.params = params
    this.status = { currentTime: 0, percent: 0, duration: 0 }
    this.animates = animates.reduce(
      (acc: IAnimateItem[], item: IAnimateItem, i: number) =>
      {
        return [...acc, { ...item, id: i + 1 }]
      },
      []
    )
  }

  init() {
    const videoContainer = document.querySelector(this.params.container) as HTMLDivElement
    this.videoTag = document.createElement('video') as HTMLVideoElement

    this.videoTag.addEventListener("timeupdate", () => {
      this.updateStatus()
      this.updateContent()
    })

    
    this.videoTag.setAttribute('src', this.params.url)
    this.videoTag.setAttribute('style', `width: 100%`)
    videoContainer.appendChild(this.videoTag)
  }

  updateStatus() {
    this.status.currentTime = this.videoTag.currentTime
    this.status.duration = this.videoTag.duration
    this.status.percent = this.status.currentTime / this.status.duration * 100

    this.params.onupdate?.(this.status)
  }

  updateContent() {
    const animatesForShowing = this.animates.filter((animate: IAnimateItem) => {
      return this.status.currentTime >= animate.showAt && this.status.currentTime <= animate.hideAt
    })
  }

  start() {
    this.videoTag.play?.()
  }

  stop() {
    this.videoTag.pause?.()
  }

  unmount() {
    this.videoTag.play?.()
  }
}
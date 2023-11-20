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
interface IAnimateItemParams {
  x: number
  y: number
}
interface IAnimateItem {
  id?: number
  showAt: number
  hideAt: number
  block: any
  params: IAnimateItemParams
}

export default class KinoMaker {
  params: IParams
  kinoMakerContainer: HTMLDivElement = document.createElement('div')
  videoTag: HTMLVideoElement = document.createElement('video')
  animationsTag: HTMLDivElement = document.createElement('div')
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
    this.kinoMakerContainer = document.querySelector(this.params.container) as HTMLDivElement
    this.videoTag = document.createElement('video') as HTMLVideoElement

    this.videoTag.addEventListener("timeupdate", () => {
      this.updateStatus()
      this.updateContent()
    })

    this.videoTag.setAttribute('src', this.params.url)
    this.videoTag.setAttribute('style', `width: 100%`)
    this.kinoMakerContainer.appendChild(this.videoTag)
    
    this.initAnimations()
  }

  initAnimations() {
    this.animationsTag = document.createElement('div')
    
    this.animationsTag.classList.add('kino-marker')
    this.animationsTag.innerHTML = `
      ${ this.getAnimationsLayout() }
      <style>
        ${ this.getAnimationsStyles() }
      </style>
    `

    this.kinoMakerContainer.append(this.animationsTag)
  }

  getAnimationsLayout(): string {
    const animationsHtml = this.animates.reduce(
      (acc: string, item: IAnimateItem) => (
        acc + `
          <div
            id="kino-marker-id-${ item.id }"
            class="kino-marker-item"
            style="right: ${ item.params.x }%; bottom: ${ item.params.y }%; transform(-100%,-100%)"
          >${ item.block }</div>
        `
      ),
      ''
    )

    return animationsHtml
  }

  getAnimationsStyles(): string {
    return `
      ${ this.params.container } {
        position: relative;
      }
      .kino-marker-item {
        position: absolute;

        overflow: hidden;
        opacity: 0;
        transition: .3s;
      }

      .kino-marker-item.show {
        overflow: visibility;
        opacity: 1;
      }
    `
  }

  updateStatus() {
    this.status.currentTime = this.videoTag.currentTime
    this.status.duration = this.videoTag.duration
    this.status.percent = this.status.currentTime / this.status.duration * 100

    this.params.onupdate?.(this.status)
  }

  updateContent() {
    this.animates.forEach((item: IAnimateItem) => {
      const isShowing = this.status.currentTime >= item.showAt && this.status.currentTime <= item.hideAt

      this.animationsTag.querySelector(`#kino-marker-id-${ item.id }`)
        ?.classList[isShowing ? 'add':'remove']('show')
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
const $  = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|CriOS/i.test(navigator.userAgent)

function rescale (x, from, to) {

  const t = (x - from[0]) / (from[1] - from[0]);
  return to[0] + ((to[1] - to[0]) * t);
}

// плавная прокрутка

function scrollTo(hash) {

    const target = document.querySelector(hash)
    
    target.scrollIntoView({
        
        behavior: 'smooth',
        block: 'start'
    })
}


document.addEventListener ('DOMContentLoaded', () => {          // код выполняющийся после загрузки DOM-дерева (содержимого document.body)

    for (const link of document.querySelectorAll ('.link')) {   // для каждого элемента с селектором .link

        link.addEventListener ('click', x => {

            const href = link.getAttribute('href')              // <a href="/#services"> → /#services
            const hash = href.replace('/', '')                  // /#services → #services

            if (document.querySelector(hash)) {                 // есть ли на странице элемент отзывающийся на селектор #services
                history.pushState(null, null, hash)             // заменяем в адресной строке адрес на /#services (но так, чтобы страница не прыгала к этому элементу)
                scrollTo(hash)                                  // плавно прокручиваем страницу к #services
                x.preventDefault()                              // предотвращаем дефолтное поведение клика на ссылку (чтобы страница не прыгала к #services)
            }
        })
    }
})

// выделяет объекты <iframe> и отменяет им цветовой фильтр.

document.addEventListener ('DOMContentLoaded', () => {

    let currentActiveElement

    setInterval (function () {
        if (document.activeElement !== currentActiveElement) {

            currentActiveElement = document.activeElement

            if (currentActiveElement.tagName === 'IFRAME') {

                currentActiveElement.style.filter = 'none';
            }
        } 
    }, 100)

    // то же самое для <video>

    for (const v of $$('video')) {
        v.onplay = function () {
            if (v.classList.contains ('not-played')) {
                v.classList.remove ('not-played')
                v.pause ()
                v.currentTime = 0
                v.play ()
            }
            v.style.filter = 'none'
        }
        if (isMobile) {
            v.currentTime = 0
            v.controls = true
        } else {
            v.onclick = function () {
                if (v.paused) {
                    v.play ()
                    v.controls = true
                } else {
                    v.pause ()
                    v.controls = false
                }
            }
        }
    }

})


document.addEventListener ('DOMContentLoaded', () => {

    if (isMobile) {

        document.body.classList.add ('mobile')

        document.addEventListener ('scroll', () => {

            const images = document.querySelectorAll ('.parallax .pic')

            for (const image of images) {

                const clientRect = image.getBoundingClientRect()       // возвращает размер элемента и его позицию относительно окна.


                const pageTop    = clientRect.top + window.scrollY

                image.style.backgroundPosition = 'center ' + (window.scrollY - pageTop) + 'px'
            }
        })
    }

})

// анимации

document.addEventListener ('DOMContentLoaded', () => {

    const { sin, floor, pow, random } = Math
    
    const N = 35
    const stars = $('.logo .stars')

    const speeds = []

    for (let i = 0; i < N; i++) {

      const el = document.createElement ('DIV')
      el.classList.add ('star')
      stars.appendChild (el)
      
      const speed = rescale (pow (i / N, 5), [0, 1], [0.25, 1])  // переводит в нужный диапазон
      
      speeds.push (speed)

      const duration = (1 / pow (speed, 2)) * 0.5

      el.style.backgroundColor   = 'rgba(216,216,216,' + rescale (speed, [0, 1], [0.25, 1]).toFixed (2) + ')'
      el.style.animationDuration = duration.toFixed (2) + 's'
      el.style.height            = (3 + pow (speed * 2.5, 4)).toFixed (0) + 'px'
      el.style.animationDelay    = (random () * duration).toFixed (2) + 's'

      function restartAnimation () {

          el.style.animationName = 'none'

          el.style.left = (random () * window.innerWidth).toFixed (0) + 'px'

          setTimeout (() => { el.style.animationName = '' }, 0)   // оттяжечка по времени сделана для того, чтобы это не происходило одновременно (в одну итерацию event-loop)
      }

      el.addEventListener ('animationend', restartAnimation)

      restartAnimation ()
    }

    console.log (speeds)

    document.addEventListener ('scroll', () => {

        stars.style.display = (window.scrollY > window.innerHeight) ? 'none' : ''
    })
})
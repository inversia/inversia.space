const { keys, values, entries, assign } = Object

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


// детекция поддержки свойства в браузере

document.addEventListener ('DOMContentLoaded', () => {  
    
    const CSS_supports = (...args) => (window.CSS && CSS.supports) ? CSS.supports (...args) : false

//         const CSS_supports = (...args) => false

        if (CSS_supports ('mix-blend-mode: screen')) {

            for (const parent of $$('.color-glitch')) {

                const el = document.createElement ('DIV')
                parent.appendChild(el)
                el.innerText = parent.innerText

                const el2 = document.createElement ('DIV')
                el.appendChild(el2)
                el2.innerText = el.innerText
            }
        } else {

//             for (const parent of $$('.color-glitch')) {
//                 parent.style.background = 'linear-gradient(#FF9800,salmon)'
//                 parent.backgroundClip = 'text'
//                 parent.style.color = 'transparent'
//             }
        }
})


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

// .video-container stuff

document.addEventListener ('DOMContentLoaded', () => {

    for (const v of $$('video')) {
        
        v.onplay = () => {
            v.parentNode.classList.add ('played')
            v.style.filter = 'none'
        }

        v.onclick = v.ontouchstart = () => {
            if (v.paused) {
                v.play ()
                v.controls = true
            } else {
                v.pause ()
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

    document.addEventListener ('scroll', () => {

        stars.style.display = (window.scrollY > window.innerHeight) ? 'none' : ''
    })
})


// цветовой глитч

// function createGlitch (innerTextElement){

//     const el = document.createElement ('DIV')
//     el.innerText = innerTextElement.innerText
//     el.classList.add = 'colorGlitch'
//     el.style.position = 'absolute'
//     el.style.mixBlendMode = 'screen'
//     el.style.left = '2px'
//     el.style.top = '-2px'
//     innerTextElement.appendChild(el)
// }

document.addEventListener ('DOMContentLoaded', () => {

//     for (const parent of $$('.color-glitch')) {            ДУБЛИРУЕТСЯ КОД
        
//         const el = document.createElement ('DIV')
//         parent.appendChild(el)
//         el.innerText = parent.innerText

//         const el2 = document.createElement ('DIV')
//         el.appendChild(el2)
//         el2.innerText = el.innerText
//     }

//     for (const glitch of document.querySelectorAll ('.colorGlitch')) {
//         glitch.style.mixBlendMode = 'screen'
//     }

}) 

// const headings = $$('h1')

window.addEventListener ('scroll', () => {

    for(const h of $$('h2')){

        const bottom = h.nextElementSibling.getBoundingClientRect().y
        const top    = bottom - h.offsetHeight
        
        h.classList.toggle ('visible', (bottom > 0) && (top < window.innerHeight))
    }
})
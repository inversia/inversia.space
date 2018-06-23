




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

let currentActiveElement

setInterval (function () {
    if (document.activeElement !== currentActiveElement) {

        currentActiveElement = document.activeElement

        if (currentActiveElement.tagName === 'IFRAME') {

            currentActiveElement.style.filter = 'none';
        }
    }
}, 100)

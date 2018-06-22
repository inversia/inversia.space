




// плавная прокрутка

function scrollTo(hash) {

    const target = document.querySelector(hash)
    
    target.scrollIntoView({
        
        behavior: 'smooth',
        block: 'start'
    })
}
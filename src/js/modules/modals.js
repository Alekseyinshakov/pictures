const modals = () => {
  let isClicked = false;

  function modal(trigger, mod, modClose, destroy = false, byScroll = false) {
    const triggerBtn = document.querySelectorAll(trigger);
    const modalWindow = document.querySelector(mod);
    const closeBtns = document.querySelectorAll(modClose)
    const allModals = document.querySelectorAll('[data-modal]')

    modalWindow.classList.add('animated', 'fadeIn')

    triggerBtn.forEach(elem => {
      elem.addEventListener('click', (e) => {
        e.preventDefault()
        allModals.forEach(item => item.style.display = 'none')
        isClicked = true;
        openModal()
        
      })
    })



    modalWindow.addEventListener('click', (e) => {
      if (e.target === modalWindow) {
        closeModal();
        allModals.forEach(item => item.style.display = 'none')
      }
    })

    closeBtns.forEach(elem => {
      elem.addEventListener('click', () => {
        closeModal()
        allModals.forEach(item => item.style.display = 'none')
      })
    })

    function openModal() {
      document.body.style.paddingRight = `${calcScroll()+1}px`
      if(document.querySelector('.fixed-gift')) {
        document.querySelector('.fixed-gift').style.marginRight = `${calcScroll()+0.5}px`
      }
      modalWindow.style.display = 'block';
      document.body.classList.add('modal-open');
      if (destroy) {
        triggerBtn.forEach(item => item.remove())
      }

    };

    function closeModal() {
      modalWindow.style.display = '';
      document.body.classList.remove('modal-open');
      document.body.style.paddingRight = 0;
      if(document.querySelector('.fixed-gift')) {
        document.querySelector('.fixed-gift').style.marginRight = 0;
      }
      
    };

    if (byScroll) {

      window.addEventListener('scroll', showModalByScroll)

      function showModalByScroll() {
        if (isClicked === false) {
          console.log(111);
          if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            removeEventListener('scroll', showModalByScroll)
          }
        }

      }
    }
  }

  function showModalByTime(selector, time) {
    setTimeout(() => {
      let display;

      document.querySelectorAll('[data-modal]').forEach(item => {
        if (getComputedStyle(item).display !== 'none') {
          display = 'block';
        }
      })

      if (!display) {
        document.querySelector(selector).style.display = 'block';
        document.body.classList.add('modal-open');
        document.body.style.paddingRight = `${calcScroll()}px`
      }
    }, time);
  }

  function calcScroll() {
    let div = document.createElement('div');
    div.style.width = '50px';
    div.style.height = '50%';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
  }







  modal('.button-design', '.popup-design', '.popup-close');
  modal('.button-consultation', '.popup-consultation', '.popup-close')
  modal('.fixed-gift', '.popup-gift', '.popup-close', true, true)
  // showModalByTime('.popup-consultation', 5000) 

}

export default modals;
// Выполнять следующее, когда загрузится сайт
window.addEventListener('DOMContentLoaded',function(){

  // Открыть оставшиеся карточки в секции События
  document.querySelector('#events__buttom').addEventListener('click', function(){
    document.querySelector('#events__buttom').classList.add('buttom--none')
    document.querySelectorAll('.box-event').forEach(function(ev){
      setTimeout(function(){
        ev.classList.add('box-event--open')
      }, 500)     
      setTimeout(function(){
        ev.classList.add('box-event--effect')
      }, 600)
    })
  });

  // Раскрытие бургера
  document.querySelector('.burger').addEventListener('click', function(){
    document.querySelector('.body').classList.toggle('stop')
    document.querySelector('.burger').classList.toggle('burger--x')
    document.querySelector('.header__navigation').classList.toggle('header__navigation--open')
    document.querySelectorAll('.nav__href').forEach(function(navBtn){
      navBtn.addEventListener('click', function(){
        document.querySelector('.body').classList.remove('stop')
        document.querySelector('.header__navigation').classList.remove('header__navigation--open')
        document.querySelector('.burger').classList.remove('burger--x')
      })
    })
  })

  // Раскрытие поиска
  function preventDef(event) {
    event.preventDefault();
  }

  function addHandler() {
    if (document.querySelector('#form-search').classList.contains('search-active')){
      document.getElementById("form-search").removeEventListener("submit",
      preventDef, false);
    } else {
      document.getElementById("form-search").addEventListener("submit", 
      preventDef, false);
    }
  };

  addHandler();

  document.querySelector('.search').addEventListener('click', function(){
    document.querySelector('.search').classList.add('search-active')
    document.querySelector('.header__container--down').classList.add('search-open')
    document.addEventListener('click', function(missClick){
      if (!missClick.target.classList.contains('search') &&
      !missClick.target.classList.contains('search__button') &&
      !missClick.target.classList.contains('search__input') &&
      !missClick.target.classList.contains('search__icon')){
        document.querySelector('.search').classList.remove('search-active')
        document.querySelector('.header__container--down').classList.remove('search-open')

      }
    })
  })


  // Открытие дропдаунов
  const buttonDrop = document.querySelectorAll('.down__href');

  buttonDrop.forEach(function (btn){
    btn.addEventListener('click', function(ev){
      if (ev.target.classList.contains('activ')) {
        ev.currentTarget.classList.remove('activ')
      } else {
        buttonDrop.forEach(function (btnDrop){
          btnDrop.classList.remove('activ')
          ev.target.classList.add('activ')
        })
      }
    })
  })

  document.addEventListener('click', function(missClick){
    if (!missClick.target.classList.contains('down__href') && !missClick.target.classList.contains('dropdown__box')){
      buttonDrop.forEach(function(ev){
        ev.classList.remove('activ')
      })
    }
  })

  // Переключение табов в секции каталог (страны)
  document.querySelectorAll('.countries__button').forEach(function(tabsBtn){
    tabsBtn.addEventListener('click', function(event){
      document.querySelectorAll('.countries__button').forEach(function(clickTabsbtn){
        clickTabsbtn.classList.remove('countries__button-active')
      })
      const path = event.currentTarget.dataset.path
      event.currentTarget.classList.toggle('countries__button-active')
      document.querySelectorAll('.tab').forEach(function (tabContent){
        tabContent.classList.remove('tab-content-active')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active')
    })
  })

  // Переключение художников в аккардионе
  document.querySelectorAll('.column__button').forEach(function(accBtn){
    accBtn.addEventListener('click', function(clickAccBtn){
      document.querySelectorAll('.tab-content-active .column__button').forEach(function(event2){
        event2.classList.remove('column__button-active')
      })
      clickAccBtn.currentTarget.classList.add('column__button-active')
      const path2 = clickAccBtn.currentTarget.dataset.path
      document.querySelectorAll('.tab-content-active .two-column__left').forEach(function(leftContent){
        leftContent.classList.remove('two-column__left-active')
      })
      document.querySelector(`[data-target="${path2}"]`).classList.add('two-column__left-active')
    })
  })
 
  // Появление модального окна в секции галерея
  document.querySelectorAll('.slider__box-img').forEach(function(imgBtn){
    imgBtn.addEventListener('click', function(imgBtnEvents){
      const path3 = imgBtnEvents.currentTarget.dataset.path
      document.querySelector(`[data-target="${path3}"]`).classList.add('po-pup--active')
      document.querySelector('.body').classList.add('stop')
      document.addEventListener('click', function(missDrop){
        if (missDrop.target.classList.contains('po-pup--active')){
          document.querySelector(`[data-target="${path3}"]`).classList.remove('po-pup--active')
          document.querySelector('.body').classList.remove('stop')
        }
      })
      document.querySelectorAll('.po-pup__btn').forEach(function(ppBtn){
        ppBtn.addEventListener('click', function(){
          document.querySelectorAll('.po-pup').forEach(function(poPup){
            poPup.classList.remove('po-pup--active')
            document.querySelector('.body').classList.remove('stop')
          })
        })
      })
    })
  })

  // Свайпер в издания
  const sliderEdition = document.querySelector('.swiper-container--edition');

  let swiperEdition;

  function editionSlider() {
    if (window.innerWidth >= 740 && sliderEdition.dataset.edition == "false") {
      swiperEdition = new Swiper(sliderEdition, {
        // containerModifierClass: 'swiper-container--edition',
        // wrapperClass: 'swiper-wraper--edition',
        // slideClass: 'swiper-slide--edition',
        speed: 400,
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 50,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        scrollbar: {
          el: '.swiper-scrollbar',
        },
        breakpoints: {
          300: {
            slidesPerView: 2,
            spaceBetween: 34
          },
          1005: {
            slidesPerView: 2,
            spaceBetween: 49
          },
          1611: {
            slidesPerView: 3,
            spaceBetween: 49
          }
        },
      });

      sliderEdition.dataset.edition = "true";
    }

    if (window.innerWidth <= 740) {
      sliderEdition.dataset.edition = "false";
      if (sliderEdition.classList.contains('swiper-container-initialized')) {
        swiperEdition.destroy();
      }
    }
  }

  editionSlider();

  window.addEventListener('resize', () => {
    editionSlider();
  })

  // свайпер в галлереи
  const newSwiper = new Swiper('.swiper-container--gallery', {

    speed: 400,
    slidesPerColumn: 1,
    slidesPerView: 1,
    spaceBetween: 34,

    navigation: {
      nextEl: '.swiper-button-next-gallery',
      prevEl: '.swiper-button-prev-gallery',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    
    breakpoints: {
      740: {
        slidesPerColumn: 2,
        slidesPerView: 2,
        spaceBetween: 34,
      },
      1005: {
        slidesPerColumn: 2,
        slidesPerView: 2,
        spaceBetween: 34,
      },
      1611: {
        slidesPerColumn: 2,
        slidesPerView: 3,
        spaceBetween: 49,
      }
    }
  });

  // мобильный свайпер в событиях

  const slider = document.querySelector('.swiper-container--events');

  let mySwiper;

  function mobileSlider() {
    if (window.innerWidth <= 740 && slider.dataset.mobile == "false") {
      mySwiper = new Swiper(slider, {
        containerModifierClass: 'swiper-container--events',
        wrapperClass: 'swiper-wraper--events',
        slideClass: 'swiper-slide--events',
        speed: 400,
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      });

      slider.dataset.mobile = "true";
    }

    if (window.innerWidth > 740) {
      slider.dataset.mobile = "false";
      if (slider.classList.contains('swiper-container--eventsinitialized')) {
        mySwiper.destroy();
      }
    }
  }

  mobileSlider();

  window.addEventListener('resize', () => {
    mobileSlider();
  })

  // свайпер в партнерах проеката
  const lastSwiper = new Swiper('.swiper-container--projects', {
    speed: 400,
    slidesPerView: 1,
    slidesPerColumn: 1,
    spaceBetween: 50,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.swiper-button-next-projects',
      prevEl: '.swiper-button-prev-projects',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    breakpoints: {
      740: {
        slidesPerView: 2,
        spaceBetween: 34
      },
      1005: {
        slidesPerView: 2,
        spaceBetween: 50
      },
      1611: {
        slidesPerView: 3,
        spaceBetween: 49
      }
    }
  });

  // Яндекс карты
  ymaps.ready(init);
  function init(){
    var myMap = new ymaps.Map('map', {
      zoom: 12,
      center: [59.93772, 30.313622],
      controls: []
    }),
    myPlacemark = new ymaps.Placemark([59.93772, 30.313622], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'icon/marker-map.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-10, -10],
    }),
    geolocationControl = new ymaps.control.GeolocationControl({
      options: {
        position: {
          right: '20px',
          top: '335px'
        }
      }
    }),
    zoomControl = new ymaps.control.ZoomControl({
      options: {
        size: "small",
        position: {
          left: 'auto',
          right: '20px',
          top: '265px'
        }
      }
    });
    myMap.geoObjects.add(myPlacemark);
    myMap.controls.add(geolocationControl);
    myMap.controls.add(zoomControl);
  }

  // Аккардион
  $( function() {
    $( ".accordion" ).accordion({
      icons: false,
      heightStyle: "content"
    });
  } );

  // Маска ввода телефона
  let selector = document.querySelectorAll('input[type="tel"]');
  let im = new Inputmask('+7 (999) 999-99-99');
  im.mask(selector);

  // валидация и отправка формы
  function thanksPopup() {
    document.querySelector('.thanks-popup').classList.add('thanks-popup--active');
    document.querySelector('.thanks-popup__btn').addEventListener('click', function(){
      document.querySelector('.thanks-popup').classList.remove('thanks-popup--active')
    })
  }

  let validateForms = function(selector, rules, messages, successModal, yaGoal) {
    new window.JustValidate(selector, {
      rules: rules,
      messages: messages,
      submitHandler: function(form) {
        let formData = new FormData(form);
  
        let xhr = new XMLHttpRequest();
  
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Отправлено');
              thanksPopup();
            }
          }
        }
  
        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);
  
        form.reset();
      }
    });
  }

  validateForms('.form', { name: {required: true}, tel: {required: true} }, { name: {required: 'Обязательное поле для заполнение'}, tel: {required: 'Обязательное поле для заполнение'} }, '.thanks-popup', 'send goal');


  // Селект
  const element = document.querySelector('.select');
  const choices = new Choices(element, {
      searchEnabled: false,
      itemSelectText: '',
      placeholder: false,
      searchPlaceholderValue: true,
      shouldSort: false
  });

  // Подключение тултипа
  tippy('.tooltip-1', {
    content: 'Пример современных тенденций - современная методология разработки',
    theme: 'tomato',
    maxWidth: 264,
  });
  tippy('.tooltip-2', {
    content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
    theme: 'tomato',
  });
  tippy('.tooltip-3', {
    content: 'В стремлении повысить качество',
    theme: 'tomato',
  });


  // мобильный спойлер
  document.querySelector('.checkbox__titl').addEventListener('click', function(){
    document.querySelector('.checkbox--mobile').classList.toggle('checkbox--mobile-open')
    document.querySelector('.checkbox--mobile').classList.toggle('checkbox--mobile-close')
  })

  document.querySelectorAll('.checkbox__input').forEach(function(evLabel){
    evLabel.addEventListener('change', function(evLabelClick){
      const path5 = evLabelClick.currentTarget.dataset.path
      document.querySelector(`[data-target="${path5}"]`).classList.toggle('checkbox-active')
    })
  })

  // мобильный скрол в каталоге
  document.querySelectorAll('.column__button').forEach(function(columnBtn){
    columnBtn.addEventListener('click', function(clickColumnBtn){
      if( window.innerWidth <= 768 ){
        const colBtn = clickColumnBtn.currentTarget.dataset.path
        document.querySelector(`[data-target="${colBtn}"]`).scrollIntoView(true)
      }
    })
  })

})

// Уже не помню, но что то важное
if (window.applyFocusVisiblePolyfill != null) {
  window.applyFocusVisiblePolyfill(myComponent.shadowRoot);
}
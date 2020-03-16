'use strict';
document.addEventListener("DOMContentLoaded", function() {
    //Lazy Load
    let lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy"
    });
    lazyLoadInstance.update();
    //Маска для телефона
    $('.custom-form-input.telephone').mask('+7(000)00-00-00');
    // Календарь
    const date = new Date(),
          year = date.getFullYear(),
          month = date.getMonth(),
          day = date.getDay();
    const picker = datepicker('.custom-form-input.date',{
        formatter: (input, date, instance) => {
            const value = date.toLocaleDateString();
            input.value = value // => '1/1/2099'
        },
        minDate: new Date(year , month, day),
        overlayButton: "Подтвердить",
        customDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июнь','Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    });
    if($('.youtube')){
        $('.youtube').each(function () {
            let youtube_url = $(this).attr('data-youtube');
            youtube_url = youtube_url.replace('https://www.youtube.com/watch?v=','');
            $(this).attr('data-youtube',youtube_url);
        });

    }
    //Video preview
    (function(){
        if (!document.getElementsByClassName) {
            // Поддержка IE8
            var getElementsByClassName = function(node, classname) {
                var a = [];
                var re = new RegExp('(^| )'+classname+'( |$)');
                var els = node.getElementsByTagName("*");
                for(var i=0,j=els.length; i < j; i++)
                    if(re.test(els[i].className))a.push(els[i]);
                return a;
            }
            var videos = getElementsByClassName(document.body,"youtube");
        } else {
            var videos = document.querySelectorAll(".youtube");
        }
        var nb_videos = videos.length;
        for (let i=0; i < nb_videos; i++) {
            // Находим постер для видео, зная ID нашего видео
            videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].dataset.youtube + '/sddefault.jpg)';
            // Размещаем над постером кнопку Play, чтобы создать эффект плеера
            var play = document.createElement("div");
            play.setAttribute("class","play");
            videos[i].appendChild(play);
            videos[i].onclick = function() {
                // Создаем iFrame и сразу начинаем проигрывать видео, т.е. атрибут autoplay у видео в значении 1
                var iframe = document.createElement("iframe");
                console.log(videos[i])
                var iframe_url = "https://www.youtube.com/embed/" + videos[i].dataset.youtube + "?autoplay=1&autohide=1";
                if (this.getAttribute("data-params")) iframe_url+='&'+this.getAttribute("data-params");
                iframe.setAttribute("src",iframe_url);
                iframe.setAttribute("frameborder",'0');
                // Высота и ширина iFrame будет как у элемента-родителя
                iframe.style.width  = this.style.width;
                iframe.style.height = this.style.height;
                // Заменяем начальное изображение (постер) на iFrame
                this.parentNode.replaceChild(iframe, this);
            }
        }
    })();
    //Слайдер специалистов
    $('.doctors-slider').slick({
        lazyLoad: 'progressive',
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: '<span class="fas fa-chevron-left slider-btn slider-btn-left"></span>',
        nextArrow: '<span class="fas fa-chevron-right slider-btn  slider-btn-right"></span>'
    });
    // Слайдер сертификатов
    $('.certificates-slider').slick({
        lazyLoad: 'progressive',
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: '<span class="fas fa-chevron-left slider-btn slider-btn-left"></span>',
        nextArrow: '<span class="fas fa-chevron-right slider-btn  slider-btn-right"></span>'
    });
    //Open menu
    $('.toggle-menu').on('click',function(){
        $('.toggle-menu').toggleClass('active');
        $('.header-nav').toggleClass('active');
    });
    //Обвертка меню другим родителем
    const submenu = $('.nav-menu-item .submenu');
    if(submenu){
        submenu.wrap('<div class="submenu-container"></div>');
        $('.submenu').before('<span class="fas fa-angle-left back-to-menu"><span>Вернуться</span></span>');
        const fragmentOpenSubmenu = document.createDocumentFragment();
        const openSubmenu = document.createElement('span');
        openSubmenu.classList.add('fas');
        openSubmenu.classList.add('fa-chevron-right');
        openSubmenu.classList.add('open-submenu');
        fragmentOpenSubmenu.append(openSubmenu);
        submenu.parent().parent().append(fragmentOpenSubmenu);
    }
    // Отображение подменю
    const oldTitle = $('.header-nav-title').text();
    if($('.open-submenu')){
        $('.open-submenu').click(function () {
            $('.header-nav').addClass('active-submenu');
            let currentTitle = $(this).siblings('a').text();
            $('.header-nav-title').text(currentTitle);
            $(this).siblings('.submenu-container').fadeIn('slow');
        })
    }
    // Закрыть подменю
    if($('.back-to-menu')){
        $('.back-to-menu').click(function () {
            $('.header-nav').removeClass('active-submenu');
            $(this).parent().fadeOut('slow');
            $('.header-nav-title').text(oldTitle);
        })
    }
    //Переключатель времени
    const formDateInput = $('#form-date-time');
    formDateInput.attr('data-hour','0').attr('data-minute','00');
    let dateHour = formDateInput.attr('data-hour');
    let dateMinute = formDateInput.attr('data-minute');
    const maxHour = 24;
    const minHour = 0;
    let currentTime;
    const changeTime = (newTime) =>{
        currentTime = (newTime<10)?`0${dateHour}:${dateMinute}`:`${newTime}:${dateMinute}`;
        formDateInput.val(currentTime);
    };
    $('.time-right').click(function () {
        if(dateHour < maxHour){
            dateHour++;
            changeTime(dateHour);
        }
    });
    $('.time-left').click(function () {
       if(dateHour>0){
           dateHour--;
           changeTime(dateHour);
       }
    });
});


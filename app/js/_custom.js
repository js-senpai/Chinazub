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
        minDate: new Date(year , month, day)
    });
    //Video preview
    function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}
    r(function(){
        if (!document.getElementsByClassName) {
            // Поддержка IE8
            const getElementsByClassName = function (node, classname) {
                const a = [];
                let re = new RegExp('(^| )' + classname + '( |$)');
                const els = node.getElementsByTagName("*");
                let i = 0, j = els.length;
                for (; i < j; i++)
                    if (re.test(els[i].className)) a.push(els[i]);
                return a;
            };
            var videos = getElementsByClassName(document.body,"youtube");
        } else {
            var videos = document.getElementsByClassName("youtube");
        }
        let nb_videos = videos.length;
        for (var i=0; i < nb_videos; i++) {
            // Находим постер для видео, зная ID нашего видео
            videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].id + '/sddefault.jpg)';
            // Размещаем над постером кнопку Play, чтобы создать эффект плеера
            const play = document.createElement("div");
            play.setAttribute("class","play");
            videos[i].appendChild(play);
            videos[i].onclick = function() {
                // Создаем iFrame и сразу начинаем проигрывать видео, т.е. атрибут autoplay у видео в значении 1
                const iframe = document.createElement("iframe");
                let youtube_url = this.dataset.youtube;
                youtube_url = youtube_url.replace('https://www.youtube.com/watch?v=','');
                let iframe_url = "https://www.youtube.com/embed/" + youtube_url + "?autoplay=1&autohide=1";
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
    });
    //Слайдер специалистов
    $('.doctors-slider,.certificates-slider').slick({
        lazyLoad: 'progressive',
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4
    });
    // Слайдер сертификатов
    $('.certificates-slider').slick({
        lazyLoad: 'progressive',
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4
    })
});


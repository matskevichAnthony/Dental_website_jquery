// Импорт данных

import testimonials from "./data/testimonials.js";
import services from "./data/services.js";
import questions from "./data/questions.js";

// Функция помогает дождаться загрузки DOM и затем выполняет написанный код.

$(document).ready(() => {
    //Отрисовка Testimonials section

    const testimonialsData = testimonials();
    let sliderContent = $(".slide-group");
    let sliderNav = $(".slide-nav ul");

    for (let i = 0; i <= testimonialsData.length - 1; i++) {
        console.log(testimonialsData[i].photo);
        sliderContent.append(
            `<li class="section_testimonials slide"> 
        <div class="section_testimonials photo_name_wrapper">
        <div class="section_testimonials photo" style="background-image:url(${testimonialsData[i].photo})"></div> 
        <div class="section_testimonials testimonial_name">${testimonialsData[i].name}</div>
        </div>${testimonialsData[i].comment}
            </li>`
        );
        sliderNav.append(`<li class="bullet"></li>`);
    }

    // Слайдер testimonials

    let $slide = $(".slide"),
        $slideGroup = $(".slide-group"),
        $bullet = $(".bullet");

    let slidesTotal = $slide.length - 1,
        current = 0,
        isAutoSliding = true;

    $bullet.first().addClass("current");

    let clickSlide = function () {
        //stop auto sliding
        window.clearInterval(autoSlide);
        isAutoSliding = false;

        let slideIndex = $bullet.index($(this));

        updateIndex(slideIndex);
    };

    let updateIndex = function (currentSlide) {
        if (isAutoSliding) {
            if (current === slidesTotal) {
                current = 0;
            } else {
                current++;
            }
        } else {
            current = currentSlide;
        }

        $bullet.removeClass("current");
        $bullet.eq(current).addClass("current");

        transition(current);
    };

    let transition = function (slidePosition) {
        $slideGroup.animate({
            top: "-" + slidePosition + "00%",
        });
    };

    $bullet.on("click", clickSlide);

    let autoSlide = window.setInterval(updateIndex, 2000);

    // Отрисовка services section

    let serviceData = services();
    let serviceButton = $("#next_services");
    let counter = 0;
    // переключение к следующй услуге (service)
    serviceButton.click(function () {
        let description = $("#services_description");
        let title = $("#services_title");
        if (counter === serviceData.length - 1) {
            counter = 0;
        }
        counter++;
        description.text(`${serviceData[counter].description}`);
        title.text(`${serviceData[counter].service}`);
    });

    // Отрисовка Questions section

    let questionChildren = $("#qa");

    let dataQuestions = questions();

    for (let i = 0; i <= dataQuestions.length - 1; i++) {
        questionChildren.append(`<div class="div card">
        <div class="div card_upper">
          <p class="p card_question">${dataQuestions[i].question}</p>
        </div>
        <div class="div card_lower">
          <p class="p card_answer">${dataQuestions[i].answer}</p>
        </div>`);
    }

    // Typewriter section

    typing(0, $(".typewriter-text").data("text"));

    function typing(index, text) {
        let textIndex = 1;

        let tmp = setInterval(function () {
            if (textIndex < text[index].length + 1) {
                $(".typewriter-text").text(text[index].substr(0, textIndex));
                textIndex++;
            } else {
                setTimeout(function () {
                    deleting(index, text);
                }, 2000);
                clearInterval(tmp);
            }
        }, 150);
    }

    function deleting(index, text) {
        let textIndex = text[index].length;

        let tmp = setInterval(function () {
            if (textIndex + 1 > 0) {
                $(".typewriter-text").text(text[index].substr(0, textIndex));
                textIndex--;
            } else {
                index++;
                if (index == text.length) {
                    index = 0;
                }
                typing(index, text);
                clearInterval(tmp);
            }
        }, 150);
    }

    // Google Map API

    function initMap() {
        let map;
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 51.65464043766078, lng: 39.18773929988301 },
            fullscreenControl: false,
            disableDefaultUI: true,
            mapId: "dd081edb5f80f8b1",
            zoom: 15,
        });

        const beachMarker = new google.maps.Marker({
            position: { lat: 51.65464043766078, lng: 39.18773929988301 },
            map,
        });
    }

    // Модальное окно

    let p = $(".popup__overlay");
    $("#popup__toggle").click(function () {
        p.css("display", "block");
    });
    p.click(function (event) {
        e = event || window.event;
        if (e.target == this) {
            $(p).css("display", "none");
        }
    });
    $(".popup__close").click(function () {
        p.css("display", "none");
    });

    // Скролл по навигации к секциям

    $('a[href*="#"]')
        // Удалить ненужные линки
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            if (
                location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
                location.hostname == this.hostname
            ) {
                // Найти элемент к которому проскролить
                let target = $(this.hash);
                target = target.length
                    ? target
                    : $("[name=" + this.hash.slice(1) + "]");

                if (target.length) {
                    // Prevent Default только когда произойдет анимация
                    event.preventDefault();
                    $("html, body").animate(
                        {
                            scrollTop: target.offset().top,
                        },
                        100,
                        function () {
                            let $target = $(target);
                            $target.focus();
                            if ($target.is(":focus")) {
                                return false;
                            } else {
                                $target.attr("tabindex", "-1");
                                $target.focus();
                            }
                        }
                    );
                }
            }
        });

    initMap();
});
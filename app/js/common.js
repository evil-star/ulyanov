//= ../libs/jquery/dist/jquery.min.js

//= ../libs/jquery.maskedinput/jquery.maskedinput.min.js
//= ../libs/slick/slick.min.js
//= ../libs/materialize/js/materialize.min.js
//= ../libs/aos/aos.js
$(window).on('load', function() {
  $('.preloader-container').fadeOut();
  AOS.refresh();
});

$(function() {

  AOS.init({
    disable: 'phone'
  });

  //  Ajax обработка форм
  $("#form").submit(function() {
    $.ajax({
      type: "POST",
      url: "SMTP/mail.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#myModal').modal();
      $("#form").trigger("reset");
    });
    return false;
  });

  // Плавный скролл к секциям
  $("#menu, #mobile-demo").on("click", "a", function(event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();
    //забираем идентификатор бока с атрибута href
    var id = $(this).attr('href'),
      //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;
    //анимируем переход на расстояние - top за 1500 мс
    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });

  // Подстановка значений в модалку
  $('#exampleModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var recipient = button.data('aim'); // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this);
    modal.find('.modal-title').text(recipient);
    modal.find('.modal-body input[name=aim]').val(recipient);
  });

  // Маска ввода телефона
  $("[type=tel]").mask("+7(999) 999-99-99");

  // Мобильное меню
  $('.sidenav').sidenav();

  // Изменение меню при скроле
  var $document = $(document),
    $element = $('nav'),
    className = 'fixed';

  $document.scroll(function() {
    if ($document.scrollTop() >= 50) {
      $element.addClass(className);
    } else {
      $element.removeClass(className);
    }
  });

  $(document).ready(function() {
    $('.modal').modal();
    $('#modal-start-3').modal({
      onOpenEnd: function() {
        $(window).trigger('resize');
        $('.reviews-list').slick("setPosition", 0);
      }
    });
  });

  // Слайдер-отзывы
  $('.reviews-list').slick({
    slidesToShow: 2,
    dots: true,
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 1
      }
    }, ]
  });

  // Materialize карусель
  $('.carousel.carousel-slider').carousel({
    fullWidth: true,
    duration: 200,
    indicators: true
  });
  setTimeout(autoplay, 4500);

  function autoplay() {
    $('.carousel').carousel('next');
    setTimeout(autoplay, 5500);
  }
});
(function (global, undefined) {
  //Google Maps Script and Settings
  function myMap() {
    var myCenter = new google.maps.LatLng(41.7575, 24.4523);
    var mapProp = {
      center: myCenter,
      zoom: 15,
      scrollwheel: false,
      draggable: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    var marker = new google.maps.Marker({
      position: myCenter
    });
    marker.setMap(map);
  }

  global.myMap = myMap;

  $(document).ready(function () {
    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#main']").on('click', function (event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 900, function () {

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });

    $(window).scroll(function () {
      $(".slideanim").each(function () {
        var pos = $(this).offset().top;

        var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
      });
    });

    var images = (function () {
      var images = null;
      $.ajax({
        'async': false,
        'global': false,
        'url': "images.json",
        'dataType': "json",
        'success': function (data) {
          images = data;
        }
      });
      return images;
    })();

    function renderCarouselElements(carouselID, imageFolder, images) {
      for (i = 0; i < images.length; i++) {
        var currImage = images[i];
        var liEl = '<li data-target="' + carouselID + '" data-slide-to="' + i + '"></li>';
        $(carouselID + " ol.carousel-indicators").append(liEl);
        var divEl = '<div class="item"><img src="' + imageFolder + currImage + '" width="100%" alt="San Francisco"></div>';
        $(carouselID + " div.carousel-inner").append(divEl);
      }
      $(carouselID + " ol li").first().addClass("active");
      $(carouselID + " div.item").first().addClass("active");
      $(carouselID).carousel();
    }
    renderCarouselElements("#myCarousel", images.products.url, images.products.images);

    function renderImageGalleryElements(imageGalleryID, imageFolder, images) {
      for (i = 0; i < images.length; i++) {
        var currImage = images[i];
        var liEl = '';
        liEl += '<li class="col-lg-2 col-md-2 col-sm-3 col-xs-4">'
        liEl += '<img class="img-responsive" src="' + imageFolder + currImage + '">';
        liEl += '</li>';

        $(imageGalleryID).append(liEl);
      }
    }
    renderImageGalleryElements("#imageGalleryRooms", images.rooms.url, images.rooms.images);
    renderImageGalleryElements("#imageGalleryTourism", images.tourism.url, images.tourism.images);

    // Image Gallery:
    $('li img').on('click', function () {
      global.imageParentId = $(this).parent().parent().attr('id');
      //Remove thumbnails URL
      var src = $(this).attr('src');
      var img = '<img src="' + src + '" class="img-responsive"/>';

      //start of new code new code
      var index = $(this).parent('li').index();

      var html = '';
      html += img;
      html += '<div style="height:25px;clear:both;display:block;">';
      html += '<a class="controls next" href="' + (index + 2) + '">next &raquo;</a>';
      html += '<a class="controls previous" href="' + (index) + '">&laquo; prev</a>';
      html += '</div>';

      $('#myModal').modal();
      $('#myModal').on('shown.bs.modal', function () {
        $('#myModal .modal-body').html(html);
        //new code
        $('a.controls').trigger('click');
      })
      $('#myModal').on('hidden.bs.modal', function () {
        $('#myModal .modal-body').html('');
      });
    });

  })

  function removeThumbNailsURL(src) {
    if (src) {
      return src.replace('thumbnails_200/', '').replace('_tn', '');
    }
  }

  $(document).on('click', 'a.controls', function () {
    var index = $(this).attr('href');
    var src = $('#' + global.imageParentId + ' li:nth-child(' + index + ') img').attr('src');

    $('.modal-body img').attr('src', removeThumbNailsURL(src));

    var newPrevIndex = parseInt(index) - 1;
    var newNextIndex = parseInt(newPrevIndex) + 2;

    if ($(this).hasClass('previous')) {
      $(this).attr('href', newPrevIndex);
      $('a.next').attr('href', newNextIndex);
    } else {
      $(this).attr('href', newNextIndex);
      $('a.previous').attr('href', newPrevIndex);
    }

    var total = $('#' + global.imageParentId + ' li').length + 1;
    //hide next button
    if (total === newNextIndex) {
      $('a.next').hide();
    } else {
      $('a.next').show()
    }
    //hide previous button
    if (newPrevIndex === 0) {
      $('a.previous').hide();
    } else {
      $('a.previous').show()
    }

    return false;
  });
})(window)
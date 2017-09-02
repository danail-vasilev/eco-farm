//Google Maps Script and Settings
function myMap() {
    var myCenter = new google.maps.LatLng(41.7575, 24.4523);
    var mapProp = {center:myCenter, zoom:15, scrollwheel:false, draggable:false, mapTypeId:google.maps.MapTypeId.ROADMAP};
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    var marker = new google.maps.Marker({position:myCenter});
    marker.setMap(map);
}

$(document).ready(function(){
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#main']").on('click', function(event) {
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
      }, 900, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
  
  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });

  var productsImages = ["IMG_7817.jpg","IMG_7862.jpg","IMG_7873.jpg","IMG_7881.jpg","IMG_7887.jpg"];
  var productImagesUrl = "resources/products/";

  function renderCarouselElements(carouselID, imageFolder, images){
      for (i = 0; i < images.length; i++) { 
          var currImage = images[i];
          var liEl = '<li data-target="' + carouselID + '" data-slide-to="' + i + '"></li>';
          $(carouselID + " ol.carousel-indicators").append(liEl);
          var divEl = '<div class="item"><img src="' + imageFolder +  currImage + '" width="100%" alt="San Francisco"></div>';
          $(carouselID + " div.carousel-inner").append(divEl);
      }
      $(carouselID + " ol li").first().addClass("active");
      $(carouselID + " div.item").first().addClass("active");
      $(carouselID).carousel();
  } 
  renderCarouselElements("#myCarousel", productImagesUrl, productsImages);

  var roomImages = ["1406149522646096.jpeg","1406149523291421.jpeg","1406149523816688.jpeg","1406149523972056.jpeg","1406149524428503.jpeg","1406149524838029.jpeg","1406149525255509.jpeg","1406149525585951.jpeg","1406149526101612.jpeg","1406149526134924.jpeg","1406149527216701.jpeg","1406149527786170.jpeg","1406149527845445.jpeg","1406149528727850.jpeg","1406149528748520.jpeg"];
  var roomImagesUrl = "resources/rooms/";

  function renderImageGalleryElements(imageGalleryID, imageFolder, images){
    for (i = 0; i < images.length; i++) { 
        var currImage = images[i];
        var liEl = '';
            liEl += '<li class="col-lg-2 col-md-2 col-sm-3 col-xs-4">'
            liEl += '<img class="img-responsive" src="' +  imageFolder +  currImage + '">';
            liEl += '</li>';

        $(imageGalleryID).append(liEl);
    }
  }
  renderImageGalleryElements("#imageGallery", roomImagesUrl, roomImages);

// Image Gallery:
	$('li img').on('click',function(){
		var src = $(this).attr('src');
		var img = '<img src="' + src + '" class="img-responsive"/>';
		
		//start of new code new code
		var index = $(this).parent('li').index();   
		
		var html = '';
		html += img;                
		html += '<div style="height:25px;clear:both;display:block;">';
		html += '<a class="controls next" href="'+ (index+2) + '">next &raquo;</a>';
		html += '<a class="controls previous" href="' + (index) + '">&laquo; prev</a>';
		html += '</div>';
		
		$('#myModal').modal();
		$('#myModal').on('shown.bs.modal', function(){
			$('#myModal .modal-body').html(html);
			//new code
			$('a.controls').trigger('click');
		})
		$('#myModal').on('hidden.bs.modal', function(){
			$('#myModal .modal-body').html('');
		});	
   });
  
})

$(document).on('click', 'a.controls', function(){
	var index = $(this).attr('href');
	var src = $('ul.row li:nth-child('+ index +') img').attr('src');             
	
	$('.modal-body img').attr('src', src);
	
	var newPrevIndex = parseInt(index) - 1; 
	var newNextIndex = parseInt(newPrevIndex) + 2; 
	
	if($(this).hasClass('previous')){               
		$(this).attr('href', newPrevIndex); 
		$('a.next').attr('href', newNextIndex);
	}else{
		$(this).attr('href', newNextIndex); 
		$('a.previous').attr('href', newPrevIndex);
	}
	
	var total = $('ul.row li').length + 1; 
	//hide next button
	if(total === newNextIndex){
		$('a.next').hide();
	}else{
		$('a.next').show()
	}            
	//hide previous button
	if(newPrevIndex === 0){
		$('a.previous').hide();
	}else{
		$('a.previous').show()
	}
	
	return false;
});
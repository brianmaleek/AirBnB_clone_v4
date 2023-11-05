$('document').ready(function () {
  const amenityDict = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenityDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityDict[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(amenityDict).join(', '));
  });
});

$.ajax({
  url: 'http:///0.0.0.0:5001/api/v1/status/',
  type: 'GET',
  dataType: 'json',
  success: function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  },
  error: function (error) {
    console.log(error);
  }
});

$.ajax({
  url: 'http://http://0.0.0.0:5001/api/v1/places_search',
  type: 'POST',
  data: '{}',
  dataType: 'json',
  contentType: 'application/json',
  success: function (data) {
    for (const place of data) {
      $('.places').append('<article><div class="title"><h2>' + place.name + '</h2><div class="price_by_night"><p>' + place.price_by_night +
              '</p></div></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest +
              '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' +
              place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' +
              place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
    }
  },
  error: function (error) {
    console.log(error);
  }
});

$('button').click(function () {
  const amenityList = Object.keys(amenityDict);
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    data: JSON.stringify({ amenities: amenityList }),
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      $('.places').empty();
      for (const place of data) {
        $('.places').append('<article><div class="title"><h2>' + place.name + '</h2><div class="price_by_night"><p>' + place.price_by_night +
                      '</p></div></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest +
                      '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' +
                      place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' +
                      place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
      }
    }
  });
  /* css */
});

$('document').ready(function () {
  const amenityDict = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is( ":checked" )) {
      amenityDict[$(this).data('id')] = $(this).data('name');
    } else {
        delete amenityDict[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(amenityDict).join(', '));
    });

  // 2. Function update API status
  // File: web_dynamic/static/scripts/2-hbnb.js
  function updateStatus () {
    $.get("http://0.0.0.0:5000/api/v1/status/", function (data) {
      if (data.status === "OK") {
        $("#api_status").addClass("available");
      } else {
        $("#api_status").removeClass("available");
      }
    });
  }
  // call updateStatus function when page loads
  updateStatus();
});


var outArray = new Array();
var inArray = new Array();


function search(number) {
  $.getJSON("static/json/Flight_data.json", function (data) {

     // restate
    outArray = []; 
    inArray = [];
    $("#page").empty();
    ////

    var entie = number - 1;
    var flyTo = $("#flyTo").val();
    var flyFrom = $("#flyForm").val();
    var departAir = $('#departAir option:selected').text();
    var returnAir = $("#returnAir option:selected").text();
    var flightClass = $("#flightClass option:selected").text();
    var trip = $("input[name=r]:checked").val();
    var isFound = true;
    var cnt = 0;
    var cntArr = 0;
    var howMany = 0;

    for (var i = 0; i < data.length; i++) {
      var checkTo = flyTo.toUpperCase() == data[i].flyTo
      var checkForm = flyFrom.toUpperCase() == data[i].flyForm
      var checkDepartAndReturn = (departAir == data[i].departAirport) && (returnAir == data[i].returnAirport);
      var checkClass = flightClass == data[i].class
      var checkTrip = trip == data[i].trip

      if (checkForm && checkTo && checkDepartAndReturn && checkClass && checkTrip) {
        howMany = howMany + 1;
        isFound = false;
        var price = '<td>' + data[i].price + '</td>'
        var Airline = '<td>' + data[i].airline + '</td>'
        var takeoff = '<td>' + data[i].takeoff + '</td>'
        var landing = '<td>' + data[i].landing + '</td>'
        var stop = '<td>' + data[i].stop + '</td>'


        inArray[cnt] = '<tr>' + price + Airline + takeoff + landing + stop + '</tr>';

        cnt = cnt + 1;


        if (cnt > entie) {

          cnt = 0;
          outArray[cntArr] = inArray;

          inArray = [];
          cntArr = cntArr + 1;
        }
      }

      if (cnt <= entie && (i == (data.length - 1))) {
        outArray[cntArr] = inArray;
        cntArr = cntArr + 1;
      }

    }
    if ((entie == 0) || ((howMany % number) == 0)) {
      outArray.pop()
    }

    if (isFound) {
      $('#notFound').append('Not found matched Flight');

      $("#label3").empty();
    } else {
      for (var j = 0; j < outArray[0].length; j++) {

        $("#myTable").append(outArray[0][j]);
      }
      $("#label1").text("1 of ");
      $("#label2").text(outArray.length);
      if (outArray.length != 1) {
        for (var i = 0; i < outArray.length; i++) {
          $("#page").append('<li class="page-item"><a class="page-link"  onclick="pageTo(' + i + ')">' + (i + 1) + '</a></i>')
        }
      }
    }
  });
}

function pageTo(index) {
  $("#myTBody").empty();

  $("#label1").text((index + 1) + " of  ");
  $("#label2").text(outArray.length);
  for (var j = 0; j < outArray[index].length; j++) {

    $("#myTable").append(outArray[index][j]);
  }

}

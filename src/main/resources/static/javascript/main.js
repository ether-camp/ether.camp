$(function() {


    var dueDate = moment.tz("2015-12-01 10:00", "Europe/London");


    //Wednsday 5.7.2015
    $('#due-date').text(dueDate.format("dddd D-MMM-YYYY HH:mm"));


    $('#countdown').countdown(dueDate.toDate(),  function(event) {

        $('#count-days').html(event.strftime('%D'));
        $('#count-hours').html(event.strftime('%H'));
        $('#count-minutes').html(event.strftime('%M'));
        $('#count-sec').html(event.strftime('%S'));
    });


});

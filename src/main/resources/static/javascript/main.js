$(function() {


    var dueDate = moment.tz("2016-01-08 17:00", "Asia/Shanghai");


    //Wednsday 5.7.2015
    $('#due-date').text(dueDate.format("dddd D-MMM-YYYY HH:mm"));


    $('#countdown').countdown(dueDate.toDate(),  function(event) {

        $('#count-days').html(event.strftime('%D'));
        $('#count-hours').html(event.strftime('%H'));
        $('#count-minutes').html(event.strftime('%M'));
        $('#count-sec').html(event.strftime('%S'));
    });


});

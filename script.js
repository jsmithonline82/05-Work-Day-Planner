//SET MOMENT TO VARIABLE AND GET THE DATE IN THE APPROPRIATE FORMAT--------------
var now = moment();
var currentDate = now.format("LLLL");

//THIS SETS THE DATE IN THE ID LOCATED IN THE HTML HEADER--------------------------
$("#today").text("Today's Date is" + currentDate);

console.log(currentDate);

// LOOP GETS APPOINTMENTS FROM LOCAL STORAGE AND DISPLAYS THEM----------------------
$(document).ready(function() {
    hourArr = $('.hour').toArray();
    for (i = 0; i < hourArr.length; i++) {
        $(hourArr[i]).siblings('textarea').text(localStorage.getItem($(hourArr[i]).attr('data-time')));
    }
});

// console.log(JSON.stringify(hourArr));-------THIS DIDNT GET ME ANYTHING BACK, COULDN"T FIGURE OUT WHY

//LOOP CREATES THE BODY OF THE SCHEDULE DYNAMICALLY--------------------------------------------
//THE NUMBER 9 IN THE LOOP REPRESENTS THE NUMBER OF HOURS IN OUR WORKDAY
//A LARGER NUMBER WOULD RENDER A "LONGER" WORK DAY
for (i = 0; i < 9; i++) {
    var row = $('<div>').addClass('row');
    var hourCol = $('<div>').addClass('hour col-md-2').text(moment('9:00 AM', 'hh:mm A').add(i, 'hours').format('hA'));
    hourCol.attr('data-time', moment('9:00 AM', 'hh:mm A').add(i, 'hours').format('hA'));
    var todoCol = $('<textarea placeholder="What do you need to do today?">').addClass('col-md-9');
    var saveBtn = $('<button>').addClass('saveBtn col-md-1');

    //APPENDING THE ELEMENTS TO THE APPROPRIATE PARTS OF THE PAGE IN ORDER. 
    $('.container').append(row);
    $(row).append(hourCol);
    $(hourCol).after(todoCol);
    $(todoCol).after(saveBtn);


    //-------SETTING THE TIMES FOR COLOR CHANGES BY ASSINGING CSS CLASSES PRESENT, FUTURE and PAST
    if (now.isSame(moment('9:00 AM', 'hh:mm A').add(i, 'hours'), 'hour')) {
        $(todoCol).addClass('present');
    } else if (now.isBefore(moment('9:00 AM', 'hh:mm A').add(i, 'hours'), 'hour')) {
        $(todoCol).addClass('future');
    } else if (now.isAfter(moment('9:00 AM', 'hh:mm A').add(i, 'hours'), 'hour')) {
        $(todoCol).addClass('past');
    }
}

//---------SAVE BUTTON----------------------------------------------
$('.saveBtn').on('click', function() {

    localStorage.setItem($(this).siblings('div.hour').attr('data-time'), $(this).siblings('textarea').val())
});
// Initialize our foundation stuff for if/when we use foundation functionality
$(document).foundation()

// Bhangra in the Burgh XI's date
var year=2017;
var month=11;
var day=18;
var hour=6;
var minute=0;
var tz=-5; //Offset from UTC (EST)

// When the document's loaded, start the countdown
$(function(){
    countdown(year,month,day,hour,minute);
});

// <- When you click the background, have it change ->

// The number of images we have, named as
// hero_bg<number>.jpg and 1-indexed
heroImages = 7;
curImageNum = 0;

$('html').click(function(){
    curImageNum += 1;
    curImageNum = curImageNum % heroImages;
    
    imageName = 'images/hero_bg'+(curImageNum+1)+'.jpg'
    
    $('body').css('background-image', 'url('+imageName+')');
    
    $('#hero_bg').css('background-image', 'url('+imageName+')');
});


/*------ Messy Countdown Code ------*/
var montharray=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");

// Adds a leading 0 if the number is single-digit
function fix(num){
//    if (num < 10){
//        return '0' + num;
//    }
    return num;
}

function countdown(yr,m,d,hr,min){
    theyear=yr;themonth=m;theday=d;thehour=hr;theminute=min;

    var today=new Date();
    var todayy=today.getYear();
    if (todayy < 1000) {
    todayy+=1900; }
    var todaym=today.getMonth();
    var todayd=today.getDate();
    var todayh=today.getHours();
    var todaymin=today.getMinutes();
    var todaysec=today.getSeconds();
    var todaystring1=montharray[todaym]+" "+todayd+", "+todayy+" "+todayh+":"+todaymin+":"+todaysec;
    var todaystring=Date.parse(todaystring1)+(tz*1000*60*60);
    var futurestring1=(montharray[m-1]+" "+d+", "+yr+" "+hr+":"+min);
    var futurestring=Date.parse(futurestring1)-(today.getTimezoneOffset()*(1000*60));
    var dd=futurestring-todaystring;

    var dday=Math.floor(dd/(60*60*1000*24)*1);
    var dhour=Math.floor((dd%(60*60*1000*24))/(60*60*1000)*1);
    var dmin=Math.floor(((dd%(60*60*1000*24))%(60*60*1000))/(60*1000)*1);
    var dsec=Math.floor((((dd%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1);

    if(dday<=0&&dhour<=0&&dmin<=0&&dsec<=0){ //If we've already passed the event time, zero everything out instead of going negative
        //Also our base case
        $("#days").html(0);
        $("#hours").html(0);
        $("#minutes").html(0);
        $("#seconds").html(0);
        return;
    }
    else {
        $("#days").html(fix(dday));
        $("#hours").html(fix(dhour));
        $("#minutes").html(fix(dhour));
        $("#seconds").html(fix(dsec));
        //Run the countdown function again. Recursion ftw.
        setTimeout("countdown(theyear,themonth,theday,thehour,theminute)",1000);
    }
}

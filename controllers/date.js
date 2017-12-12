//2017-12-11 11:00:00
function functionName(date) {
	var datetime = date.split(" ");
	var dates = datetime[0].split("-");
	var year = dates[0];
	var monthNum = dates[1];
	if(monthNum == 1){
		month = "January";
	}
	else if(monthNum == 2){
		month = "February";
	}
	else if(monthNum == 3){
		month = "March";
	}
	else if(monthNum == 4){
		month = "April";
	}
	else if(monthNum == 5){
		month = "May";
	}
	else if(monthNum == 6){
		month = "June";
	}
	else if(monthNum == 7){
		month = "July";
	}
	else if(monthNum == 8){
		month = "August";
	}
	else if(monthNum == 9){
		month = "September";
	}
	else if(monthNum == 10){
		month = "October";
	}
	else if(monthNum == 11){
		month = "November";
	}
	else if(monthNum == 12){
		month = "December";
	}
	var day = dates[2];
	if(day==1){
		day = day + "st";
	}
	else if(day==2){
		day = day + "nd";
	}
	else if(day ==3){
		day = day + "rd";
	}
	else{
		day = day + "th";
	}
	var time = datetime[1];
	var times = time.split(":");
	var ampm = "AM";
	var time1 = times[0];
	var time2 = times[1];
	if(time1>12){
		time1 = time1=12;
		ampm = "PM";
	}
	var cleanDate = month + " "+day + ", " + year + " at " + time1 + ":" + time2 + ampm;
	console.log(cleanDate);
	return cleanDate;
} 

functionName("2017-12-11 11:00:00");
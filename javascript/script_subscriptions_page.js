var dataObj;
function getdata() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () { 
        if (xhttp.readyState == 4 && xhttp.status == 200) {   // value 4 - means the load is complete ##  200 Code informs about successful processing of the request.
            processResult(xhttp);
        }
    }
    xhttp.open("GET", "MySubscriptionsData.json", true);   // async: true (asynchronous) or false (synchronous)
    xhttp.send();
}
// This function process teh content of JSON file.     
function processResult(xhttp) {
    var jsonText = xhttp.responseText;        // Get JSON text.     
    dataObj = JSON.parse(jsonText);   // convert the response text to JSON object.
    showMySubscriptions();
}
getdata();

function showMySubscriptions(){
    
    var keys = Object.keys(dataObj.Services.Mobile_Services.PostPaid[0]);

    for(var i = 0; i < dataObj.Services.Mobile_Services.PostPaid.length; i++){
        document.querySelector(".post-paid-plans").innerHTML += "<div class=\"record\"><p>" + dataObj.Services.Mobile_Services.PostPaid[i].Name + "<\p>" +
        keys[1] + ": " + dataObj.Services.Mobile_Services.PostPaid[i].Data + "&emsp;" +
        keys[2] + ": " + dataObj.Services.Mobile_Services.PostPaid[i].Voice + "&emsp;" +
        keys[3] + ": " + dataObj.Services.Mobile_Services.PostPaid[i].Price + "&emsp;" +
        keys[4] + ": " + dataObj.Services.Mobile_Services.PostPaid[i].Time + "</p>" +
        "<div class=\"unsubscribe__btn__container\"><button class=\"unsubscribe__btn--right\" onClick=\"unsub(this)\">Unsubscribe</button><hr></div></div>";
    }

    var keys = Object.keys(dataObj.Services.Mobile_Services.PrePaid[0]);

    for(var i = 0; i < dataObj.Services.Mobile_Services.PrePaid.length; i++){
        document.querySelector(".pre-paid-plans").innerHTML += "<div class=\"record\">" +
        keys[0] + ": " + dataObj.Services.Mobile_Services.PrePaid[i].Data + "&emsp;" +
        keys[1] + ": " + dataObj.Services.Mobile_Services.PrePaid[i].Voice + "&emsp;" +
        keys[2] + ": " + dataObj.Services.Mobile_Services.PrePaid[i].Price + "&emsp;" +
        keys[3] + ": " + dataObj.Services.Mobile_Services.PrePaid[i].Time + "</p>" +
        "<div class=\"unsubscribe__btn__container\"><button class=\"unsubscribe__btn--right\" onClick=\"unsub(this)\">Unsubscribe</button><hr></div></div>";
    }

    var keys_home_internet = Object.keys(dataObj.Services.TV_Wireless_Services.Home_Internet[0]);

    for(var i = 0; i < dataObj.Services.TV_Wireless_Services.Home_Internet.length; i++){
        document.querySelector(".home-internet").innerHTML += "<div class=\"record\"><p>" + dataObj.Services.TV_Wireless_Services.Home_Internet[i].Name + "<\p>" +
        keys_home_internet[0] + ": " + dataObj.Services.TV_Wireless_Services.Home_Internet[i].Data + "&emsp;" +
        keys_home_internet[1] + ": " + dataObj.Services.TV_Wireless_Services.Home_Internet[i].Speed + "&emsp;" +
        keys_home_internet[2] + ": " + dataObj.Services.TV_Wireless_Services.Home_Internet[i].Router + "&emsp;" +
        keys_home_internet[3] + ": " + dataObj.Services.TV_Wireless_Services.Home_Internet[i].Price + "&emsp;" +
        keys_home_internet[4] + ": " + dataObj.Services.TV_Wireless_Services.Home_Internet[i].Time + "</p>" +
        "<div class=\"unsubscribe__btn__container\"> <button class=\"unsubscribe__btn--right\" onClick=\"unsub(this)\">Unsubscribe</button><hr></div></div>";
    }

    var keys_tv_packages = Object.keys(dataObj.Services.TV_Wireless_Services.TV_Packages[0]);

    for(var i = 0; i < dataObj.Services.TV_Wireless_Services.TV_Packages.length; i++){
        document.querySelector(".tv-packages").innerHTML += "<div class=\"record\"><p>" + dataObj.Services.TV_Wireless_Services.Home_Internet[i].Name + "<\p>" +
        keys_tv_packages[1] + ": " + dataObj.Services.TV_Wireless_Services.TV_Packages[i].Channels + "&emsp;" +
        keys_tv_packages[2] + ": " + dataObj.Services.TV_Wireless_Services.TV_Packages[i].Price + "&emsp;" +
        keys_tv_packages[3] + ": " + dataObj.Services.TV_Wireless_Services.TV_Packages[i].Time + "</p>" +
        "<div class=\"unsubscribe__btn__container\"> <button class=\"unsubscribe__btn--right\" onClick=\"unsub(this)\">Unsubscribe</button><hr></div></div>";
    }
    
}

function unsub(e){
    var unsubParentDiv = e.parentNode.parentNode
    unsubParentDiv.innerHTML = "<p>No subscribed plans in this category.<p>"
}
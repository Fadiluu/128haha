function getdata() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () { 
        if (xhttp.readyState == 4 && xhttp.status == 200) {   // value 4 - means the load is complete ##  200 Code informs about successful processing of the request.
            processResult(xhttp);
        }
    }
    xhttp.open("GET", "PlansData.json", true);   // async: true (asynchronous) or false (synchronous)
    xhttp.send();
}
// This function process teh content of JSON file.     
function processResult(xhttp) {
    var jsonText = xhttp.responseText;        // Get JSON text.     
    dataObj = JSON.parse(jsonText);   // convert the response text to JSON object.
    postPaid();
    wifi();
}
getdata();

function postPaid(){
    var text = document.querySelector(".postpaid__btn");
    text.classList.add("on_select");
    var text1 = document.querySelector(".prepaid__btn");
    text1.classList.remove("on_select");


    var arr = ["Data:","Voice:","Price:","Subscrition Period:"]
    var select = document.querySelectorAll('.mobile__card')
    for(var i=0;i<select.length;i++){
        select[i].innerHTML =""
    }
    for(var i=0;i<dataObj.Services.Mobile_Services.PostPaid.length;i++){
        var j=0
        select[i].innerHTML+= "<h3>"+dataObj.Services.Mobile_Services.PostPaid[i].Name+"</h3>\n"
        select[i].innerHTML+="<h3>"+arr[j++]+"</h3>\n"
        select[i].innerHTML+="<p>"+dataObj.Services.Mobile_Services.PostPaid[i].Data+"</p\n>"
        select[i].innerHTML+="<h3>"+arr[j++]+"</h3>\n"
        select[i].innerHTML+="<p>"+dataObj.Services.Mobile_Services.PostPaid[i].Voice+"</p>\n"
        select[i].innerHTML+="<h3>"+arr[j++]+"</h3>\n"
        select[i].innerHTML+="<p>"+dataObj.Services.Mobile_Services.PostPaid[i].Price+"</p>\n"
        select[i].innerHTML+="<h3>"+arr[j++]+"</h3>\n"
        select[i].innerHTML+="<p>"+dataObj.Services.Mobile_Services.PostPaid[i].Time+"</p>\n"
        select[i].innerHTML+="<div class=\"sub__btn--right\"><button class=\"subscription__btn\" onclick=\"subscribe_postpaid()\">Subscribe</button></div>"      
    }
    
    
}
function prePaid(){
    var text = document.querySelector(".postpaid__btn");
    text.classList.remove("on_select");
    var text1 = document.querySelector(".prepaid__btn");
    text1.classList.add("on_select");


    var arr = ["Data:","Voice:","Price:","Subscrition Period:"]
    var select = document.querySelectorAll('.mobile__card');
    for(var i=0;i<select.length;i++){
        select[i].innerHTML =""
    }
    for(var i=0;i<dataObj.Services.Mobile_Services.PrePaid.length;i++){
        var j=0
        select[i].innerHTML+="<h3>"+arr[j++]+"</h3>\n"
        select[i].innerHTML+="<p>"+dataObj.Services.Mobile_Services.PrePaid[i].Data+"</p\n>"
        select[i].innerHTML+="<h3>"+arr[j++]+"</h3>\n"
        select[i].innerHTML+="<p>"+dataObj.Services.Mobile_Services.PrePaid[i].Voice+"</p>\n"
        select[i].innerHTML+="<h3>"+arr[j++]+"</h3>\n"
        select[i].innerHTML+="<p>"+dataObj.Services.Mobile_Services.PrePaid[i].Price+"</p>\n"
        select[i].innerHTML+="<h3>"+arr[j++]+"</h3>\n"
        select[i].innerHTML+="<p>"+dataObj.Services.Mobile_Services.PrePaid[i].Time+"</p>\n"
        select[i].innerHTML+="<div class=\"sub__btn--right\" onclick=\"subscribe_prepaid()\"><button class=\"subscription__btn\">Subscribe</button></div>"      
    }
    

}
function wifi(){
    var text = document.querySelector(".wifi__btn");
    text.classList.add("on_select");
    var text1 = document.querySelector(".tv__btn");
    text1.classList.remove("on_select");
    var arr = ["Data:","Speed","Router:","Delivery:","Price:","Subscrition Period:"]
    var select = document.querySelectorAll('.tv__wifi__card')
    for(var i=0;i<select.length;i++){
        select[i].innerHTML =""
    }
    for(var i=0;i<dataObj.Services.Mobile_Services.PostPaid.length;i++){
        var j=0
        select[i].innerHTML+="<h3>"+dataObj.Services.TV_Wireless_Services.Home_Internet[i].Name+"</h3>\n"
        select[i].innerHTML+="<h3>"+arr[j++]+"</h3>\n"
        select[i].innerHTML+="<p>"+dataObj.Services.TV_Wireless_Services.Home_Internet[i].Data+"</p\n>"
        select[i].innerHTML+="<h3>"+arr[j++]+"</h3>\n"
        select[i].innerHTML+="<p>"+dataObj.Services.TV_Wireless_Services.Home_Internet[i].Speed+"</p>\n"
        select[i].innerHTML+="<h3>"+arr[j++]+"</h3>\n"
        select[i].innerHTML+="<p>"+dataObj.Services.TV_Wireless_Services.Home_Internet[i].Router+"</p>\n"
        select[i].innerHTML+="<h3>"+arr[j++]+"</h3>\n"
        select[i].innerHTML+="<p>"+dataObj.Services.TV_Wireless_Services.Home_Internet[i].Delivery+"</p>\n"
        select[i].innerHTML+="<h3>"+arr[j++]+"</h3>\n"
        select[i].innerHTML+="<p>"+dataObj.Services.TV_Wireless_Services.Home_Internet[i].Price+"</p>\n"
        select[i].innerHTML+="<h3>"+arr[j++]+"</h3>\n"
        select[i].innerHTML+="<p>"+dataObj.Services.TV_Wireless_Services.Home_Internet[i].Time+"</p>\n"
        select[i].innerHTML+="<div class=\"sub__btn--right\"><button class=\"subscription__btn\" onclick=\"subscribe_wifi()\">Subscribe</button></div>"      
    }
    
    
}
function tv(){
    var text = document.querySelector(".wifi__btn");
    text.classList.remove("on_select");
    var text1 = document.querySelector(".tv__btn");
    text1.classList.add("on_select");
    var arr = ["Channels","Price:","Subscrition Period:"]
    var select = document.querySelectorAll('.tv__wifi__card')
    for(var i=0;i<select.length;i++){
        select[i].innerHTML =""
    }
    for(var i=0;i<dataObj.Services.Mobile_Services.PostPaid.length;i++){
        var j=0
        select[i].innerHTML+= "<h3>"+dataObj.Services.TV_Wireless_Services.TV_Packages[i].Name+"</h3>\n"
        select[i].innerHTML+="<h3>"+arr[j++]+"</h3>\n"
        select[i].innerHTML+="<p>"+dataObj.Services.TV_Wireless_Services.TV_Packages[i].Channels+"</p\n>"
        select[i].innerHTML+="<h3>"+arr[j++]+"</h3>\n"
        select[i].innerHTML+="<p>"+dataObj.Services.TV_Wireless_Services.TV_Packages[i].Price+"</p>\n"
        select[i].innerHTML+="<h3>"+arr[j++]+"</h3>\n"
        select[i].innerHTML+="<p>"+dataObj.Services.TV_Wireless_Services.TV_Packages[i].Time+"</p>\n"
        select[i].innerHTML+="<div class=\"sub__btn--right\" onclick=\"subscribe_tv()\"><button class=\"subscription__btn\">Subscribe</button></div>"      
    }
    
    
}

var post_paid_plans = 0;
var pre_paid_plans = 0;
var home_internet_plans = 0;

function subscribe_postpaid(){
    var decision = confirm("You are subscribing to this plan");
        if (decision == true){
            if (post_paid_plans == 0) post_paid_plans++;
            else{
                window.alert("Sorry. You can't subscribe to more than 1 plan in this category.");
            }
        }
}

function subscribe_prepaid(){
    var decision = confirm("You are subscribing to this plan");
        if (decision == true){
            if (pre_paid_plans == 0) pre_paid_plans++;
            else{
                window.alert("Sorry. You can't subscribe to more than 1 plan in this category.");
            }
        }
}

function subscribe_wifi(){
    var decision = confirm("You are subscribing to this plan");
        if (decision == true){
            if (home_internet_plans == 0) home_internet_plans++;
            else{
                window.alert("Sorry. You can't subscribe to more than 1 plan in this category.");
            }
        }
}

function subscribe_tv(){
    confirm("You are subscribing to this plan");
}
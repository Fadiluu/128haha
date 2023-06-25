var  session =require("express-session");
var mySession;

exports.setSession = function(email){
    session.email = email;
    mySession = session;
    console.log("Session Created");
}   
exports.getSession = function(){
    return mySession;
}
exports.deleteSession = function(){
    mySession="";
    console.log("Session Deleted");
};
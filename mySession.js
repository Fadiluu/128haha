var  session =require("express-session");
var mySession;

exports.setSeesion = function(username){
    session.userName = username;
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
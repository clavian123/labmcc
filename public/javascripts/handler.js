function login(){
    $('#login-form').submit(function(e){
        e.preventDefault();
        var email = $('#email').val();
        var password = $('#password').val();
        window.location.href="/homepage";

    })
}
function register(){
    $('#register').click(function(){
        window.location.href="/register";
    })
}
$(function(){
    login();
})
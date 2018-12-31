function login(){
    $('#login-form').submit(function(e){
        e.preventDefault();
        var email = $('#email').val();
        var password = $('#password').val();
        window.location.href="/homepage";

    })
}

function facebook_login(){
    $('#facebook_login').click(function(e){
        e.preventDefault();
        window.location.href="/authFacebook/done";
    })
}

function register(){
    $('#register').click(function(){
        window.location.href="/register";
    })
}
$(function(){
    login();
    facebook_login();
})
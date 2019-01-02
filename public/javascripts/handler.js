
function facebook_login(){
    $('#facebook_login').click(function(e){
        e.preventDefault();
        window.location.href="/authFacebook/done";
    })
}
$(function(){
    $('#login-form').submit(function(e){
        e.preventDefault();
        var email = $('#email').val();
        var password = $('#password').val();

        var login = $.ajax({
            url:'/login',
            type: 'POST',
            data:{
                email: email,
                password:password
            }
        })
        login.done(function(results){
            // console.log(results)
            if(results.message=="OKE"){
                sessionStorage.setItem("id", results.userid)
                
                window.location.href="/homepage";
            }
        })
    })
    facebook_login();
})

function facebook_login(){
    $('#facebook_login').click(function(e){
        e.preventDefault();
        window.location.href="/authFacebook/done";
    })
}
$(function(){
    $('#register').click(function(){
        window.location.href = "/register"
    })
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
            else{
                alert('wrong password / email');
            }
        })
    })
    facebook_login();
})
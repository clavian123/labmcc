// function get_user(){
//     var fbid = $('#facebook_id').val;
//     var get_user = $.ajax({
//         url: '/get_user',
//         type:'POST',
//         data:{
//             fbid:fbid
//         }
//     })
//     get_user.done(function(results){
//         console.log(results)
//     })
// }

function register(){

    var c1 = new RegExp(/[0-9]/);
    var c2 = new RegExp(/[a-z A-Z]/);

    var fbid = $('#facebook_id').val();
    var username = $('#username').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var con_password = $('#con_password').val();
    var phone_number = $('#phone_number').val();

    if(username.length>=4){
        if(password.length>=6){
            if(c1.test(password)==false||c2.test(password)==false){
                if(password==con_password){
                    if(phone_number.length>=8&&phone_number.length<=16){
                        var register = $.ajax({
                            url:'/register',
                            type:'POST',
                            data:{
                                fbid : fbid,
                                username : username,
                                email : email,
                                password : password,
                                phone_number : phone_number
                            }
                        })
                        register.done(function(results){
                            sessionStorage.setItem("id",results);
                            window.location.href="/homepage"
                        })
                    }
                    else{
                        alert('phone number must be between 8 to 16 number long')
                    }
                }
                else{
                    alert('your password is not the same')
                }
            }
            else{
                alert('password must contain alphabet and numerical')
            }
        }
        else{
            alert('password must have 6 characters minimum') 
        }
    }
    else{
        alert('username must have 4 characters minimum');
    }   
}

$(function(){

    var search = window.location.search;
    var params = new URLSearchParams(search);
    if(params.get('fbid')!=null&&params.get('fbid')!="undefined"){
        $('#facebook_id').val(params.get('fbid'))
    }
    if(params.get('name')!=null && params.get('lastname')!=null){
        $('#username').val(params.get('name')+" "+params.get('lastname'))
    }
    if(params.get('email')!=null&&params.get('email')!="undefined"){
        $('#email').val(params.get('email'))
    }
    $('#register-form').submit(register());
})
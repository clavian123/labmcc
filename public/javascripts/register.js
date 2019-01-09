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


    var fbid = $('#facebook_id').val();
    var username = $('#username').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var con_password = $('#con_password').val();
    var phone_number = $('#phone_number').val();
    var check = password.split('');
    var length = 0;
    console.log(fbid,username,email,password,phone_number)
    if(username.length>=4){
        if(password.length>=6){
            for(var i = 0; i<password.length;i++){
                if(!isNaN(check[i])){
                    length = length+1;
                }
            }
            if(length == password.length){
                if(password==con_password){
                    if(phone_number.length>=8&&phone_number.length<=16){
                        var register = $.ajax({
                            url:'/regis',
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
                            console.log(results)
                            
                            if(results.message!="registered"){
                                sessionStorage.setItem("id",results.id);
                                window.location.href="/homepage"
                            }
                            else{
                                alert('Email already registered')
                            }
                            
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

    if(params.get('fbid')!=null && params.get('fbid')!="undefined"){
        $('#facebook_id').val(params.get('fbid'))
        var check_fb=$.ajax({
            url:'/check_fb',
            type: 'POST',
            data: {
                fbid:params.get('fbid')
            }
        })
        check_fb.done(function(results){
            console.log(results);
            if(results.message=="registered"){
                sessionStorage.setItem("id", results.userid.id);
                window.location.href="/homepage"
            }
            
        })
    }
    if(params.get('name')!=null && params.get('lastname')!=null){
        $('#username').val(params.get('name')+" "+params.get('lastname'))
    }
    if(params.get('email')!=null&&params.get('email')!="undefined"){
        $('#email').val(params.get('email'))
    }
    // $('#register-form').submit(function(e){
    //     e.preventDefault()
    //     register()
    // })

    $('#sign-up').click(function(e){
        e.preventDefault();
        register();
    });
})
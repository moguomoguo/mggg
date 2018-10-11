document.addEventListener('DOMContentLoaded',()=>{
            let username = document.querySelector('#username');
            let password = document.querySelector('#password');
            let btnLogin = document.querySelector('#btnLogin');

            let statusCode = [200,304];

            let xhr = new XMLHttpRequest();
            xhr.onload = function(){
                if(statusCode.indexOf(xhr.status)>=0){
                    let res = xhr.responseText;

                    if(res == 'success'){
                        location.href = '../index.html';
                    }else{
                        alert('用户名或密码错误');
                        
                    }
                }
            }

            btnLogin.onclick = function(){
                let _username = username.value;
                let _password = password.value;

                xhr.open('get',`../api/php/login.php?username=${_username}&password=${_password}`,true);
                xhr.send();
            }
        })
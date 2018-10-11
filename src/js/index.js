

$(document).ready(function(){
    
    var countDown = document.getElementById('countDown');
    var end = '2018-10-10 16:33:30';

    showTime();

    var timer = setInterval(showTime,1000);
    //倒计时
    function showTime(){
                // 2）不断拿当前时间跟结束时间对比，计算差值（单位：s）
                var offset = Math.round((Date.parse(end) - Date.now())/1000);
                

                // 5）倒计时结束时
                //  * 停止定时器
                //  * 替换购买按钮
                //  * 隐藏倒计时


                // 3）把差值转换成《剩余时间》
                var sec = offset%60;
                var min = Math.floor(offset/60)%60;
                var hour = Math.floor(offset/60/60)%24;
                var day = Math.floor(offset/60/60/24);

                // 补0操作
                sec = sec<10 ? '0'+sec : sec;
                min = min<10 ? '0'+min : min;
                hour = hour<10 ? '0'+hour : hour;

                // 4）拼接时间格式，写入页面
                countDown.innerHTML = '本场还剩：'+day + '天 ' + hour + '时' + min + '分' + sec + '秒';
             };

        let goodslist4 = document.querySelector('.goodslist4');

            // ajax核心步骤
            // 1）创建请求对象
            let xhr = new XMLHttpRequest();

            // 4)在js中处理数据
            xhr.onreadystatechange = ()=>{
                // 事件会执行4次，但只有在最后一次才确认获取到数据
                if(xhr.readyState === 4){
                    let data = JSON.parse(xhr.responseText);                    
                    // 2）根据数据生成html结构
                    let ul = document.createElement('ul');
                    ul.innerHTML = data.map(goods=>{

                        return `<li data-id="${goods.id}">
                            <img src="${goods.imgurl}"/>
                            <h4>${goods.title}</h4>
                            <p class="price">原价：<del>${goods.price}</del></p>
                            <p class="price">现价：<span>${(goods.price*goods.off).toFixed(2)}</span></p>
                        </li>`

                    }).join('');

                    // 写入页面+-

                    goodslist4.innerHTML = '';
                    goodslist4.appendChild(ul);
                }
            }

            // 2）配置参数，建立与服务器的连接
            xhr.open('get','./api/php/index.php');

            // 3）发送请求
            xhr.send();

        








});
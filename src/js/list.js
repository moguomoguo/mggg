
$(document).ready(function(){
    
    let goodslist = document.querySelector('#goodslist');
    let toobar = document.querySelector('.toobar');

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

                        return `<a href="#"><li data-id="${goods.id}">
                            <img src="${goods.imgurl}"/>
                            <h4>${goods.title}</h4>
                            <p class="price">原价：<del>${goods.price}</del></p>
                            <p class="price">现价：<span>${(goods.price*goods.off).toFixed(2)}</span></p>
                        </li></a>`

                    }).join('');

                    // 写入页面+-

                    goodslist.innerHTML = '';
                    goodslist.appendChild(ul);
                }
            }

            // 2）配置参数，建立与服务器的连接
            xhr.open('get','../api/php/list.php');

            // 3）发送请求
            xhr.send();

            let desc = false;
            toobar.onclick = e=>{
                // 价格排序
                if(e.target.className === 'sort-price'){
                    desc = !desc;

                    xhr.open('get','../api/php/list.php?sort=price' + (desc?'&desc':''),true);
                    xhr.send();
                }
            }

            //传参到详情页    

        goodslist.onclick=function(e){

                if(e.target.parentNode.tagName.toLowerCase() == 'li'){
                     var id = e.target.parentNode.getAttribute('data-id');
                        console.log(id);
                }
                location.href = '../html/goods.html?id=' + id;
               
               }


            
        

});
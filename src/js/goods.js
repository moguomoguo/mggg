

$(document).ready(function(){
    
    
    function getQueryString(name) {
    var result = window.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
    }

    var str = getQueryString("id");
    console.log(str);
    function add() {
        $.ajax({
            type: "get",
            url: "../api/php/goods.php",
            async: true,
            data: {
                'id': str   
            },
            success: function(str) {
                var dataList = JSON.parse(str);
                var good = $('.good');
                let ul = document.createElement('ul');
                    ul.innerHTML = dataList.map(goods=>{

                        return `<li data-id="${goods.id}">
                            <h4>${goods.title}</h4>
                            <p class="category">分类：${goods.category}</p>
                            <p class="price">原价：<del>${goods.price}</del>*${goods.off}(折扣)</p>
                            <p class="nowprice">现价：<span>${(goods.price*goods.off).toFixed(2)}</span></p>
                            <button type="submit" class="addgood gwc">加入购物车</button>
                            <a href="../html/car.html"><span class="buy">立即购买</span> </a>
                        </li>`

                    }).join('');
                    good.innerHTML = '';
                    good.append(ul);
            }   
    }); 
    }

    add();

        $(".jqzoom").imagezoom();
                                
        $("#thumblist li").click('a',function(){
            $(this).parents("li").remove().ClassName;
            $(this).parents("li").addClass("tb-selected");
            $(".jqzoom").attr('src',$(this).find("img").attr("mid"));
            $(".jqzoom").attr('rel',$(this).find("img").attr("big"));
        });



        $('#main .good').on('click','.gwc',function(){
               
            console.log(str);

                var goodscookie = Cookie.get('goodscookie');
                // 判断cookie
                if(goodscookie === ""){
                    goodscookie = []

                }else{
                    goodscookie = JSON.parse(goodscookie);
                }

                goodscookie.push(str);
                    // 写入cookie
                    document.cookie = 'goodscookie=' + JSON.stringify(goodscookie) + ';expires' ;


    });
          });



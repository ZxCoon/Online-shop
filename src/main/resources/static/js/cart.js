$(document).ready(function(){  setTimeout(function(){ 
    $('#button-next').on('click', function(){
        var userCart = JSON.parse(localStorage.getItem('cart'));
        var delInfo = JSON.parse(sessionStorage.getItem('deliveryInfo'));
        if(userCart.user){
            alert('user exist');
            for(var i = 0; i<userCart.length;i++){
            var orderData='?delivery=' + delInfo.delType+'&note='+delInfo.note+'&status=ordered';
                $.ajax({
                    url: mainUrl + "/orders/update/status/" + userCart[i].id +orderData,
                    type: "POST",
                    contentType: "application/json",
                    success: function () { 
                        alert('ordered');
                    },
                    error: function (error) {
                            alert(error.responseJSON.message);
                            console.log(error);
                    }
                }); 
            } 
        }else{
            alert('without user');
            for(var i = 0; i<userCart.length;i++){
                var order = {
                    "address": delInfo.address,
                    "amount": userCart[i].amount,
                    "delivery": delInfo.delType,
                    "firstName": delInfo.firstName,
                    "lastName": delInfo.lastName,
                    "note": delInfo.note,
                    "phone": delInfo.phone,
                    "productId": userCart[i].part.id,
                    "status": "ordered",
                    "userId": 0
                }     
                $.ajax({
                 url: mainUrl + "/orders",
                 type: "POST",
                 contentType: "application/json",
                 data: JSON.stringify(order),
                 success: function (data) {
                     alert('ordered');
                 },
                 error: function (error) {
                      alert(error.responseJSON.message);
                      console.log(error);
                }
            });
            }
            localStorage.removeItem('cart'); 
            window.location.href='main.html';
        }
        
        
//        
        getUserCartFromDB(); 
    }); 
    $('.count-minus').on('click', changeAmount);
    $('.count-plus').on('click', changeAmount);
    
//    var plusItem = $('.count-plus');
//    console.log(plusItem);
//    for (let i = 0; i < plusItem.length; i++) {
//        console.log(plusItem[i]);
//        plusItem[i].on("click", changeAmount);
//    }
    
   function changeAmount(){
       var itemID = this.dataset.itemId;
       console.log(itemID);
       var operation = this.innerHTML;
       //alert(operation+itemID);
       var cart = JSON.parse(localStorage.getItem('cart'));
       if(sessionStorage.getItem('user')!=null){
           var user = JSON.parse(sessionStorage.getItem('user'));  
           for(var i=0; i<cart.length; i++){
                if(cart[i].part.id == itemID){
                    switch(operation){
                        case '-': {
                            if(cart[i].amount >1){           
                                cart[i].amount--; 
                                $.ajax({
                                    url: mainUrl + "/orders/update/" + user.id + "/" + itemID +"?amount=" + cart[i].amount,
                                    type: "POST",
                                    contentType: "application/json",
                                    success: function () {
                                        getUserCartFromDB(); 
                                    },
                                    error: function (error) {
                                        alert(error.responseJSON.message);
                                    }
                                 });    
                            } 
                        } break; 
                        case '+': {
                            cart[i].amount++;
                            $.ajax({
                                url: mainUrl + "/orders/update/" + user.id + "/" + itemID +"?amount=" + cart[i].amount,
                                type: "POST",
                                contentType: "application/json",
                                success: function () {
                                    getUserCartFromDB();      
                                },
                                error: function (error) {
                                    alert(error.responseJSON.message);
                                }
                            }); 
                        } break;   
                    }
                    var inputs = $('.count-input');
                    for (var j = 0; j < inputs.length; j++) {
                        console.log(inputs[j].dataset.itemId);
                        if(inputs[j].dataset.itemId == cart[i].part.id){
                            inputs[j].value=cart[i].amount;
                        }
                    }
                }
           }
       }else{
           for(var i=0; i<cart.length; i++){
                if(cart[i].part.id == itemID){
                    switch(operation){
                        case '-': {
                            if(cart[i].amount >1){           
                                cart[i].amount--; 
                                localStorage.setItem('cart', JSON.stringify(cart));
                            }else{  //Delete order if minus one while amount = 1
//                                if(cart[i].amount == 1 && cart.length == 1){
//                                    alert('delete cart');
//                                    localStorage.removeItem('cart');
//                                }else{
//                                    cart.splice(i, 1);
//                                    localStorage.setItem('cart', JSON.stringify(cart));
//                                } 
//                                $('.content-right').empty();
//                                location.reload();
                            }
                        }; break;
                        case '+': {
                            cart[i].amount++;
                            localStorage.setItem('cart', JSON.stringify(cart));
                        }; break;
                    }    
                    var inputs = $('.count-input');
                    for (var j = 0; j < inputs.length; j++) {
                        console.log(inputs[j].dataset.itemId);
                        if(inputs[j].dataset.itemId == cart[i].part.id){
                            inputs[j].value=cart[i].amount;
                        }
                    }
                }
           }
       }
       
   }
},1000);}); 

window.$_GET = new URLSearchParams(location.search);
var action = $_GET.get('action');
var step;
var current=['','',''];

switch(action){
    case 'onclick':
        step='1';
        current=['','',''];
        current[0] = 'class="current"';
        createCartUI(current);
        setUserItems();
        break;
    case 'confirm':
        step='2';
        current=['','',''];
        current[1] = 'class="current"';
        createCartUI(current);
        $('#clear-cart').hide();
        setConfirmInterfaceDeliveryType();
        break;
    case 'complete':
        step='3';
        current=['','',''];
        current[2] = 'class="current"';
        createCartUI(current);
        $('#clear-cart').hide();
        createUIonActionComplete();
        break;
    default:     
}

function createCartUI(current){
    $(document.getElementsByClassName('content-right')).append(
    '<div id="block-step">' + 
        '<div id="name-step">' + 
            '<ul>' +
                '<li>'+ '<a '+ current[0] +'>'+'1.Кошик товарів' +'</a>'+'</li>'+
                '<li>'+ '<span>'+'&rarr;'+'</span>'+'</li>'+
                '<li>'+ '<a '+ current[1] +'>'+'2.Контакти' +'</a>'+'</li>'+
                '<li>'+ '<span>'+'&rarr;'+'</span>'+'</li>'+
                '<li>'+ '<a '+ current[2] +'>'+'3.Завершення' +'</a>'+'</li>'+
            '</ul>' +
        '</div>' +
        '<p>' + 'Крок ' + step + '</p>'+
        '<a id="clear-cart" class="first-page" href="cart.html?action=clear">' + 'Очистити' + '</a>' +
        '</div>'
    );
}
function cartItemsList(){
    $(document.getElementsByClassName('content-right')).append(
    '<div id="header-list-cart">' +
        '<div id="head1">' + 'Зображення' + '</div>' + 
        '<div id="head2">' + 'Назва товару' + '</div>' + 
        '<div id="head3">' + 'Кількість' + '</div>' + 
        '<div id="head4">' + 'Ціна' + '</div>' + 
        '</div>')
}

function setUserItems(){
    if(localStorage.getItem('cart')==null){
        console.log('empty cart');
        $(".content-right").empty();
        $(".content-right").append('Корзина порожня');
    } else{//if cart is not empty
        cartItemsList();
        console.log('cart isnt empty');
        var userCart = JSON.parse(localStorage.getItem('cart'));
        for(var i = 0; i<userCart.length; i++){           
            getOrdersFromLsAndSetOnPage(userCart[i]);
        }
    }
}

function getOrdersFromLsAndSetOnPage(cartItem){
        var imageUrl = "/images_goods/" + cartItem.part.image + ".png";
        console.log(cartItem);
        console.log(imageUrl);
        $.get(imageUrl)
                .done(function() { 
                    imageUrl = "/images_goods/" + cartItem.part.image + ".png";
                    setOrderOnPage(imageUrl, cartItem);             
                 }).fail(function() { 
                  imageUrl = "/images_goods/notfound.png";
                  setOrderOnPage(imageUrl, cartItem);
        });       
}

function setOrderOnPage(image, order){
    console.log(order);
    var mul = order.amount*order.part.price;
    $(document.getElementsByClassName('content-right')).append(
        '<div id="block-list-cart">' + 
        '<div class="img-cart">' + '<p align="center">' + '<img src="'+ image +'" width="155px" height="125px"/>' + '</p>'+ '</div>' +
        '<div class="title-cart">' + '<p>' + '<a href="">' + order.part.fullName + '</a>' + '</p>'+ '<p class="cart-features">' + order.part.description + '</p>'+ '</div>' +
        '<div class="count-cart">' + 
            '<ul class="input-count-style">' + 
                '<li>' + '<p align="center" class="count-minus" data-item-id="'+order.part.id+'">' + "-" + '</p>' + '</li>' +
                '<li>'+ '<p align="center" class="count-input">' + '<input class="count-input" data-item-id="'+order.part.id+'" maxlength="3" type="text" value="'+ order.amount+'"/>'+ '</p>' +'</li>'+
                '<li>'+ '<p align="center" class="count-plus" data-item-id="'+order.part.id+'">' + "+" + '</p>' +'</li>'+
            '</ul>' +
        '</div>' +
        '<div class="price-product">' + '<h5>' + '<span class="span-count">' + order.amount + '</span>' + 'x' + '<span>' +order.part.price+ '</span>' +'</h5>' + '<p>' + mul + '</p>' + '</div>' +
        '<div class="delete-product">' + '<a href="">'  +'<img src="/images/bsk_item_del.png">' + '</a>' + '</div>' +
        '</div>'+
        '<div id="bottom-cart-line">' + '</div>');
}

function setConfirmInterfaceDeliveryType(){
    var checked=['','',''];
    var deliveryInfo = getDeliveryInfo();
    console.log(deliveryInfo.delType);
    switch(deliveryInfo.delType){
        case 'courier': checked = ['checked','','']; break;
        case 'mail': checked = ['','checked','']; break;
        case 'self-checkout': checked = ['','','checked']; break;
    }
    //console.log(checked);
    $(document.getElementsByClassName('content-right')).append(
    '<h3 class="title-h3">' + 'Способи доставки:' + '</h3>' +
    '<form action="" method="post" onsubmit="validation(this);return false">' +
        '<ul id="info-radio">' +
            '<li>' + 
            '<input type="radio" name="order_delivery" class="order-delivery" id="order-delivery1" value="courier"' + checked[0] + '/>' +
            '<label class="label_delivery" for="order-delivery1">'+"Кур'єром"+'</label>'+
            '</li>' +
            '<li>' + 
            '<input type="radio" name="order_delivery" class="order-delivery" id="order-delivery2" value="mail"' + checked[1] + '/>' +
            '<label class="label_delivery" for="order-delivery2">'+'Поштою'+'</label>'+
            '</li>' +
            '<li>' + 
            '<input type="radio" name="order_delivery" class="order-delivery" id="order-delivery3" value="self-checkout"' + checked[2] + '/>' +
            '<label class="label_delivery" for="order-delivery3">'+'Самовивіз'+'</label>'+
            '</li>' +
        '</ul>' +
        '<h3 class="title-h3">' + 'Інформація для доставки:' + '</h3>' +
        '<ul id = "info-order">' +
         '<li>' +
         '<label for="order_name">'+'<span>'+'*'+'</span>'+'Імя'+'</label>'+'<input type="text" name="order_name" value="'+ deliveryInfo.firstName +'">'+'<span class="order_span_style">'+'Приклад'+'</span>'+
         '</li>'+
         '<li>' +
         '<label for="order_lastname">'+'<span>'+'*'+'</span>'+'Прізвище'+'</label>'+'<input type="text" name="order_lastname" value="'+ deliveryInfo.lastName +'" required>'+'<span class="order_span_style">'+'Приклад'+'</span>'+
         '</li>'+
         '<li>' +
         '<label for="order_phone">'+'<span>'+'*'+'</span>'+'Телефон'+'</label>'+'<input type="text" name="order_phone" value="'+ deliveryInfo.phone +'" required>'+'<span class="order_span_style">'+'Приклад'+'</span>'+
         '</li>'+
         '<li>' +
         '<label for="order_address">'+'<span>'+'*'+'</span>'+'Адреса доставки'+'</label>'+'<input type="text" name="order_address" value="'+ deliveryInfo.address +'" required>'+'<span class="order_span_style">'+'Приклад'+'</span>'+
         '</li>' +    
         '<li>' +
         '<label for="order_note">'+'Примітка'+'</label>'+'<textarea name="order_note">'+ deliveryInfo.note +'</textarea>'+'<span order_span_style>'+'Уточніть інформацію про замовлення, якщо необхідно'+'</span>'+
         '</li>' + 
         '<p align="right">'+
         '<input type="submit" name="submitdata" id="confirm-button-next" value="Далі">'+'</p>'+
         '</form>');
}

function getDeliveryInfo(){
     var content = $(document.getElementsByClassName('content-right')); 
     var deliveryInfo =[];
     if(sessionStorage.getItem('deliveryInfo')!=null){
         deliveryInfo = JSON.parse(sessionStorage.getItem('deliveryInfo'));
     }else{
         if(sessionStorage.getItem('user')!=null){
         var user = JSON.parse(sessionStorage.getItem('user'));
             deliveryInfo={
             "delType": "",     
             "firstName": user.firstName,
             "lastName": user.lastName,
             "address": user.address,
             "phone": user.phone,
             "note": ""     
             };
             sessionStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));
         deliveryInfo = JSON.parse(sessionStorage.getItem('deliveryInfo'));
         }else{
         deliveryInfo={
             "delType": "",    
             "firstName": "",
             "lastName": "",
             "address": "",
             "phone": "",
             "note": ""     
             };
             sessionStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));
         }  
     }
     return deliveryInfo;
}

function validation(form){
    var deliveryInfo ={
        "delType": form.order_delivery.value,    
        "firstName": form.order_name.value,
        "lastName": form.order_lastname.value,
        "address": form.order_address.value,
        "phone": form.order_phone.value,
        "note": form.order_note.value  
    }
    if(check(deliveryInfo)){
        sessionStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));
        location.assign('cart.html?action=complete');
    }else{
        return false;
    }
}

function check(deliveryInformation){
    if(!deliveryInformation.delType){
        alert('Виберіть спосіб доставки');
        return false;
    }else if(!deliveryInformation.firstName){
        alert("Введіть ім'я");
        return false;
    }else if(!deliveryInformation.lastName){
        alert("Введіть прізвище");
        return false;
    }else if(!deliveryInformation.address){
        alert("Введіть адресу доставки");
        return false;
    }else if(!deliveryInformation.phone){
        alert("Введіть номер телефону");
        return false;
    }else{
        return true;
    }
} //->validation() inner func

function setOrderHtmlInString(order){
    var order = '<li>'+'<strong>'+order.part.fullName+'</strong>'+ ' '+ order.amount + ' шт'+'</li>';
    return order;
}

function createUIonActionComplete(){
    let userCart = JSON.parse(localStorage.getItem('cart'));
    let delInfo = JSON.parse(sessionStorage.getItem('deliveryInfo'));
    let orders =[];
    for(let i = 0; i<userCart.length; i++){           
        orders[i] = setOrderHtmlInString(userCart[i]);
        }
    $('.content-right').append(
        '<ul id="list-info">'+
        '<h3>'+'Інформація щодо замовлення: '+'</h3>'+
        orders.join("") +
        '<li>'+'<strong>'+'Спосіб доставки: '+'</strong>'+ delInfo.delType +'</li>'+
        '<li>'+'<strong>'+'ПІБ: '+'</strong>'+ delInfo.firstName + ' ' + delInfo.lastName +'</li>'+
        '<li>'+'<strong>'+'Адреса доставки: '+'</strong>'+ delInfo.address +'</li>'+
        '<li>'+'<strong>'+'Телефон: '+'</strong>'+ delInfo.phone +'</li>'+
        '<li>'+'<strong>'+'Примітка: '+'</strong>'+ delInfo.note +'</li>'+
        '</ul>' +
        '<p align="right" id="button-next">'+
         '<a href="main.html">'+'Замовити'+'</a>'+'</p>'
        );
}


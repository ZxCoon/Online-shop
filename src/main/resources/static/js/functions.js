
function addItemInLocalStorageAndReload(){
    var cart = JSON.parse(localStorage.getItem('cart'));
    for(i=0; i<cart.length; i++){
       var cartItem = {   
           "address": "string",
           "amount": cart[i].amount,
           "firstName": "string",
           "lastName": "string",
           "phone": "string",
           "productId": cart[i].product.id,
           "status": "cart",
           "userId": JSON.parse(sessionStorage.getItem('user')).id
       }
            $.ajax({
                 url: mainUrl + "/orders",
                 type: "POST",
                 contentType: "application/json",
                 data: JSON.stringify(cartItem),
                 success: function (data) {
                     // RETURN ALL USERS ORDERS FROM BASE HERE
                        },
                error: function (error) {
                      alert(error.responseJSON.message);
                      console.log(error);
                }
            });
       }
} 

function changeAmountOfOrderedItemsIfNeeded(id){
    var cart = JSON.parse(localStorage.getItem('cart'));
    for(i=0; i<cart.length; i++){
       if(cart[i].product.id == id){
           cart[i].amount++; 
           localStorage.setItem('cart', JSON.stringify(cart));
           return true;
       }
    } 
}

function checkLocalStorageCartIfExist(id){
    var cart = JSON.parse(localStorage.getItem('cart'));
    for(i=0; i<cart.length; i++){
       if(cart[i].part.id == id){
           cart[i].amount++; 
           localStorage.setItem('cart', JSON.stringify(cart));
           return true;
       }
    } 
}




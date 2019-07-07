$(document).foundation();
$(document).ready(function(){  setTimeout(function(){ 
    $("#block-trackbar").trackbar({
        onMove: function() {
           $(document.getElementById("start-price")).val(this.leftValue);
           $(document.getElementById("final-price")).val(this.rightValue);
        },
        width : 200, // px
        leftLimit : 0, // unit of value
        leftValue : 0, // unit of value
        rightLimit : 100000, // unit of value
        rightValue : 100000, // unit of value
        roundUp: 1
    });
    //------------------------------Сортування-------------------------------
    $('.sort-name').click(function(){     //Збереження розміру сторінки товарів
        window.sessionStorage.setItem('sortName',$(this).html());
        console.log($(this.html()));
    });
    $('.pagesize').click(function(){     //Збереження вибору сортування
        window.sessionStorage.setItem('pagesize',$(this).html());
        console.log($(this.html()));
    });
    
    $("#page-size-sort").click(function(){
        $(document.getElementById("page-size-list")).slideToggle(200); 
        $(document.getElementById("sorting-list")).hide();    
        
    });
    
    $(document.getElementById("#select-sort")).click(function(){
         $(document.getElementById("sorting-list")).slideToggle(200); 
         $(document.getElementById("page-size-list")).hide();
    });
    //------------------------------Категорії(бажано під active зробити)----------------------------
    $("#select-category1").click(function(){
         $(document.getElementById("category-section1")).slideToggle(200);    
    });
    $("#select-category2").click(function(){
         $(document.getElementById("category-section2")).slideToggle(200);    
    });
    $("#select-category3").click(function(){
         $(document.getElementById("category-section3")).slideToggle(200);    
    });
    $("#select-category4").click(function(){
         $(document.getElementById("category-section4")).slideToggle(200);    
    });
    //--------------------------------Вхід----------------------------------------
    $("#enterMenu").click(function(){
        $(document.getElementById("block-top-auth")).slideToggle(200);
         
    });  
    $("#btnEnter").click(function(){     //Авторизація
         var login = $(document.getElementById("auth-login")).val();
         var password = $(document.getElementById("auth-pass")).val();
         var loginUserInfo = {
             "login": login,
             "password": password
         }
         console.log(loginUserInfo);
             $.ajax({
                            url: mainUrl + "/users/login",
                            type: "POST",
                            contentType: "application/json",
                            data: JSON.stringify(loginUserInfo),
                            success: function (data) {
                                if(localStorage.getItem('cart')){
                                    console.log('Auth + cart +');
                                    postCartFromLocalStorageAfterAuth(data); //Додати всі існуючі товари в localStorage into database and reload user cart
                                    location.reload();
                                }else{
                                    sessionStorage.setItem('user', JSON.stringify(data)); 
                                    console.log('Auth + cart -');
                                    getUserCartFromDB();
                                    location.reload();
                                }
                               // location.assign('main.html');
                            },
                            error: function (error) {
                                alert(error.responseJSON.message);
                                console.log(error);
                            }
             });
    });
    //--------------------------------Вихід---------------------------------------
    $(document.getElementById("logout")).click(function(){
        sessionStorage.removeItem('user');
        localStorage.removeItem('cart');
        location.reload();
    });  
    //--------------------------------Пошук товарів-------------------------
    $(document.getElementById("button-param-search")).click(function(){
        var startPrice=$(document.getElementById("start-price")).val();
        var finalPrice=$(document.getElementById("final-price")).val();
        document.getElementById("button-param-search").href = "search_filter.html?start_price=" + 
            startPrice + "&final_price=" + finalPrice;
            $(document.getElementById("block-goods-grid")).empty();
    });
    //--------------------------------Пошук товарів (верхня панелька)-------------------------
    $(document.getElementById("search-submit")).click(function(){
       var input= $(document.getElementById('search-input')).val();
       console.log(input);
       document.getElementById('search-submit').href = "search_filter.html?q=" + input;       
    }); 
    
//    $(document.getElementById("search-by-brand")).click(function(){
//        $(document.getElementById("list-brand")).slideToggle(200);  
//    });  //список марок при натисканні
//    
//    $(document.getElementById("search-by-model")).click(function(){
//        $(document.getElementById("list-model")).slideToggle(200);  
//    });  //список моделей вибранної марки при натисканні
//    
//    $(document.getElementsByClassName('brand-name')).click(function(){
////        alert("FUCK YOU JQUERY");
//        var text = $(this).val();
//        var brandButton = $(document.getElementById('current-brand'));
//        brandButton.empty();  
//        brandButton.append(text);
//        if(text!=='Марка'){
//           $(document.getElementById('search-by-model')).addClass("activated"); 
//        }else{
//           $(document.getElementById('search-by-model')).removeClass("activated"); 
//        }
//        console.log(text);
//        getAllModelsFromDB(text);
//    });
//    
//    $(document.getElementsByClassName('model-name')).click(function(){
//        var text = $(this).val();
//        console.log(text);
//        var modelButton = $(document.getElementById('current-model'));
//        modelButton.empty();  
//        modelButton.append(text);
//    });
    addCartAction();
    
},500);});   

window.$_GET = new URLSearchParams(location.search);
var user = [];
var cat= $_GET.get('cat');
var partId= $_GET.get('partId');
var search= $_GET.get('q');
var page = $_GET.get('page');
var startPrice = $_GET.get('start_price');
var finalPrice = $_GET.get('final_price');

var navSectionText;  
var navCatText;

var pageRefUrl;

var mainUrl = "http://localhost:8098";
var addUrl = '';

var siteUrl = document.location.pathname.split('/')[1];
var paramsUrl; 
var fullUrl;
getUserCartFromDB();
setAccountInformationAndHideSignButtons();
readUrlAndGetParams(); 
getAllBrandsFromDB();

if(siteUrl!=='registration.html'){
console.log('inside');
console.log(page);
createSortingHref();
getAllParts();
}
//-----------------------------Завантаження з бд---
function getAllParts() {
    getCategoryAndParts();
    console.log(addUrl);
        $.ajax({
            url: mainUrl + addUrl,
            type: "GET",
            contentType: "application/json",
            success: function (dataResponse) {
                createPageHref(dataResponse.totalPage, dataResponse.totalElements);
                $(document.getElementById("block-goods-grid")).empty();
                console.log(mainUrl + addUrl);
                setPartsToTable(dataResponse.data);
            },
            error: function (error) {
                alert(error.message);
            }
        });
    }
function setPartsToTable(parts) {  
        for (var i = 0; i < parts.length; i++) {   
            setPartToTable(parts[i]);
            }  
        }     
function setPartToTable(part) {
        var imageUrl;
        var brand = " ";
        if(part.carResponse !=null){
            brand = part.carResponse.carBrandResponse.brand;
        } 
        imageUrl = "/images_goods/" + part.image + ".png";
        console.log(part.price);
        $.get(imageUrl)
                .done(function() { 
                    imageUrl = "/images_goods/" + part.image + ".png";
                    setImageInBlock(imageUrl, part, brand);
//                    console.log(part);
//                    console.log(imageUrl);
                 }).fail(function() { 
                  imageUrl = "/images_goods/notfound.png";
                  setImageInBlock(imageUrl, part, brand);
            });
    }
function setImageInBlock(imageUrl, part, brand){
        var tableOfParts = $("#block-goods-grid");
        tableOfParts.append('<li>' 
                            + '<div class="block-image-grid">' + '<img src="'+ imageUrl +'" alt="">' + '</div>'
                            + '<p class="style-title-grid">' + '<a>' + part.fullName + '</a>' + '</p>'
                            + '<a class="add-cart-style-grid" data-tid='+ part.id +'>' + '</a>' 
                            + '<p class="style-price-grid">' +  part.price + '<strong>'+ ' грн' +'</strong>' + '</p>' 
                            + '<div class="mini-feature">' + brand  +'</div>'
                            + '</li>');
        }

//------------------------------------------------- 
function readUrlAndGetParams(){
    if(typeof page==='undefined' || page===null){  // Чи вибрана якась сторінка в товарах 
        paramsUrl = document.URL.split(siteUrl+'?')[1];  
        }else{
            paramsUrl = document.URL.split('page='+page+'&')[1];
        }
        console.log(paramsUrl);
    if(typeof paramsUrl==='undefined' || paramsUrl===null){
        paramsUrl='';
        fullUrl=siteUrl;
    } else {
        fullUrl=siteUrl+'?'+paramsUrl;
    }
    console.log(fullUrl);   
}  //Зчитуємо url і ділимо на 2 частини якщо необхідно siteUrl (*.html) і paramsUrl (?..) плюс формується fullUrl = site+params для сортування
function setSortingAndPagesize() {   
    if(window.sessionStorage.getItem('pagesize')==null){
        window.sessionStorage.setItem('pagesize',"2");
    }
    var sort;
    if(window.sessionStorage.getItem('sortName')==null){
        window.sessionStorage.setItem('sortName', 'Без сортування');
        sort = {
            "sortType": 'default',
            "sortDirection": 'ASC',
            "sortField": 'id'
        }      
        window.sessionStorage.setItem('sort', JSON.stringify(sort));
    } else {
        switch(window.sessionStorage.getItem('sortName')){   
         case 'Без сортування': {
            sort = {
            "sortType": 'default',
            "sortDirection": 'ASC',
            "sortField": 'id'
            } 
            window.sessionStorage.setItem('sort', JSON.stringify(sort));       
            } break;        
        case 'Від дешевих до дорогих': {
            sort = {
            "sortType": 'price-asc',
            "sortDirection": 'ASC',
            "sortField": 'price'
            } 
            window.sessionStorage.setItem('sort', JSON.stringify(sort));   
            } break;
        case 'Від дорогих до дешевих': {
            sort = {
            "sortType": 'price-desc',
            "sortDirection": 'DESC',
            "sortField": 'price'
            }  
            window.sessionStorage.setItem('sort', JSON.stringify(sort));    
            } break; 
        case 'від А до Я': {
            sort = {
            "sortType": 'fullName-asc',
            "sortDirection": 'ASC',
            "sortField": 'fullName'
            }  
            window.sessionStorage.setItem('sort', JSON.stringify(sort));        
            } break;         
    }  
}
    $(document.getElementById("select-sort")).append(window.sessionStorage.getItem('sortName'));
    $(document.getElementById("page-size-sort")).append(window.sessionStorage.getItem('pagesize'))
}  //Встановлення типу сортування і к-сті елементів на сторінку і збереження в Storage 
function createSortingHref(){   
    setInterfaceSearchPage();
    setSortingAndPagesize(); 
    setActivePageButtonsBackground();  
    setNavMenuText();  
    createSortingList()
    createPagesizeList();
}   // хаб для всіх необхідних методів з сортування
//---------------------Створення списків sorting-list & page-size-list ---
function createPagesizeList(){      
    var pagesizeList = $(document.getElementById("page-size-list"));
    pagesizeList.append('<li>'+'<a class="pagesize" href="'+fullUrl+'">'+'2'+'</a>'+'</li>'
                            +'<li>'+'<a  class="pagesize" href="'+fullUrl+'">'+'4'+'</a>'+'</li>'
                                +'<li>'+'<a class="pagesize" href="'+fullUrl+'">'+'8'+'</a>'+'</li>');  
} 
function createSortingList(){
    var sortingList = $(document.getElementById("sorting-list"));  
    switch(siteUrl){
//      case 'search_filter.html':{   
//         sortingList.append('<li>' + '<a class="sort-name" href="' + fullUrl+'">' + 'Без сортування' +'</a>' + '</li>'
//              + '<li>' + '<a class="sort-name" href="' + fullUrl+'">' + 'Від дешевих до дорогих' +'</a>' + '</li>'
//              + '<li>' + '<a class="sort-name" href="' + fullUrl+'">' + 'Від дорогих до дешевих'+ '</a>' + '</li>'
//              + '<li>' + '<a class="sort-name" href="' + fullUrl+'">' + 'від А до Я'+'</a>' + '</li>'); 
//            console.log('were in search');
//        } break;
      default :{
           sortingList.append('<li>' + '<a class="sort-name" href="' + fullUrl+'">' + 'Без сортування' +'</a>' + '</li>'
              +'<li>' + '<a class="sort-name" href="' + fullUrl+'">' + 'Від дешевих до дорогих' +'</a>' + '</li>'
              + '<li>' + '<a class="sort-name" href="' + fullUrl + '">' + 'Від дорогих до дешевих'+ '</a>' + '</li>'
              + '<li>' + '<a class="sort-name" href="' + fullUrl + '">' + 'від А до Я'+'</a>' + '</li>'); 
            console.log('were in '+ siteUrl);
        }        
    }
}
function setNavMenuText(){  // поділити на сторінки мейн і тд + в аппенд додати 
    var pInput = $("#homepage");
    navCatText= 'Головна';   
    navSectionText='Всі товари';
    switch(siteUrl){
        case 'main.html':{
          pInput.append('<a href="main.html">' + navCatText + '</a>'+ ' \\ ' + '<span>'+ navSectionText +'</span>');
            console.log(navCatText);
            console.log(navSectionText);
         }  break;
        case 'view_part.html':{ 
                if(typeof cat === 'undefined' || cat===null){
                    pInput.append('<a href="main.html">' + navCatText + '</a>'+ ' \\ ' + '<span>'+ navSectionText +'</span>');
                     console.log(navCatText);
                    console.log(navSectionText);
                     break; 
                } else{
                     if(typeof partId === 'undefined' || partId===null){
                        navCatText='Головна';
                        console.log(navCatText);
                        switch(cat){
                           case 'autoparts': navSectionText = 'Автозапчастини';break;
                           case 'chem': navSectionText = 'Автохімія';break;
                           case 'battery': navSectionText = 'Акумулятори';break;
                           case 'accessories': navSectionText = 'Аксесуари';break;
                           default: navSectionText='Всі товари';
                       } 
                        console.log(navSectionText);
                        console.log('cat + part - ');
                         pInput.append('<a href="main.html">' + navCatText + '</a>'+ ' \\ ' + '<span>'+ navSectionText +'</span>');
                    }else{
                        switch(cat){
                           case 'autoparts': navCatText = 'Автозапчастини';break;
                           case 'chem': navCatText = 'Автохімія';break;
                           case 'battery': navCatText = 'Акумулятори';break;
                           case 'accessories': navCatText = 'Аксесуари';break;
                           default: navCatText='Всі товари';
                       }
                       switch(partId){
                            case '100': navSectionText = 'Двигун';break;
                            case '101': navSectionText = 'Паливна система';break;
                            case '102': navSectionText = 'Система випуску газів';break;
                            case '103': navSectionText = 'Охолодження';break;
                            case '104': navSectionText = 'Трансмісія';break;
                            case '105': navSectionText = 'Гальмівна система';break;
                            case '106': navSectionText = 'Коробка передач';break;
                            case '107': navSectionText = 'Рульове керування';break;
                            default: navSectionText = '';
                        } 
                         console.log(navCatText);
                         console.log(partId);
                        console.log(navSectionText);
                        pInput.append('<a href="view_part.html?cat=' + cat +'">' + navCatText + '</a>'+ ' \\ ' + '<span>'+ navSectionText +'</span>');
                    }
                }
    }break;
        case 'search_filter.html':{  
            navCatText = 'Пошук за параметрами'
            pInput.append('<a style="color:#7F868E;">' + navCatText + '</a>'+ ' \\ ' + '<span>'+ '</span>');
        }  
 }  // Встановити текст в менюшку 
}  //  Навігація до повернення на початкову сторінку і формування тексту відповідно обраній категорії (перероблю під sessionStorage)
//-------------------------------------------------------------------------
function getCategoryAndParts(){
    var currentPage;
    var pagesize = window.sessionStorage.getItem('pagesize');
    if(typeof pagesize === 'undefined' || pagesize === null){
        pagesize=2;
    }
    if(typeof page === 'undefined' || page === null){
        currentPage=1;
    } else {
        currentPage=page;
    }
    var sort = JSON.parse(window.sessionStorage.getItem('sort'));
    
    switch(siteUrl){
        case 'main.html':{ 
            addUrl = "/parts?direction="+sort.sortDirection+"&page="+(currentPage-1)+"&size="+pagesize+"&sortFieldName="+sort.sortField;
        }break;
        case 'view_part.html':{   
                if(typeof cat === 'undefined' || cat===null){
                    console.log('cat -');
                    addUrl = "/parts?direction="+sort.sortDirection+"&page="+(currentPage-1)+"&size="+pagesize+"&sortFieldName="+sort.sortField;
                } else {
                    console.log('cat +');
                    if(typeof partId === 'undefined' || partId===null){
                        console.log('cat + partId - ');
                        switch(cat){ 
                            case 'autoparts': { 
                              addUrl = "/parts/category/from=100/to=199?direction="+sort.sortDirection+"&page="+(currentPage-1)+"&size="+pagesize+"&sortFieldName="+sort.sortField;
                          } break;
                          
                          case 'chem': {
                          addUrl = "/parts/category/from=200/to=299?direction="+sort.sortDirection+"&page="+(currentPage-1)+"&size="+pagesize+"&sortFieldName="+sort.sortField;
                          } break;
                            
                          case 'battery': {
                          addUrl = "/parts/category/from=300/to=399?direction="+sort.sortDirection+"&page="+(currentPage-1)+"&size="+pagesize+"&sortFieldName="+sort.sortField;
                          } break;
                            
                          case 'accessories': {
                          addUrl = "/parts/category/from=400/to=499?direction="+sort.sortDirection+"&page="+(currentPage-1)+"&size="+pagesize+"&sortFieldName="+sort.sortField;
                          } break;
                            
                          default: {
                          addUrl = "/parts/category/from=0/to=1000?direction="+sort.sortDirection+"&page="+(currentPage-1)+"&size="+pagesize+"&sortFieldName="+sort.sortField;
                          }                
                    }
                }
                else{
                    console.log('cat + partId - ');
                    addUrl = "/parts?direction="+sort.sortDirection+"&page="+(currentPage-1)+"&partId="+partId+"&size="+pagesize+"&sortFieldName="+sort.sortField;       
                }    
            }
        } break;
        case 'search_filter.html':{
            if(typeof search === 'undefined' || search===null){
                 console.log(search);
                 console.log('search -');
                 addUrl = "/parts/price/from="+ startPrice +"/to="+ finalPrice +"?direction="+sort.sortDirection+"&page="+(currentPage-1)+"&size="+pagesize+"&sortFieldName="+sort.sortField; 
            } else {
                 console.log('search +');
                 addUrl = "/parts?direction="+sort.sortDirection+"&page="+(currentPage-1)+"&partName="+ search + "&size="+pagesize+"&sortFieldName="+sort.sortField;
            } 
        }break;
        default: {
            console.log("page undefined");
            addUrl = "/parts?direction="+sort.sortDirection+"&page="+(currentPage-1)+"&size="+pagesize+"&sortFieldName="+sort.sortField;
        }
    }
}  //Формування addUrl для запиту до бази даних
function createPageHref(pages, elems){
    var currentUrl = document.URL;
    var currentPage;
    if(typeof page === 'undefined' || page === null){
        currentPage=1;
        pageRefUrl= currentUrl.split(siteUrl+'?')[1];
        console.log(pageRefUrl);
    } else{
        console.log(currentUrl);
        pageRefUrl= currentUrl.split(siteUrl+'?page='+page+'&')[1];
        console.log(page);
        console.log(pageRefUrl);
        currentPage = parseInt(page, 10);
    }
    if(typeof pageRefUrl==='undefined'){
        pageRefUrl='';
    }else{
        pageRefUrl= '&'+ pageRefUrl;
    }
    console.log(pageRefUrl);
   
    var pageButtons = $(document.getElementById("page-buttons"));
    pageButtons.empty();
    
    if(currentPage > 1 ){
        console.log(currentPage);
        pageButtons.append('<li class="prev-next-button">'+'<a href="'+ siteUrl + '?page=' + (currentPage-1) + pageRefUrl +'">' + 'Попередня' +'</a>' + '</li>');
    }
    
    if(currentPage > 1 && currentPage < pages){
    pageButtons.append('<li class="page-button">'+'<a href="'+ siteUrl + '?page=' + (currentPage-1) + pageRefUrl +'">' + (currentPage-1) +'</a>' + '</li>');
    pageButtons.append('<li class="page-button active">'+'<a href="'+ siteUrl + '?page=' + currentPage + pageRefUrl +'">' + currentPage +'</a>' + '</li>');
    pageButtons.append('<li class="page-button">'+'<a href="'+ siteUrl + '?page=' + (currentPage+1) + pageRefUrl +'">' + (currentPage+1) +'</a>' + '</li>');
    }else if(currentPage > 1){
        pageButtons.append('<li class="page-button">'+'<a href="'+ siteUrl + '?page=' + (currentPage-1) + pageRefUrl +'">' + (currentPage-1) +'</a>' + '</li>');
        pageButtons.append('<li class="page-button active">'+'<a href="'+ siteUrl + '?page=' + currentPage + pageRefUrl +'">' + currentPage +'</a>' + '</li>'); 
    }else if(currentPage < pages){
        pageButtons.append('<li class="page-button active">'+'<a href="'+ siteUrl + '?page=' + currentPage + pageRefUrl +'">' + currentPage +'</a>' + '</li>');
        pageButtons.append('<li class="page-button">'+'<a href="'+ siteUrl + '?page=' + (currentPage+1) + pageRefUrl +'">' + (currentPage+1) +'</a>' + '</li>');
    }
    
     if(currentPage < pages){
        console.log(currentPage);
        pageButtons.append('<li class="prev-next-button">'+'<a href="'+ siteUrl + '?page=' + (currentPage+1) + pageRefUrl +'">' + 'Наступна' +'</a>' + '</li>'); 
    }    
}  // Навігація серед товарів
function setAccountInformationAndHideSignButtons(){
    if(window.sessionStorage.getItem('user')!=null){
       user = JSON.parse(sessionStorage.getItem('user'));
    $(document.getElementById("reg-auto-title")).hide();
    $(document.getElementById("account-name")).append(user.login);
    }else{
        $(document.getElementById("header-top-menu")).hide();
    }
    
}  // Авторизація на сторінці(hide signUp & signIn buttons) 
function setActivePageButtonsBackground(){
    var header = document.getElementById("page-buttons");
    var buttons = header.getElementsByClassName('page-button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].click(function(){
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";   
        });
    }     
}  //Підсвітка для активної сторінки (зміна класу active)
//--------------------Top search block------------------------
function getAllBrandsFromDB(){
    $.ajax({
            url: mainUrl + '/carBrands',
            type: "GET",
            contentType: "application/json",
            success: function (dataResponse) {
                console.log(dataResponse);
                $(document.getElementById("list-brand")).empty();
                setBrandToList(dataResponse);
            },
            error: function (error) {
                alert(error.message);
            }
        });
}
function getAllModelsFromDB(brand){
    $.ajax({
            url: mainUrl + '/cars/'+brand,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(brand),
            success: function (dataResponse) {
                console.log(dataResponse);
                $(document.getElementById("list-model")).empty();
                setModelToList(dataResponse);
            },
            error: function (error) {
                alert(error.message);
            }
        });
}
function setBrandToList(data){
    var brandList =  $(document.getElementById("list-brand"));
    for (var i = 0; i < data.length; i++) {
        console.log(data[i].brand);
        brandList.append('<li class="brand-list-element">'+'<input class="brand-name" type="button" value='+data[i].brand+'>'+'</li>'
        );
    }
}
function setModelToList(data){
    var modelList =  $(document.getElementById("list-model"));
    for (var i = 0; i < data.length; i++) {
        console.log(data[i].model);
        modelList.append('<li class="model-list-element">'+'<input class="model-name" type="button" value='+data[i].model+'>'+'</li>'
        );
    }
}

function setInterfaceSearchPage(){
    if(siteUrl=='search_filter.html'){
        console.log("tyt");
        console.log($('#search-by-car-model').attr('class'));
        $('#search-by-value').addClass('is-active'); 
        $('#react-tabs_2-1').addClass('is-active'); 
        $('#search-by-car-model').removeClass('is-active'); 
        $('#react-tabs_1-1').removeClass('is-active'); 
        $('#search-input').attr('value', search); 
        
    }
}

function getUserCartFromDB(){
    var amount = 0;
    var userCart=[];
    if(sessionStorage.getItem('user')!=null){                    //user not null
        user = JSON.parse(sessionStorage.getItem('user'));
        console.log(user);
            $.ajax({
                url: mainUrl + "/orders/id/" + user.id,
                type: "GET",
                contentType: "application/json",
                success: function (dataResponse) {
                    console.log('success');
                    localStorage.setItem('cart', JSON.stringify(dataResponse));
                    userCart = JSON.parse(localStorage.getItem('cart'));
                    console.log(amount);
                    for(var i = 0; i < userCart.length; i++){
                        console.log(userCart[i].amount);
                        amount +=  userCart[i].amount;
                    } 
                    console.log(amount);
                    $('#cart-ref').empty();
                    $('#cart-ref').append('Кошик' +' (' + amount + ')');
                },
                error: function (error) {
                    alert(error.message);
                }
            });   
    }else{                                                              //without user
       if(localStorage.getItem('cart')!=null){                 //cart not null
           userCart = JSON.parse(localStorage.getItem('cart'));
           for(var i = 0; i < userCart.length; i++){
               amount += userCart[i].amount;
           }
           console.log('user null, cart not empty');
           $('#cart-ref').empty();
           $('#cart-ref').append('Кошик' +' (' + amount + ')');
       }else{                                                           //cart doesnt exist           
           //nothing
           console.log('user null, cart empty');
           $('#cart-ref').empty();
           $('#cart-ref').append('Кошик' +' (' + amount + ')');
       }
    }
    
}   //Завантаження з бази чи браузера корзини 

function addCartAction(){
    var cartClick = document.getElementsByClassName('add-cart-style-grid');
    var cartArray =[]; 
    var item = [];
        for (i=0; i< cartClick.length; i++)
            cartClick[i].onclick = function(){   
             var partId = this.dataset.tid;  
             if(sessionStorage.getItem('user')!=null){
             user = JSON.parse(sessionStorage.getItem('user'));      
                 if(localStorage.getItem('cart')!=null){
                     cartArray = JSON.parse(localStorage.getItem('cart'));
                     var orderId = checkOrderAndReturnID(partId);
                     console.log('orderId = ' + orderId);
                     if(orderId!=null){                           //Товар вже є в корзині і базі
                         cartArray[orderId].amount++;
                         //http://localhost:8098/orders/id/{userId}/{partId}?amount={}
                         console.log('Found same id' + orderId);
                         $.ajax({
                                url: mainUrl + "/orders/update/" + user.id + "/" + partId +"?amount=" + cartArray[orderId].amount,
                                type: "POST",
                                contentType: "application/json",
                                success: function () {
                                    getUserCartFromDB();   
                                },
                         error: function (error) {
                                alert(error.responseJSON.message);
                                console.log(error);
                                }
                         }); 
                     }else{                             //Товару нема  // Bug завантажує в базу але іноді не відразу в localStorage?
                         $.ajax({
                             url: mainUrl + "/parts/" + partId,
                             type: "GET",
                             contentType: "application/json",
                             success: function (dataResponse) {
                                 item = {
                                     "part" : dataResponse,
                                     "status" : "cart",
                                     "amount" : 1
                                 };
                                 console.log('part ordered');
                             postOneOrderIntoDB(item); 
                             getUserCartFromDB();    
                             },
                             error: function (error) {
                                 alert(error.message);
                            }
                         });     
                     };   
                 } else {
                     $.ajax({
                             url: mainUrl + "/parts/" + partId,
                             type: "GET",
                             contentType: "application/json",
                             success: function (dataResponse) {
                                 item = {
                                     "part" : dataResponse,
                                     "status" : "cart",
                                     "amount" : 1
                                 };
                             postOneOrderIntoDB(item); 
                             getUserCartFromDB();    
                             },
                             error: function (error) {
                                 alert(error.message);
                            }
                         });   
                 };
             }else{                                     //немає користувача
                 $.ajax({
                 url: mainUrl + "/parts/" + partId,
                 type: "GET",
                 contentType: "application/json",
                 success: function (dataResponse) {
                    item = {
                         "part" : dataResponse,
                         "status" : "cart",
                         "amount" : 1
                     };
                     if(!localStorage.getItem('cart')) {
                         cartArray.push(item);
                         localStorage.setItem('cart', JSON.stringify(cartArray));
                         getUserCartFromDB();
                     }else{
                        if(changeAmountOfOrderedItemsIfNeeded(partId)){
                            getUserCartFromDB();
                            console.log('true');
                        } else{
                            console.log('false');
                            cartArray = JSON.parse(localStorage.getItem('cart'));
                            cartArray.push(item);
                            localStorage.setItem('cart', JSON.stringify(cartArray));
                            getUserCartFromDB();
                        }
                     }
                    console.log(localStorage.getItem('cart')); 
                 },
                 error: function (error) {
                     alert(error.message);
                 }
                 });     
             }
             
        };
    console.log(cartClick);
    console.log(cartClick.length);
}  // Додає товар в корзину

function changeAmountOfOrderedItemsIfNeeded(id){
    var cart = JSON.parse(localStorage.getItem('cart'));
    for(i=0; i<cart.length; i++){
       if(cart[i].part.id == id){
           cart[i].amount++; 
           localStorage.setItem('cart', JSON.stringify(cart));
           return true;
       }
    } 
    return false;
}

function postCartFromLocalStorageAfterAuth(user){
    sessionStorage.setItem('user', JSON.stringify(user)); 
    user = JSON.parse(sessionStorage.getItem('user'));
    var cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
    console.log(user);
    $.ajax({
        url: mainUrl + "/orders/id/" + user.id,
        type: "GET",
        contentType: "application/json",
        success: function (dataResponse) {
           var cartFromDB=dataResponse;
           console.log(cartFromDB);
           for(var i=0; i<cartFromDB.length; i++){
                for(var j=0; j < cart.length; j++){
                    if(cartFromDB[i].part.id==cart[j].part.id){
                            cartFromDB[i].amount += cart[j].amount;
                            //code for changing amount 
                            $.ajax({
                                url: mainUrl + "/orders/update/" + user.id + "/" + cartFromDB[i].part.id +"?amount=" + cartFromDB[i].amount,
                                type: "POST",
                                contentType: "application/json",
                                success: function (data) {
                                    console.log('changed');
                                },
                                error: function (error) {
                                alert(error.responseJSON.message);
                                console.log(error);
                                }
                            });
                    }
                    console.log('added items: ' + cart[j].amount + 'into id:'+ cartFromDB[i].part.id);
                    cart.splice(j, 1);                
                }
           } 
        console.log(cart);
        for(var i=0; i<cart.length; i++){
            postOneOrderIntoDB(cart[i], user);
        }
        getUsersCart(user.id); 
        },
        error: function (error) {
        alert(error.message);
        }
    }); 
}

function getUsersCart(id){
    $.ajax({
        url: mainUrl + "/orders/id/" + id,
        type: "GET",
        contentType: "application/json",
        success: function (dataResponse) {
        localStorage.setItem('cart', JSON.stringify(dataResponse));
        },
        error: function (error) {
        alert(error.message);
        }
    });
}

function postOneOrderIntoDB(item){
    user = JSON.parse(sessionStorage.getItem('user'));
    var cartItem = {   
           "address": user.address,
           "amount": item.amount,
           "firstName": user.firstName,
           "lastName": user.lastName,
           "phone": user.phone,
           "productId": item.part.id,
           "status": item.status,
           "userId": user.id
       }
    console.log('order created');
           $.ajax({
                 url: mainUrl + "/orders",
                 type: "POST",
                 contentType: "application/json",
                 data: JSON.stringify(cartItem),
                 success: function (data) {
                },
                error: function (error) {
                      alert(error.responseJSON.message);
                      console.log(error);
                }
            });
}

function checkOrderAndReturnID(partId){
    var cart =  JSON.parse(localStorage.getItem('cart'));
    for(var i = 0; i < cart.length; i++){
        if(cart[i].part.id == partId){
            return i;
        }
    } 
    return null;
}  // Перевірка на повторне замовлення
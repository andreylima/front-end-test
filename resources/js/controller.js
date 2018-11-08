$(function () {

  var imageTemplate = $("#image-template").html(),
      imageTemplateCompiled = Handlebars.compile(imageTemplate),
      imageTemplateContext = {},
      imageTemplateCompiledHtml,
      cupomTemplate = $("#cupom-template").html(),
      cupomTemplateCompiled = Handlebars.compile(cupomTemplate),
      cupomTemplateContext = {},
      cupomTemplateCompiledHtml,
      checkoutInfoTemplate = $("#checkoutInfo-template").html(),
      checkoutInfoTemplateCompiled = Handlebars.compile(checkoutInfoTemplate),
      checkoutInfoTemplateContext = {},
      checkoutInfoTemplateCompiledHtml,
      buttonsTemplate = $("#buttons-template").html(),
      buttonsTemplateCompiled = Handlebars.compile(buttonsTemplate),
      buttonsTemplateContext = {},
      modalTemplateCompiledHtml,
      modalTemplate = $("#modal-template").html(),
      modalTemplateCompiled = Handlebars.compile(modalTemplate),
      modalTemplateContext = {},
      modalTemplateCompiledHtml,
      data = {};

function getCheckoutId () {
    var sPageURL = decodeURIComponent(window.location),
    sURLVariables = sPageURL.split('/');
    return sURLVariables[6];
};

function httpCall(param, callback){
  
  const Http = new XMLHttpRequest();
    const url='/api/checkouts/'+getCheckoutId();
  if (param == "undefined") {
    Http.open("GET", url);
  } else {
    Http.open("GET", url+"?"+param);
  }
  
  Http.send();
    Http.onreadystatechange=(e)=>{
    if (Http.readyState == XMLHttpRequest.DONE ) {
      data = JSON.parse(Http.responseText);
      console.log(data);
      if (callback) {
        callback(data);
      } else {
        createContext(data);
      }
    }

  }

}

function httpPost(param){
  const Http = new XMLHttpRequest();
    const url='/api/checkouts/'+getCheckoutId();
  if (param == undefined) {
    Http.open("POST", url);
  } else {
    Http.open("POST", url+"?"+param);
  }
  
  Http.send();
    Http.onreadystatechange=(e)=>{
    if (Http.readyState == XMLHttpRequest.DONE ) {
        showModal({subject: subjectComprar, message:messageComprar});
    }

  }

}


  function createContext(data){
    imageTemplateContext = {
      "productImage" : data.product.image,
      "title"        : data.product.title
    }

    cupomTemplateContext = {
      "cupons" :  data.checkout.availableCoupons
    }

    checkoutInfoTemplateContext = {
      "itemPrice" :  data.product.price,
      "shippingPrice": data.checkout.shippingPrice,
      "totalPrice": data.product.price+data.checkout.shippingPrice
    }


    compileHtm();
  }

  function compileHtm(){
    imageTemplateCompiledHtml = imageTemplateCompiled(imageTemplateContext);
    cupomTemplateCompiledHtml = cupomTemplateCompiled(cupomTemplateContext);
    checkoutInfoTemplateCompiledHtml =  checkoutInfoTemplateCompiled( checkoutInfoTemplateContext);
    buttonsTemplateCompiledHtml =  buttonsTemplateCompiled();
    modalTemplateCompiledHtml =  modalTemplateCompiled();

    append();
  }


var modal,
    subject,
    message,
    button,
    cancelarBtn,
    comprarBtn,
    screenLocker = jQuery(".screenLocker"),
    cupomSelected = 0,
    cupomValue,
    cupomValueObj,
    discount,
    total;

  function append(){
    $('.container').append(imageTemplateCompiledHtml);
    $('.container').append(cupomTemplateCompiledHtml);
    $('.container').append(checkoutInfoTemplateCompiledHtml);
    $('.container').append(buttonsTemplateCompiledHtml);
    $('.screenLocker').append(modalTemplateCompiledHtml);

    modal = jQuery(".modal"),
    modalIcon = jQuery(".modal img"),
    subject = jQuery(".subject"),
    message = jQuery(".message"),
    button = jQuery(".cupomItem"),
    cancelarBtn = jQuery(".cancelarBtn"),
    comprarBtn = jQuery(".confirmarBtn"),
    cupomValueObj = jQuery(".cupomValue"),
    discount = jQuery(".cupomValue .discount"),
    total = jQuery(".totalPrice");

    cancelarBtn.click(function(){
      modalIcon.attr("src","/resources/img/redCart.gif");
      showModal({subject: subjectCacelar, message:messageCancelar});
    })

    comprarBtn.click(function(){
      modalIcon.attr("src","/resources/img/greenCart.gif");
      if (cupomSelected != 0) {
        httpPost("couponId="+cupomSelected);
      } else {
        httpPost();
      }
      // showModal({subject: subjectComprar, message:messageComprar});
    })

    jQuery("input[type='radio']").click(function(){
      cupomSelected = jQuery(this).attr("value");


      httpCall("couponId="+cupomSelected, function(data){
        Object.keys(data.checkout.availableCoupons).forEach(function(k){
            if (data.checkout.availableCoupons[k]["id"] == cupomSelected) {
                cupomValue = data.checkout.availableCoupons[k]["discount"];
                discount.html("- R$"+cupomValue);
            } else {
              discount.html("R$0");
            }
        });
          cupomValueObj.removeClass("hasCupom");
        if (cupomSelected != 0) {
          cupomValueObj.addClass("hasCupom");
        }
        
        total.html("R$"+data.checkout.totalPrice);
      });


    });

  }
  
  httpCall();



const subjectCacelar = "compra cancelada",
    messageCancelar = "O pedido não foi enviado e você não será cobrado.",
    subjectComprar = "compra confirmada",
    messageComprar = "enviaremos atualizações sobre o pedido para seu e-mail";

function showModal(data){
  subject.html(data.subject);
  message.html(data.message);

  screenLocker.fadeIn();
  modal.fadeIn();
}

screenLocker.click(function(){
  screenLocker.fadeOut();
  modal.fadeOut();

})

});


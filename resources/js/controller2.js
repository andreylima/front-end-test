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

function httpCall(param){
  
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
      createContext(data);
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

  function append(){
    $('.container').append(imageTemplateCompiledHtml);
    $('.container').append(cupomTemplateCompiledHtml);
    $('.container').append(checkoutInfoTemplateCompiledHtml);
    $('.container').append(buttonsTemplateCompiledHtml);
    $('.container').append(modalTemplateCompiledHtml);
  }
  
  httpCall();
});


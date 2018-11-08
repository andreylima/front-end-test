$(function () {

  var image-template = $("image-template").html(),
      imageTemplateCompiled = Handlebars.compile(theTemplateScript),
      imageTemplateContext = {},
      cupom-template = $("cupom-template").html(),
      cupomTemplateCompiled = Handlebars.compile(theTemplateScript),
      cupomTemplateContext = {},
      checkoutInfo-template = $("checkoutInfo-template").html(),
      checkoutInfoTemplateCompiled = Handlebars.compile(theTemplateScript),
      checkoutTemplateContext = {},
      buttons-template = $("buttons-template").html(),
      buttonsTemplateCompiled = Handlebars.compile(theTemplateScript),
      buttonsTemplateContext = {},
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
    }

  }

}


  function createContext(data){
    imageTemplateContext = {
      "productImage" : data.product.image,
      "title"        : data.product.title
    }
  }

  // Pass our data to the template
  var imageTemplateCompiledHtml = imageTemplateCompiled(imageTemplateContext);

  // Add the compiled html to the page
  $('.container').html(imageTemplateCompiledHtml);
});

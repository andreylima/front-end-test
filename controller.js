(function() {

function getCheckoutId () {
    var sPageURL = decodeURIComponent(window.location),
    sURLVariables = sPageURL.split('/');
    return sURLVariables[6];
};

var productId;

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
		console.log(JSON.parse(Http.responseText));
		}

	}

}


httpCall();


var modal = document.getElementsByClassName("modal")[0],
	subject = document.getElementsByClassName("subject")[0],
	message = document.getElementsByClassName("message")[0],
	button = document.getElementsByClassName("cupomItem")[0],
	cancelarBtn = document.getElementsByClassName("cancelarBtn")[0],
	comprarBtn = document.getElementsByClassName("comprarBtn")[0];

const subjectCacelar = "compra cancelada",
	  messageCancelar = "O pedido não foi enviado e você não será cobrado.",
	  subjectComprar = "compra confirmada",
	  messageComprar = "enviaremos atualizações sobre o pedido para seu e-mail";

function showModal(data){
	console.log(data);
	subject.innerHTML = data.subject;
	message.innerHTML = data.message;


}

button.addEventListener('click',function(){
	httpCall("couponId=3")
})

cancelarBtn.addEventListener('click',function(){
	showModal({subject: subjectCacelar, message:messageCancelar});
})

comprarBtn.addEventListener('click',function(){
	showModal({subject: subjectComprar, message:messageComprar});
})

})();
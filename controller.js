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

var button = document.getElementsByTagName("button")[0];

button.addEventListener('click',function(){
	httpCall("couponId=3")
})

})();
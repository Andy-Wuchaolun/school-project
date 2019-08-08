function one(){
	var oDiv = document.getElementById('txt');
	oDiv.style.width='400px';
	oDiv.style.height='400px';
	oDiv.style.background='blue';
}
	// var oDiv = document.getElementById('txt');
	// oDiv.onmouseover = one;
	var oDiv = document.getElementById('txt');
	oDiv.onmouseover = function(){
		one();
	}
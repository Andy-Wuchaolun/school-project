var animate = function(obj,attr,target){
		clearInterval(obj.timer);
		var iSpeed = 0;		
		obj.timer = setInterval(function(){
			var current =parseFloat(getComputedStyle(obj,false)[attr]);
			if(attr == 'opacity'){
				current = Math.round(current*100)
			}
			if(current < target){
				iSpeed = 50;
			}else{
				iSpeed = -50;
			}
			if(Math.abs(target - current) < Math.abs(iSpeed)){
				if(attr == 'opacity'){
					obj.style[attr] = '1';
				}else{
					obj.style[attr]= target;
				}
				clearInterval(obj.timer)
			}else{
				if(attr == 'opacity'){
					obj.style[attr] = (current + iSpeed)/100;
				}else{
					obj.style[attr] = current + iSpeed +'px';
				}
			}
		},30)
	}
function getScrollTop(){
	return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
}
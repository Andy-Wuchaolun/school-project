//匀速运动的多物体同时运动
var animate = function(obj,attr,target){
		clearInterval(obj.timer);
		var iSpeed = 0;		
		obj.timer = setInterval(function(){
			var current =parseFloat(getComputedStyle(obj,false)[attr]);
			if(attr == 'opacity'){
				current = Math.round(current*100)
			}
			if(current < target){
				iSpeed = 10;
			}else{
				iSpeed = -10;
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
//减速运动的多物体同时运动
var animite1 = function(obj,attr,target){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var current = parseFloat(getComputedStyle(obj,false)[attr]);
		if(attr == 'opacity'){
			current = Math.round(current*100);
		}
		var iSpeed = 0;
		iSpeed = (target - current)/10;
		if(iSpeed >0){
			iSpeed = Math.ceil(iSpeed)
		}else{
			iSpeed = Math.floor(iSpeed)
		}
		console.log('iSpeed',iSpeed,current)
		if(!iSpeed){
			if(attr == 'opacity'){
				obj.style[attr] = '0.5';
			}else{
				obj.style[attr] = target;
			}				
			clearInterval(obj.timer)
		}else{
			if(attr == 'opacity'){
				obj.style[attr] = (current + iSpeed)/100;
			}else{
				obj.style[attr] = current + iSpeed + 'px';
			}
		}
	},30)	
}
//综合动画-多值动画
function animation(obj,options,isLinear,fnEnd){
	if(typeof isLinear == undefined){
		isLinear = true;
	}
	//防止开启多个定时器
	clearInterval(obj.timer);
	var iSpeed = 0;//定义速度（如果定义在定时器里边的话，每次都会定义一个变量，在这里只用定义一次）
	obj.timer = setInterval(function(){//开启定时器
		var isStopAll = true;//当这个值为真是，关闭定时器，停止所有动画
		for(var attr in options){
			var current  = parseFloat(getComputedStyle(obj,false)[attr]);//当前值
			if(attr == 'opacity'){//如果是透明度的话，要乘以100，方便计算
				current = Math.round(current *100);
			}
			if(isLinear){//执行匀速动画
				//匀速动画速度
				if(current < options[attr]){
					iSpeed = 10;
				}else{
					iSpeed = -10;
				}
				//匀速动画的结束条件
				if(Math.abs(options[attr] - current) < Math.abs(iSpeed)){
					if(attr == 'opacity'){//把匀速动画的结果直接调到目标值(只有匀速才有)
						obj.style[attr] = options[attr]/100;
					}else{
						obj.style[attr] = options[attr] + 'px';
					}
				}else{
					isStopAll = false;//只要有一个值没有变化完毕，动画就不能停止（定时器就不能关闭）
				}
			}else{//减速动画
				//减速动画速度
				iSpeed = (options[attr] - current)/10;
				iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				//减速动画的结束条件
				if(iSpeed){
					isStopAll = false;//只要有一个值没有变化完毕，动画就不能停止（定时器就不能关闭）
				}
			}
			if(isStopAll){//判断此变量，决定是否关闭定时器
				clearInterval(obj.timer);//关闭定时器
				typeof fnEnd == 'function' && fnEnd();//如果有传入函数的话，执行否则不执行
			}else{//不停止动画，继续执行
				if(attr == 'opacity'){
					obj.style[attr] = (current + iSpeed)/100;
				}else{
					obj.style[attr] = current + iSpeed +'px';
				}
			}
		}
		
	},30)
}
function getScrollTop(){
	return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
}
function getScrollLeft(){
	return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
}
function getStyle(obj, name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj, false)[name];
	}
}



//对象在js中表示为“{}”括起来的内容，数据结构为 {key：value,key：value,...}的键值对的结构
//key为对象的属性，value为对应的属性值，取值方法为 对象.key 获取属性值

function startMove(obj, json, fnEnd)			//用json对象方式代替原有属性名与值，实现多组运动 
{												//例如json={width: 400, height: 400}
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;							//假设：所有值都已经到了
		
		for(var attr in json)					//for in遍历
		{
			var cur=0;
			
			if(attr=='opacity')
			{
				cur=Math.round(parseFloat(getStyle(obj, attr))*100);
			}
			else
			{
				cur=parseInt(getStyle(obj, attr));
			}
			
			var speed=(json[attr]-cur)/6;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(cur!=json[attr])					//如果有未到达目标值的运动
				bStop=false;
			
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;
			}
			else
			{
				obj.style[attr]=cur+speed+'px';
			}
		}
		
		
		if(bStop)								//当假设还成立时，即所有运动都到达目标值执行下面的部分
		{										//如果有未达到目标值的运动 bStop=false，不会执行下面部分，继续运动
			clearInterval(obj.timer);			//此时在关闭定时器
						
			if(fnEnd)fnEnd();
		}
	}, 30);
}
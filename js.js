/**
 * @author ${hisham_maged10}
 *https://github.com/hisham-maged10
 * ${WebApps}
*/
var bgImg=null;
var fgImg=null;
var ogImg=null;
var grayImg=null;
var rainbowImg=null;
var rainbowImgV=null;
var redImg=null;
var borderImg=null;
var blurImg=null;
function loadBg()
{
	var canvas=document.getElementById("bgCanvas");
	var fileinput=document.getElementById("bgFile");
	bgImg=new SimpleImage(fileinput);
	bgImg.drawTo(canvas);
}

function loadFg()
{
	var canvas=document.getElementById("fgCanvas");
	var fileinput=document.getElementById("fgFile");
	fgImg=new SimpleImage(fileinput);
	fgImg.drawTo(canvas);
}
function loadImg()
{
	var canvas=document.getElementById("filterCanvas");
	var fileinput=document.getElementById("filterFile");
	ogImg=new SimpleImage(fileinput);
	grayImg=new SimpleImage(fileinput);
	rainbowImg=new SimpleImage(fileinput);
	rainbowImgV=new SimpleImage(fileinput);
	redImg=new SimpleImage(fileinput);
	borderImg=new SimpleImage(fileinput);
	blurImg=new SimpleImage(fileinput);
	ogImg.drawTo(canvas);
}
function makeComposite()
{
	if(fgImg==null || !fgImg.complete() || bgImg==null || !bgImg.complete())
	{
		alert("first load the background image, foregound Image then press the button");
		return;
	}
	var canvas=document.getElementById("compCanvas");
	var output=new SimpleImage(fgImg.getWidth(),fgImg.getHeight());
	for(var pixel of fgImg.values())
	{
		if(pixel.getGreen()>pixel.getRed()+pixel.getBlue())
		{
			output.setPixel(pixel.getX(),pixel.getY(),bgImg.getPixel(pixel.getX(),pixel.getY()));
		}
		else
		{
			output.setPixel(pixel.getX(),pixel.getY(),pixel);
		}
	}
	output.drawTo(canvas);
}
function reset()
{
	if(ogImg==null || !ogImg.complete()){
		alert("please choose an image or wait for it to complete loading");
		return;
	}
	var canvas=document.getElementById("filterCanvas");	
	canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
	ogImg.drawTo(canvas);
}
function makeHorizontalRainbow()
{
	if(ogImg==null || !ogImg.complete()){
		alert("please choose an image or wait for it to complete loading");
		return;
	}
	var canvas=document.getElementById("filterCanvas");
	canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
	var rainbow=new SimpleImage(ogImg.getWidth(),ogImg.getHeight());
	var neededW=rainbowImg.getWidth()/7;
	for(var pixel of rainbowImg.values())
	{
		//red,orange,yellow,green,blue,indigo,violet
		if(pixel.getX()<=neededW)
		{
			pixel.setRed(255);
			
		}
		else if(pixel.getX()>neededW && pixel.getX()<=neededW*2)
		{
			pixel.setRed(255);
			pixel.setGreen(165);
		}
		else if(pixel.getX()>neededW*2 && pixel.getX()<=neededW*3)
		{
			pixel.setRed(255);
			pixel.setGreen(255);
		}
		else if(pixel.getX()>neededW*3 && pixel.getX()<=neededW*4)
		{
			pixel.setGreen(255);
		}
		else if(pixel.getX()>neededW*4 && pixel.getX()<=neededW*5)
		{
			pixel.setBlue(255);
		}
		else if(pixel.getX()>neededW*5 && pixel.getX()<=neededW*6)
		{
			pixel.setRed(75);
			pixel.setBlue(130);
		}
		else
		{
			pixel.setRed(255);
			pixel.setBlue(255);
		}
		pixel.setAlpha(150);
		rainbow.setPixel(pixel.getX(),pixel.getY(),pixel);		
	}
	rainbow.drawTo(canvas);
	
}
function makeRed()
{
	if(ogImg==null || !ogImg.complete()){
		alert("please choose an image or wait for it to complete loading");
		return;
	}
	var canvas=document.getElementById("filterCanvas");
	canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
	var red=new SimpleImage(ogImg.getWidth(),ogImg.getHeight());
	for(var pixel of redImg.values())
	{	
		pixel.setRed(255);
		red.setPixel(pixel.getX(),pixel.getY(),pixel);
	}
	red.drawTo(canvas);
}
function makeBlur()
{
	if(ogImg==null || !ogImg.complete()){
		alert("please choose an image or wait for it to complete loading");
		return;
	}
	var canvas=document.getElementById("filterCanvas");
	canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
	var blur=new SimpleImage(ogImg.getWidth(),ogImg.getHeight());
	for(var pixel of blurImg.values())
	{
		if(Math.random()<=0.5)
		{
			blur.setPixel(pixel.getX(),pixel.getY(),pixel);
		}
		else
		{
			var x=randomRanged(7);
			var y=randomRanged(7);
			do{
				x--;
			}while(pixel.getX()+x>=(blurImg.getWidth()-1));
			do{
				y--;
			}while(pixel.getY()+y>=(blurImg.getHeight()-1));
			//var y=randomRanged(10,pixel.getY(),blurImg.getHeight());
			blur.setPixel(pixel.getX()+x,pixel.getY()+y,pixel);
		}		
	}
	blur.drawTo(canvas);
}
function randomRanged(max)
{
	return Math.floor(Math.random()*max)+1;
}
function makeBorder()
{
	if(ogImg==null || !ogImg.complete()){
		alert("please choose an image or wait for it to complete loading");
		return;
	}
	var canvas=document.getElementById("filterCanvas");
	canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
	var border=new SimpleImage(ogImg.getWidth(),ogImg.getHeight());
	for(var pixel of borderImg.values())
	{
		if(pixel.getX()<=50|| pixel.getY()<=50 || pixel.getX()>=borderImg.getWidth()-50 || pixel.getY()>=borderImg.getHeight()-50)
		{
			pixel.setRed(0);
			pixel.setBlue(0);
			pixel.setGreen(0);
		}
	}
	borderImg.drawTo(canvas);
	
}
function changeBg()
{
	var clr=document.getElementById("clr");
	document.getElementById("bg").style.backgroundColor=clr.value;
}
function makeVerticalRainbow()
{
	if(ogImg==null || !ogImg.complete()){
		alert("please choose an image or wait for it to complete loading");
		return;
	}
	var canvas=document.getElementById("filterCanvas");
	canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
	var rainbow=new SimpleImage(ogImg.getWidth(),ogImg.getHeight());
	var neededH=rainbowImgV.getHeight()/7;
	for(var pixel of rainbowImgV.values())
	{
		if(pixel.getY()<=neededH)
		{
			pixel.setRed(255);
			
		}
		else if(pixel.getY()>neededH && pixel.getY()<=neededH*2)
		{
			pixel.setRed(255);
			pixel.setGreen(165);
		}
		else if(pixel.getY()>neededH*2 && pixel.getY()<=neededH*3)
		{
			pixel.setRed(255);
			pixel.setGreen(255);
		}
		else if(pixel.getY()>neededH*3 && pixel.getY()<=neededH*4)
		{
			pixel.setGreen(255);
		}
		else if(pixel.getY()>neededH*4 && pixel.getY()<=neededH*5)
		{
			pixel.setBlue(255);
		}
		else if(pixel.getY()>neededH*5 && pixel.getY()<=neededH*6)
		{
			pixel.setRed(75);
			pixel.setBlue(130);
		}
		else
		{
			pixel.setRed(255);
			pixel.setBlue(255);
		}
		pixel.setAlpha(150);
		rainbow.setPixel(pixel.getX(),pixel.getY(),pixel);		
	}
	rainbow.drawTo(canvas);
	
}
function makeGrayScale()
{
	if(ogImg==null || !ogImg.complete()){
		alert("please choose an image or wait for it to complete loading");
		return;
	}
	var canvas=document.getElementById("filterCanvas");
	canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
	grayScale=new SimpleImage(ogImg.getWidth(),ogImg.getHeight())
	for(var pixel of grayImg.values())
	{
		var avg=(pixel.getGreen()+pixel.getRed()+pixel.getBlue())/3;
		pixel.setGreen(parseInt(avg));
		pixel.setRed(parseInt(avg));
		pixel.setBlue(parseInt(avg));
		grayScale.setPixel(pixel.getX(),pixel.getY(),pixel);
	}
	grayScale.drawTo(canvas);
}
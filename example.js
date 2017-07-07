var canvas=document.getElementById("canvas"),
	ctx=canvas.getContext("2d");

//i和k全局变量用于控制循环	
	var i=0,k=1;

//获取图片
	spritesheet = new Image(),
	spritesheet.src = 'images/image1.png';
	image = new Image(),
	image.src = 'images/image.jpg';
	lingdang = new Image(),
	lingdang.src = 'images/lingdang.png';
//图片加载
spritesheet.onload = function(e) {
   //ctx.drawImage(spritesheet, 400, 400);
};

/*...精灵表绘制器块...*/
//数组用于存放单元格信息
    runnerCells = [
      { left: 0, top:0, width: 150, height: 230 },
      { left: 150, top: 0, width: 150, height: 230 },
      { left: 300, top: 0, width: 150, height: 230 },
      { left: 450, top: 0, width: 150, height: 230 },
    ];
//定义精灵对象行为
    runInPlace = {
       lastAdvance: 0,
       PAGEFLIP_INTERVAL: 500,    //时间间隔

       execute: function (sprite, ctx, time) {
          if (time - this.lastAdvance > this.PAGEFLIP_INTERVAL) {
             sprite.painter.advance();
             this.lastAdvance = time;
          }
       }
    },
//定义精灵从左往右行为
    moveLeftToRight = {
       	lastMove: 0,
       
       	execute: function (sprite, ctx, time) {
        	if (this.lastMove !== 0) {
           		sprite.left += sprite.velocityX *
                          ((time - this.lastMove) / 1000); 
           		if (sprite.left > 900) {
              		sprite.left =0;
           		}
         	}
         	this.lastMove = time;
       	}
    },

// Sprite
    sprite = new Sprite('runner', new SpriteSheetPainter(runnerCells),
                        [ runInPlace, moveLeftToRight ]);
function animate(time) {
   	ctx.clearRect(0,225,canvas.width,canvas.height/4*3);
   	drawBackground();
   	if(i >= 0 && i <= 20 )
   	 	redlights();
   	else if(i >= 21 && i <= 40)
   		yellowlights();
   	else if(i >= 41 && i <= 60){
   		if(i==60)
   			i = 0;
   		bluelights();
   	}
   	i++;
   	sprite.update(ctx, time);
   	sprite.paint(ctx); 
  	window.requestNextAnimationFrame(animate);
}

/*...函数绘制块...*/

//背景图片
function drawBackground()
{
	image.onload = function(e) {
    	ctx.drawImage(image, 0, 0);
	};
}
//三组不同颜色的灯
function yellowlights()
{
	ctx.beginPath();
	ctx.moveTo(250,400);
	ctx.arc(250,400,10,0,Math.PI*2,true);
	ctx.moveTo(230,420);
	ctx.arc(230,420,5,0,Math.PI*2,true);
	ctx.moveTo(210,440);
	ctx.arc(210,440,8,0,Math.PI*2,true);
	ctx.moveTo(190,460);
	ctx.arc(180,460,5,0,Math.PI*2,true);
	ctx.fillStyle = '#ffff00';
	ctx.fill();
	ctx.closePath();
}
function redlights()
{
	ctx.beginPath();
	ctx.moveTo(290,520);
	ctx.arc(290,520,10,0,Math.PI*2,true);
	ctx.moveTo(260,540);
	ctx.arc(260,540,8,0,Math.PI*2,true);
	ctx.moveTo(230,380);
	ctx.arc(230,380,5,0,Math.PI*2,true);
	ctx.moveTo(200,410);
	ctx.arc(200,410,8,0,Math.PI*2,true);
	ctx.fillStyle = '#ff33ff';
	ctx.fill();
	ctx.closePath();
}
function bluelights()
{
	ctx.beginPath();
	ctx.moveTo(285,425);
	ctx.arc(285,425,5,0,Math.PI*2,true);
	ctx.moveTo(260,455);
	ctx.arc(260,455,8,0,Math.PI*2,true);
	ctx.moveTo(230,485);
	ctx.arc(230,485,10,0,Math.PI*2,true);
	ctx.moveTo(210,517);
	ctx.arc(210,517,8,0,Math.PI*2,true);
	ctx.moveTo(180,547);
	ctx.arc(180,547,8,0,Math.PI*2,true);
	ctx.fillStyle = '#00ffff';
	ctx.fill();
	ctx.closePath();
}

//由setInterval绘制铃铛
function lingDang()
{
	ctx.clearRect(0,0,canvas.width,canvas.height/4);
	if(k == 1)
		ctx.drawImage(lingdang,600,20,100,100);
	else if(k == 2)
		ctx.drawImage(lingdang,600,20,150,150);
	else if(k == 3)
	{
		k = 0;
		ctx.drawImage(lingdang,600,20,200,200);
	}
	k++;
	
}
window.setInterval(lingDang,800);

//sprite初始化
sprite.velocityX = 50;  // 帧速率
sprite.left = 0;  
sprite.top = 650;
//动画循环
window.requestNextAnimationFrame(animate);
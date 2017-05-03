$l.startGame=(option)=>{
  var state=[];
  var defaultOption = {
  		animateTime:300,
  		width:4,
  		height:4,
  		style:{
  			background_color:"rgb(184,175,158)",
  			block_background_color:"rgb(204,192,178)",
  			padding:18,
  			block_size:100,
  			block_style:{
  			"font-family":"sans-serif",
  			"font-weight":"bold",
  			"text-align":"center"
  			}
  		},

  		blocks:[
  		{level:0,value:2,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"58px"}},
  		{level:1,value:4,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"58px"}},
  		{level:2,value:8,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"58px"}},
  		{level:3,value:16,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"50px"}},
  		{level:4,value:32,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"50px"}},
  		{level:5,value:64,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"50px"}},
  		{level:6,value:128,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"42px"}},
  		{level:7,value:256,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"42px"}},
  		{level:8,value:512,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"42px"}},
  		{level:9,value:1024,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"34px"}},
  		{level:10,value:2048,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"34px"}},
  		{level:11,value:4096,style:{"background-color":"rgb(238,228,218)","color":"rgb(124,115,106)","font-size":"34px"}}

  		]
  };
  option = $l.extend({},defaultOption,option);

  $this=$l('.game');

  $this.css({
  		"background-color":option.style.background_color,
  		"border-radius":option.style.padding,
  		"position":"relative",
  		"-webkit-user-select":"none",
  });

  var getPosition = function(x,y){
  		return ({
  	"top":option.style.padding+y*(option.style.block_size+option.style.padding),
  	"left":option.style.padding+x*(option.style.block_size+option.style.padding)
  });};

  var buildBackground = function(){
		var backgrounds=[];
		for(var x=0;x<option.width;x++){
			for(var y=0;y<option.height;y++)
			{
				state.push(null);
				var bg_block=$l(document.createElement("div"));
				var position=getPosition(x,y);
				bg_block.css({
					"width":(option.style.block_size+'px'),
					"height":(option.style.block_size+'px'),
					"background-color":option.style.block_background_color,
					"position":"absolute",
					"top":(position.top+'px'),
					"left":(position.left+'px')
				});


        $this.append(bg_block);
			}
		}

		$this.css({'width':`${(option.style.padding+option.style.block_size)*option.width+option.style.padding}px`});
		$this.css({'height':`${(option.style.padding+option.style.block_size)*option.height+option.style.padding}px`});
  };



  var getEmptyBlockIndexs = function(x,y){
		var emptyBlockIndexs = [];

		$(state).each(function(i,o){
			if(o === null) emptyBlockIndexs.push(i);
		});
		return emptyBlockIndexs;
  };

	var getCoordinate=function(putIndex){
		return {
			x:putIndex % option.width,
			y:Math.floor(putIndex / option.width)
		};
	};
	var getIndex=function(x,y){
		return x+y*option.width;
	};



  var buildBlock = function(level,x,y){
		var emptyBlockIndexs = getEmptyBlockIndexs();
		if(emptyBlockIndexs.length === 0) return false;
		//generate random block
		var putIndex;
		if(x!==undefined && y!==undefined){
			putIndex = getIndex(x,y);
		}
		else{
		putIndex = emptyBlockIndexs[Math.floor(Math.random()*emptyBlockIndexs.length)];
    }
		var block;
		if(level !== undefined){

			block=$l.extend({},option.blocks[level]);
		}
		else{
			block=Math.random()>=0.5?option.blocks[0]:option.blocks[1];
		}
		//get coordinate
		var coordinate = getCoordinate(putIndex);

    var position = getPosition(coordinate.x,coordinate.y);


		var blockDom=$l(document.createElement("div"));

		blockDom.addClass("block_"+coordinate.x+"_"+coordinate.y);


    blockDom.css(option.style.block_style);
    blockDom.css({
			"position":"absolute",
			"top":(position.top+25+'px'),
			"left":(position.left+25+'px'),
			"width":0,
			"height":0,
		});
    blockDom.css(block.style);


    blockDom.html(block.value);
		$this.append(blockDom);
		state[putIndex] = block;
		return true;
	};

	var getBlock=function(x,y){
		return state[getIndex(x,y)];
	};

	var move=function(direction){
		//代码可以进一步简化，把函数给抽取出来
    let target_block;
    let moved;
    let blockDom;
    let position;

		switch(direction){
		case "up":
			for(let x=0;x<option.width;x++){
				for(let y=1;y<option.height;y++){
					let block=getBlock(x,y);
					if(block===null) continue;
					let target_coordinate = {
					x:x,
					y:y-1
					};
					target_block=
						getBlock(target_coordinate.x,
						target_coordinate.y);
					moved=0;
					while(target_coordinate.y>0&&target_block===null){
						target_coordinate.y=target_coordinate.y-1;
						target_block=getBlock(target_coordinate.x,target_coordinate.y);
						//防止死循环
						if(++moved>Math.max(option.width,option.height))break;

					}
					blockDom=$(".block_"+x+"_"+y);
					position = getPosition(target_coordinate.x,target_coordinate.y);
          helper(block,target_coordinate,target_block,x,y,moved,position,blockDom);
          break;
    }}
    break;

		case "down":
			for(let x=option.width-1;x>=0;x--){
				for(let y=option.height-2;y>=0;y--){
					let block=getBlock(x,y);
					if(block===null) continue;
					let target_coordinate = {
					x:x,
					y:y+1
					};
					target_block=
						getBlock(target_coordinate.x,
						target_coordinate.y);
					moved=0;
					while(target_coordinate.y<option.height-1&&target_block===null){
						target_coordinate.y=target_coordinate.y+1;
						target_block=getBlock(target_coordinate.x,target_coordinate.y);
						//防止死循环
						if(++moved>Math.max(option.width,option.height))break;

					}
					blockDom=$(".block_"+x+"_"+y);
					position = getPosition(target_coordinate.x,target_coordinate.y);
          helper(block,target_coordinate,target_block,x,y,moved,position,blockDom);
          break;
    }}
    break;


		case "left":
			for(let x=1;x<option.width;x++){
				for(let y=0;y<option.height;y++){
					let block=getBlock(x,y);
					if(block===null) continue;
					target_coordinate = {
					x:x-1,
					y:y
					};
					target_block=
						getBlock(target_coordinate.x,
						target_coordinate.y);
					moved=0;
					while(target_coordinate.x>0&&target_block===null){
						target_coordinate.x=target_coordinate.x-1;
						target_block=getBlock(target_coordinate.x,target_coordinate.y);
						//防止死循环
						if(++moved>Math.max(option.width,option.height))break;

					}
					blockDom=$(".block_"+x+"_"+y);
					position = getPosition(target_coordinate.x,target_coordinate.y);
					//三种情况
					//1.上面有东西，两个块相等
					//2.上面没有块，直接移动过去
					//3.上面有块，块不相等

          helper(block,target_coordinate,target_block,x,y,moved,position,blockDom);
          break;
  }}
  break;
		case "right":
			for(let x=option.width-2;x>=0;x--){
				for(let y=0;y<option.height;y++){
					let block=getBlock(x,y);
					if(block===null) continue;
					target_coordinate = {
					x:x+1,
					y:y
					};
					target_block=
						getBlock(target_coordinate.x,
						target_coordinate.y);
					moved=0;
					while(target_coordinate.x<option.width-1&&target_block===null){
						target_coordinate.x=target_coordinate.x+1;
						target_block=getBlock(target_coordinate.x,target_coordinate.y);
						//防止死循环
						if(++moved>Math.max(option.width,option.height))break;

					}
					blockDom=$(".block_"+x+"_"+y);
					position = getPosition(target_coordinate.x,target_coordinate.y);
          helper(block,target_coordinate,target_block,x,y,moved,position,blockDom);
          break;
  }
}
break;

}

  function helper(block,target_coordinate,target_block,x,y,moved,position,blockDom){


  if(target_block===null){
    //当前设为空
    state[getIndex(x,y)]=null;
    //目标设为块
    state[getIndex(target_coordinate.x,target_coordinate.y)]=block;
    //渲染页面
    blockDom.removeClass();
    blockDom.addClass("block_"+target_coordinate.x+"_"+target_coordinate.y);
    blockDom.animate({
      "top":position.top+25,
      "left":position.left+25,

    },option.animateTime);


    }
  else if(target_block.value == block.value){
    let updateBlock = $.extend({},option.blocks[block.level+1]);
    updateBlock.justModified = true;
    state[getIndex(x,y)] = null;
    state[getIndex(target_coordinate.x,target_coordinate.y)] = updateBlock;
    blockDom.animate(
    {
      "top":position.top+25,
      "left":position.left+25
    },
    option.animateTime,(function(blockDom,target_coordinate,updateBlock){
        return function(){
          blockDom.hide();
          var target_blockDom = $(".block_"+target_coordinate.x+"_"+target_coordinate.y);
          target_blockDom.html(updateBlock.value);
          target_blockDom.css(updateBlock.style);
        };
      })(blockDom,target_coordinate,updateBlock));



  }
  else{
    target_coordinate.x=target_coordinate.x-1;
    position = getPosition(target_coordinate.x,target_coordinate.y);
    //当前设为空
    state[getIndex(x,y)]=null;
    //目标设为块
    state[getIndex(target_coordinate.x,target_coordinate.y)]=block;
    //渲染页面
    blockDom.removeClass();
    blockDom.addClass("block_"+target_coordinate.x+"_"+target_coordinate.y);
    blockDom.animate({
      "top":position.top+25,
      "left":position.left+25,

    },option.animateTime);

  }

  buildBlock(0);
  }




};


		var keyCh = function(evt){
			switch(evt.which){
				case 38:
        console.log('up');
					move("up");
				break;
				case 40:
					move("down");
				break;
				case 37:
					move("left");
				break;
				case 39:
					move("right");
				break;

		}};






	buildBackground();
	buildBlock();
	buildBlock();
	$l('html').on("keydown",keyCh);

	/*var gameEnd=function(){
		$(document).off("keydown",keyCh);
		$(document).off("keydown",mouseCh);
		$(document).off("keyup",mouseCh);
		var score = 0;
		for(var i=0;i<state.length;i++){
			if()
		}
	}*/
};









$l.startGame();

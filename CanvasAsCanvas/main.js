var canvas=document.getElementById("canvas");var ctx=canvas.getContext("2d");window.addEventListener("resize",resFix);canvas.addEventListener("mousedown",canvasMouseDown);canvas.addEventListener("mouseup",canvasMouseUp);canvas.addEventListener("mousemove",mouseMove);canvas.addEventListener("contextmenu",function(e){e.preventDefault()});var canvasSize={width:canvas.getBoundingClientRect().width,height:canvas.getBoundingClientRect().height};function resFix(){canvas.width=canvasSize.width;canvas.height=canvasSize.height;ctx.strokeStyle="white";ctx.textBaseline="middle"}resFix();var drawMode=null,points=[],instructions=[],selectedColor="#00D4FF",size=5,sampleText="Text",isDrawing=false;setTimeout(drawCanvas,500);function drawCanvas(){ctx.fillStyle="black";ctx.clearRect(0,0,canvas.width,canvas.height);for(i=0;i<instructions.length;i++){if(instructions[i].type=="line"){ctx.lineWidth=instructions[i].lineWidth;ctx.strokeStyle=instructions[i].strokeStyle;ctx.beginPath();ctx.moveTo(instructions[i].x1,instructions[i].y1);ctx.lineTo(instructions[i].x2,instructions[i].y2);ctx.stroke()}else if(instructions[i].type=="dot"){ctx.fillStyle=instructions[i].fillStyle;ctx.beginPath();ctx.arc(instructions[i].x,instructions[i].y,instructions[i].size,0,Math.PI*2,false);ctx.fill()}else if(instructions[i].type=="square"){ctx.fillStyle=instructions[i].fillStyle;ctx.fillRect(instructions[i].x,instructions[i].y,instructions[i].width,instructions[i].height)}else if(instructions[i].type=="image"){ctx.drawImage(instructions[i].img,instructions[i].x,instructions[i].y,instructions[i].width,instructions[i].height)}else if(instructions[i].type=="text"){ctx.fillStyle=instructions[i].fillStyle;ctx.textAlign=instructions[i].textAlign;ctx.textBaseline="middle";ctx.font=instructions[i].font;ctx.fillText(instructions[i].text,instructions[i].x,instructions[i].y)}}setTimeout(drawCanvas,100)}function canvasMouseDown(e){if(e.button==0){isDrawing=true;if(drawMode=="line"){points[0]=[];points[0].x=e.x/canvas.getBoundingClientRect().width*canvasSize.width;points[0].y=e.y/canvas.getBoundingClientRect().height*canvasSize.height}else if(drawMode=="square"){points[0]=[];points[0].x=e.x/canvas.getBoundingClientRect().width*canvasSize.width;points[0].y=e.y/canvas.getBoundingClientRect().height*canvasSize.height}}}function canvasMouseUp(e){if(e.button==0){oldActions=[];if(drawMode=="line"){points[1]=[];points[1].x=e.x/canvas.getBoundingClientRect().width*canvasSize.width;points[1].y=e.y/canvas.getBoundingClientRect().height*canvasSize.height;instructions.push({type:"line",lineWidth:size,strokeStyle:selectedColor,x1:points[0].x,y1:points[0].y,x2:points[1].x,y2:points[1].y});points=[]}if(drawMode=="dot"){instructions.push({type:"dot",size:size,fillStyle:selectedColor,x:e.x/canvas.getBoundingClientRect().width*canvasSize.width,y:e.y/canvas.getBoundingClientRect().height*canvasSize.height})}if(drawMode=="square"){points[1]=[];points[1].width=e.x/canvas.getBoundingClientRect().width*canvasSize.width-points[0].x;points[1].height=e.y/canvas.getBoundingClientRect().height*canvasSize.height-points[0].y;instructions.push({type:drawMode,fillStyle:selectedColor,x:points[0].x,y:points[0].y,width:points[1].width,height:points[1].height});points=[]}if(drawMode=="text"){var textAnswer=prompt("Enter some text:",sampleText);if(textAnswer!=null){instructions.push({type:drawMode,font:size+"px Arial",fillStyle:selectedColor,x:e.x/canvas.getBoundingClientRect().width*canvasSize.width,y:e.y/canvas.getBoundingClientRect().height*canvasSize.height,text:textAnswer,textAlign:"center"})}}isDrawing=false}}if(!window.location.href.startsWith("https://hihiqy1.github.io")){window.location.href="https://duckduckgo.com"}function mouseMove(e){if(drawMode=="line"&JSON.stringify(points)!="[]"){points[1]=[];points[1].x=e.x/canvas.getBoundingClientRect().width*canvasSize.width;points[1].y=e.y/canvas.getBoundingClientRect().height*canvasSize.height;ctx.lineWidth=size;ctx.strokeStyle=selectedColor;ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);ctx.lineTo(points[1].x,points[1].y);ctx.stroke()}else if(drawMode=="square"&JSON.stringify(points)!="[]"){points[1]=[];points[1].width=e.x/canvas.getBoundingClientRect().width*canvasSize.width-points[0].x;points[1].height=e.y/canvas.getBoundingClientRect().height*canvasSize.height-points[0].y;ctx.fillStyle=selectedColor;ctx.fillRect(points[0].x,points[0].y,points[1].width,points[1].height)}else if(drawMode=="dot"){ctx.fillStyle=selectedColor;ctx.beginPath();ctx.arc(e.x/canvas.getBoundingClientRect().width*canvasSize.width,e.y/canvas.getBoundingClientRect().height*canvasSize.height,size,0,Math.PI*2,false);ctx.fill();if(isDrawing){instructions.push({type:"dot",size:size,fillStyle:selectedColor,x:e.x/canvas.getBoundingClientRect().width*canvasSize.width,y:e.y/canvas.getBoundingClientRect().height*canvasSize.height})}}else if(drawMode=="text"){ctx.textAlign="center";ctx.fillStyle=selectedColor;ctx.font=size+"px Arial";ctx.fillText(sampleText,e.x/canvas.getBoundingClientRect().width*canvasSize.width,e.y/canvas.getBoundingClientRect().height*canvasSize.height)}}function save(){var data=canvas.toDataURL("image/png");window.open(data.replace(/^data:image\/png/,"data:application/octet-stream"),"_blank")}function changeCanvasSize(width,height){canvasSize={width:width,height:height};resFix()}
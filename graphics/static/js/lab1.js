var c = document.getElementById('myCanvas');
var cxt = c.getContext("2d");
a = 0;
b = 0;
startx = 0;
starty = 0;
draw = true;
pattern = new Array(
"0000000000000000000000000000000000000000000000000000",
"0000000000000000000000000000000000000000000000000000",
"0000000000000000000000000000000000000000000000000000",
"0000000000000000000000000000000000000000000000000000",
"0000111111110000111111110000111111110000111111110000",
"0000100000010000100000010000000000010000000000010000",
"0000100000010000100000010000000000010000000000010000",
"0000100000010000100000010000000000010000000000010000",
"0000100000010000100000010000000000010000000000010000",
"0000100000010000100000010000000000010000000000010000",
"0000100000010000100000010000000000010000000000010000",
"0000100000010000111111110000111111110000000000010000",
"0000100000010000100000010000100000000000000000010000",
"0000100000010000100000010000100000000000000000010000",
"0000100000010000100000010000100000000000000000010000",
"0000100000010000100000010000100000000000000000010000",
"0000100000010000100000010000100000000000000000010000",
"0000100000010000100000010000100000000000000000010000",
"0000111111110000111111110000111111110000000000010000",
"0000000000000000000000000000000000000000000000000000",
"0000000000000000000000000000000000000000000000000000",
"0000000000000000000000000000000000000000000000000000",
"0000000000000000000000000000000000000000000000000000"

                        );
MASK = new Array(500);
pointArray = new Array();


function edgeLine(x1,y1,x2,y2){
    var xs,dxs;
	var ys,Ixs;
	var r;
	if(y1==y2)
	{
		if(x1>x2)
		{
			r=x1;
			x1=x2;
			x2=r;
		}
		MASK[y1][x1]=true;
        MASK[y1][x2]=true;
	}
	if(x1==x2)
	{
		if(y1>y2)
		{
			r=y1;
			y1=y2;
			y2=r;
		}
		for(ys=y1+1;ys<=y2;ys++)
			MASK[ys][x1]=true;
	}
	if(x1<x2&&y1<y2)
	{
		xs=x1;
		dxs=(x2-x1)/(y2-y1);
		for(ys=y1+1;ys<=y2;ys++)       
		{
			xs=xs+dxs;
			Ixs=parseInt(xs+0.5);
			if(MASK[ys][Ixs]==true)
				MASK[ys][Ixs+1]=true;
			MASK[ys][Ixs]=true;
		}
	}
	if(x1>x2&&y1<y2)
	{
		xs=x1;
		dxs=(x1-x2)/(y2-y1);
		for(ys=y1+1;ys<=y2;ys++)
		{
			xs=xs-dxs;
			Ixs=parseInt(xs+0.5);
			if(MASK[ys][Ixs]==true)
				MASK[ys][Ixs+1]=true;
			MASK[ys][Ixs]=true;
		}
	}
	if(x1<x2&&y1>y2)
	{
		xs=x2;
		dxs=(x2-x1)/(y1-y2);
		for(ys=y2+1;ys<=y1;ys++)
		{
			xs=xs-dxs;
			Ixs=parseInt(xs+0.5);
			if(MASK[ys][Ixs]==true)
				MASK[ys][Ixs+1]=true;
			MASK[ys][Ixs]=true;
		}
	}
	if(x1>x2&&y1>y2)
	{
		xs=x2;
		dxs=(x1-x2)/(y1-y2);
		for(ys=y2+1;ys<=y1;ys++)
		{
			xs=xs+dxs;
			Ixs=parseInt(xs+0.5);
			if(MASK[ys][Ixs]==true)
				MASK[ys][Ixs+1]=true;
			MASK[ys][Ixs]=true;
		}
	}
}

function edgeMarkFill(){
    for(var y = 0; y<MASK.length;y++){
        MASK[y] = new Array(1300);
        for(var x = 0;x<1300;x++){
            MASK[y][x] = false;
        }
    }
    
    
    for(var i = 0; i < pointArray.length-1;i++){
        edgeLine(pointArray[i][0],pointArray[i][1],pointArray[i+1][0],pointArray[i+1][1]);
    }
        
    
    edgeLine(pointArray[0][0],pointArray[0][1],pointArray[pointArray.length-1][0],pointArray[pointArray.length-1][1]);
    

    for(var y = 0;y<MASK.length;y++){
        inside = false;
        for( var x = 0; x <1300; x++){
            if(MASK[y][x]){
                inside = !inside;
            }
            if (inside && MASK[y][x]!=true){
                patternFill(x,y);
            }
        }
    }
}
function drawPoint(e){
    if (draw){
    x = e.clientX;
    y = e.clientY;
    var temp = new Array(x,y);
    pointArray.push(temp);
    cxt.fillStyle="#FF0000";
    cxt.beginPath();
    cxt.arc(x,y,2,0,Math.PI*2,true);
    cxt.closePath();
    cxt.fill();
    if(a!=0&b!=0){
        cxt.moveTo(a,b);
        cxt.lineTo(x,y);
        cxt.stroke();

    }
    else{
        startx = x;
        starty = y;
    }
    a = x;
    b = y;
    }
}
function finish(){
    if(draw){
    cxt.lineTo(startx, starty);
    cxt.stroke();
    }
    draw = false;

}

function patternFill(x,y){
    if (pattern[y%23].substr(x%52,1)=='1'){
        cxt.fillStyle="#FFCCCC";
        cxt.beginPath();
        cxt.arc(x,y,1,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();

    }
    
}


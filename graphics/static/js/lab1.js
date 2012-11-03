var c = document.getElementById('myCanvas');
var cxt = c.getContext("2d");
a = 0;
b = 0;
startx = 0;
starty = 0;
draw = true;
pattern = new Array(
"00000000000000000000",
"01110011100111001110",
"01010010100001000010",
"01010011100111000010",
"01010010100100000010",
"01110011100111000010",
"00000000000000000000"
                        );
MASK = new Array(500);
pointArray = new Array();


function edgeMarkFill(){
    for(var y = 0; y<MASK.length;y++){
        MASK[y] = new Array(1300);
        for(var x = 0;x<1300;x++){
            MASK[y][x] = false;
        }
    }
    
    for(var i = 0; i < pointArray.length-1;i++){
        xs = pointArray[i][0];
        dxs = (pointArray[i+1][0] - pointArray[i][0])/(pointArray[i+1][1]-pointArray[i][1]);
        for(var ys = pointArray[i][1]; ys < pointArray[i+1][1]; ys++){
            xs = xs + dxs;
            Ixs = parseInt(xs + 0.5);
            MASK[ys][Ixs] = !MASK[ys][Ixs];
        }
    }

    for(var y = 0;y<MASK.length;y++){
        inside = false;
        for( var x = 0; x <1300; x++){
            if(MASK[y][x]){
                inside = !inside;
            }
            if (inside){
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
    if (pattern[y%7].substr(x%20,1)=='1'){
        cxt.fillStyle="#FFCCCC";
        cxt.beginPath();
        cxt.arc(x,y,1,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();

    }
    
}


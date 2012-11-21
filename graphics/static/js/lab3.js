c = document.getElementById('myCanvas');
cxt = c.getContext("2d");
x1=null;
y1=null;
x2=null;
y2=null;
a=0;
b=0;
m_Polygon= new Array();
m_ClipedPly = new Array(Point);

function Point(x,y){
    this.x=x;
    this.y=y;
}
startx=null;
starty=null;
drawRect=true;
drawpoly=false;

function clearScreen(){
    c.height = c.height;
    
}
function draw(e){
    if(drawRect&&!drawpoly){
        if(x1==null&&y1==null){
            x1 = e.clientX;
            y1 = e.clientY;
            m_LTPoint=new Point(x1,y1);
            cxt.fillStyle="#000000";
            cxt.beginPath();

            cxt.arc(x1,y1,2,0,Math.PI*2,true);
            cxt.closePath();
            cxt.fill();
        }
        else{
            x2 = e.clientX;
            y2 = e.clientY;
            m_RBPoint=new Point(x2,y2);
            cxt.fillStyle="#000000";
            cxt.beginPath();

            cxt.arc(x2,y2,2,0,Math.PI*2,true);
            cxt.closePath();
            cxt.fill();
            drawRect = false;
            cxt.moveTo(x1,y1);
            cxt.lineTo(x2,y1);
            cxt.stroke();
            cxt.lineTo(x2,y2);
            cxt.stroke();
            cxt.lineTo(x1,y2);
            cxt.stroke();
            cxt.lineTo(x1,y1);
            cxt.stroke();
            drawpoly=true;
        }
    }
    else{
        x = e.clientX;
        y = e.clientY;
        temp=new Point(x,y);
        m_Polygon.push(temp);
        cxt.fillStyle="#000000";
        cxt.beginPath();
        cxt.arc(x,y,2,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();
        if(a!=0){
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
    if(drawpoly){
        cxt.lineTo(startx, starty);
        cxt.stroke();
    }
    drawpoly = false;
    m_Num_Ply=m_Polygon.length;
    
    
}


function Sutherland_Hodgman()
{
	m_NumCliped_Ply = CutByLeft(m_Polygon,m_Num_Ply,m_ClipedPly);
	m_Num_Ply = CutByRight(m_ClipedPly,m_NumCliped_Ply,m_Polygon);
	m_NumCliped_Ply = CutByBottom(m_Polygon,m_Num_Ply,m_ClipedPly);
	m_Num_Ply = CutByTop(m_ClipedPly,m_NumCliped_Ply,m_Polygon);
    if(m_Num_Ply > 0){
        cxt.strokeStyle="#ff0000"
        cxt.moveTo(m_Polygon[m_Num_Ply - 1].x,m_Polygon[m_Num_Ply-1].y);
        
        cxt.lineTo(m_Polygon[0].x,m_Polygon[0].y);
        
    }
    for(i=0;i<m_Num_Ply.length;i++){
        cxt.lineTo(m_Num_Ply[i].x,m_Num_Ply[i].y);
        cxt.stroke();
    }
}
function CutByTop(m_ClipedPly, sLength, m_Polygon)
{
	 yTop = m_LTPoint.y;
    pre_Index=new Object();
    cur_Index=new Object();
	 pre_Index = sLength - 1;
	 cur_Index = 0;
	 S = m_ClipedPly[pre_Index];
	 P = m_ClipedPly[cur_Index];
	   newIndex = 0;
    
	 Flag_Outside = false;
    
    
	for( i = 0; i < sLength; i ++)
	{	if (S.y > yTop)
		Flag_Outside = true;
		if(P.y <= yTop)
		{
			if(Flag_Outside)
			{
				Flag_Outside = false;
				m_Polygon[newIndex].y = yTop;
				m_Polygon[newIndex].x = S.x + (double)(yTop - S.y) / (double)(P.y - S.y) * (P.x - S.x);
				newIndex ++;
			}
			m_Polygon[newIndex] = P;
			newIndex ++;
		}
		else
		{
			if(!Flag_Outside)
			{
				Flag_Outside = true;
				m_Polygon[newIndex].y = yTop;
				m_Polygon[newIndex].x = S.x + (double)(yTop - S.y) / (double)(P.y - S.y) * (P.x - S.x);
				newIndex ++;
			}
		}
        
		S = P;
		UpdateIndex(pre_Index,sLength);
		UpdateIndex(cur_Index,sLength);
		P = m_ClipedPly[cur_Index];
	}
    
	return newIndex;
}
function CutByBottom(m_Polygon, sLength, m_ClipedPly)
{
	 yBottom = m_RBPoint.y;
    pre_Index=new Object();
    cur_Index=new Object();
	 pre_Index = sLength - 1;
	 cur_Index = 0;
	 S = m_Polygon[pre_Index];
	 P = m_Polygon[cur_Index];
	   newIndex = 0;
    
	 Flag_Outside = false;
    
    
	for( i = 0; i < sLength; i ++)
	{	if (S.y < yBottom)
		Flag_Outside = true;
		if(P.y >= yBottom)
		{
			if(Flag_Outside)
			{
				Flag_Outside = false;
				m_ClipedPly[newIndex].y = yBottom;
				m_ClipedPly[newIndex].x = S.x + (double)(yBottom - S.y) / (double)(P.y - S.y) * (P.x - S.x);
				newIndex ++;
			}
			m_ClipedPly[newIndex] = P;
			newIndex ++;
		}
		else
		{
			if(!Flag_Outside)
			{
				Flag_Outside = true;
				m_ClipedPly[newIndex].y = yBottom;
				m_ClipedPly[newIndex].x = S.x + (double)(yBottom - S.y) / (double)(P.y - S.y) * (P.x - S.x);
				newIndex ++;
			}
		}
        
		S = P;
		UpdateIndex(pre_Index,sLength);
		UpdateIndex(cur_Index,sLength);
		P = m_Polygon[cur_Index];
	}
    
	return newIndex;
}

function CutByRight( m_ClipedPly, sLength, m_Polygon)
{
	 xRight = m_RBPoint.x;
    pre_Index=new Object();
    cur_Index=new Object();
	 pre_Index = sLength - 1;
	 cur_Index = 0;
	 S = m_ClipedPly[pre_Index];
	 P = m_ClipedPly[cur_Index];
	newIndex = 0;
    
	Flag_Outside = false;
	
    
	for( i = 0; i < sLength; i ++)
	{if (S.x > xRight)
		Flag_Outside = true;
		if(P.x <= xRight)
		{
			if(Flag_Outside)
			{
				Flag_Outside = false;
				m_Polygon[newIndex].x = xRight;
				m_Polygon[newIndex].y = S.y + (double)(xRight - S.x) / (double)(P.x - S.x) * (P.y - S.y);
				newIndex ++;
			}
			m_Polygon[newIndex] = P;
			newIndex ++;
		}
		else
		{
			if(!Flag_Outside)
			{
				Flag_Outside = true;
				m_Polygon[newIndex].x = xRight;
				m_Polygon[newIndex].y = S.y + (double)(xRight - S.x) / (double)(P.x - S.x) * (P.y - S.y);
				newIndex ++;
			}
		}
        
		S = P;
		UpdateIndex(pre_Index,sLength);
		UpdateIndex(cur_Index,sLength);
		P = m_ClipedPly[cur_Index];
	}
    
	return newIndex;
}
function CutByLeft(m_Polygon, sLength, m_ClipedPly)
{
	 xLeft = m_LTPoint.x;
    pre_Index=new Object();
    cur_Index=new Object();
	 pre_Index = m_Num_Ply - 1;
	 cur_Index = 0;
	  S = m_Polygon[pre_Index];
	  P = m_Polygon[cur_Index];
     newIndex = 0;
    
	 Flag_Outside = false;
	
    
	for( i = 0; i < sLength; i ++)
	{
		if (S.x < xLeft)
            Flag_Outside = true;
		if(P.x >= xLeft)
		{
			if(Flag_Outside)
			{
				Flag_Outside = false;
				m_ClipedPly[newIndex].x = xLeft;
				m_ClipedPly[newIndex].y = S.y + (double)(xLeft - S.x) / (double)(P.x - S.x) * (P.y - S.y);
				newIndex ++;
			}
			m_ClipedPly[newIndex] = P;
			newIndex ++;
		}
		else
		{
			if(!Flag_Outside)
			{
				Flag_Outside = true;
				m_ClipedPly[newIndex].x = xLeft;
				m_ClipedPly[newIndex].y = S.y + (double)(xLeft - S.x) / (double)(P.x - S.x) * (P.y - S.y);
				newIndex ++;
			}
		}
        
		S = P;
		UpdateIndex(pre_Index,sLength);
		UpdateIndex(cur_Index,sLength);
		P = m_Polygon[cur_Index];
	}
    
	return newIndex;
}
function UpdateIndex(Index,Length)
{
	Index ++;
	Index = Index % Length;
}

c = document.getElementById('myCanvas');
cxt = c.getContext("2d");
function Point(x,y){
    this.x = x;
    this.y = y;
    this.addeq = function(p){
        this.x += p.x;
        this.y += p.y;
        return this;
    }
    this.subeq = function(p){
        this.x -= p.x;
        this.y -= p.y;
        return this;
    }
    this.muleq = function(p){
        this.x *= p;
        this.y *= p;
        return this;
    }
    this.diveq = function(p){
        this.x /= p;
        this.y /= p;
        return this;
    }
    this.int = function(){
        temp = new Point(parseInt(this.x), parseInt(this.y));
        return temp;
    }
    this.add = function(p){
        temp = new Point(this.x + p.x, this.y +p.y);
        return temp;
    }
    this.sub = function(p){
        temp = new Point(this.x - p.x, this.y - p.y);
        return temp;
    }
    this.mul = function(p){
        temp = new Point(this.x * p, this.y * p);
        return temp;
    }
    this.div = function(p){
        temp = new Point(this.x / p, this.y / p);
        return temp;
    }
}
m_nCount = 0;//鼠标按下左键的次数
N = 3;
k = 3;
npoints = 50;
ptControlPts = new Array(N+1);
ptPts = new Array(npoints+1);
nMethod = 1;
a = undefined;
b = undefined;
function setcurve(n){
    nMethod = n;
    clearScreen();
}
function draw(e){
        var x = e.clientX;
        var y = e.clientY;
        var temp = new Point(x,y);
        ptControlPts[m_nCount] = temp;
        
        cxt.fillStyle="#000000";
        cxt.beginPath();
        cxt.arc(x,y,2,0,Math.PI*2,true);
        cxt.closePath();
        cxt.fill();
        
        m_nCount=(++m_nCount)%(N+1);
    

        switch(nMethod){
            case 1:

                if (m_nCount % 2 == 1 ){
                    startx = x;
                    starty = y;
                }
                if (m_nCount %2 == 0 ){
                    cxt.moveTo(startx, starty);
                    cxt.lineTo(x, y);
                    cxt.stroke();
                }
                if(m_nCount == 0){
                    hermite_to_points();
                }
                break;
                
            case 2:
            case 3:
                if (m_nCount == 1 ){
                    a = x;
                    b = y;
                }
                else{
                    cxt.moveTo(a,b);
                    cxt.lineTo(x,y);
                    cxt.stroke();
                    a = x;
                    b = y;
                }
                if (m_nCount == 0){
                    if (nMethod==2){
                        bezier_to_points();
                    }
                    else{
                        bspline_to_points();
                    }
                }
        }

}

function hermite_to_points(){
    PC = [];
    V = [];
    for(var i = 0; i < N+1; i++){
        PC[i] = new Point();
        V[i] = new Point();
    }
    
	delt = 1/npoints;//将参数u变化区间进行npoints等分
	u = 0;
	//Hermite矩阵与控制点坐标相乘，得到V
	PC[0] = ptControlPts[0];
	PC[1] = ptControlPts[2];
	PC[2] = ptControlPts[1].sub(ptControlPts[0]);
	PC[3] = ptControlPts[3].sub(ptControlPts[2]);
	V[0] = (((PC[0].mul(2)).sub(PC[1].mul(2))).add(PC[2])).add(PC[3]);
	V[1] = (((PC[0].mul(-3)).add(PC[1].mul(3))).sub(PC[2].mul(2))).sub(PC[3]);
	V[2] = PC[2];
	V[3] = PC[0];
	for(var i=0;i<=npoints;i++)
	{
		ptPts[i]= hermite();  //分别求出npoints+1个离散点ptPts的坐标
		u += delt;
	}
    cxt.moveTo(ptPts[0].x, ptPts[0].y);
    for (var i = 1;i<=npoints;i++){
        cxt.lineTo(ptPts[i].x, ptPts[i].y);
        cxt.stroke();
    }
}
function hermite(){
    var pts =new Point(V[N].x, V[N].y);
    //alert(pts.x+" "+pts.y);
	var U = new Array(N+1);
	U[N] = 1;
	for(var i = N-1;i >= 0;i--)
	{
		U[i] = U[i+1] * u; //形成多项式中的各项
		pts.addeq(V[i].mul(U[i])); //与系数矩阵V相乘，并与前面得到的多项式值相累加
	}
	return pts;
    
}
function bezier_to_points(){
    n = N;
    t=0;
	delt=1.0/npoints;//将参数t变化区间进行npoints等分
    
    for(var i=0;i<=npoints;i++,t+=delt)
        ptPts[i]=decas(n, t); //采用几何作图法，分别求出npoints+1个离散点pts的坐标
    cxt.moveTo((ptPts[0].int()).x, (ptPts[0].int()).y);
    for(var i=1;i<=npoints;i++){
        cxt.lineTo((ptPts[i].int()).x, (ptPts[i].int()).y);
        cxt.stroke();
    }
    
}
function decas(n, t){
    R = [];
    Q = [];
    for(var i = 0; i < n+1; i++){
        R[i] = new Point(ptControlPts[i].x, ptControlPts[i].y);//将控制点坐标P保存于R中
        Q[i] = new Point();
    }
	//作n次外部循环，
	//每次循环都计算控制多边形上所有边以参数t为分割比例的坐标值
	for(m=n;m>0;m--)
	{
		//作m次内部循环，
		//每次循环计算控制多边形上一条边以参数t为分割比例的坐标值
		for(i=0;i<= m -1;i++)
		{
			//n次Bézier曲线在点t的值，可由两条n-1次Bézier曲线
			//在点t的值通过线性组合而求得
			Q[i] = R[i].add((R[i+1].sub(R[i])).mul(t));
		}
		for(i=0;i<= m -1;i++)
			R[i] = Q[i];
	}
	return (R[0]);
    
}
function GenerateKnots(){
    len = N+k+1;
	knots = new Array(len);
    for(i = 0;i < len;i++)
        knots[i] = i;
    
}
function deboor(j, k, u){
	//Point *P=new Point[k];
    P = [];
    for(var i = 0; i < k; i ++){
        P[i] = new Point();
    }

	epsilon=0.0005;
	for( i=0;i<k;i++)
		P[i]=ptControlPts[j-k+1+i];
    
	//进行k-1次循环，即进行k-1级递推
	for(r=1;r<k;r++)
	{
		//在每一级递推中，按照递减的顺序对控制顶点进行更新
		//按递减顺序更新，是为了确保已更新的控制顶点
		//不会对未更新的控制顶点的计算产生影响
		for(i=k-1;i>=r;i--)
		{
			denom=knots[i-r+j+1]-knots[i+j-k+1];
			if(Math.abs(denom)<epsilon)
				alpha=0;
			else
				alpha=(u-knots[i+j-k+1])/denom;
			P[i]=(P[i-1].mul(1-alpha)).add(P[i].mul(alpha));
		}
	}
	return P[k-1];
    
}
function bspline_to_points(){
    GenerateKnots();
    var k = 4;
    var n = N;
	delt=(knots[n+1]-knots[k-1])/npoints;//在每个节点区间，将参数t变化区间进行npoints等分
	j=k-1;
	u=knots[k-1];
    for(i=0;i<=npoints;i++,u+=delt)
    {
        while((j<n)&&(u>knots[j+1]))j++;//确定参数u所在的节点区间[uj,uj+1)
        ptPts[i]= deboor (j, k, u); //在每个节点区间，分别求出npoints个离散点pts的坐标
    }
    cxt.moveTo((ptPts[0].int()).x, (ptPts[0].int()).y);

    for(var i=1;i<=npoints;i++){
        cxt.lineTo((ptPts[i].int()).x, (ptPts[i].int()).y);
        cxt.stroke();
    }

}

function clearScreen(){
    c.height = c.height;
    
}



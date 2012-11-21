cc = document.getElementById('myCanvas');
cxt = cc.getContext("2d");

matrix = [];
for(var i = 0; i < 4; i ++){
    matrix[i] = new Array(4);
}
lbb = new Point3D(100,100,100);
lbb_2D = new Point2D(0,0);
lbt = new Point3D(100,100,300);
lbt_2D = new Point2D(0,0);
lfb = new Point3D(100,300,100);
lfb_2D = new Point2D(0,0);
lft = new Point3D(100,300,300);
lft_2D = new Point2D(0,0);
rbb = new Point3D(300,100,100);
rbb_2D = new Point2D(0,0);
rbt = new Point3D(300,100,300);
rbt_2D = new Point2D(0,0);
rfb = new Point3D(300,300,100);
rfb_2D = new Point2D(0,0);
rft = new Point3D(300,300,300);
rft_2D = new Point2D(0,0);
//perspective_x0 =
//perspective_y0 =
//perspective_d =
//rotate = x;//绕x轴旋转
m_setz=100;
m_sety=100;
m_setx=200;
m_choosex=0;
m_choosey=0;
m_choosez=1;

function Point2D(x,y){
    this.x = x;
    this.y = y;
}
function Point3D(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
}
function from3dTo2d(){
    lbb_2D.x = lbb.x * matrix[0][0] + lbb.y * matrix[0][1] + lbb.z * matrix[0][2] + matrix[0][3];
	lbb_2D.y = lbb.x * matrix[1][0] + lbb.y * matrix[1][1] + lbb.z * matrix[1][2] + matrix[1][3];
	lbt_2D.x = lbt.x * matrix[0][0] + lbt.y * matrix[0][1] + lbt.z * matrix[0][2] + matrix[0][3];
	lbt_2D.y = lbt.x * matrix[1][0] + lbt.y * matrix[1][1] + lbt.z * matrix[1][2] + matrix[1][3];
	lfb_2D.x = lfb.x * matrix[0][0] + lfb.y * matrix[0][1] + lfb.z * matrix[0][2] + matrix[0][3];
    lfb_2D.y = lfb.x * matrix[1][0] + lfb.y * matrix[1][1] + lfb.z * matrix[1][2] + matrix[1][3];
	lft_2D.x = lft.x * matrix[0][0] + lft.y * matrix[0][1] + lft.z * matrix[0][2] + matrix[0][3];
	lft_2D.y = lft.x * matrix[1][0] + lft.y * matrix[1][1] + lft.z * matrix[1][2] + matrix[1][3];
	rbb_2D.x = rbb.x * matrix[0][0] + rbb.y * matrix[0][1] + rbb.z * matrix[0][2] + matrix[0][3];
	rbb_2D.y = rbb.x * matrix[1][0] + rbb.y * matrix[1][1] + rbb.z * matrix[1][2] + matrix[1][3];
	rbt_2D.x = rbt.x * matrix[0][0] + rbt.y * matrix[0][1] + rbt.z * matrix[0][2] + matrix[0][3];
	rbt_2D.y = rbt.x * matrix[1][0] + rbt.y * matrix[1][1] + rbt.z * matrix[1][2] + matrix[1][3];
	rfb_2D.x = rfb.x * matrix[0][0] + rfb.y * matrix[0][1] + rfb.z * matrix[0][2] + matrix[0][3];
	rfb_2D.y = rfb.x * matrix[1][0] + rfb.y * matrix[1][1] + rfb.z * matrix[1][2] + matrix[1][3];
	rft_2D.x = rft.x * matrix[0][0] + rft.y * matrix[0][1] + rft.z * matrix[0][2] + matrix[0][3];
	rft_2D.y = rft.x * matrix[1][0] + rft.y * matrix[1][1] + rft.z * matrix[1][2] + matrix[1][3];

}
function from3dTo2d_2(d){
    from3dTo2d();
    lbb_2D.x /= (lbb.z/d +1 );
    lbt_2D.x /= (lbt.z/d +1 );
    lfb_2D.x /= (lfb.z/d +1 );
    lft_2D.x /= (lft.z/d +1 );
    rbb_2D.x /= (rbb.z/d +1 );
    rbt_2D.x /= (rbt.z/d +1 );
    rfb_2D.x /= (rfb.z/d +1 );
    rft_2D.x /= (rft.z/d +1 );
    lbb_2D.y /= (lbb.z/d +1 );
    lbt_2D.y /= (lbt.z/d +1 );
    lfb_2D.y /= (lfb.z/d +1 );
    lft_2D.y /= (lft.z/d +1 );
    rbb_2D.y /= (rbb.z/d +1 );
    rbt_2D.y /= (rbt.z/d +1 );
    rfb_2D.y /= (rfb.z/d +1 );
    rft_2D.y /= (rft.z/d +1 );


}

function onIsometrix(){//等轴投影
    clearScreen();
    matrix[0][0]=0.70710678118655;
    matrix[0][1]=0.70710678118655;
    matrix[0][2]=0;
    matrix[0][3] = 0;
	matrix[1][0]=-0.40824829046386;
    matrix[1][1]=0.40824829046386;
    matrix[1][2]=0.81649658092773;
    matrix[1][3] = 0;
	matrix[2][0]=0;
    matrix[2][1]=0;
    matrix[2][2]=0;
    matrix[2][3] = 0;
	matrix[3][0] = 0;
    matrix[3][1] = 0;
    matrix[3][2] = 0;
    matrix[3][3] = 1;
	from3dTo2d();
	drawCubic();
}
function onCabinet(){//斜二侧投影
    clearScreen();
    L=2/Math.sqrt(3);
	Alpha=20;
	Alpha*=3.1415926/180;
	c=Math.cos(Alpha);
	s=Math.sin(Alpha);
	matrix[0][0]=1;
	matrix[0][1]=0;
    matrix[0][2]=L*c;
    matrix[0][3]=0;
    matrix[1][0]=0;
    matrix[1][1]=1;
    matrix[1][2]=L*s;
    matrix[1][3]=0;
    matrix[2][0]=0;
    matrix[2][1]=0;
	matrix[2][2]=0;
    matrix[2][3]=0;
    matrix[3][0]=0;
    matrix[3][1]=0;
    matrix[3][2]=0;
    matrix[3][3]=1;
    from3dTo2d();
    drawCubic();
}
function onCavalier(){//斜等轴投影
    clearScreen();
    L=1;
	Alpha=45;
    Alpha*=3.1415926/180;
	c=Math.cos(Alpha);
	s=Math.sin(Alpha);
    matrix[0][0]=1;
    matrix[0][1]=0;
    matrix[0][2]=L*c;
    matrix[0][3]=0;
    
    matrix[1][0]=0;
    matrix[1][1]=1;
    matrix[1][2]=L*s;
    matrix[1][3]=0;
    
    matrix[2][0]=0;
    matrix[2][1]=0;
	matrix[2][2]=0;
    matrix[2][3]=0;
    
    matrix[3][0]=0;
    matrix[3][1]=0;
    matrix[3][2]=0;
    matrix[3][3]=1;
    from3dTo2d();
    drawCubic();
}
function onPerspective(){//透视投影
    var inputx=prompt("请输入投影中心的x值:","200");
    var inputy=prompt("请输入投影中心的y值:","100");
    var inputz=prompt("请输入投影中心的z值:","100");
    if(inputx!=null&&inputx!=""&&inputy!=null&&inputy!=""&&inputz!=null&&inputz!=""){
        m_setx = parseInt(inputx);
        m_sety = parseInt(inputy);
        m_setz = parseInt(inputz);
    }
    clearScreen();
    x0=m_setx;
	y0=m_sety;
	d=m_setz;
    matrix[0][0]=1;
    matrix[0][1]=0;
    matrix[0][2]=x0/d;
    matrix[0][3]=0;
    
    matrix[1][0]=0;
    matrix[1][1]=1;
    matrix[1][2]=y0/d;
    matrix[1][3]=0;
    
    matrix[2][0]=0;
    matrix[2][1]=0;
	matrix[2][2]=0;
    matrix[2][3]=0;
    
    matrix[3][0]=0;
    matrix[3][1]=0;
    matrix[3][2]=1.0/d;
    matrix[3][3]=0;
    from3dTo2d_2(d);
    drawCubic();
}
function on3drotate(){//旋转
    clearScreen();
	m_type_transform = TRF_ROTATE;
	L = 2/Math.sqrt(3);
	Alpha = 20;
	Alpha *= 3.1415926/180;
	c = Math.cos(Alpha);
	s = Math.sin(Alpha);
	matrix[0][0]=1;	matrix[0][1]=0;	matrix[0][2]=L * c;	matrix[0][3] = 0;
	matrix[1][0]=0;	matrix[1][1]=1;	matrix[1][2]=L * s;	matrix[1][3] = 0;
	matrix[2][0]=0;	matrix[2][1]=0;	matrix[2][2]=0;	matrix[2][3] = 0;
	matrix[3][0]=0;	matrix[3][1]=0;	matrix[3][2]=0;	matrix[3][3] = 1;
	from3dTo2d();
	drawCubic();
}
function drawCubic(){
    //Draw Left face
	drawRect(lbb_2D,lbt_2D,lft_2D,lfb_2D);
	//Draw Right face
	drawRect(rbb_2D,rbt_2D,rft_2D,rfb_2D);
	//Draw Back face
	drawRect(lbb_2D,lbt_2D,rbt_2D,rbb_2D);
	//Draw Front face
	drawRect(lfb_2D,lft_2D,rft_2D,rfb_2D);
	//Draw Bottom face
	drawRect(lbb_2D,lfb_2D,rfb_2D,rbb_2D);
	//Draw Top face
	drawRect(lbt_2D,lft_2D,rft_2D,rbt_2D);
    
}
function clearScreen(){
    cc.height = cc.height;
    
}
function on3dtranslate(){
    clearScreen();
	m_type_transform = TRF_TRANSLATE;
	L = 2/Math.sqrt(3);
	Alpha = 20;
	Alpha *= 3.1415926/180;
	c = Math.cos(Alpha);
	s = Math.sin(Alpha);
	matrix[0][0]=1;	matrix[0][1]=0;	matrix[0][2]=L * c;	matrix[0][3] = 0;
	matrix[1][0]=0;	matrix[1][1]=1;	matrix[1][2]=L * s;	matrix[1][3] = 0;
	matrix[2][0]=0;	matrix[2][1]=0;	matrix[2][2]=0;	matrix[2][3] = 0;
	matrix[3][0]=0;	matrix[3][1]=0;	matrix[3][2]=0;	matrix[3][3] = 1;
	from3dTo2d();
	drawCubic();
}
function on3dscale(){//缩放
    clearScreen();
	m_type_transform = TRF_SCALE;
	L = 2/Math.sqrt(3);
	Alpha = 20;
	Alpha *= 3.1415926/180;
	c = Math.cos(Alpha);
	s = Math.sin(Alpha);
	matrix[0][0]=1;	matrix[0][1]=0;	matrix[0][2]=L * c;	matrix[0][3] = 0;
	matrix[1][0]=0;	matrix[1][1]=1;	matrix[1][2]=L * s;	matrix[1][3] = 0;
	matrix[2][0]=0;	matrix[2][1]=0;	matrix[2][2]=0;	matrix[2][3] = 0;
	matrix[3][0]=0;	matrix[3][1]=0;	matrix[3][2]=0;	matrix[3][3] = 1;
	from3dTo2d();
	drawCubic();
}
function drawRect(a,b,c,d){
    cxt.moveTo(a.x,a.y);
    cxt.lineTo(b.x,b.y);
    cxt.stroke();
    cxt.lineTo(c.x,c.y);
    cxt.stroke();
    cxt.lineTo(d.x,d.y);
    cxt.stroke();
    cxt.lineTo(a.x,a.y);
    cxt.stroke();
}

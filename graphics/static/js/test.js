function test(){
    n = 10;
    alert("test::n:" + n);
}
function another(){
    n = 100;
    alert("another::n:" + n);
}

test();
another();
n = 1000;
alert(n);
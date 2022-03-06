var canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d');
var birding = new Image();
var nenchinh = new Image();
var ongtren = new Image();
var ongduoi = new Image();
birding.src = "image/birding.png";
nenchinh.src = "image/nenchinh.png";
ongduoi.src = "image/ongduoi.png";
ongtren.src = "image/ongtren.png";
// tao bien can thiet
var score = 0;
var khoangcach2ong = 140;
var khoangcachongtrenongduoi;
// tao 1 object chim
var bird = {
    x : nenchinh.width/5,
    y : nenchinh.height/2
}
// tao mang ong de chua cac ong 
var ong = [];
ong[0] = {
    x: canvas.width,
    y: 0 // cho ong nam ben phai ngoai cung
}
// tao funcion chay tro chơi
function run(){
    ctx.drawImage(nenchinh,0,0);
    ctx.drawImage(birding,bird.x,bird.y);
    for(var i = 0; i < ong.length ; i++ ){
        khoangcachongtrenongduoi = ongtren.height + khoangcach2ong;
        ctx.drawImage(ongtren, ong[i].x, ong[i].y);
        // ve ong tren theo toa do ong do
        //ong duoi phu thuoc ong tren
        ctx.drawImage(ongduoi, ong[i].x, ong[i].y + khoangcachongtrenongduoi);
        ong[i].x -= 5; // để ống di chuyển

        // lập trình thêm ống khi ống di chuyển đến giữa
        if(ong[i].x == canvas.width/2.5){
            ong.push({
                x: canvas.width,
                y: Math.floor(Math.random() * ongtren.height - ongtren.height)
                // hàm math này để sau nghiên cứu
            })
        }
        if(ong[i].x == bird.x){
            score++;
        }
        // viết hàm thua:
        if(bird.y + birding.height == canvas.height ||
            bird.x + birding.width >= ong[i].x && bird.x <= ong[i].x + ongtren.width
            && (bird.y <= ong[i].y + ongtren.height || bird.y + birding.height >= ong[i].y + khoangcachongtrenongduoi)){
                return;
            }
    }
    document.getElementById("diem").innerHTML = score;
    bird.y += 1.5;
    requestAnimationFrame(run);
}
// tạo funcion bay lên khi nhấn
document.addEventListener("keydown",function(){
    bird.y -= 45;
})
run();

// 2048 游戏主体逻辑
var twoDimArray = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

var SCORE = 0;

// 将一行的零元素后移
function eliminateZero(arr) {
    for(var i = arr.length-1; i >=0; i--){
        if(arr[i]===0){
            arr.splice(i,1);
            arr.push(0);
        }
    }
    return arr
}

// 把一行向左相加
function addLine(arr) {
    var line = eliminateZero(arr);
    for(var r = 0;r<line.length-1;r++){
        if(line[r]!==0 && line[r] === line[r+1]){
            line.splice(r, 2, line[r]*2);
            line.push(0);
            SCORE += line[r];
        }
    }
}

//　矩阵转置
function transform(arrs) {
    for(var r = 0; r<arrs.length-1; r++){
        for(var c = r+1; c<arrs.length; c++){
            var temp;
            temp = arrs[r][c];
            arrs[r][c] = arrs[c][r];
            arrs[c][r] = temp;
        }
    }
}

// 向左移动
function moveLeft(arrs) {
    for(var i = 0; i < arrs.length; i++){
        addLine(arrs[i]);
    }
}

// 向右移动
function moveRight(arrs) {
    for(var i = 0; i < arrs.length; i++){
        arrs[i].reverse();
        addLine(arrs[i]);
        arrs[i].reverse();
    }
}

// 向上移动
function moveUp(arrs) {
    transform(arrs);
    moveLeft(arrs);
    transform(arrs);
}

// 向下移动
function moveDown(arrs) {
    transform(arrs);
    moveRight(arrs);
    transform(arrs);
}

// 生成随机数
function randomNum(num) {
    return Math.floor(Math.random() * num)
}

// 寻找零元素位置,返回一个零元素位置或者　false
function findZero(arrs) {
    var arrZero = [];
    for(var r = 0; r<arrs.length; r++){
        for(var c = 0; c<arrs.length; c++){
            if(arrs[r][c]===0){
                arrZero.push({"R":r, "C":c})
            }
        }
    }
    if(arrZero.length===0){
        return false
    }else if(arrZero.length===1){
        return arrZero[0]
    }else{
        return arrZero[randomNum(arrZero.length)]
    }
}

// 生成新数字
function createNewNum(){
    // 生成0到5的随机数，用于控制新生成数字的概率，2为80%,4为20%
    return randomNum(5)===2?4:2;
}

// 遍历寻找页面是否有相邻相同数字
function findSameNum(arrs) {
    for(var r = 0; r<arrs.length; r++){
        for(var c = 0; c<arrs.length-1; c++){
            if(arrs[r][c] === arrs[r][c+1]){
                return true
            }
        }
    }
    return false
}

//　判读游戏是否继续 判断是否有相邻和相同的数字
function judgeSameNum(arrs){
    //TODO 判断是否存在相邻且相同的元素
    if(findSameNum(arrs)){
        return true
    }
    transform(arrs);
    if(findSameNum(arrs)){
        transform(arrs);
        return true
    }
    transform(arrs);
    return false
}

// 在页面中显示二维数组
function showHtml(arrs) {
    for(var r = 0; r<arrs.length; r++){
        for(var c = 0; c<arrs.length; c++){
            var num = arrs[r][c];
            if(num!==0){
                var html = "";
                if(num<=4096){
                    html = "<nav class=\"nav" + num + "\">" + num + "</nav>";
                }else{
                    html = "<nav class=\"navBIG\">" + num + "</nav>";
                }
                $("#box"+r+c).html(html);
            }else{
                $("#box"+r+c).html("");
            }
        }
    }
    $("#scoreSPAN").html(SCORE);
}

// 向页面添加新数字,并显示
function addNewNum(arrs, empZero) {
    arrs[empZero.R][empZero.C] = createNewNum();
    showHtml(arrs);
}

// 判断游戏是否继续
function judgeGameOver(arrs) {
    var empZero = findZero(arrs);
    if(empZero){
        // 页面有空位置
        addNewNum(arrs, empZero);
    }else{
        // 页面没有空位置
        // TODO 判断是否有相邻和相同的数字
        var result = judgeSameNum(arrs);
        if(!result){
            $(".bg div").html("");
            twoDimArray = [
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ];
            SCORE = 0;
            alert("GAME OVER!");
            GAMESTART(twoDimArray);
        }
    }
}

//　游戏开始
function GAMESTART(arrs){
    //　随机生成两个数字
    var empty1 = findZero(arrs);
    arrs[empty1.R][empty1.C] = createNewNum();
    var empty2 = findZero(arrs);
    arrs[empty2.R][empty2.C] = createNewNum();
    showHtml(arrs);
}

// 点击上移
$("#btnUp").click(function () {
    // console.log(twoDimArray);
    moveUp(twoDimArray);
    judgeGameOver(twoDimArray);
});

// 点击下移
$("#btnDown").click(function () {
    // console.log(twoDimArray);
    moveDown(twoDimArray);
    judgeGameOver(twoDimArray);
});

// 点击左移
$("#btnLeft").click(function () {
    // console.log(twoDimArray);
    moveLeft(twoDimArray);
    judgeGameOver(twoDimArray);
});

// 点击右移
$("#btnRight").click(function () {
    // console.log(twoDimArray);
    moveRight(twoDimArray);
    judgeGameOver(twoDimArray);
});

 // 点击重新开始
$("#happy img").click(function () {
    twoDimArray = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    SCORE = 0;
    GAMESTART(twoDimArray);
});

// 键盘事件
document.onkeydown = keyMove;
function keyMove(e) {
    switch (e.which) {
        case 37:
            moveLeft(twoDimArray);
            judgeGameOver(twoDimArray);
            break;
        case 38:
            moveUp(twoDimArray);
            judgeGameOver(twoDimArray);
            break;
        case 39:
            moveRight(twoDimArray);
            judgeGameOver(twoDimArray);
            break;
        case 40:
            moveDown(twoDimArray);
            judgeGameOver(twoDimArray);
            break;
    }
}

// 游戏启动
GAMESTART(twoDimArray);



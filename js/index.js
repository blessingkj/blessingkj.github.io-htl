$(function () {
   //监听游戏规则的点击
    $(".rules").click(function () {
        $(".rule").stop().fadeIn(100);
    });
   //监听关闭按钮的点击
    $(".close").click(function () {
        $(".rule").stop().fadeOut(100);
    });

    //监听开始按钮的点击
    $(".start").click(function () {
        $(this).stop().fadeOut(100);
        //启动进度条方法
        progressHandler();
        //启动灰太狼方法
        startWolfAnimation();
    });

    //监听重新开始按钮点击
    $(".reset").click(function () {
        $(".mask").stop().fadeOut(100);
        progressHandler();
        startWolfAnimation();
    });

    //进度方法
    function progressHandler() {
        //拿到进度条
        let progress=$(".progress");
        //进度条归零
        progress.css({
            width: 180,
        });
        //开启定时器
        let timer=setInterval(function () {
            //拿到当前进度条的宽度
            let progressWidth=progress.width();
            //减少当前进度条的宽度
            progressWidth -=1;
            //重新复制
            $(".progress").css({
                width:progressWidth,
            });
            //监听进度条是否走完
            if(progressWidth<=0){
                clearInterval(timer);
                $(".mask").stop().fadeIn(100);
                stopWolfAnimation();
            }
        },200);
    }
    //开始灰太狼方法
    let wolfTimer;
    function startWolfAnimation() {
        //定义两个数组保存灰太狼和小灰灰的图片
        let wolf1=[
            './images/h0.png',
            './images/h1.png',
            './images/h2.png',
            './images/h3.png',
            './images/h4.png',
            './images/h5.png',
            './images/h6.png',
            './images/h7.png',
            './images/h8.png',
            './images/h9.png',
        ];
        let wolf2=[
            './images/x0.png',
            './images/x1.png',
            './images/x2.png',
            './images/x3.png',
            './images/x4.png',
            './images/x5.png',
            './images/x6.png',
            './images/x7.png',
            './images/x8.png',
            './images/x9.png',
        ];
        //定义一个数组保存所有可能出现的位置
        let arrPos=[
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"},
        ];
        //创建图片
        let $wolfImage=$("<img src='' class='wolfImage' alt=''>");
        //随机获取数组
        let wolfType=Math.round(Math.random()) === 0? wolf1:wolf2;
        //设置图片的内容
        window.wolfIndex=0;
        window.wolfIndexEnd=5;
        wolfTimer=setInterval(function () {
            if (wolfIndex>wolfIndexEnd){
                $wolfImage.remove();
                clearInterval(wolfTimer);
                startWolfAnimation();
            }
            $wolfImage.attr("src",wolfType[wolfIndex]);
            wolfIndex++;
        },300);
        //设置随机数
        let posIndex=Math.round(Math.random()*8);
        //设置图片显示的位置
        $wolfImage.css({
            position:"absolute",
            left:arrPos[posIndex].left,
            top:arrPos[posIndex].top,
        });
        //将图片添加到界面上
        $(".container").append($wolfImage);

        //调用处理游戏规则方法
        gameRules($wolfImage);
    }
    //停止灰太狼方法
    function stopWolfAnimation() {
        $(".wolfImage").remove();
        clearInterval(wolfTimer);
    }
    
    //游戏规则
    function gameRules($wolfImage) {
        $wolfImage.one("click",function () {
            //修改索引
            window.wolfIndex=5;
            window.wolfIndexEnd=9;
            //拿到当前点击地址
            let $src=$(this).attr("src");
            //根据图片地址判断是否为灰太狼
            let flag=$src.indexOf("h") >=0;
            //分数处理
            let $text=$(".score");
            if(flag){
                $text.text(parseInt($text.text())+10);
            }else {
                $text.text(parseInt($text.text())-10);
            }
        });
    }
});
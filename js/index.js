// 关键词轮换       // 块级作用域：不会污染其他的变量。   
{
// 1.获取搜索框的对象
let input=document.querySelector('.search input');

// 2.设置关键词的数组
const keyWords=['Vue3.0','React','爬虫技术','Java','多线程'];

// 3.使用setInterval，每隔2秒切换要给关键词，即切换搜索框对象的placeholder值
let i=0;        // i 代表数组的索引
input.placeholder=keyWords[i];
setInterval(()=>{
    i++;
    if(i==5){
        i=0;    
    }
    input.placeholder=keyWords[i];
},2000);

}

// 轮播图
{
    // 声明轮播图数组
    const swiperImgList=[
        {
            path:'./images/swiper/swiper-1.jpg',
            url:'https://coding.imooc.com/class/474.html',
            bg:'./images/swiper/bj-0.jpg'
        },
        {
            path:'./images/swiper/swiper-2.jpg',
            url:'https://coding.imooc.com/class/490.html',
            bg:'./images/swiper/bj-1.jpg'

        },
        {
            path:'./images/swiper/swiper-3.jpg',
            url:'https://coding.imooc.com/class/482.html',
            bg:'./images/swiper/bj-2.jpg'

        },
        {
            path:'./images/swiper/swiper-4.jpg',
            url:'https://coding.imooc.com/class/494.html',
            bg:'./images/swiper/bj-3.jpg'

        }
    ];

    // 获取右侧切换按钮
    const rightArrow=document.querySelector('.arrow-r');
    const leftArrow=document.querySelector('.arrow-l');
    // 获取a标签对象
    const swiperA=document.querySelector('.swiper a');
    // 获取最外层通栏的div对象
    const banner=document.querySelector('#banner');
    // 获取所有的切换圆点
    const lis=document.querySelectorAll('.circle-list li');
    const ul=document.querySelector('.circle-list');
    // 定义自动轮播的计时器
    let timer=null;
    // 用来控制数组索引的
    let i=0;
    // 将重复的代码封装成一个函数，下面直接调用即可
    function changeImg(index){
        swiperA.style.backgroundImage = `url(${swiperImgList[index].path})`;
        swiperA.href = swiperImgList[i].url;
        banner.style.backgroundImage = `url(${swiperImgList[index].bg})`;
        currentCircle(index);
    }
    changeImg(i);       // 保证页面一开始就有背景图、可跳转的url。

    // 设置是否允许点击事件执行的标志位
    // true：允许执行点击事件   flase：不允许
    let flag=true;
    rightArrow.onclick=function(){
        if(flag==false){
            return;
        }
        flag = false;

        // i == ++i==4?0:i
        i++;
        if(i==4){
            i=0;
        }
        changeImg(i);
        setTimeout(()=>{
            flag=true;
        },1000)
    }

    leftArrow.onclick=function(){
        // i = --i==1?3:i;
        i--;
        if(i==-1){
            i=3;
        }
        changeImg(i);
        setTimeout(()=>{
            flag=true;
        },1000)
    }

    // 封装一个根据当前图片的索引值来通过圆点切换对应图片的函数
    function currentCircle(index){
        for(let i=0;i<lis.length;i++){
            lis[i].className='';
            lis[index].className='current';
        }
    }

    // 循环注册圆点的点击事件
    for(let i=0;i<lis.length;i++){
        lis[i].onclick=function(){
            if(flag==false){
                return;
            }
            flag = false;

            changeImg(i);

            setTimeout(()=>{
                flag=true;
            },1000)
        }
    }

    // 自动轮播
    timer=setInterval(()=>{
        i++;
        if(i==4){
            i=0;
        }
        changeImg(i);  
    },3000)

    swiperA.onmouseenter = function(){
        clearInterval(timer);
    }

    swiperA.onmouseleave = function(){
        timer=setInterval(()=>{
            i++;
            if(i==4){
                i=0;
            }
            changeImg(i);  
        },3000)
    }

    leftArrow.onmouseenter = function(){
        clearInterval(timer);
    }

    rightArrow.onmouseenter = function(){
        clearInterval(timer);
    }

    ul.onmouseenter = function(){
        clearInterval(timer);
    }
    
  
}

// 倒计时
{
    // 1.获取结束时间点的时间戳
    let endDate=new Date('2022-12-31 23:00:00');     
    endDate=parseInt(endDate.getTime()/1000);        // 得到时间戳毫秒数+毫秒转秒+毫秒转秒后，有可能有小数，所以只要整数部分

    let timer=null;
    // 获取时分秒的标签对象
    const hourDom=document.getElementById('hour');
    const minDom=document.getElementById('min');
    const secDom=document.getElementById('sec');

    function countDown(){
        // 2. 获取当前时间点的时间戳
        let nowDate=new Date();
        nowDate=parseInt(nowDate.getTime()/1000);
        // 3. 计算剩余的总秒数
        let seconds=endDate-nowDate;

        if(seconds>=0){
            // 4.根据剩余总秒数，计算剩余小时、分钟、秒；（关键）
            let hours=parseInt(seconds/3600);
            hours=hours>9?hours:'0'+hours;          // 让小时如果是2时，就变为02的规范形式

            let mins=parseInt(seconds%3600/60);
            mins=mins>9?mins:'0'+mins;

            let secs=seconds%3600%60;
            secs=secs>9?secs:'0'+secs;
            // 5.再将剩余的小时、分钟、秒显示在页面上；
            hourDom.innerText=hours;
            minDom.innerText=mins;
            secDom.innerText=secs;
        }else{
            clearInterval(timer);
            document.querySelector('.countdown p').innerText='拼团已结束';
        }
    }
    countDown();

    timer=setInterval(()=>{
        countDown();  
    },1000)
}

// 滚动课程
{
    const ul=document.querySelector('.ms-list ul');

    let timer=null;
    let leftPX=0;

    timer=setInterval(()=>{
        leftPX = --leftPX == -1920 ? 0 : leftPX;    // 三元运算符
        ul.style.left=leftPX+'px';
    },10);


    ul.onmouseenter=function(){
        clearInterval(timer);
    }

    ul.onmouseleave=function(){
        timer=setInterval(()=>{
            leftPX = --leftPX == -1920 ? 0 : leftPX;    
            ul.style.left=leftPX+'px';
        },10);
    }

}

// 新上好课：课程切换
{
    // 1. 获取所有的a标签（Tab栏）
    const tabs=document.querySelectorAll('#course .title-pic a');
    const uls=document.querySelectorAll('#course  .course ul');

    // 2.循环为所有的Tab栏绑定点击事件
    for(let i=0;i<tabs.length;i++){
        tabs[i].onclick=function(){
            // 当点击任何一个tab栏时，先通过循环清除所有a标签和ul标签的样式
            for(let j=0;j<tabs.length;j++){
                tabs[j].className='';    // 因为tab栏和ul数一样，一一对应
                uls[j].className='';
            }
            // 显示出当前点击的tab栏、匹配的ul
            tabs[i].className='active';
            uls[i].className='current';

        }
    }
}

// 进站必学：课程切换
{
    // 1. 获取所有的a标签（Tab栏）
    const tabs=document.querySelectorAll('#course2 .title-pic a');
    const uls=document.querySelectorAll('#course2  .course ul');

    // 2.循环为所有的Tab栏绑定点击事件
    for(let i=0;i<tabs.length;i++){
        tabs[i].onclick=function(){
            // 当点击任何一个tab栏时，先通过循环清除所有a标签和ul标签的样式
            for(let j=0;j<tabs.length;j++){
                tabs[j].className='';    // 因为tab栏和ul数一样，一一对应
                uls[j].className='';
            }
            // 显示出当前点击的tab栏、匹配的ul
            tabs[i].className='active';
            uls[i].className='current';

        }
    }
}

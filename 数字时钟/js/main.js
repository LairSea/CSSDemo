// 给js文件添加页面加载事件
window.addEventListener('load',()=>{
    //获取放置时间的元素
    // 小时
    const hour = document.querySelector(".hour>span");
    // 分钟
    const minute = document.querySelector(".minute>span");
    // 秒钟
    const second = document.querySelector(".second>span");
    // 获取开始和暂停两个元素
    const running = document.querySelector(".running>span");
    const paused = document.querySelector(".paused>span");
    // 获取提示框
    const toast = document.querySelector(".toast");
    // 定义函数更新时间
    const getTime = () =>{
        // 获取当前的事件
        const nowTime = new Date();
        // 获取当前时钟
        const hours = nowTime.getHours();
        //如果时钟小于10，则在前面加上0 否则不做变化
        hour.innerHTML = hours<10?'0'+hours:hours;
        // 分钟
        const minutes = nowTime.getMinutes();
        minute.innerHTML = minutes<10 ? '0'+minutes:minutes;
        // 秒钟
        const seconds = nowTime.getSeconds();
        second.innerHTML = seconds < 10? '0'+seconds:seconds;
    }
    // 调用一下
    getTime();
    //定义计时器 每一秒更新一次时间
    let timer = setInterval(()=>{
        getTime();
    },100);
    //定义一个变量控制定时器是否需要开启
    let flag = false;
    //现在做提示框
    // 定义一个透明度
    let opacity = 0;
    // 定义一个函数来弹出提示框，因为我们需要在散出用到
    const showToast = () =>{
        //调出提示框，开启计时器 逐渐显示
        const toastTimer = setInterval(()=>{
            opacity+=0.1;
            //设置提示框透明度
            toast.style.opacity = opacity;
            //我们现在让提示框显示1.5s后消失
            //定义一个一次性定时器
            //如果透明度=1 就让它逐渐消失
            if(opacity >=1){
                setTimeout(()=>{
                //显示1.5s之后重新将透明度设置为0
                    opacity = 0;
                //清楚定时器
                clearInterval(toastTimer);
                toast.style.opacity = 0;
                },1500);
            }
        },30);
    };
    // 现在做开始和暂停功能
    // 先做暂停
    paused.addEventListener('click',()=>{
        //显示提示框
        toast.innerHTML = "时钟已暂停..";
        showToast();
        // 点击暂停 清除定时器
        clearInterval(timer);
        // 如果定时器被清除，则说明定时器需要被开启
        flag = true;
    });
    //现在做开启
    //出现bug 多次点击开始后无法暂停了 原因是开启多个计时器，点击暂停不知道找哪个了
    //我们定义一个标志变量控制定时器是否需要开启
    running.addEventListener('click',()=>{
        //调用提示框
        if (flag){
            toast.innerHTML = "时钟已经开启了..";
            showToast();
            //点击开启时钟
            timer = setInterval(()=>{
                getTime();
            },1000);
            flag =false;
        }else {
            toast.innerHTML = "时钟已经在运行了..."
            showToast();
        }
    });
})
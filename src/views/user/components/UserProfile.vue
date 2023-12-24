<script setup>
import TopBarVue from '@/components/TopBar.vue';
</script>

<template>
  <TopBarVue/>
  <div class="container-fluid">
    <!-- module1指右上角扫一扫按钮跟设置按钮 -->
    <div class="module1">
      <button type="button" class="mui-btn1">
        <i class="iconfont icon-saoyisao"></i>
      </button>
      <button type="button" class="mui-btn2">
        <i class="iconfont icon-shezhi"></i>
      </button>

    </div>
    <!-- 我的信息 -->
    <div id="myInfo">
      <!-- 头像框图片 -->
     <img src="https://fastly.picsum.photos/id/676/200/200.jpg?hmac=hgeMQEIK4Mn27Q2oLRWjXo1rgxwTbk1CnJE954h_HyM" alt="">
    <h1 class="myName">我的名称：林北</h1>  
    <h1 class="myHobby">我的爱好：喜欢猫猫</h1>  
    </div>
    <!-- module2指收藏，浏览记录等 -->
    <div id="module2">
    <h1 class="commonFunction">常用功能</h1>
   
   <a href="#">书签</a> 
   <a href="#">历史</a>
   <a href="#">下载</a>
   <a href="#">关注</a>
  
    </div>
    <!-- module3指的是常用功能 -->
    <div class="module3">
      <a href="#">日照模式</a>
      <a href="#">无痕浏览</a>
      <a href="#">网页无图</a>
      <a href="#">退出</a>
    </div>
    <!-- 猫猫图片 -->
    <div class="module4">
      <h1 class="cat1">
        <img src="https://cdn2.thecatapi.com/images/1au.gif" alt="">
      </h1>
      <h1 class="cat2">
        <img src="https://cdn2.thecatapi.com/images/4l1.gif">
      </h1>
    </div>
    <!-- module5指我的消息.我的小说.积分中心.我的游戏 -->
    <div class="module5">
      <div class="myNew">
        <a href="#">我的消息</a>
        <i class="iconfont icon-xiaoxizhongxin"></i>
      </div>
      <div class="myNovel">
        <a href="#">我的小说</a>
        <i class="iconfont icon-tubiao1shuxiaoshuo"></i>
      </div>
      <div class="integralCenter">
        <a href="#">积分中心</a>
        <i class="iconfont icon-jifen"></i>
      </div>
      <div class="myGame">
        <a href="#">我的游戏</a>
        <i class="iconfont icon-youxiyouxiji"></i>
      </div>
    </div>

  </div>
  
  
</template>

<style>
a{
  text-decoration: none;
  color: #000;
}
.module1{
margin-top: 5px;
position: relative;
height: 50px;
}
.mui-btn1{
position: absolute;
top: 10%;
left: 80%;
background: white;
border: none;

}
.mui-btn2{
  position: absolute;
top: 10%;
left: 90%;
background: white;
border: none;
}

#myInfo{
  margin-top: 5px;
  /* 父元素相对定位 */
  position: relative;
  height: 100px;
  border-radius: 10px;
  /* background-color: antiquewhite; */
}

#myInfo img{
 width: 100px;
 height: 100px; 
 border-radius: 50%;
  
}
.myName{
/* 子元素绝对定位 */
position: absolute;
top: 10%;
left: 30%;
font-size: 20px;
}
.myHobby{
  position: absolute;
  top: 40%;
  left: 30%;
  font-size: 15px;
}
#module2{
  position: relative;
  /* background-color: aquamarine; */
  /* 内边距 */
  margin-top: 50px;
  padding-top: 30px;
  display: flex;
  justify-content:space-around ;
  align-items: center;
  height: 80px;
  border-radius: 10px;
  /* background-color: rgb(244, 244, 244); */

}
.commonFunction{
  position: absolute;
  top: 0;
  left: 0;
  font-size: 18px;
  margin: 5px;
}

#module2 a{
  height: 20px;
  font-size: 20px;
  color: #000;
}
.module3{
  margin: 5px 0;
  display: flex;
  justify-content:space-around ;
  align-items: center;
  height: 100px;
  /* background-color: antiquewhite; */
  border-radius: 5px;
}
.module3 a{
  font-size: 20px;
  color: #000;
}
.module4{
  position: relative;
  width: 100px;
  height: 100px;
}
.module4 .cat1 img{
  position: absolute;
  top: auto;
  left: 20px;
  height: 100px;
}
.module4 .cat2 img{
  position: absolute;
  top: auto;
  left: 220px;
  height: 100px;
}
.module5{
  position: relative;
  margin: 5px 0;
  justify-content: space-evenly;
  background-color: rgb(244, 244, 244);
  display: flex;
  justify-content:space-around ;
  align-items: center;
  height: 100px;
  border-radius: 5px;
}


.myNew{
  position: absolute;
  width: 80px;
  text-align: center;
  height: 80px;
  left: 4%;
  top: 20%;
}
.myNovel{
  position: absolute;
  width: 80px;
  text-align: center;
  height: 80px;
  left: 27%;
  top: 20%;
}
.integralCenter{
  position: absolute;
  width: 80px;
  text-align: center;
  height: 80px;
  left: 50%;
  top: 20%;
}
.myGame{
  position: absolute;
  width: 80px;
  text-align: center;
  height: 80px;
  left: 73%;
  top: 20%;
}


</style>

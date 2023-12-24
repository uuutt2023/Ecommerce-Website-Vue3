<script setup>
import { nextTick, ref } from 'vue';
import TopBar from '@/components/TopBar.vue';
import axios from 'axios';



// 详情页数据
let catDetail = ref({
  // 详情页基本数据
  id: 'xxx',
  title: '标题',
  description: '简介',
  // 猫咪基本数据
  name: '小黑',
  fur_color: '毛色',
  animal: '动物类别',
  breed: '品种',
  // 其他
  user_messages: ['用户留言'],
  url: '图片URL',
  width: '图片宽度',
  height: '图片高度',
});

nextTick(async () => {
  // 请求后端获取数据
  const { data } = await axios.get(`/api/detail/cat${location.search}`);
  catDetail.value = data;
  // 数据获取
  console.log(catDetail.value.animal);
});

// 图片路劲数组

</script>

<template>
<!-- <div class="container-fluid">{{ catDetail.title }}</div> -->
  <!-- 顶部栏 -->
  <TopBar />

  <!-- 页面获取数据 -->
  <div class="container-fluid">
  <!-- 轮播图 -->
  <div id="carouselExampleDark" class="carousel carousel-dark slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="10000">
      <img src="https://i0.hippopx.com/photos/614/842/525/cat-kitten-cat-baby-young-cat-preview.jpg" class="d-block w-100" alt="">
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <img src="https://i0.hippopx.com/photos/941/610/370/cat-mieze-kitten-tiger-cat-preview.jpg" class="d-block w-100" alt="">
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://i0.hippopx.com/photos/717/27/767/cat-kitten-grass-cat-baby-preview.jpg" class="d-block w-100" alt="">
      <div class="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>

    <!-- 作者分享文案 -->
    <div class="copywritingBox">
      <div class="copywriting">
      <p>{{ catDetail.title }}</p>
      <p>真羡慕{{ catDetail.title }}不用上班啊</p>
      <p>不过这可爱的小动作直接治愈本人疲劳的一天！</p>
      <p>打完积雪明天又是充满干劲的一天</p>
      </div>  
      <!-- 作者发布时间以及ip地址 -->
      <div class="authorInfo">
        <p>12-07<span>上海</span></p>
        
      </div>
    </div>

    <!-- 评论区 -->
    <div class="commentArea">
      <span>共11条评论</span>
      <!-- 网友评论区 -->
      <div class="netizen" v-for="(item, index) in catDetail" :key="index">
        <!-- 网友头像 -->
        <div class="netizenImg" >
        <img :src="`https://picsum.photos/200?${index}`" alt="123">
        </div>
          <!-- 网名 -->  
          <p id="netizenName">他找若有青云志</p>
        <!-- 网友评论 -->
        <div class="comments">
          <p>{{catDetail.user_messages}}</p>
        </div>
        <!-- 网友评论状态信息 -->
        <div class="netizenInfo" >
          <p>1小时前<span>天津</span><span>回复</span></p>
        </div>
      </div>
    </div>

    <!-- 固定底部栏 -->
    <div class="bottomColumn">
      <!-- 评论 -->
      <div class="Inp">
        <input type="text" placeholder="善言结善语...">
      </div>
      <!-- 点赞 -->      
        <i class="iconfont icon-like"></i>
      <!-- 收藏 -->
        <i class="iconfont icon-shoucang"></i>      
      <!-- 查看评论 -->
      <i class="iconfont icon-31pinglun"></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-fluid{
  background-color: rgb(80, 80, 80);
}

.copywritingBox{
  margin: 10px 0;
  width: 100%;
  // border-radius: 30px;
  // background-color: rgb(163, 163, 163);
  border-bottom: 1px solid #c0c0c0;
}

.copywriting{
  margin-left: 20px;
  color: aliceblue;
}

.authorInfo{
  display: flex;
  margin-left: 20px;
  font-size: 10px;
}

.authorInfo span{
  margin-left: 5px;
  color: rgb(210, 210, 210);
}

.netizen{
  position: relative;
  width: 100%;
  // background-color: aqua;
  margin-bottom: 20px;
  margin: 20px 0;
  padding: 10px 0;
  border-bottom: 1px solid #d7faeb;
}

// 网友头像
.netizenImg img{
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

#netizenName{
  position: absolute;
  top: 5%;
  left: 20%;
  font-size: 13px;
  font-weight: 1000;
  color: #d7faeb;
}

.comments{
  margin: 15px 0;
  color: aliceblue;
}

.netizenInfo{
  font-size: 12px;
  color: rgb(163, 163, 163);
}

.netizenInfo span{
  margin: 0 5px;
}

.bottomColumn{
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  line-height: 80px;
  // backdrop-filter: blur(100px);
  background-color: #595959;
}



.Inp input{
  width: 150px;
  height: 50px;
  // border: none;
  border-radius: 60px;
}

.Inp input::placeholder{
  text-align: center;
  font-size: 20px;
  font-weight: 1000;
  color: #595959;
}


</style>

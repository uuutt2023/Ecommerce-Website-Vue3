<script setup></script>

<template>
  <div
    id="wrap"
    class="p-lg-5 p-sm-3 container-fluid">
    <div class="input-box p-4 p-md-5 col-xxl-4 col-lg-6 col-md-7 col-10">
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component
            :is="Component"
            v-if="$route.meta.keepAlive" />
        </KeepAlive>
      </RouterView>
      <RouterView v-if="!$route.meta.keepAlive"></RouterView>
    </div>
  </div>
</template>

<style lang="scss">
#wrap {
  background:
    url('~@/assets/images/index/Illustration.png') no-repeat -40% bottom,
    linear-gradient(to right top, #365dfb, #679cf6) no-repeat;
  background-size: 970px, 100%;

  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.input-box {
  background-color: #ffffff;
  box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  form {
    background-color: #ffffff;
    box-shadow: 0 1px 4px 0 #e5e9f2;
    border-radius: 5px;
    margin-top: 40px;
  }

  header {
    * {
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
    }

    h2 {
      color: #31394d;
    }

    h5 {
      color: #748aa1;
    }
  }

  [type='submit'] {
    background-color: #29cb97;
    border-color: #29cb97;
  }
}
</style>

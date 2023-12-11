<template>
  <div>
    <header>
      <h2>登录</h2>
      <h5>请输入您的账号与密码</h5>
    </header>
    <form class="d-grid my-4 p-3 p-md-4">
      <div class="mb-3">
        <label
          class="form-label"
          for="username">
          账号
        </label>
        <input
          id="username"
          class="form-control"
          name="username"
          type="text" />
      </div>
      <div>
        <label
          class="form-label"
          for="password">
          密码
        </label>
        <input
          id="password"
          class="form-control"
          name="password"
          type="password" />
      </div>
      <button
        class="btn btn-success mt-4 p-2"
        type="submit">
        登录
      </button>
    </form>
    <footer class="row justify-content-around">
      <RouterLink
        class="btn btn-primary col-5 p-2"
        to="/index/signUp">
        新用户?
      </RouterLink>
      <RouterLink
        class="btn btn-info col-5 p-2 text-white"
        to="/index/forge">
        忘了？
      </RouterLink>
    </footer>
  </div>
</template>

<script setup></script>

<template>
  <div>
    <header>
      <h2>注册</h2>
      <h5>没有账号？那就注册一个吧。</h5>
    </header>
    <form class="d-grid my-4 p-3 p-md-4">
      <div class="mb-3">
        <label
          class="form-label"
          for="username">
          账号
        </label>
        <ValidationProvider>
          <input
            id="username"
            v-model="value"
            class="form-control"
            name="username"
            type="text" />
        </ValidationProvider>
      </div>
      <div class="mb-3">
        <label
          class="form-label"
          for="password1">
          密码
        </label>
        <input
          id="password1"
          class="form-control"
          name="password1"
          type="password" />
      </div>
      <div>
        <label
          class="form-label"
          for="password2">
          密码确认
        </label>
        <input
          id="password2"
          class="form-control"
          name="password2"
          type="password" />
      </div>
      <button
        class="btn btn-success mt-4 p-2"
        type="submit">
        立即注册
      </button>
    </form>
    <footer class="row justify-content-around">
      <RouterLink
        class="btn btn-primary col-5 p-2"
        to="/index/signIn">
        有账号啦？
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

<style lang="scss" scoped></style>

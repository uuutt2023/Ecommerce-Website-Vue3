<template>
  <div>
    <header>
      <h2>找回账号</h2>
      <h5>请输入您的邮箱账号找回密码。</h5>
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
      <div class="mb-3">
        <label
          class="form-label"
          for="password1">
          新密码
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
          新密码确认
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
        找回
      </button>
    </form>
    <footer class="row justify-content-around">
      <RouterLink
        class="btn btn-primary col-5 p-2"
        to="/index/signIn">
        记得密码啦？
      </RouterLink>
      <RouterLink
        class="btn btn-info col-5 p-2 text-white"
        to="/index/signUp">
        重新注册
      </RouterLink>
    </footer>
  </div>
</template>

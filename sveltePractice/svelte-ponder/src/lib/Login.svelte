<script lang="ts">
  function loginHandler(event: SubmitEvent) {
    event.preventDefault();
    console.log("Login button clicked");
  }
</script>

<form onsubmit={loginHandler}>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" required minlength="6" />

  <button type="submit">Log In</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 300px;
  }
  button {
    margin-top: 0.5rem;
  }
</style>
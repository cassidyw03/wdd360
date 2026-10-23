<script lang="ts">
  let email = $state("");
  let password = $state("");
  let error = $state("");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function loginHandler(event: SubmitEvent) {
    event.preventDefault();
    error = "";

    if (!email || !password) {
      error = "Please enter an email and password.";
      return;
    } else if (!emailPattern.test(email)) {
      error = "Please enter a valid email address.";
      return;
    } else if (password.length < 6) {
      error = "Password must be at least 6 characters long.";
      return;
    }
    console.log("Login successful");
    console.log("Login button clicked");
    console.log(email, password);
  }
</script>

<form novalidate onsubmit={loginHandler}>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" bind:value={email} />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" bind:value={password} />

  <button type="submit">Log In</button>
  {#if error}
    <p class="error" role="alert">{error}</p>
  {/if}
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
  .error {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
</style>

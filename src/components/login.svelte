<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const login = () => {
    dispatch("login", { email, password });
  };

  let email,
    password = "";
</script>

<style>
  div {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  form {
    display: flex;
    flex-direction: column;
    max-width: 20rem;
    margin: 0 auto;
    border: 1px solid;
    padding: 3rem;
  }
  h3 {
    text-align: center;
  }
</style>

<div>
  <form on:submit|preventDefault={login}>
    <h3>Innskráning</h3>
    <input bind:value={email} name="email" type="email" />
    <input bind:value={password} type="password" name="password" />
    <input type="submit" value="Áfram" />
  </form>
</div>

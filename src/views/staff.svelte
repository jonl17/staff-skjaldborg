<script>
  import { auth } from "../service/firebase.js";
  import Header from "../components/header.svelte";
  import Submissions from "../components/submissions.svelte";

  function logout() {
    auth.signOut();
  }

  let count = 0;
</script>

<Header>
  <h1>Hello master/minion</h1>
  <button on:click={logout}>Log out</button>
</Header>
<Submissions />

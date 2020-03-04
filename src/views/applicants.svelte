<script>
  import { auth } from "../service/firebase.js";

  function logout() {
    auth.signOut();
  }
</script>

<h1>Hello applicant</h1>
<button on:click={logout}>Log out</button>

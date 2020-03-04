<script>
  import Login from "./components/login.svelte";
  import Gatekeeper from "./components/gatekeeper.svelte";

  import { auth, db } from "./service/firebase.js";
  import { authState } from "rxfire/auth";
  import { collectionData, docData } from "rxfire/firestore";
  import { tap } from "rxjs/operators";

  import { user } from "./store/index.js";

  const unsubscribe = authState(auth).subscribe(u => {
    $user = u;
  });

  const masterOrMinion = () => {};

  const loginUser = event => {
    const { email, password } = event.detail;
    auth.signInWithEmailAndPassword(email, password);
  };

  let uid;
</script>

{#if $user}
  <Gatekeeper {uid} />
{:else}
  <Login on:login={loginUser} />
{/if}

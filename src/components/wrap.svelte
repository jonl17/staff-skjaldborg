<style>
  div {
    display: flex;
    flex-direction: column;
  }
  @media only screen and (min-width: 600px) {
    div {
      /* display: grid; */
      grid-template-columns: repeat(auto-fit, minmax(30rem, 30rem));
      justify-content: center;
      padding: 4rem 0 4rem;
    }
  }
</style>

<div>
  <slot />
</div>

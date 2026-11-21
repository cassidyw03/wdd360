<template>
  <section class="card">
    <header><h1><slot name="title" /></h1></header>
    <slot />
    <footer v-if="$slots.footer"><slot name="footer" /></footer>
  </section>
</template>

<style scoped>
.card { max-width: 480px; margin: 2rem auto; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); font-family: system-ui, sans-serif; }
h1 { color: #42b883; margin-top: 0; }
footer { display: flex; justify-content: space-between; margin-top: 1rem; font-size: 0.9rem; }
</style>
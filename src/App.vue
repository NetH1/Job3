<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <div class="wrapper">
      <nav class="bg-black w-full text-white py-7 flex justify-center gap-x-3">
        <RouterLink to="/">Верстка</RouterLink>
        <RouterLink to="/about">Техническое задание</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>



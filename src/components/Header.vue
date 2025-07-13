<template>
  <header :class="{ hidden: isHidden }" >
    <div class="navbar" style="border-top-left-radius: 12px; border-top-right-radius: 12px;">
      <div class="logo"> <img src="@/assets/logo.png" alt="Suitmedia" /> </div>
      <nav>
        <ul>
          <li><a href="#">Work</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#" class="active">Ideas</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isHidden = ref(false)
let lastScroll = 0

onMounted(() => {
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY
    isHidden.value = currentScroll > lastScroll && currentScroll > 100
    lastScroll = currentScroll
  })
})
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: top 0.3s ease;
  z-index: 999;
}
.hidden {
  top: -100px;
}
.navbar {
  max-width: 1200px;
  margin: auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo img {
  height: 30px;
}
nav ul {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}
nav ul li a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  position: relative;
}
nav ul li a.active {
  color: #fcf5f1;
  text-decoration: underline;
  text-underline-offset: 15px;
}
</style>

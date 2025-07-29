<template>
  <header class="header" :class="{ 'header--hidden': isHidden }">
    <div class="navbar">
      <div class="navbar__logo">
        <img src="@/assets/logo.png" alt="Suitmedia" />
      </div>
      <nav class="navbar__nav">
        <ul class="nav-list">
          <li class="nav-list__item">
            <a href="#" class="nav-list__link">Work</a>
          </li>
          <li class="nav-list__item">
            <a href="#" class="nav-list__link">About</a>
          </li>
          <li class="nav-list__item">
            <a href="#" class="nav-list__link">Services</a>
          </li>
          <li class="nav-list__item">
            <router-link to="/" class="nav-list__link nav-list__link--active">
              Ideas
            </router-link>
          </li>
          <li class="nav-list__item">
            <a href="#" class="nav-list__link">Careers</a>
          </li>
          <li class="nav-list__item">
            <a href="#" class="nav-list__link">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isHidden = ref(false)
let lastScrollY = 0

const handleScroll = () => {
  const currentScrollY = window.scrollY
  
  if (currentScrollY > 100) {
    isHidden.value = currentScrollY > lastScrollY
  } else {
    isHidden.value = false
  }
  
  lastScrollY = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #eb682f;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
}

.header--hidden {
  transform: translateY(-100%);
}

.navbar {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__logo img {
  height: 32px;
  width: auto;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-list__link {
  text-decoration: none;
  color: white;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s ease;
  position: relative;
}

.nav-list__link:hover {
  color: #fcf5f1;
}

.nav-list__link--active {
  color: #fcf5f1;
}

.nav-list__link--active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #fcf5f1;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .navbar {
    padding: 0.75rem 1rem;
  }
  
  .nav-list {
    gap: 1rem;
    font-size: 0.9rem;
  }
  
  .navbar__logo img {
    height: 28px;
  }
}

@media (max-width: 640px) {
  .nav-list {
    display: none; /* You might want to implement a mobile menu here */
  }
}
</style>
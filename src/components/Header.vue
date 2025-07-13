<template>
  <header :class="{ hidden: isHidden }" >
    <div class="navbar" style="border-top-left-radius: 12px; border-top-right-radius: 12px;">
      <div class="logo"> 
        <img src="@/assets/logo.png" alt="Suitmedia" /> 
      </div>
      
      <!-- Mobile menu button -->
      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <!-- Navigation -->
      <nav :class="{ 'mobile-open': isMobileMenuOpen }">
        <ul>
          <li><a href="#" @click="closeMobileMenu">Work</a></li>
          <li><a href="#" @click="closeMobileMenu">About</a></li>
          <li><a href="#" @click="closeMobileMenu">Services</a></li>
          <li><a href="#" class="active" @click="closeMobileMenu">Ideas</a></li>
          <li><a href="#" @click="closeMobileMenu">Careers</a></li>
          <li><a href="#" @click="closeMobileMenu">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isHidden = ref(false)
const isMobileMenuOpen = ref(false)
let lastScroll = 0

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleScroll = () => {
  const currentScroll = window.scrollY
  isHidden.value = currentScroll > lastScroll && currentScroll > 100
  lastScroll = currentScroll
}

const handleResize = () => {
  if (window.innerWidth > 768) {
    isMobileMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
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
  background-color: #eb682f;
  position: relative;
}

.logo img {
  height: 30px;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
}

.mobile-menu-btn span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 3px 0;
  transition: 0.3s;
}

.mobile-menu-btn:hover span {
  background-color: #fcf5f1;
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
  color: white;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
}

nav ul li a:hover {
  color: #fcf5f1;
}

nav ul li a.active {
  color: #fcf5f1;
  text-decoration: underline;
  text-underline-offset: 15px;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .navbar {
    padding: 1rem;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #eb682f;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    border-radius: 0 0 12px 12px;
  }
  
  nav.mobile-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  nav ul {
    flex-direction: column;
    gap: 0;
    padding: 1rem;
  }
  
  nav ul li {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  nav ul li:last-child {
    border-bottom: none;
  }
  
  nav ul li a {
    display: block;
    padding: 1rem 0;
    color: white;
  }
  
  nav ul li a.active {
    text-underline-offset: 5px;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 0.8rem;
  }
  
  .logo img {
    height: 25px;
  }
}
</style>
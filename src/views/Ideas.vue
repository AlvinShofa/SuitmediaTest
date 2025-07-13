<template>
  <!-- BANNER -->
  <section class="banner">
    <div class="banner-content">
      <h1>Ideas</h1>
      <p>Where all our great things begin</p>
    </div>
  </section>

  <!-- CONTENT WRAPPER -->
  <div class="container">
    <!-- FILTER & SHOWING -->
    <div class="top-bar">
      <div class="showing">Showing {{ startIndex }} - {{ endIndex }} of {{ totalItems }}</div>
      <div class="filters">
        <label>Show per page:
          <select v-model="perPage" @change="onFilterChange">
            <option v-for="n in [10, 20, 50]" :key="n">{{ n }}</option>
          </select>
        </label>
        <label>Sort by:
          <select v-model="sort" @change="onFilterChange">
            <option value="-published_at">Newest</option>
            <option value="published_at">Oldest</option>
          </select>
        </label>
      </div>
    </div>

    <!-- LIST -->
    <div class="grid">
      <IdeaCard v-for="idea in ideas" :key="idea.id" :idea="idea" />
    </div>

    <!-- PAGINATION -->
    <div class="pagination">
      <button @click="changePage(page - 1)" :disabled="page === 1" class="nav-btn">«</button>
      
      <button
        v-for="pageNum in visiblePages"
        :key="pageNum"
        @click="changePage(pageNum)"
        :class="{ active: page === pageNum, dots: pageNum === '...' }"
        :disabled="pageNum === '...'"
      >
        {{ pageNum }}
      </button>
      
      <button @click="changePage(page + 1)" :disabled="page === totalPages" class="nav-btn">»</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import IdeaCard from '../components/IdeaCard.vue'

const ideas = ref([])
const page = ref(1)
const perPage = ref(10)
const sort = ref('-published_at')
const totalPages = ref(1)
const totalItems = ref(0)

const fetchIdeas = async () => {
  const res = await axios.get('https://suitmedia-backend.suitdev.com/api/ideas', {
    params: {
      'page[number]': page.value,
      'page[size]': perPage.value,
      append: ['small_image', 'medium_image'],
      sort: sort.value
    }
  })
  ideas.value = res.data.data
  totalItems.value = res.data.meta.total
  totalPages.value = res.data.meta.last_page
}

const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value && newPage !== '...') {
    page.value = newPage
    fetchIdeas()
  }
}

const onFilterChange = () => {
  page.value = 1
  fetchIdeas()
}

const startIndex = computed(() => (page.value - 1) * perPage.value + 1)
const endIndex = computed(() => Math.min(page.value * perPage.value, totalItems.value))

// Smart pagination logic - hanya menampilkan 6 elemen maksimal
const visiblePages = computed(() => {
  const current = page.value
  const total = totalPages.value
  const pages = []

  if (total <= 6) {
    // Jika total halaman <= 6, tampilkan semua
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Jika total halaman > 6, gunakan logika smart pagination
    if (current <= 3) {
      // Halaman awal: 1, 2, 3, 4, ..., last-1, last
      pages.push(1, 2, 3, 4, '...', total)
    } else if (current >= total - 2) {
      // Halaman akhir: 1, 2, ..., last-3, last-2, last-1, last
      pages.push(1, 2, '...', total - 3, total - 2, total - 1, total)
    } else {
      // Halaman tengah: 1, 2, ..., current, ..., last-1, last
      pages.push(1, 2, '...', current, '...', total - 1, total)
    }
  }

  return pages
})

onMounted(fetchIdeas)
</script>

<style scoped>
/* BANNER */
.banner {
  position: relative;
  height: 340px;
  background-image: url('@/assets/banner.webp');
  background-size: cover;
  background-position: center;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 93%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  max-width: 1200px;
  margin: auto;
}

.banner-content {
  text-align: center;
  color: white;
}

.banner-content h1 {
  font-size: 2.8rem;
  margin-bottom: 0.3rem;
}

.banner-content p {
  font-size: 1.1rem;
}

/* CONTAINER */
.container {
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
}

/* TOP BAR */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  gap: 1rem;
}

.filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filters label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.filters select {
  padding: 0.3rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.showing {
  font-size: 0.9rem;
  color: #555;
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

/* PAGINATION */
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.pagination button {
  border: none;
  padding: 0.5rem 0.8rem;
  border-radius: 50%;
  background: #eee;
  color: #333;
  font-weight: bold;
  cursor: pointer;
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.pagination button:hover:not(:disabled) {
  background: #ddd;
}

.pagination .active {
  background: #ff5a00;
  color: #fff;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: default;
}

.pagination .dots {
  background: transparent;
  cursor: default;
  color: #999;
}

.pagination .dots:hover {
  background: transparent;
}

.pagination .nav-btn {
  border-radius: 4px;
  font-size: 1.2rem;
}

/* RESPONSIVE STYLES */
@media (max-width: 768px) {
  .banner {
    height: 400px;
    margin: 0 1rem;
  }
  
  .banner-content h1 {
    font-size: 2.2rem;
  }
  
  .banner-content p {
    font-size: 1rem;
  }
  
  .container {
    padding: 1rem;
  }
  
  .top-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .filters {
    justify-content: center;
  }
  
  .showing {
    text-align: center;
  }
  
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }
  
  .pagination {
    gap: 0.2rem;
  }
  
  .pagination button {
    min-width: 35px;
    height: 35px;
    padding: 0.4rem 0.6rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .banner {
    height: 160px;
    margin: 0 0.5rem;
  }
  
  .banner-content h1 {
    font-size: 1.8rem;
  }
  
  .banner-content p {
    font-size: 0.9rem;
  }
  
  .container {
    padding: 0.5rem;
  }
  
  .grid {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
  
  .filters {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .filters label {
    justify-content: space-between;
  }
  
  .pagination button {
    min-width: 30px;
    height: 30px;
    font-size: 0.8rem;
  }
}

@media (max-width: 360px) {
  .pagination {
    gap: 0.1rem;
  }
  
  .pagination button {
    min-width: 28px;
    height: 28px;
    padding: 0.2rem 0.4rem;
  }
}
</style>
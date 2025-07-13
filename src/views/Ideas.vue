<template>
  <!-- BANNER -->
  <section class="banner" style="max-width: 1200px; position: relative; margin: auto; margin-left: 318px;">
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
      <button @click="changePage(page - 1)" :disabled="page === 1">«</button>
      <button
        v-for="n in totalPages"
        :key="n"
        @click="changePage(n)"
        :class="{ active: page === n }"
      >{{ n }}</button>
      <button @click="changePage(page + 1)" :disabled="page === totalPages">»</button>
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
  if (newPage >= 1 && newPage <= totalPages.value) {
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

onMounted(fetchIdeas)
</script>

<style scoped>
/* BANNER */
.banner {
  position: relative;
  height: 240px;
  background-image: url('@/assets/banner.webp');
  background-size: cover;
  background-position: center;
  clip-path: polygon(0 0, 100% 0, 100% 93%, 0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
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
}
.filters {
  display: flex;
  gap: 1rem;
}
.filters select {
  margin-left: 0.3rem;
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
}
.pagination button {
  border: none;
  padding: 0.5rem 0.8rem;
  border-radius: 50%;
  background: #eee;
  color: #333;
  font-weight: bold;
  cursor: pointer;
}
.pagination .active {
  background: #ff5a00;
  color: #fff;
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>

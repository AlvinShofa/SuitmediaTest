<template>
  <div class="ideas-page">
    <!-- Banner Section -->
    <section class="banner">
      <div class="banner__content">
        <h1 class="banner__title">Ideas</h1>
        <p class="banner__subtitle">Where all our great things begin</p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="container">
      <!-- Controls Bar -->
      <div class="controls-bar">
        <div class="controls-bar__info">
          <span class="showing-text">
            Showing {{ startIndex }} - {{ endIndex }} of {{ totalItems }}
          </span>
        </div>
        
        <div class="controls-bar__filters">
          <div class="filter-group">
            <label for="per-page" class="filter-label">Show per page:</label>
            <select 
              id="per-page"
              v-model="perPage" 
              @change="handleFilterChange"
              class="filter-select"
            >
              <option v-for="option in perPageOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
          
          <div class="filter-group">
            <label for="sort-by" class="filter-label">Sort by:</label>
            <select 
              id="sort-by"
              v-model="sort" 
              @change="handleFilterChange"
              class="filter-select"
            >
              <option value="-published_at">Newest</option>
              <option value="published_at">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading ideas...</p>
      </div>

      <!-- Ideas Grid -->
      <div v-else-if="ideas.length > 0" class="ideas-grid">
        <IdeaCard 
          v-for="idea in ideas" 
          :key="idea.id" 
          :idea="idea" 
        />
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <p>No ideas found.</p>
      </div>

      <!-- Pagination -->
      <nav class="pagination" aria-label="Ideas pagination" v-if="totalPages > 1">
        <button 
          @click="changePage(currentPage - 1)" 
          :disabled="currentPage === 1 || isLoading"
          class="pagination__button pagination__button--nav"
          aria-label="Previous page"
        >
          ‹
        </button>
        
        <template v-for="pageNum in visiblePages" :key="pageNum">
          <button
            v-if="pageNum !== '...'"
            @click="changePage(pageNum)"
            :class="{
              'pagination__button': true,
              'pagination__button--active': currentPage === pageNum
            }"
            :disabled="isLoading"
            :aria-label="`Go to page ${pageNum}`"
            :aria-current="currentPage === pageNum ? 'page' : undefined"
          >
            {{ pageNum }}
          </button>
          <span v-else class="pagination__ellipsis">…</span>
        </template>
        
        <button 
          @click="changePage(currentPage + 1)" 
          :disabled="currentPage === totalPages || isLoading"
          class="pagination__button pagination__button--nav"
          aria-label="Next page"
        >
          ›
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import IdeaCard from '../components/IdeaCard.vue'

// Reactive state
const ideas = ref([])
const currentPage = ref(1)
const perPage = ref(10)
const sort = ref('-published_at')
const totalPages = ref(1)
const totalItems = ref(0)
const isLoading = ref(false)

// Constants
const perPageOptions = [10, 20, 50]

// API functions
const fetchIdeas = async () => {
  try {
    isLoading.value = true
    
    const response = await axios.get('https://suitmedia-backend.suitdev.com/api/ideas', {
      params: {
        'page[number]': currentPage.value,
        'page[size]': perPage.value,
        append: ['small_image', 'medium_image'],
        sort: sort.value
      }
    })
    
    ideas.value = response.data.data
    totalItems.value = response.data.meta.total
    totalPages.value = response.data.meta.last_page
  } catch (error) {
    console.error('Error fetching ideas:', error)
    ideas.value = []
  } finally {
    isLoading.value = false
  }
}

// Event handlers
const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value && !isLoading.value) {
    currentPage.value = newPage
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const handleFilterChange = () => {
  currentPage.value = 1
  fetchIdeas()
}

// Computed properties
const startIndex = computed(() => {
  return totalItems.value === 0 ? 0 : (currentPage.value - 1) * perPage.value + 1
})

const endIndex = computed(() => {
  return Math.min(currentPage.value * perPage.value, totalItems.value)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 7
  const current = currentPage.value
  const total = totalPages.value

  if (total <= maxVisible) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)
    
    if (current > 4) {
      pages.push('...')
    }
    
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    
    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== total) {
        pages.push(i)
      }
    }
    
    if (current < total - 3) {
      pages.push('...')
    }
    
    if (total > 1) {
      pages.push(total)
    }
  }
  
  return pages
})

// Watchers
watch(currentPage, fetchIdeas)

// Lifecycle
onMounted(() => {
  fetchIdeas()
})
</script>

<style scoped>
.ideas-page {
  min-height: 100vh;
}

/* Banner Section */
.banner {
  position: relative;
  height: 280px;
  background: linear-gradient(135deg, #eb682f 0%, #d45620 100%);
  background-image: url('@/assets/banner.webp');
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.banner__content {
  text-align: center;
  color: white;
  z-index: 1;
}

.banner__title {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  color: #fcf5f1;
}

.banner__subtitle {
  font-size: 1.25rem;
  font-weight: 400;
  margin: 0;
  opacity: 0.95;
  color: #fcf5f1;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 3rem;
}

/* Controls Bar */
.controls-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.controls-bar__info {
  flex: 1;
}

.showing-text {
  font-size: 0.95rem;
  color: #6b7280;
  font-weight: 500;
}

.controls-bar__filters {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-label {
  font-size: 0.9rem;
  color: #374151;
  font-weight: 500;
  white-space: nowrap;
}

.filter-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #eb682f;
  box-shadow: 0 0 0 3px rgba(235, 104, 47, 0.1);
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #6b7280;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #eb682f;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Ideas Grid */
.ideas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
}

.pagination__button {
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: #f9fafb;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination__button:hover:not(:disabled) {
  background: #f3f4f6;
  color: #111827;
}

.pagination__button--active {
  background: #eb682f;
  color: white;
}

.pagination__button--active:hover {
  background: #d45620;
}

.pagination__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination__button--nav {
  font-size: 1.25rem;
}

.pagination__ellipsis {
  padding: 0.75rem 0.5rem;
  color: #6b7280;
}

/* Responsive Design */
@media (max-width: 768px) {
  .banner__title {
    font-size: 2.5rem;
  }
  
  .banner__subtitle {
    font-size: 1.1rem;
  }
  
  .container {
    padding: 0 1rem 2rem;
  }
  
  .controls-bar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .controls-bar__filters {
    flex-direction: column;
    gap: 1rem;
  }
  
  .ideas-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .pagination {
    flex-wrap: wrap;
    gap: 0.25rem;
  }
  
  .pagination__button {
    min-width: 40px;
    height: 40px;
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  .banner {
    height: 220px;
  }
  
  .banner__title {
    font-size: 2rem;
  }
  
  .ideas-grid {
    grid-template-columns: 1fr;
  }
}
</style>
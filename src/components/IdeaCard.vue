<template>
  <div class="card">
    <div class="image-container">
      <img :src="idea.medium_image.url" loading="lazy" :alt="idea.title" />
    </div>
    <div class="card-content">
      <p class="date">{{ formatDate(idea.published_at) }}</p>
      <h3 class="title">{{ idea.title }}</h3>
    </div>
  </div>
</template>

<script setup>
defineProps(['idea'])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.image-container {
  overflow: hidden;
  position: relative;
}

.image-container img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .image-container img {
  transform: scale(1.05);
}

.card-content {
  padding: 1.2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.date {
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.title {
  font-weight: 600;
  font-size: 1.1rem;
  line-height: 1.4;
  color: #333;
  margin: 0;
  display: -webkit-box;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
}

/* RESPONSIVE STYLES */
@media (max-width: 768px) {
  .image-container img {
    height: 180px;
  }
  
  .card-content {
    padding: 1rem;
  }
  
  .title {
    font-size: 1rem;
    line-clamp: 2;
  }
  
  .date {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .image-container img {
    height: 160px;
  }
  
  .card-content {
    padding: 0.8rem;
  }
  
  .title {
    font-size: 0.95rem;
  }
}

@media (max-width: 360px) {
  .image-container img {
    height: 140px;
  }
  
  .card-content {
    padding: 0.7rem;
  }
  
  .title {
    font-size: 0.9rem;
  }
  
  .date {
    font-size: 0.7rem;
  }
}
</style>
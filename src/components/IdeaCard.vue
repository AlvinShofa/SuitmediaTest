<template>
  <div class="card">
    <img :src="idea.medium_image.url" loading="lazy" alt="thumbnail" />
    <p class="date">{{ new Date(idea.published_at).toLocaleDateString() }}</p>
    <h3 class="title">{{ idea.title }}</h3>
  </div>
</template>

<script setup>
defineProps(['idea'])
</script>

<style scoped>
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  padding: 1rem;
}
img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}
.date {
  font-size: 0.8rem;
  color: gray;
  margin-bottom: 0.3rem;
}
.title {
  font-weight: bold;
  font-size: 1rem;
  display: -webkit-box;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

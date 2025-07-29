<template>
  <article class="idea-card">
    <div class="idea-card__image-wrapper">
      <img 
        v-lazy="idea.medium_image[0]?.url || idea.small_image[0]?.url" 
        :alt="idea.title"
        class="idea-card__image"
      />
    </div>
    <div class="idea-card__content">
      <time class="idea-card__date" :datetime="idea.published_at">
        {{ formatDate(idea.published_at) }}
      </time>
      <h3 class="idea-card__title">{{ idea.title }}</h3>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  idea: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.idea-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.idea-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.idea-card__image-wrapper {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
}

.idea-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.idea-card:hover .idea-card__image {
  transform: scale(1.05);
}

.idea-card__content {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.idea-card__date {
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: 400;
}

.idea-card__title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  color: #1f2937;
  margin: 0;
  display: -webkit-box;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

/* Loading state for lazy images */
.idea-card__image[lazy="loading"] {
  background-color: #f3f4f6;
}

.idea-card__image[lazy="error"] {
  background-color: #fee2e2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.idea-card__image[lazy="error"]::after {
  content: "Image not available";
  color: #ef4444;
  font-size: 0.875rem;
}
</style>
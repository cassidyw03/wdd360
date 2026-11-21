<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits<{ add: [text: string] }>()

const text = ref('')
const inputEl = ref<HTMLInputElement | null>(null)

function submit() {
  const trimmed = text.value.trim()
  if (!trimmed) return
  emit('add', trimmed)
  text.value = ''
}

onMounted(() => inputEl.value?.focus())
</script>

<template>
  <form class="task-input" @submit.prevent="submit">
    <input ref="inputEl" v-model="text" placeholder="What needs doing?" />
    <button type="submit">Add</button>
  </form>
</template>

<style scoped>
.task-input { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
input { flex: 1; padding: 0.5rem; }
</style>
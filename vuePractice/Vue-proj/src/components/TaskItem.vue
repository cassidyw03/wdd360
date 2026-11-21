<script setup lang="ts">
import type { Task } from '../types'

defineProps<{ task: Task }>()
const emit = defineEmits<{
  toggle: [id: number]
  remove: [id: number]
}>()
</script>

<template>
  <li class="task">
    <label>
      <input type="checkbox" :checked="task.done" @change="emit('toggle', task.id)" />
      <span :class="{ done: task.done }">{{ task.text }}</span>
    </label>
    <button class="remove" @click="emit('remove', task.id)" aria-label="Remove task">✕</button>
  </li>
</template>

<style scoped>
.task { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #eee; }
.done { text-decoration: line-through; opacity: 0.5; }
.remove { background: none; border: none; cursor: pointer; color: #c0392b; }
</style>
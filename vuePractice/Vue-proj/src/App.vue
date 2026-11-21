<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Task, Filter } from './types'
import { useLocalStorage } from './composables/useLocalStorage'
import Card from './components/Card.vue'
import TaskInput from './components/TaskInput.vue'
import TaskItem from './components/TaskItem.vue'

const tasks = useLocalStorage<Task[]>('tasks', [])
const filter = ref<Filter>('all')
const filters: Filter[] = ['all', 'active', 'done']

const filteredTasks = computed(() => {
  if (filter.value === 'active') return tasks.value.filter((t) => !t.done)
  if (filter.value === 'done') return tasks.value.filter((t) => t.done)
  return tasks.value
})

const remaining = computed(() => tasks.value.filter((t) => !t.done).length)
const doneCount = computed(() => tasks.value.length - remaining.value)

function addTask(text: string) {
  tasks.value.push({ id: Date.now(), text, done: false })
}

function toggleTask(id: number) {
  const task = tasks.value.find((t) => t.id === id)
  if (task) task.done = !task.done
}

function removeTask(id: number) {
  tasks.value = tasks.value.filter((t) => t.id !== id)
}

function clearDone() {
  tasks.value = tasks.value.filter((t) => !t.done)
}
</script>

<template>
  <Card>
    <template #title>My Tasks</template>

    <TaskInput @add="addTask" />

    <nav class="filters">
      <button
        v-for="f in filters"
        :key="f"
        :class="{ active: filter === f }"
        @click="filter = f"
      >
        {{ f }}
      </button>
    </nav>

    <ul v-if="filteredTasks.length">
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask"
        @remove="removeTask"
      />
    </ul>
    <p v-else class="empty">Nothing here yet.</p>

    <template #footer>
      <span>{{ remaining }} left</span>
      <button v-if="doneCount > 0" @click="clearDone">Clear done ({{ doneCount }})</button>
    </template>
  </Card>
</template>

<style scoped>
ul { list-style: none; padding: 0; }
.filters { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }
.filters button { text-transform: capitalize; border: 1px solid #ccc; background: white; padding: 0.25rem 0.75rem; border-radius: 999px; cursor: pointer; }
.filters button.active { background: #42b883; color: white; border-color: #42b883; }
.empty { color: #999; text-align: center; }
</style>
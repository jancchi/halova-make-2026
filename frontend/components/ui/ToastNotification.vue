<template>
  <Transition name="toast">
    <div
      v-if="visible"
      :data-testid="testId || 'toast-root'"
      class="fixed top-4 right-4 bg-bg border-2 border-border px-6 py-4 max-w-md z-50"
    >
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <p class="text-text">{{ message }}</p>
          <button
            v-if="retryCallback"
            @click="retryCallback"
            class="text-accent underline text-sm mt-2 focus:outline-none"
          >
            Retry
          </button>
        </div>
        <button
          @click="close"
          class="ml-4 text-muted hover:text-text focus:outline-none"
          data-testid="toast-close"
        >
          &times;
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{
  message: string
  duration?: number
  retryCallback?: () => void
  testId?: string
}>()

const emit = defineEmits<{
  close: []
}>()

const visible = ref(true)
let timer: ReturnType<typeof setTimeout>

function close() {
  visible.value = false
  emit('close')
}

onMounted(() => {
  if (props.duration && props.duration > 0) {
    timer = setTimeout(close, props.duration)
  }
})

watch(() => props.message, () => {
  visible.value = true
  if (timer) clearTimeout(timer)
  if (props.duration && props.duration > 0) {
    timer = setTimeout(close, props.duration)
  }
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>

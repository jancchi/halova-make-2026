import { ref, readonly } from 'vue';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  retry?: () => void;
}

const toasts = ref<Toast[]>([]);
let toastIdCounter = 0;

export const useToast = () => {
  const addToast = (
    message: string,
    type: Toast['type'] = 'info',
    retry?: () => void,
    duration = 5000
  ) => {
    const id = `toast-${toastIdCounter++}`;
    const toast: Toast = { id, message, type, retry };
    toasts.value.push(toast);
    
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
    
    return id;
  };

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  };

  return {
    toasts: readonly(toasts),
    addToast,
    removeToast
  };
};

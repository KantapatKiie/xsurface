import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UIState {
  sidebarOpen: boolean;
  cartOpen: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
  
  toggleSidebar: () => void;
  toggleCart: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      sidebarOpen: false,
      cartOpen: false,
      theme: 'light',
      notifications: [],
      
      toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),
      toggleCart: () => set({ cartOpen: !get().cartOpen }),
      setTheme: (theme) => set({ theme }),
      
      addNotification: (notification) => {
        const id = Date.now().toString();
        const newNotification = { ...notification, id };
        set({ notifications: [...get().notifications, newNotification] });
        
        if (notification.duration) {
          setTimeout(() => {
            get().removeNotification(id);
          }, notification.duration);
        }
      },
      
      removeNotification: (id) => {
        set({ notifications: get().notifications.filter(n => n.id !== id) });
      },
      
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);

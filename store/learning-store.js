import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const XP_PER_LEVEL = [0, 500, 1500, 3000, 5000]

const getLevel = (xp) => {
  for (let i = XP_PER_LEVEL.length - 1; i >= 0; i--) {
    if (xp >= XP_PER_LEVEL[i]) return i + 1
  }
  return 1
}

const LEVEL_NAMES = ['Newcomer', 'Explorer', 'Guardian', 'Expert', 'Master']

export const getLevelName = (level) => LEVEL_NAMES[level - 1] || 'Newcomer'

export const getXPForNextLevel = (level) => XP_PER_LEVEL[level] || 5000

export const getXPProgress = (xp, level) => {
  const currentLevelXP = XP_PER_LEVEL[level - 1] || 0
  const nextLevelXP = XP_PER_LEVEL[level] || 5000
  return ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100
}

export const useLearningStore = create(
  persist(
    (set, get) => ({
      user: {
        name: 'Ahmed',
        avatar: '🧒',
        xp: 0,
        level: 1
      },
      completedLessons: [],
      completedLabs: [],
      earnedBadges: [],
      currentLesson: null,
      currentLab: null,
      theme: 'light',

      addXP: (amount) => {
        const state = get()
        const newXP = state.user.xp + amount
        const newLevel = getLevel(newXP)
        set({
          user: {
            ...state.user,
            xp: newXP,
            level: newLevel
          }
        })
      },

      completeLesson: (id) => {
        const state = get()
        if (!state.completedLessons.includes(id)) {
          set({ completedLessons: [...state.completedLessons, id] })
        }
      },

      completeLab: (id) => {
        const state = get()
        if (!state.completedLabs.includes(id)) {
          set({ completedLabs: [...state.completedLabs, id] })
        }
      },

      earnBadge: (id) => {
        const state = get()
        if (!state.earnedBadges.includes(id)) {
          set({ earnedBadges: [...state.earnedBadges, id] })
        }
      },

      setCurrentLesson: (id) => set({ currentLesson: id }),
      setCurrentLab: (id) => set({ currentLab: id }),
      setTheme: (theme) => set({ theme }),

      setUser: (user) => {
        const state = get()
        set({ user: { ...state.user, ...user } })
      },

      resetProgress: () => {
        set({
          user: { name: 'Ahmed', avatar: '🧒', xp: 0, level: 1 },
          completedLessons: [],
          completedLabs: [],
          earnedBadges: []
        })
      }
    }),
    {
      name: 'safenet-kids-storage'
    }
  )
)

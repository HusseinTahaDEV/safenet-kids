import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const playSound = (soundType) => {
  if (typeof window === 'undefined') return
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    switch (soundType) {
      case 'correct':
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1)
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.3)
        break
      case 'incorrect':
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.1)
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.3)
        break
      case 'click':
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
        break
      case 'success':
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime)
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.15)
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.3)
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.5)
        break
      case 'levelup':
        const notes = [523.25, 587.33, 659.25, 783.99, 880, 1046.50]
        notes.forEach((freq, i) => {
          const osc = audioContext.createOscillator()
          const gain = audioContext.createGain()
          osc.connect(gain)
          gain.connect(audioContext.destination)
          osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.1)
          gain.gain.setValueAtTime(0.2, audioContext.currentTime + i * 0.1)
          gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.1 + 0.15)
          osc.start(audioContext.currentTime + i * 0.1)
          osc.stop(audioContext.currentTime + i * 0.1 + 0.15)
        })
        break
    }
  } catch (e) {
    // Audio context not available
  }
}

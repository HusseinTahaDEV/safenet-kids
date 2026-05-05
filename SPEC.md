# SafeNet Kids OS - Technical Specification

## 1. Concept & Vision

SafeNet Kids OS is an interactive educational platform that simulates real internet scenarios in a safe environment, teaching children to make correct digital decisions. Instead of theoretical lessons, children experience realistic simulations: phishing emails, stranger dangers, data requests. The platform feels like a real operating system with a playful, child-friendly interface that makes learning feel like playing.

**Core Philosophy**: Learning by doing, not by listening.

## 2. Design Language

### Aesthetic Direction
A "Friendly Operating System" aesthetic - clean, rounded, approachable like a modern kids' tablet interface. Think of a fusion between macOS's clarity and a Nintendo Switch dashboard.

### Color Palette
```
Primary:        #6366F1 (Indigo - Trust/Security)
Secondary:      #8B5CF6 (Purple - Creativity)
Accent Green:   #10B981 (Safe/Correct)
Accent Red:     #EF4444 (Danger/Wrong)
Accent Yellow:  #F59E0B (Warning/Caution)
Accent Blue:    #3B82F6 (Info/Action)
Background:     #F8FAFC (Light) / #0F172A (Dark)
Surface:        #FFFFFF (Light) / #1E293B (Dark)
Text Primary:   #1E293B (Light) / #F1F5F9 (Dark)
Text Secondary: #64748B
```

### Typography
- **Headings**: "Nunito" (Google Font) - Rounded, friendly, highly legible
- **Body**: "Inter" (Google Font) - Clean, modern, excellent readability
- **Monospace** (for "system" elements): "JetBrains Mono"

### Spatial System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96
- Border radius: 8px (small), 12px (medium), 16px (large), 24px (extra-large)
- Card shadows: Soft, layered (0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1))

### Motion Philosophy
- **Entrances**: Fade + scale up (0.95 → 1.0), 300ms ease-out
- **Interactions**: Quick spring responses (150ms), scale on hover (1.02-1.05)
- **Feedback**: Bounce on success, shake on error, pulse on notifications
- **Page transitions**: Subtle fade with slight vertical movement
- **Progress**: Smooth count-up animations, circular progress with animated gradients

### Visual Assets
- **Icons**: Lucide React (consistent, rounded, child-friendly)
- **Illustrations**: Custom SVG characters with rounded features
- **Decorative**: Soft gradients, floating shapes, subtle patterns

## 3. Layout & Structure

### Page Architecture
```
/                       → Login/Welcome screen (OS boot simulation)
/dashboard              → Main hub (OS desktop)
/units                  → Unit selection (App folder)
/units/[id]             → Unit detail (lessons list)
/lesson/[id]            → Interactive lesson (fullscreen experience)
/lab/[id]               → Simulation lab (immersive simulation)
/assistant              → AI Assistant (chat interface)
/progress               → Progress & analytics (stats dashboard)
/exam                   → Quiz engine (assessment interface)
```

### Dashboard Layout
- Top: Header with avatar, XP bar, level indicator, theme toggle
- Center: 4-quadrant grid with quick access cards
- Bottom: Navigation bar (Home, Units, Assistant, Progress)

### Responsive Strategy
- Mobile-first design
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Touch-friendly: minimum 44px touch targets
- Cards stack vertically on mobile

## 4. Features & Interactions

### 4.1 Interactive Lessons (Scenario Engine)
- **Story-based flow**: Each lesson presents a scenario with branching choices
- **Clickable decisions**: Large, visual choice buttons with icons
- **State changes**: Choices lead to different outcomes (good/bad/neutral)
- **Feedback**: Immediate visual + sound feedback on each decision
- **Progress**: Steps tracked, can go back, completion celebrated

**Scenario Structure:**
```typescript
{
  id: string,
  title: string,
  type: "scenario",
  steps: [
    {
      id: number,
      text: string,
      media?: string,
      choices: [
        { text: string, icon: string, next: number, correct: boolean }
      ]
    }
  ],
  outcomes: { good: string, bad: string, neutral: string }
}
```

### 4.2 Simulation Labs
**Fake Inbox (Phishing Detection):**
- Simulated email client interface
- Emails with red flags (spelling errors, suspicious senders, urgent language)
- Drag-and-drop to "Safe" or "Danger" folders
- Instant feedback with explanation

**Fake Chat (Stranger Danger):**
- Chat interface with anonymous stranger
- Scripted conversation with warning signs
- Choices to block, ignore, or continue
- Real consequences based on decisions

**Fake Game Download:**
- Download manager interface
- Fake game with modified .exe file
- Red flags: permissions requested, bundled software
- Decision to install or cancel

### 4.3 Smart Assistant
- **Decision tree**: Predefined responses based on keywords
- **Context awareness**: Remembers current lesson/lab
- **Personality**: Cartoon guide character with animations
- **Hints system**: Provides nudges without giving away answers
- **Commands**: "help", "hint", "skip", "explain"

### 4.4 Gamification System
**XP Points:**
- Correct decision: +50 XP
- Lesson completion: +100 XP
- Lab completion: +150 XP
- Quiz perfect score: +200 XP

**Levels:**
```
Level 1: 0 XP      - "Newcomer"
Level 2: 500 XP    - "Explorer"  
Level 3: 1500 XP   - "Guardian"
Level 4: 3000 XP   - "Expert"
Level 5: 5000 XP   - "Master"
```

**Badges:**
- 🏆 Phishing Hunter - Detect 5 phishing attempts
- 🔒 Privacy Master - Complete privacy unit
- 🛡️ Safe Surfer - Make 20 correct decisions
- ⚡ Quick Learner - Complete 3 lessons in one day
- 🎯 Perfect Score - Get 100% on any quiz

### 4.5 Quiz Engine
**Question Types:**
- Multiple choice (standard)
- Scenario-based (what would you do?)
- Drag and drop (sorting priorities)
- Timed decisions (quick reaction)

**Results:**
- Score percentage
- Breakdown by category
- Areas to improve
- Retry option

## 5. Component Inventory

### ProgressRing
- Circular SVG progress indicator
- Animated stroke-dashoffset
- Center shows percentage or icon
- States: empty, partial, complete, animated

### XPCard
- Displays current XP and level
- Animated count-up on XP gain
- Glow effect when leveling up
- Shows progress to next level

### LessonCard
- Thumbnail/icon, title, description
- Progress indicator (not started, in progress, complete)
- Hover: scale(1.02), shadow increase
- Click: ripple effect, navigate

### ChoiceButton
- Large touch target (min 48px height)
- Icon + text layout
- States: default, hover, selected, correct, incorrect, disabled
- Correct: green glow, checkmark animation
- Incorrect: red shake, X animation

### SimCard (Lab Card)
- Realistic app icon
- Title and description
- "Open" button
- Locked state for prerequisites

### ChatBubble
- User bubbles: right-aligned, primary color
- Assistant bubbles: left-aligned, surface color
- Typing indicator animation
- Quick reply buttons

### BadgeIcon
- Circular icon with category color
- Earned: full color, glow
- Locked: grayscale, lock overlay

## 6. Technical Approach

### Framework & Build
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** as component foundation
- **Framer Motion** for animations
- **Zustand** for state management

### State Architecture (Zustand)
```typescript
interface LearningStore {
  // User
  user: { name: string, avatar: string, xp: number, level: number }
  
  // Progress
  completedLessons: string[]
  completedLabs: string[]
  badges: string[]
  
  // Current
  currentLesson: string | null
  currentLab: string | null
  
  // Actions
  addXP: (amount: number) => void
  completeLesson: (id: string) => void
  earnBadge: (id: string) => void
}
```

### Data Layer (JSON CMS)
```
/data
  /units
    phishing.json
    privacy.json
    stranger-danger.json
    passwords.json
  /lessons
    [lesson-id].json
  /labs
    fake-inbox.json
    fake-chat.json
    fake-download.json
  /quizzes
    [quiz-id].json
```

### API Design (Client-side only)
All data loaded directly from JSON files via:
```typescript
const data = await import('@/data/units/phishing.json')
```

### Storage
- **Zustand persist middleware** with localStorage
- Saves: user progress, XP, badges, preferences
- Theme preference stored separately

## 7. File Structure
```
SafeNet-Kids-OS/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (login/boot)
│   ├── dashboard/
│   │   └── page.tsx
│   ├── units/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── lesson/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── lab/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── assistant/
│   │   └── page.tsx
│   ├── progress/
│   │   └── page.tsx
│   └── exam/
│       └── page.tsx
├── components/
│   ├── ui/ (shadcn)
│   ├── ProgressRing.tsx
│   ├── XPCard.tsx
│   ├── LessonCard.tsx
│   ├── ChoiceButton.tsx
│   ├── SimCard.tsx
│   ├── ChatBubble.tsx
│   ├── BadgeIcon.tsx
│   └── Navigation.tsx
├── data/
│   ├── units/
│   ├── lessons/
│   ├── labs/
│   └── quizzes/
├── store/
│   └── learning-store.ts
├── lib/
│   ├── utils.ts
│   └── sounds.ts
├── styles/
│   └── globals.css
└── public/
    └── sounds/
```

## 8. Animations & Effects

### Boot Sequence (Login Page)
1. Logo fade in (0-500ms)
2. "SafeNet Kids OS" text type effect (500-1500ms)
3. Loading bar fill (1500-2500ms)
4. "Welcome back, [Name]!" (2500-3000ms)
5. Fade to dashboard (3000-3500ms)

### Lesson Transitions
- Current step: fade out left
- Next step: fade in right
- On choice: selected button scales up, others fade
- Result: full-screen overlay with result

### Feedback Animations
- Correct: confetti burst, green checkmark bounce
- Incorrect: screen shake, red X pulse
- XP gain: floating "+XP" text that rises and fades

### Micro-interactions
- Buttons: scale(1.02) on hover, scale(0.98) on press
- Cards: translateY(-2px) on hover
- Icons: subtle bounce on appearance
- Progress bars: smooth width transition (500ms)

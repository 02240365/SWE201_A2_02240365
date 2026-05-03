# Student Planner App 

## App Idea

The **Student Planner App** is a mobile application designed to help students efficiently manage their academic workload. It provides a centralized platform for tracking assignments, exams, projects, and study sessions while offering insights into productivity and academic progress. The app is built using React Native and Expo, enabling cross-platform compatibility (iOS & Android).

**Target User:** Students managing multiple courses, assignments, and deadlines

**Primary Goal:** Simplify task management, increase productivity, and help students stay organized throughout their academic journey

---

## Features

### 1. **Home Screen - Task Dashboard**
- **Task Overview:** Displays all pending and completed tasks
- **Progress Tracking:** Visual progress bar showing overall task completion rate
- **Quick Stats:** Summary of high-priority tasks and completion metrics
- **Task Management:**
  - View incomplete tasks with priority indicators
  - Long-press to edit or delete tasks
  - Tap tasks to navigate to detailed view
- **Modal-based Task Creation:** Add new tasks with title, description, priority level
- **Pull-to-Refresh:** Refresh task list with smooth refresh control
- **Quick Actions:**
  - **Weekly Schedule:** View planned study sessions throughout the week
  - **Study Analytics:** Displays total tasks, completion rate, high-priority tasks, and performance status

### 2. **Categories Screen**
- **Task Organization:** Tasks grouped by 4 main categories:
  - **Assignments** (8 tasks)
  - **Exams** (3 tasks)
  - **Study** (12 tasks)
  - **Projects** (5 tasks)
- **Color-Coded Categories:** Each category has a distinct color for easy visual identification
- **Category Stats:** View total task count per category
- **Interactive Details:** Tap categories to view:
  - List of tasks within that category
  - Priority levels and due dates
  - Quick statistics

### 3. **Profile Screen**
- **Personal Information:** Display student details (name, ID, course, year, email)
- **Study Statistics:**
  - Weekly study hours
  - Completed tasks count
  - Upcoming deadlines
  - Focus score percentage
  - Monthly progress trends
- **Achievements & Badges:**
  - First Task Complete
  - 5 Tasks Done
  - Early Bird (submitted before deadline)
  - Consistent Learner (7-day streak)
  - Assignment Master
  - Locked badges for future milestones
- **Settings:**
  - Toggle Notifications
  - Dark Mode toggle
  - Email Updates preference
  - Reminders toggle
- **Additional Info:** Help, About, and Account management options

### 4. **Task Detail Screen**
- **Comprehensive Task View:** Full details including title, description, due date, priority
- **Interactive Elements:** Navigate back to home with task information retained
- **Context Navigation:** Accessible from home screen task tap

### 5. **Animation Demo Screen**
- **Interactive Animation Showcase:**
  - Fade In/Out animations
  - Scale and bounce effects
  - Slide animations
  - Progress loading indicators
  - Drag and drop gestures
- **Educational Purpose:** Demonstrates animation capabilities built into the app
- **User Engagement:** Allows users to explore and test various animation effects

---

## Navigation Flow

### Navigation Architecture
The app uses **React Navigation** with a combination of Stack and Tab navigation:

```
AppNavigator (NavigationContainer)
    ↓
StackNavigator
    ├── MainTabs (TabNavigator) - Default Screen
    │   ├── Home Screen
    │   ├── Categories Screen
    │   ├── Profile Screen
    │   └── Animations Screen
    ├── Detail Screen (Stack navigation)
    └── Animation Demo Screen (Stack navigation)
```

### Navigation Flow Details

**1. Tab-Based Navigation (MainTabs)**
- Bottom tab bar with 4 tabs:
  - **Home** - Main task dashboard
  - **Categories** - View tasks by category
  - **Profile** - User information and settings
  - **Animations** - Animation showcase

**2. Stack Navigation**
- **From Home Screen:**
  - Tap task card → Navigate to Detail Screen
  - Access animations demo via action buttons

**3. Navigation Features**
- Primary blue header bar with white text
- Back button for stack navigation
- Smooth transitions between screens
- Gesture support via React Native Gesture Handler

### Screen Transition Types
- **Tab Navigation:** Horizontal swipe or tab tap
- **Stack Navigation:** Vertical push/pop animations with back gestures
- **Modal Navigation:** Task creation modal on home screen

---

## Animations Used

### 1. **Fade In Animation**
- **Used in:** Home Screen on load
- **Effect:** Smooth opacity transition from 0 to 1
- **Duration:** 800ms
- **Implementation:** `Animated.timing()`
- **Purpose:** Creates a polished entry effect for content

### 2. **Slide Animation**
- **Used in:** Home Screen content entry
- **Effect:** Content slides up from 50px below initial position
- **Duration:** 800ms
- **Implementation:** `Animated.timing()` with `useNativeDriver`
- **Purpose:** Adds depth and visual interest to page load

### 3. **Scale/Bounce Animation**
- **Used in:** Category Screen cards
- **Effect:** Cards scale from 0 to 1 with spring physics
- **Duration:** Dynamic based on spring tension
- **Implementation:** `Animated.spring()` with tension (50) and friction (7)
- **Purpose:** Creates playful, interactive feel for category selection

### 4. **Progress Bar Animation**
- **Used in:** Progress tracking component
- **Effect:** Animated width transition of progress fill
- **Duration:** Responsive with spring physics
- **Implementation:** `Animated.spring()` with interpolation
- **Purpose:** Smooth visual feedback for task completion percentage

### 5. **Loading Progress Animation**
- **Used in:** Animation Demo Screen
- **Effect:** Linear progress from 0 to 100 over 2 seconds
- **Duration:** 2000ms
- **Implementation:** `Animated.timing()` with linear easing
- **Purpose:** Demonstrates loading state animations

### 6. **Drag and Drop Gesture**
- **Used in:** Animation Demo Screen
- **Effect:** Pan responder enables draggable elements
- **Implementation:** `PanResponder.create()` with Animated.ValueXY
- **Purpose:** Interactive gesture-based animation demonstration

### 7. **Parallel Animations**
- **Used in:** Home Screen initial load
- **Effect:** Fade and slide animations run simultaneously
- **Implementation:** `Animated.parallel()`
- **Purpose:** Creates cohesive entrance effect with multiple transforms

### 8. **Sequence Animations**
- **Used in:** Fade, Scale, and Slide demo animations
- **Effect:** Animations play in sequence (forward then reverse)
- **Implementation:** `Animated.sequence()`
- **Purpose:** Demonstrates animation reversal and multi-step sequences

### Animation Configuration
- **Native Driver:** Used for performance (opacity, transform)
- **Spring Physics:** Applied to scale and progress animations
- **Easing Functions:** Linear and timing for smooth transitions
- **Performance Optimization:** All animations use `useNativeDriver: true` where applicable

---

## Technical Stack

**Frontend Framework:**
- React Native with TypeScript
- Expo for development and deployment

**Navigation:**
- React Navigation (Stack & Bottom Tab)
- React Native Gesture Handler

**UI Components:**
- Ionicons for vector icons
- Custom components (TaskCard, ProgressBar, CustomButton)
- React Native built-in components

**Data Management:**
- Dummy data for prototype demonstration
- State management with React hooks

**Styling:**
- StyleSheet for performance
- Responsive utilities for adaptive layouts
- Custom color theme system

**Animations:**
- React Native Animated API
- Spring physics for natural motion
- Gesture responders for interactive animations

---

## App Data Structure

### Task Model
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;        // Format: YYYY-MM-DD
  priority: 'High' | 'Medium' | 'Low';
  category: 'Assignment' | 'Exam' | 'Study' | 'Project';
  completed: boolean;
}
```

### Dummy Tasks (Current Data)
1. **Math Assignment** - Due: 2026-05-15 (High Priority, Pending)
2. **SWE201 Final Project** - Due: 2026-12-15 (High Priority, Pending)
3. **Study for Physics** - Due: 2026-04-20 (Medium Priority, Completed)
4. **Database Quiz** - Due: 2026-05-20 (High Priority, Pending)
5. **Read Research Papers** - Due: 2026-06-10 (Low Priority, Pending)

---

## Key Features Highlights

* **Responsive Design:** Adapts to different screen sizes and orientations  
* **User-Friendly Interface:** Intuitive navigation and clear visual hierarchy  
* **Interactive Feedback:** Long-press, tap, and gesture-based interactions  
* **Performance Optimized:** Native driver animations for smooth 60fps  
* **Comprehensive Task Management:** Full CRUD operations for tasks  
* **Progress Visualization:** Real-time completion tracking and statistics  
* **Educational Value:** Animation demo screen for learning purposes  

---

## Future Enhancement Opportunities

- Database integration for persistent data storage
- User authentication system
- Push notifications for task reminders
- Collaborative features for group projects
- Calendar integration with visual scheduling
- Time tracking and study duration analytics
- AI-powered task recommendations
- Dark mode implementation
- Offline functionality

---

## Conclusion

The Student Planner App is a well-structured, feature-rich task management solution designed specifically for students. With its smooth animations, intuitive navigation, and comprehensive features, it provides an engaging and productive experience for managing academic workloads. The app demonstrates strong React Native practices, responsive design principles, and modern animation techniques.

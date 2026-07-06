# GUI Flashcard/Study App

A comprehensive desktop study platform combining interactive flashcards, AI-powered assistance, task management, and intelligent scheduling.

## Features

### 1. Interactive Flashcard System
- **Study Modes:**
  - Classic Flip Mode (front/back cards)
  - Multiple Choice Mode
  - Fill-in-the-Blank Mode
  - Matching Mode
  - Spaced Repetition Mode (optimized learning intervals)

- **Flashcard Management:**
  - Create custom flashcard sets
  - Import/export flashcards
  - Organize by categories and subjects
  - Edit, delete, and duplicate cards
  - Shuffle and sort options
  - Add images, audio, and formulas to cards

- **Pre-built Flashcard Sets:**
  - Geography
  - Mathematics
  - Science
  - General Knowledge
  - Language Learning

### 2. Multi-Topic Quiz System
- **Topics:**
  - Geography
  - Mathematics
  - Science
  - General Knowledge
  - (Expandable to custom quizzes)

- **Quiz Features:**
  - Randomized question selection
  - Multiple choice, short answer, true/false formats
  - Difficulty levels (Easy, Medium, Hard)
  - Timed quizzes with countdown timer
  - Instant feedback and explanations
  - Score tracking and performance analytics

### 3. AI Study Assistant
- **Interactive Q&A:**
  - Ask any question on any topic
  - AI provides instant answers with explanations
  - Follow-up questions for deeper learning
  - Multiple explanation styles (simple, detailed, step-by-step)

- **Smart Features:**
  - Context-aware responses
  - Related topic suggestions
  - Save favorite questions and answers
  - Generate practice questions on specific topics

### 4. Todo List & Task Tracker
- **Task Management:**
  - Create, edit, and delete tasks
  - Set priority levels (High, Medium, Low)
  - Mark tasks as complete
  - Task categories (Study, Assignment, Project, Review)
  - Due dates and reminders

- **Task Features:**
  - Recurring tasks
  - Subtasks/checklists
  - Progress tracking
  - Archive completed tasks

### 5. Smart Study Scheduler
- **Intelligent Scheduling:**
  - Schedule tests and exams
  - Auto-generate study plans based on available time
  - Calculate optimal study material based on time remaining
  - Suggest study sessions and breaks

- **Time-Based Learning:**
  - Input available study time
  - Get AI recommendations on what to study
  - Adaptive difficulty based on schedule
  - Break reminders and pomodoro timers

- **Calendar Integration:**
  - Visual calendar view of scheduled tests
  - Exam countdown
  - Study session tracking

### 6. User Dashboard
- **Analytics:**
  - Quiz performance statistics
  - Flashcard mastery levels
  - Study time tracking
  - Progress visualization (charts/graphs)

- **Quick Access:**
  - Recent flashcard sets
  - Upcoming tests/exams
  - Today's tasks
  - Active study streak

## Tech Stack

- **Frontend:** PyQt5 or PySimpleGUI (Python GUI Framework)
- **Backend:** Python
- **AI Integration:** OpenAI API / HuggingFace / Local LLM
- **Database:** SQLite (local persistent storage)
- **Scheduling:** APScheduler
- **Data Visualization:** Matplotlib/Plotly

## Project Structure

```
gui-flashcard-app/
├── main.py
├── config.py
├── requirements.txt
│
├── ui/
│   ├── main_window.py           # Main application window
│   ├── flashcard_screen.py      # Flashcard study interface
│   ├── quiz_screen.py           # Quiz mode interface
│   ├── assistant_screen.py      # AI assistant chat
│   ├── tasks_screen.py          # Todo & task management
│   ├── scheduler_screen.py      # Test scheduling & planner
│   └── dashboard_screen.py      # Analytics & progress
│
├── flashcards/
│   ├── flashcard_engine.py      # Flashcard logic
│   ├── study_modes.py           # Different study modes
│   ├── card_manager.py          # CRUD operations
│   └── sets/
│       ├── geography.json
│       ├── mathematics.json
│       ├── science.json
│       ├── general_knowledge.json
│       └── languages.json
│
├── quiz/
│   ├── quiz_engine.py           # Quiz logic
│   ├── questions.py             # Question management
│   └── topics/
│       ├── geography.json
│       ├── mathematics.json
│       ├── science.json
│       └── general_knowledge.json
│
├── assistant/
│   ├── ai_assistant.py          # AI integration
│   ├── prompt_templates.py      # Prompt engineering
│   └── conversation_history.py  # Chat memory
│
├── tasks/
│   ├── task_manager.py          # Task CRUD
│   ├── task_model.py            # Task data model
│   └── reminders.py             # Task reminders
│
├── scheduler/
│   ├── study_scheduler.py       # Schedule management
│   ├── time_calculator.py       # Time-based recommendations
│   ├── exam_planner.py          # Exam scheduling
│   └── notifications.py         # Schedule alerts
│
├── database/
│   ├── db_manager.py            # Database operations
│   ├── schema.sql               # Database schema
│   ├── models.py                # ORM models
│   └── migrations.py            # Schema updates
│
└── utils/
    ├── analytics.py             # Statistics & tracking
    ├── notifications.py         # System notifications
    └── file_handler.py          # Import/export
```

## Getting Started

1. Clone the repository
2. Install dependencies: `pip install -r requirements.txt`
3. Configure API keys in `config.py`
4. Initialize database: `python -m database.db_manager init`
5. Run application: `python main.py`

## Key Modules

### Flashcard Modes
- **Classic Flip:** Traditional flashcard flipping
- **Multiple Choice:** Quiz-style questions
- **Fill-in-Blank:** Type answers
- **Matching:** Pair cards together
- **Spaced Repetition:** Optimized intervals based on performance

### Study Scheduler Algorithm
- Input exam date and available daily study time
- Calculate total study hours needed
- Distribute content across available days
- Suggest daily study sessions and topics
- Adjust recommendations based on performance

### AI Assistant Capabilities
- Answer subject-specific questions
- Generate practice problems
- Explain concepts in different ways
- Create study guides
- Suggest related topics

## Features Roadmap

- [ ] User authentication and profiles
- [ ] Collaborative study groups
- [ ] Mobile app companion
- [ ] Voice input for questions
- [ ] Computer vision for whiteboard capture
- [ ] Leaderboard and gamification
- [ ] Export study reports
- [ ] Integration with calendar apps
- [ ] Advanced spaced repetition algorithms
- [ ] Offline mode support

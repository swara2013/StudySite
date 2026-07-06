import os
from pathlib import Path

# Application Settings
APP_NAME = "GUI Flashcard/Study App"
APP_VERSION = "1.0.0"
DEBUG = True

# Database Configuration
DATABASE_PATH = Path.home() / ".studyapp" / "study_app.db"
DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)

# API Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "your-api-key-here")
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY", "")

# AI Model Settings
AI_MODEL = "gpt-3.5-turbo"  # or "gpt-4" for advanced features
AI_TEMPERATURE = 0.7
AI_MAX_TOKENS = 2000

# Flashcard Settings
MAX_FLASHCARD_SET_SIZE = 1000
SPACED_REPETITION_INTERVALS = [1, 3, 7, 14, 30]  # Days

# Quiz Settings
QUIZ_TIME_LIMIT_MINUTES = 60
QUIZ_RANDOMIZE_QUESTIONS = True
QUIZ_SHOW_EXPLANATIONS = True

# Scheduler Settings
POMODORO_WORK_MINUTES = 25
POMODORO_BREAK_MINUTES = 5

# Material Upload Settings
UPLOAD_FOLDER = Path.home() / ".studyapp" / "uploads"
UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)
MAX_UPLOAD_SIZE_MB = 100
ALLOWED_FILE_TYPES = [".pdf", ".docx", ".txt", ".doc", ".pptx", ".jpg", ".png", ".jpeg"]

# Material Processing Settings
QUESTIONS_PER_PAGE = 5
FLASHCARDS_PER_PAGE = 10
EXTRACT_DIFFICULTY_LEVELS = True

# UI Settings
WINDOW_WIDTH = 1200
WINDOW_HEIGHT = 800
DARK_MODE = False
THEME_COLOR = "#2C3E50"

# Notification Settings
ENABLE_NOTIFICATIONS = True
NOTIFICATION_SOUND = True

# Logging
LOG_LEVEL = "INFO"
LOG_FILE = Path.home() / ".studyapp" / "study_app.log"

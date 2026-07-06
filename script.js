// Global State Management
const appState = {
    currentTab: 'home',
    quizState: {
        questions: [],
        currentQuestion: 0,
        answers: [],
        started: false,
        topic: '',
        count: 10,
        difficulty: 'medium'
    },
    flashcardState: {
        sets: [],
        currentSet: null,
        studying: false,
        currentCard: 0
    },
    tasks: [],
    events: [],
    currentDate: new Date()
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadFlashcardSets();
    updateCalendar();
    loadTasks();
    loadEvents();
});

// Tab Switching
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
        appState.currentTab = tabName;
    }
}

// ==================== QUIZ FUNCTIONALITY ====================

function startQuiz() {
    const topic = document.getElementById('quizTopic').value;
    const count = parseInt(document.getElementById('quizCount').value);
    const difficulty = document.getElementById('quizDifficulty').value;

    if (!topic) {
        alert('Please select a topic');
        return;
    }

    appState.quizState.topic = topic;
    appState.quizState.count = count;
    appState.quizState.difficulty = difficulty;
    appState.quizState.questions = generateQuestions(topic, count, difficulty);
    appState.quizState.answers = new Array(count).fill(null);
    appState.quizState.currentQuestion = 0;
    appState.quizState.started = true;

    document.querySelector('.quiz-setup').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';

    displayQuestion();
}

function generateQuestions(topic, count, difficulty) {
    const questionBank = {
        geography: {
            easy: [
                { question: "What is the capital of France?", options: ["London", "Paris", "Berlin", "Madrid"], correct: 1 },
                { question: "Which is the largest continent?", options: ["Africa", "Europe", "Asia", "America"], correct: 2 },
                { question: "What is the capital of Japan?", options: ["Tokyo", "Seoul", "Bangkok", "Beijing"], correct: 0 },
                { question: "Which country is known as the Land of the Rising Sun?", options: ["China", "Japan", "Korea", "Vietnam"], correct: 1 },
                { question: "What is the largest ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: 2 },
            ],
            medium: [
                { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correct: 2 },
                { question: "Which mountain range is the longest?", options: ["Rockies", "Andes", "Himalayas", "Alps"], correct: 1 },
                { question: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], correct: 1 },
                { question: "Which river is the longest in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correct: 1 },
                { question: "What is the capital of Brazil?", options: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"], correct: 1 },
            ],
            hard: [
                { question: "What is the capital of Kyrgyzstan?", options: ["Almaty", "Bishkek", "Ashkhabad", "Dushanbe"], correct: 1 },
                { question: "Which desert is the largest cold desert?", options: ["Gobi", "Antarctic", "Atacama", "Namib"], correct: 1 },
                { question: "What is the lowest point on Earth?", options: ["Death Valley", "Mariana Trench", "Atacama", "Dead Sea"], correct: 1 },
            ]
        },
        math: {
            easy: [
                { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
                { question: "What is 10 - 3?", options: ["5", "6", "7", "8"], correct: 2 },
                { question: "What is 5 × 3?", options: ["15", "12", "18", "20"], correct: 0 },
                { question: "What is 20 ÷ 4?", options: ["3", "4", "5", "6"], correct: 1 },
                { question: "What is 3²?", options: ["6", "8", "9", "12"], correct: 2 },
            ],
            medium: [
                { question: "Solve: 2x + 5 = 13", options: ["x = 2", "x = 3", "x = 4", "x = 5"], correct: 2 },
                { question: "What is the square root of 144?", options: ["10", "11", "12", "13"], correct: 2 },
                { question: "What is 15% of 200?", options: ["25", "30", "35", "40"], correct: 1 },
                { question: "What is the area of a rectangle with length 5 and width 3?", options: ["8", "15", "16", "20"], correct: 1 },
            ],
            hard: [
                { question: "What is the derivative of x³?", options: ["x²", "3x²", "3x", "x"], correct: 1 },
                { question: "Solve: x² - 5x + 6 = 0", options: ["x = 1,2", "x = 2,3", "x = 3,4", "x = 0,5"], correct: 1 },
            ]
        },
        science: {
            easy: [
                { question: "What is the chemical symbol for Gold?", options: ["Gd", "Au", "Ag", "Go"], correct: 1 },
                { question: "What planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], correct: 1 },
                { question: "What gas do plants absorb?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 },
                { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"], correct: 1 },
                { question: "What does DNA stand for?", options: ["Deoxyribonucleic Acid", "Digital Nuclear Acid", "Derived Natural Acid", "Dynamic Nucleic Acid"], correct: 0 },
            ],
            medium: [
                { question: "What is the process by which plants make food?", options: ["Respiration", "Photosynthesis", "Fermentation", "Digestion"], correct: 1 },
                { question: "What is the speed of light?", options: ["3 × 10⁷ m/s", "3 × 10⁸ m/s", "3 × 10⁹ m/s", "3 × 10⁶ m/s"], correct: 1 },
                { question: "What is the atomic number of Carbon?", options: ["4", "6", "8", "12"], correct: 1 },
            ],
            hard: [
                { question: "What is the half-life of Carbon-14?", options: ["5,730 years", "1,000 years", "10,000 years", "100,000 years"], correct: 0 },
                { question: "What is the pH of a neutral solution?", options: ["0", "7", "14", "1"], correct: 1 },
            ]
        },
        general: {
            easy: [
                { question: "Who is the President of the United States (2024)?", options: ["Biden", "Trump", "Obama", "Clinton"], correct: 0 },
                { question: "What year did World War II end?", options: ["1943", "1944", "1945", "1946"], correct: 2 },
                { question: "What is the largest mammal in the world?", options: ["Elephant", "Whale", "Giraffe", "Rhino"], correct: 1 },
                { question: "How many continents are there?", options: ["5", "6", "7", "8"], correct: 2 },
                { question: "What is the currency of India?", options: ["Rupiah", "Rupee", "Riyal", "Real"], correct: 1 },
            ],
            medium: [
                { question: "In what year did the Titanic sink?", options: ["1912", "1915", "1920", "1925"], correct: 0 },
                { question: "Who wrote 'Romeo and Juliet'?", options: ["Marlowe", "Shakespeare", "Bacon", "Jonson"], correct: 1 },
                { question: "What is the smallest bone in the human body?", options: ["Femur", "Stapes", "Fibula", "Radius"], correct: 1 },
            ],
            hard: [
                { question: "What year was the United Nations founded?", options: ["1942", "1945", "1948", "1950"], correct: 1 },
                { question: "Who was the first President of the United States?", options: ["Jefferson", "Washington", "Adams", "Madison"], correct: 1 },
            ]
        }
    };

    const bank = questionBank[topic][difficulty] || [];
    let questions = [];
    
    for (let i = 0; i < Math.min(count, bank.length); i++) {
        questions.push({...bank[i]});
    }

    // If we need more questions than available, shuffle and repeat
    while (questions.length < count) {
        questions.push({...bank[Math.floor(Math.random() * bank.length)]});
    }

    return questions.slice(0, count);
}

function displayQuestion() {
    const question = appState.quizState.questions[appState.quizState.currentQuestion];
    const totalQuestions = appState.quizState.questions.length;
    const progress = ((appState.quizState.currentQuestion + 1) / totalQuestions) * 100;

    document.getElementById('questionNumber').textContent = 
        `Question ${appState.quizState.currentQuestion + 1}/${totalQuestions}`;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('questionText').textContent = question.question;

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectAnswer(index);

        if (appState.quizState.answers[appState.quizState.currentQuestion] === index) {
            optionDiv.classList.add('selected');
        }

        optionsContainer.appendChild(optionDiv);
    });

    const nextBtn = document.getElementById('nextBtn');
    if (appState.quizState.currentQuestion === totalQuestions - 1) {
        nextBtn.textContent = 'Finish';
    } else {
        nextBtn.textContent = 'Next';
    }
}

function selectAnswer(index) {
    appState.quizState.answers[appState.quizState.currentQuestion] = index;
    displayQuestion();
}

function nextQuestion() {
    const totalQuestions = appState.quizState.questions.length;
    if (appState.quizState.currentQuestion < totalQuestions - 1) {
        appState.quizState.currentQuestion++;
        displayQuestion();
    } else {
        finishQuiz();
    }
}

function previousQuestion() {
    if (appState.quizState.currentQuestion > 0) {
        appState.quizState.currentQuestion--;
        displayQuestion();
    }
}

function finishQuiz() {
    const questions = appState.quizState.questions;
    const answers = appState.quizState.answers;
    let correctCount = 0;

    answers.forEach((answer, index) => {
        if (answer === questions[index].correct) {
            correctCount++;
        }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);

    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    document.getElementById('scorePercentage').textContent = percentage + '%';
    document.getElementById('scoreText').textContent = 
        `You got ${correctCount} out of ${questions.length} correct`;

    let resultHTML = '<div class="result-breakdown">';
    questions.forEach((q, index) => {
        const isCorrect = answers[index] === q.correct;
        resultHTML += `
            <div style="margin-bottom: 1rem; padding: 1rem; background: ${isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
            border-radius: 8px; border-left: 4px solid ${isCorrect ? '#10b981' : '#ef4444'};">
                <p><strong>Q${index + 1}: ${q.question}</strong></p>
                <p>Your answer: ${q.options[answers[index]] || 'Not answered'}</p>
                <p>Correct answer: ${q.options[q.correct]}</p>
            </div>
        `;
    });
    resultHTML += '</div>';
    document.getElementById('resultDetails').innerHTML = resultHTML;
}

function resetQuiz() {
    appState.quizState.started = false;
    document.querySelector('.quiz-setup').style.display = 'block';
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('quizTopic').value = '';
    document.getElementById('quizCount').value = 10;
    document.getElementById('quizDifficulty').value = 'medium';
}

// ==================== FLASHCARD FUNCTIONALITY ====================

function showFlashcardMode(mode) {
    document.querySelectorAll('.flashcard-section').forEach(section => {
        section.style.display = 'none';
    });

    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    if (mode === 'browse') {
        document.getElementById('browseMode').style.display = 'block';
        event.target.classList.add('active');
    } else if (mode === 'create') {
        document.getElementById('createMode').style.display = 'block';
        event.target.classList.add('active');
        if (document.querySelectorAll('.card-input-group').length === 0) {
            addNewCard();
        }
    } else if (mode === 'study') {
        document.getElementById('studyMode').style.display = 'block';
        event.target.classList.add('active');
        updateStudySetDropdown();
    }
}

function loadFlashcardSets() {
    const saved = localStorage.getItem('flashcardSets');
    if (saved) {
        appState.flashcardState.sets = JSON.parse(saved);
    } else {
        appState.flashcardState.sets = [
            {
                id: 1,
                name: 'Geography Capitals',
                description: 'World capitals flashcards',
                cards: [
                    { front: 'What is the capital of France?', back: 'Paris' },
                    { front: 'What is the capital of Japan?', back: 'Tokyo' },
                    { front: 'What is the capital of Brazil?', back: 'Brasília' },
                    { front: 'What is the capital of Egypt?', back: 'Cairo' },
                    { front: 'What is the capital of Australia?', back: 'Canberra' }
                ]
            },
            {
                id: 2,
                name: 'Math Formulas',
                description: 'Essential math formulas',
                cards: [
                    { front: 'Area of a circle', back: 'πr²' },
                    { front: 'Pythagorean theorem', back: 'a² + b² = c²' },
                    { front: 'Quadratic formula', back: 'x = (-b ± √(b²-4ac)) / 2a' }
                ]
            }
        ];
        saveFlashcardSets();
    }
    displayFlashcardSets();
}

function displayFlashcardSets() {
    const setsList = document.getElementById('flashcardSetsList');
    setsList.innerHTML = '';

    appState.flashcardState.sets.forEach(set => {
        const setDiv = document.createElement('div');
        setDiv.className = 'flashcard-set';
        setDiv.innerHTML = `
            <h3>${set.name}</h3>
            <p>${set.description}</p>
            <span class="card-count">${set.cards.length} cards</span>
            <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                <button class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;" onclick="studySet(${set.id})">Study</button>
                <button class="btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.9rem;" onclick="deleteSet(${set.id})">Delete</button>
            </div>
        `;
        setsList.appendChild(setDiv);
    });
}

function addNewCard() {
    const container = document.getElementById('cardsContainer');
    const cardCount = document.querySelectorAll('.card-input-group').length;
    
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card-input-group';
    cardDiv.innerHTML = `
        <input type="text" placeholder="Front of card (question)" class="card-front">
        <input type="text" placeholder="Back of card (answer)" class="card-back">
        <button class="btn-secondary" onclick="this.parentElement.remove()" style="width: 100%;">Remove Card</button>
    `;
    container.appendChild(cardDiv);
}

function saveFlashcardSet() {
    const name = document.getElementById('setName').value;
    const description = document.getElementById('setDescription').value;

    if (!name.trim()) {
        alert('Please enter a set name');
        return;
    }

    const cards = [];
    document.querySelectorAll('.card-input-group').forEach(group => {
        const front = group.querySelector('.card-front').value;
        const back = group.querySelector('.card-back').value;
        if (front.trim() && back.trim()) {
            cards.push({ front, back });
        }
    });

    if (cards.length === 0) {
        alert('Please add at least one card');
        return;
    }

    const newSet = {
        id: Date.now(),
        name,
        description,
        cards
    };

    appState.flashcardState.sets.push(newSet);
    saveFlashcardSets();
    
    document.getElementById('setName').value = '';
    document.getElementById('setDescription').value = '';
    document.getElementById('cardsContainer').innerHTML = '';
    
    alert('Set created successfully!');
    showFlashcardMode('browse');
}

function saveFlashcardSets() {
    localStorage.setItem('flashcardSets', JSON.stringify(appState.flashcardState.sets));
}

function updateStudySetDropdown() {
    const select = document.getElementById('studySetSelect');
    select.innerHTML = '<option value="">-- Select a Set --</option>';
    
    appState.flashcardState.sets.forEach(set => {
        const option = document.createElement('option');
        option.value = set.id;
        option.textContent = set.name;
        select.appendChild(option);
    });
}

function loadStudySet() {
    const setId = parseInt(document.getElementById('studySetSelect').value);
    const set = appState.flashcardState.sets.find(s => s.id === setId);
    
    if (set) {
        appState.flashcardState.currentSet = set;
        appState.flashcardState.currentCard = 0;
    }
}

function startStudyMode() {
    if (!appState.flashcardState.currentSet) {
        alert('Please select a set to study');
        return;
    }

    document.querySelector('.study-setup').style.display = 'none';
    document.getElementById('studyContainer').style.display = 'block';
    displayStudyCard();
}

function displayStudyCard() {
    const cards = appState.flashcardState.currentSet.cards;
    const current = appState.flashcardState.currentCard;

    if (current >= cards.length) {
        finishStudyMode();
        return;
    }

    const card = cards[current];
    document.getElementById('cardProgress').textContent = `${current + 1}/${cards.length}`;
    document.getElementById('cardFront').textContent = card.front;
    document.getElementById('cardBack').textContent = card.back;
    
    const flipCard = document.getElementById('cardFlip');
    flipCard.classList.remove('flipped');
}

function flipCard() {
    document.getElementById('cardFlip').classList.toggle('flipped');
}

function markKnown() {
    appState.flashcardState.currentCard++;
    displayStudyCard();
}

function markUnsure() {
    appState.flashcardState.currentCard++;
    displayStudyCard();
}

function markUnknown() {
    appState.flashcardState.currentCard++;
    displayStudyCard();
}

function exitStudyMode() {
    document.querySelector('.study-setup').style.display = 'block';
    document.getElementById('studyContainer').style.display = 'none';
    appState.flashcardState.currentCard = 0;
}

function finishStudyMode() {
    alert('Great job! You finished studying this set!');
    exitStudyMode();
}

function studySet(setId) {
    switchTab('flashcards');
    showFlashcardMode('study');
    setTimeout(() => {
        document.getElementById('studySetSelect').value = setId;
        loadStudySet();
        startStudyMode();
    }, 100);
}

function deleteSet(setId) {
    if (confirm('Are you sure you want to delete this set?')) {
        appState.flashcardState.sets = appState.flashcardState.sets.filter(s => s.id !== setId);
        saveFlashcardSets();
        displayFlashcardSets();
    }
}

function loadSampleFlashcards() {
    alert('Sample flashcard sets loaded!');
    displayFlashcardSets();
}

// ==================== AI ASSISTANT FUNCTIONALITY ====================

function sendAssistantMessage() {
    const input = document.getElementById('assistantInput');
    const message = input.value.trim();

    if (!message) return;

    const chatHistory = document.getElementById('chatHistory');
    
    // Add user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user';
    userMessageDiv.textContent = message;
    chatHistory.appendChild(userMessageDiv);

    input.value = '';
    chatHistory.scrollTop = chatHistory.scrollHeight;

    // Simulate AI response
    setTimeout(() => {
        const response = generateAIResponse(message);
        const assistantMessageDiv = document.createElement('div');
        assistantMessageDiv.className = 'message assistant';
        assistantMessageDiv.textContent = response;
        chatHistory.appendChild(assistantMessageDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }, 500);
}

function generateAIResponse(userMessage) {
    const responses = {
        'hello': 'Hi there! 👋 How can I help you with your studies today?',
        'help': 'I can help you with:\n- Quiz questions on various topics\n- Flashcard creation and studying\n- Task management and scheduling\n- Uploading study materials\n\nWhat would you like help with?',
        'math': 'Math is a great subject to master! Would you like to:\n- Take a math quiz\n- Review formulas with flashcards\n- Get help with a specific problem',
        'science': 'Science is fascinating! I can help you with:\n- Biology, Chemistry, Physics concepts\n- Science quizzes\n- Creating study materials',
        'geography': 'Geography helps us understand the world! I can assist with:\n- Capital cities and countries\n- Geography quizzes\n- Continent and ocean facts',
        'study': 'Great initiative! Here are some tips:\n1. Use flashcards for memorization\n2. Take regular quizzes to test yourself\n3. Organize your study schedule\n4. Take short breaks every 25 minutes (Pomodoro technique)\n5. Upload your notes for automatic flashcard generation',
        'default': 'That\'s an interesting question! I can help you study better by:\n- Creating quizzes on any topic\n- Generating flashcards from your materials\n- Organizing your study schedule\n- Tracking your tasks\n\nWould you like help with any of these?'
    };

    const lowerMessage = userMessage.toLowerCase();
    for (const [key, value] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return value;
        }
    }
    return responses.default;
}

// ==================== STUDY MATERIALS FUNCTIONALITY ====================

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    document.querySelector('.drop-zone').classList.add('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    document.querySelector('.drop-zone').classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    handleFiles(files);
}

function handleFileUpload(e) {
    const files = e.target.files;
    handleFiles(files);
}

function handleFiles(files) {
    if (files.length === 0) return;
    
    const file = files[0];
    alert(`File "${file.name}" uploaded successfully!`);
    document.querySelector('.drop-zone').classList.remove('drag-over');
}

function convertMaterial() {
    const shouldConvertFlashcards = document.getElementById('convertFlashcards').checked;
    const shouldConvertQuestions = document.getElementById('convertQuestions').checked;

    if (!shouldConvertFlashcards && !shouldConvertQuestions) {
        alert('Please select at least one conversion option');
        return;
    }

    let resultHTML = '';

    if (shouldConvertFlashcards) {
        resultHTML += `
            <h4>Generated Flashcards:</h4>
            <div style="background: white; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                <div class="flashcard-set">
                    <h3>📇 Study Material Flashcards</h3>
                    <p>5 cards generated from your document</p>
                    <span class="card-count">5 cards</span>
                    <button class="btn-primary" style="margin-top: 1rem; width: 100%;">Add to Collection</button>
                </div>
            </div>
        `;
    }

    if (shouldConvertQuestions) {
        resultHTML += `
            <h4>Generated Quiz Questions:</h4>
            <div style="background: white; padding: 1rem; border-radius: 8px;">
                <ol style="line-height: 2; color: #333;">
                    <li>Multiple choice question 1 generated from material</li>
                    <li>Multiple choice question 2 generated from material</li>
                    <li>Multiple choice question 3 generated from material</li>
                    <li>Short answer question 1</li>
                    <li>Essay question 1</li>
                </ol>
                <button class="btn-primary" style="margin-top: 1rem; width: 100%;">Create Quiz from These Questions</button>
            </div>
        `;
    }

    document.getElementById('resultContent').innerHTML = resultHTML;
    document.getElementById('materialsResult').style.display = 'block';
}

// ==================== TASK/TODO FUNCTIONALITY ====================

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskCategory = document.getElementById('taskCategory');
    const taskDueDate = document.getElementById('taskDueDate');

    const taskText = taskInput.value.trim();
    const category = taskCategory.value;
    const dueDate = taskDueDate.value;

    if (!taskText) {
        alert('Please enter a task');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        category: category,
        dueDate: dueDate || null,
        completed: false,
        createdAt: new Date()
    };

    appState.tasks.push(task);
    saveTasks();
    
    taskInput.value = '';
    taskDueDate.value = '';
    filterTasks('all');
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(appState.tasks));
}

function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        appState.tasks = JSON.parse(saved);
    }
}

function filterTasks(filter) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = '';

    let filteredTasks = appState.tasks;

    if (filter === 'pending') {
        filteredTasks = appState.tasks.filter(t => !t.completed);
    } else if (filter === 'completed') {
        filteredTasks = appState.tasks.filter(t => t.completed);
    } else if (filter === 'overdue') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        filteredTasks = appState.tasks.filter(t => {
            if (!t.dueDate || t.completed) return false;
            return new Date(t.dueDate) < today;
        });
    }

    if (filteredTasks.length === 0) {
        tasksList.innerHTML = '<p style="text-align: center; color: #999;">No tasks found</p>';
        return;
    }

    filteredTasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''} ${isOverdue(task) ? 'overdue' : ''}`;
        
        const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '';

        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <div class="task-content">
                <div class="task-title" style="text-decoration: ${task.completed ? 'line-through' : 'none'}">${task.text}</div>
                <div class="task-details">
                    <span class="task-category">${task.category}</span>
                    ${dueDate ? `<span>Due: ${dueDate}</span>` : ''}
                </div>
            </div>
            <div class="task-actions">
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        tasksList.appendChild(taskItem);
    });
}

function toggleTask(taskId) {
    const task = appState.tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        filterTasks('all');
    }
}

function deleteTask(taskId) {
    appState.tasks = appState.tasks.filter(t => t.id !== taskId);
    saveTasks();
    filterTasks('all');
}

function isOverdue(task) {
    if (!task.dueDate || task.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(task.dueDate) < today;
}

// ==================== SCHEDULER FUNCTIONALITY ====================

function addEvent() {
    const eventName = document.getElementById('eventName').value;
    const eventType = document.getElementById('eventType').value;
    const eventDateTime = document.getElementById('eventDateTime').value;
    const timeAvailable = document.getElementById('timeAvailable').value;
    const eventTopics = document.getElementById('eventTopics').value;

    if (!eventName || !eventDateTime) {
        alert('Please fill in all required fields');
        return;
    }

    const event = {
        id: Date.now(),
        name: eventName,
        type: eventType,
        dateTime: new Date(eventDateTime),
        timeAvailable: parseFloat(timeAvailable),
        topics: eventTopics.split(',').map(t => t.trim()).filter(t => t)
    };

    appState.events.push(event);
    saveEvents();

    document.getElementById('eventName').value = '';
    document.getElementById('eventDateTime').value = '';
    document.getElementById('timeAvailable').value = 2;
    document.getElementById('eventTopics').value = '';

    updateCalendar();
    displayEvents();
    generateStudyPlan(event);
}

function saveEvents() {
    localStorage.setItem('events', JSON.stringify(appState.events));
}

function loadEvents() {
    const saved = localStorage.getItem('events');
    if (saved) {
        appState.events = JSON.parse(saved).map(e => ({
            ...e,
            dateTime: new Date(e.dateTime)
        }));
    }
}

function updateCalendar() {
    const year = appState.currentDate.getFullYear();
    const month = appState.currentDate.getMonth();

    document.getElementById('currentMonth').textContent = 
        appState.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';

    // Add day headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.style.fontWeight = 'bold';
        dayHeader.style.textAlign = 'center';
        dayHeader.textContent = day;
        calendarDays.appendChild(dayHeader);
    });

    // Add empty cells
    for (let i = 0; i < firstDay; i++) {
        calendarDays.appendChild(document.createElement('div'));
    }

    // Add days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        dayDiv.textContent = day;

        const currentDate = new Date(year, month, day);
        
        if (currentDate.toDateString() === today.toDateString()) {
            dayDiv.classList.add('today');
        }

        const hasEvent = appState.events.some(e => 
            e.dateTime.toDateString() === currentDate.toDateString()
        );

        if (hasEvent) {
            dayDiv.classList.add('has-event');
        }

        calendarDays.appendChild(dayDiv);
    }
}

function previousMonth() {
    appState.currentDate.setMonth(appState.currentDate.getMonth() - 1);
    updateCalendar();
}

function nextMonth() {
    appState.currentDate.setMonth(appState.currentDate.getMonth() + 1);
    updateCalendar();
}

function displayEvents() {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';

    const upcomingEvents = appState.events.sort((a, b) => a.dateTime - b.dateTime);

    if (upcomingEvents.length === 0) {
        eventsList.innerHTML = '<p style="text-align: center; color: #999;">No events scheduled</p>';
        return;
    }

    upcomingEvents.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        
        const dateStr = event.dateTime.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        eventItem.innerHTML = `
            <div class="event-title">${event.name}</div>
            <div class="event-details">
                <div class="event-detail-item">📅 ${dateStr}</div>
                <div class="event-detail-item">⏱️ ${event.timeAvailable} hours</div>
                <span class="event-type">${event.type}</span>
            </div>
            ${event.topics.length > 0 ? `<p style="margin-top: 0.5rem; color: #666;">Topics: ${event.topics.join(', ')}</p>` : ''}
        `;

        eventsList.appendChild(eventItem);
    });
}

function generateStudyPlan(event) {
    const hoursAvailable = event.timeAvailable;
    const topicCount = event.topics.length || 1;
    const timePerTopic = (hoursAvailable / topicCount).toFixed(1);

    let planText = `<strong>Recommended Study Plan for ${event.name}:</strong>\n\n`;
    planText += `Time Available: ${hoursAvailable} hours\n\n`;
    
    if (event.topics.length > 0) {
        planText += `<strong>Topic Breakdown (${timePerTopic} hours each):</strong>\n`;
        event.topics.forEach((topic, index) => {
            planText += `${index + 1}. ${topic}\n`;
        });
    } else {
        planText += `General study preparation\n`;
    }

    planText += `\n<strong>Study Tips:</strong>\n`;
    planText += `• Break your study into 25-minute focused sessions (Pomodoro Technique)\n`;
    planText += `• Take a 5-minute break after each session\n`;
    planText += `• Use flashcards for memorization\n`;
    planText += `• Take practice quizzes to test yourself\n`;
    planText += `• Get good sleep the night before\n`;

    document.getElementById('planDetails').innerHTML = planText.replace(/\n/g, '<br>');
    document.getElementById('studyPlan').style.display = 'block';
}

// ==================== INITIALIZATION ====================

// Load all data when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    loadEvents();
    loadFlashcardSets();
    displayEvents();
    filterTasks('all');
});

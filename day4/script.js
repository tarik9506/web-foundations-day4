// DOM Element Selections
const noteText = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");

// Function to update characters, words, and warning/over styles
function updateCounts() {
    const text = noteText.value;
    const length = text.length;

    // Word count calculation (splitting by whitespace and filtering out empty strings)
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

    // Update text content
    charCount.textContent = `${length} / 200 characters`;
    wordCount.textContent = `${words} words`;

    // Reset classes
    charCount.classList.remove("warning", "over");

    // Apply conditional warning classes based on character limits
    if (length > 200) {
        charCount.classList.add("over");
    } else if (length > 180) {
        charCount.classList.add("warning");
    }
}

// Function to handle saving draft to localStorage
function saveDraft() {
    localStorage.setItem("noteDraft", noteText.value);
}

// Function to handle theme toggling
function toggleTheme() {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    
    // Update button label and persist choice
    themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Event Listener: Input changes (update counts & save draft)
noteText.addEventListener("input", () => {
    updateCounts();
    saveDraft();
});

// Event Listener: Clear button click
clearBtn.addEventListener("click", () => {
    noteText.value = "";
    localStorage.removeItem("noteDraft");
    updateCounts();
    noteText.focus();
});

// Event Listener: Escape key clears the textarea
noteText.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        noteText.value = "";
        localStorage.removeItem("noteDraft");
        updateCounts();
    }
});

// Event Listener: Theme toggle button click
themeToggle.addEventListener("click", toggleTheme);

// --- Initialization on Page Load ---
function init() {
    // 1. Restore saved draft
    const savedDraft = localStorage.getItem("noteDraft");
    if (savedDraft !== null) {
        noteText.value = savedDraft;
    }

    // 2. Restore saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeToggle.textContent = "Light mode";
    } else {
        themeToggle.textContent = "Dark mode";
    }

    // 3. Initial counts calculation
    updateCounts();
}

// Run initialization
init();
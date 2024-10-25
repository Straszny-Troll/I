document.addEventListener('DOMContentLoaded', function () {
    const startScreen = document.getElementById('start-screen');
    const loadingContainer = document.getElementById('loading-container');
    const progressBar = document.getElementById('progress');
    const percentageDisplay = document.getElementById('percentage');
    const intersectContainer = document.querySelector('.intersect-container');
    const trollInput = document.getElementById('troll-input');
    const trollTextElement = document.getElementById('troll-text');
    const messageScreen = document.getElementById('message-screen');

    const trollText = "Straszny troll podnosi swój miecz";
    let currentIndex = 0;

    // Funkcja do animacji tekstu
    function animateText() {
        if (currentIndex < trollText.length) {
            trollTextElement.textContent += trollText.charAt(currentIndex);
            currentIndex++;
            setTimeout(animateText, 250); // Czas animacji tekstu
        }
    }

    // Rozpocznij animację tekstu
    animateText();

    // Funkcja sprawdzająca odpowiedź
    function checkAnswer() {
        const userInput = trollInput.value.trim();
        const correctAnswer = "Zaatakuj trolla paskudnym nożem";

        if (userInput === correctAnswer) {
            startScreen.classList.add('hidden');
            intersectContainer.classList.remove('hidden');
        } else {
            startScreen.classList.add('hidden');
            loadingContainer.classList.remove('hidden');

            let progress = 0;
            const interval = setInterval(() => {
                if (progress < 100) {
                    progress++;
                    progressBar.style.width = progress + '%';
                    percentageDisplay.textContent = progress + '%';
                } else {
                    clearInterval(interval);
                    loadingContainer.classList.add('hidden');
                    messageScreen.classList.remove('hidden'); // Pokaż ekran wiadomości
                }
            }, 50); // Prędkość ładowania
        }
    }

    // Nasłuchuj naciśnięcia klawisza Enter w polu tekstowym
    trollInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
});

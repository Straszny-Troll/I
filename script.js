document.addEventListener('DOMContentLoaded', function () {
    const startScreen = document.getElementById('start-screen');
    const intersectContainer = document.querySelector('.intersect-container');
    const trollInput = document.getElementById('troll-input');
    const trollTextElement = document.getElementById('troll-text');
    const videoElement = document.getElementById('error-video');
    const loadingBar = document.getElementById('loading-bar');
    const progress = document.getElementById('progress');
    const loadingText = document.getElementById('loading-text');

    const trollText = "Straszny troll podnosi swój miecz";
    let currentIndex = 0;

    // Funkcja do animacji tekstu
    function animateText() {
        if (currentIndex < trollText.length) {
            trollTextElement.textContent += trollText.charAt(currentIndex);
            currentIndex++;
            setTimeout(animateText, 250);
        }
    }

    // Rozpocznij animację tekstu
    animateText();

    // Funkcja sprawdzająca odpowiedź
    function checkAnswer() {
        const userInput = trollInput.value.trim();
        const correctAnswer = "Zaatakuj trolla paskudnym nożem";

        if (userInput === correctAnswer) {
            // Jeśli odpowiedź jest poprawna, ukryj startowy ekran i pokaż Intersect
            startScreen.classList.add('hidden');
            intersectContainer.classList.remove('hidden');
            videoElement.pause(); // Zatrzymaj wideo, jeśli wcześniej odtwarzane
            videoElement.style.display = 'none'; // Ukryj wideo
        } else {
            // Pokazanie paska ładowania
            startScreen.style.display = 'none'; // Ukryj ekran startowy
            loadingBar.classList.remove('hidden'); // Pokaż pasek ładowania

            // Ładowanie do 100%
            let width = 0;
            const interval = setInterval(() => {
                if (width >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        loadingBar.classList.add('hidden'); // Ukryj pasek ładowania
                        videoElement.style.display = 'block'; // Pokaż wideo
                        videoElement.play(); // Odtwórz wideo
                    }, 2000); // Opóźnienie przed pokazaniem wideo
                } else {
                    width++;
                    progress.style.width = width + '%';
                    loadingText.textContent = width + '%';
                }
            }, 50); // Czas między wzrostem procentów
        }
    }

    // Nasłuchuj naciśnięcia klawisza Enter w polu tekstowym
    trollInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
});

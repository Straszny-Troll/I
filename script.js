document.addEventListener('DOMContentLoaded', function () {
    const startScreen = document.getElementById('start-screen');
    const intersectContainer = document.querySelector('.intersect-container');
    const trollInput = document.getElementById('troll-input');
    const trollTextElement = document.getElementById('troll-text');
    const videoElement = document.getElementById('error-video');
    const loadingContainer = document.getElementById('loading-container');
    const loadingBar = document.getElementById('loading-bar');
    const loadingPercentage = document.getElementById('loading-percentage');

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
            // Jeśli odpowiedź jest poprawna, ukryj startowy ekran i pokaż Intersect
            startScreen.classList.add('hidden');
            intersectContainer.classList.remove('hidden');
            videoElement.pause(); // Zatrzymaj wideo, jeśli wcześniej odtwarzane
            videoElement.style.display = 'none'; // Ukryj wideo
        } else {
            // Ukryj ekran startowy i pokaż pasek ładowania
            startScreen.style.display = 'none'; // Ukryj ekran startowy
            loadingContainer.style.display = 'block'; // Pokaż pasek ładowania

            let loadingProgress = 0;
            const loadingInterval = setInterval(() => {
                loadingProgress += 10;
                loadingBar.style.width = loadingProgress + '%';
                loadingPercentage.textContent = loadingProgress + '%';

                if (loadingProgress >= 100) {
                    clearInterval(loadingInterval);
                    setTimeout(() => {
                        loadingContainer.style.display = 'none'; // Ukryj pasek ładowania
                        videoElement.style.display = 'block'; // Pokaż wideo
                        videoElement.play(); // Odtwórz wideo
                    }, 2000); // Poczekaj 2 sekundy przed pokazaniem wideo
                }
            }, 200); // Czas interwału dla paska ładowania
        }
    }

    // Nasłuchuj naciśnięcia klawisza Enter w polu tekstowym
    trollInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
});

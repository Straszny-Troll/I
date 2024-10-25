document.addEventListener('DOMContentLoaded', function () {
    const startScreen = document.getElementById('start-screen');
    const loadingContainer = document.getElementById('loading-container');
    const progressBar = document.getElementById('progress');
    const percentageDisplay = document.getElementById('percentage');
    const intersectContainer = document.querySelector('.intersect-container');
    const trollInput = document.getElementById('troll-input');
    const trollTextElement = document.getElementById('troll-text');
    const videoElement = document.getElementById('error-video');

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
            // Pokaż pasek ładowania
            startScreen.classList.add('hidden'); // Ukryj ekran startowy
            loadingContainer.classList.remove('hidden'); // Pokaż pasek ładowania

            // Animacja paska ładowania
            let progress = 0;
            const interval = setInterval(() => {
                if (progress < 100) {
                    progress++;
                    progressBar.style.width = progress + '%';
                    percentageDisplay.textContent = progress + '%';
                } else {
                    clearInterval(interval);
                    loadingContainer.classList.add('hidden'); // Ukryj pasek ładowania po osiągnięciu 100%
                    videoElement.style.display = 'block'; // Pokaż wideo
                    videoElement.play(); // Odtwórz wideo

                    // Przejdź do pełnoekranowego odtwarzania
                    if (videoElement.requestFullscreen) {
                        videoElement.requestFullscreen();
                    } else if (videoElement.mozRequestFullScreen) { // Firefox
                        videoElement.mozRequestFullScreen();
                    } else if (videoElement.webkitRequestFullscreen) { // Chrome, Safari i Opera
                        videoElement.webkitRequestFullscreen();
                    } else if (videoElement.msRequestFullscreen) { // Internet Explorer/Edge
                        videoElement.msRequestFullscreen();
                    }
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

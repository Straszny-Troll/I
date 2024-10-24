document.addEventListener('DOMContentLoaded', function () {
    const startScreen = document.getElementById('start-screen');
    const intersectContainer = document.querySelector('.intersect-container');
    const trollInput = document.getElementById('troll-input');
    const trollTextElement = document.getElementById('troll-text');
    const videoElement = document.getElementById('error-video');
    const loadingContainer = document.getElementById('loading-container');
    const loadingBar = document.getElementById('loading-bar');

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
            loadingContainer.classList.remove('hidden');
            loadingBar.style.width = '0'; // Zresetuj pasek ładowania

            // Animuj pasek ładowania
            setTimeout(function() {
                loadingBar.style.width = '100%'; // Rozszerz pasek do 100%

                // Gdy ładowanie się zakończy, ukryj pasek i odtwórz wideo
                setTimeout(function() {
                    loadingContainer.classList.add('hidden');
                    videoElement.style.display = 'block'; // Pokaż wideo
                    videoElement.play(); // Odtwórz wideo
                }, 5000); // Czas trwania ładowania (5 sekund)
            }, 100);
        }
    }

    // Nasłuchuj naciśnięcia klawisza Enter w polu tekstowym
    trollInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
});

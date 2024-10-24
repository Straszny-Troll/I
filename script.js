document.addEventListener('DOMContentLoaded', function () {
    const startScreen = document.getElementById('start-screen');
    const trollInput = document.getElementById('troll-input');
    const trollTextElement = document.getElementById('troll-text');
    const videoElement = document.getElementById('error-video');
    const loadingContainer = document.getElementById('loading-container');
    const loadingBar = document.getElementById('loading-bar');
    const loadingText = document.getElementById('loading-text');

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
            videoElement.pause();
            videoElement.style.display = 'none';
        } else {
            startScreen.style.display = 'none';
            loadingContainer.classList.remove('hidden');
            loadingBar.style.width = '0';

            let progress = 0;
            const interval = setInterval(() => {
                progress += 1;
                loadingBar.style.width = `${progress}%`;
                loadingText.textContent = `${progress}%`;

                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        loadingContainer.classList.add('hidden');
                        videoElement.style.display = 'block';
                        videoElement.play();
                    }, 0); // Pasek zniknie od razu po osiągnięciu 100%
                }
            }, 50); // Co 50ms, ładuj pasek
        }
    }

    // Nasłuchuj naciśnięcia klawisza Enter w polu tekstowym
    trollInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
});

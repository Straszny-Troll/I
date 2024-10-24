document.addEventListener('DOMContentLoaded', function() {
    const startScreen = document.getElementById('start-screen');
    const intersectContainer = document.querySelector('.intersect-container');
    const trollInput = document.getElementById('troll-input');
    const errorMessage = document.getElementById('error-message');
    const trollTextElement = document.getElementById('troll-text');
    const errorVideo = document.getElementById('error-video'); // Zmieniono na pobranie wideo

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
            // Ukryj ekran startowy i pokaż Intersect
            startScreen.classList.add('hidden');
            intersectContainer.classList.remove('hidden');
            errorMessage.style.display = 'none'; 
        } else {
            // Ukryj tekst błędu, pokaż wideo na całą kartę
            errorMessage.style.display = 'none';
            errorVideo.classList.remove('hidden');
            errorVideo.play(); // Odtwórz wideo
        }
    }

    // Nasłuchuj naciśnięcia klawisza Enter w polu tekstowym
    trollInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
});

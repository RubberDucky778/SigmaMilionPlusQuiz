const imageToGuesses = {
    'jakub.png': ['jakub', 'yzo', 'Jakub', 'Yzo', 'Yzomandias', 'jakub vlcek', 'yzomandias'],
    'decky beats.png': ['decky beats', 'Decky', 'Decky Beats', 'Decky beats', 'decky'],
    'dominik.png': ['dominik', 'Dominik', 'Nik Tendo', 'yzo', 'nik tendo', 'nik', 'dominik citta', 'goldcigo'],
    'karlo.png': ['karlo', 'juraj', 'Karlo', 'juraj caba', 'gumbgu'],
    'tomas.png': ['tomas', 'Tomas', 'Tkeej', 'tkeej'],
    'nobodylisten.png': ['nobodylisten', 'Nobody', 'Nobody Listen', 'Nobody Listens', 'nobody listen', 'nobody listens', 'jakub strach', 'nobody'],
    'sara.png': ['sara', 'Sara', 'Sara Rikas', 'sara rikas', 'sarinka', '50 rocna zena'],
    'robin zoot.png': ['robin zoot', 'Robin', 'Zoot', 'zoot', 'robin'],
    'jickson.png': ['jickson', 'Jickson', 'jimmy', 'D', 'dickson'],
    'koky.png': ['Koky', 'koky'],
    'soul.png': ['saul'],
    'samey.png': ['samey', 'Samey', 'Samo', 'samo'],
    'zayo.png': ['zayo', 'Zayo', 'Matus', 'matus zajac', 'zajac', 'zay jack'],
    'viktor.png': ['viktor', 'Viktor', 'Viktor Sheen', 'viktor sheen', 'viktor dundic'],
    'PTK.png': ['ptk', 'PTK', 'patrik'],
    'astralkid.png': ['astralkid', 'astral', 'astralkid22'],
    'shimi.png': ['shimmi', 'oliver'],
    'lucabrassi.png': ['lucabrassi', 'lucabrassi10x', 'luca brassi', 'LucaBrassi10x', 'Luca Brassi', 'luca', 'lukas', 'gambler', 'fetak', 'alkoholic'],
    'hasan.png': ['Hasan', 'hasan'],
    'separ.png': ['Separ', 'separ'],
    'calin.png': ['calin', 'Calin', 'calin panfili'],
    'stein27.png': ['stein27', 'Stein27', 'Stein', 'Peter', 'stein', 'peter']
};

const images = Object.keys(imageToGuesses); // This will include all 22 images
let currentIndex = 0;
let score = 0;
let shuffledImages = [];
let language = 'sk'; // Default language is Slovak
let hasIncorrectGuess = false; // Track if the player has made an incorrect guess for the current image

const translations = {
    sk: {
        welcomeTitle: 'Vitajte v hre Hádanie obrázkov!',
        welcomeText: 'Vašou úlohou je uhádnuť, aky cesky/slovensky rapper je na obrazku. Napíšte svoj tip do políčka a potvrdte ho. Počet správnych odpovedí ovplyvní vaše celkové skóre. Veľa šťastia!',
        startButton: 'Začať hru',
        title: 'Hádanie obrázkov!',
        imageStatus: 'Obrázok {current} z {total}',
        guessPlaceholder: 'Zadajte svoj tip...',
        submitButton: 'Potvrdiť',
        correct: 'Správne!',
        incorrect: 'Skúste znova!',
        gameOver: 'Koniec hry!',
        scoreText: 'Skóre:',
        gradeText: 'Známka:',
        playAgain: 'Hrať znova',
        languageButton: 'Čeština',
        tip: 'Tip: Nepoužívajte veľké písmená.' // Slovak tip
    },
    cs: {
        welcomeTitle: 'Vítejte ve hře Hádej obrázky!',
        welcomeText: 'Vaším úkolem je uhodnout, aky cesky/slovensky rapper je na obrazku. Napište svůj tip do políčka a potvrďte ho. Počet správných odpovědí ovlivní vaše celkové skóre. Hodně štěstí!',
        startButton: 'Začít hru',
        title: 'Hádej obrázky!',
        imageStatus: 'Obrázek {current} z {total}',
        guessPlaceholder: 'Zadejte svůj tip...',
        submitButton: 'Potvrdit',
        correct: 'Správně!',
        incorrect: 'Zkuste znovu!',
        gameOver: 'Konec hry!',
        scoreText: 'Skóre:',
        gradeText: 'Známka:',
        playAgain: 'Hrát znovu',
        languageButton: 'Slovenština',
        tip: 'Tip: Nepoužívejte velká písmena.' // Czech tip
    }
};

// Define the updateImageStatus function
function updateImageStatus() {
    const lang = translations[language];
    document.getElementById('image-status').textContent = lang.imageStatus
        .replace('{current}', currentIndex + 1)
        .replace('{total}', images.length);
}

function updateLanguage() {
    const lang = translations[language];
    document.getElementById('welcome-title').textContent = lang.welcomeTitle;
    document.getElementById('welcome-text').textContent = lang.welcomeText;
    document.getElementById('start-button-text').textContent = lang.startButton;
    document.getElementById('title').textContent = lang.title;
    document.getElementById('guess-input').placeholder = lang.guessPlaceholder;
    document.getElementById('submit-button').textContent = lang.submitButton;
    document.getElementById('language-button').textContent = lang.languageButton;
    document.getElementById('tip-text').textContent = lang.tip; // Update the tip
    updateImageStatus(); // Update the image status text
}

function toggleLanguage() {
    language = language === 'sk' ? 'cs' : 'sk';
    updateLanguage();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame() {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
    initializeGame();
}

function initializeGame() {
    shuffledImages = [...images];
    shuffleArray(shuffledImages);
    loadNextImage();
    document.getElementById('guess-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkAnswer();
    });
    updateLanguage();
}

function loadNextImage() {
    const imageContainer = document.getElementById('image-container');
    const imagePath = `images/${shuffledImages[currentIndex]}`;
    imageContainer.innerHTML = `<img src="${imagePath}" alt="Game Image">`;
    updateImageStatus(); // Update the image status
    document.getElementById('feedback').classList.add('hidden');
    hasIncorrectGuess = false; // Reset the incorrect guess flag for the new image
}

function checkAnswer() {
    const guess = document.getElementById('guess-input').value.trim().toLowerCase();
    if (!guess) {
        alert(translations[language].guessPlaceholder);
        return;
    }

    const currentImage = shuffledImages[currentIndex];
    const validGuesses = imageToGuesses[currentImage];
    const feedback = document.getElementById('feedback');

    if (validGuesses.includes(guess)) {
        if (!hasIncorrectGuess) {
            // Only count as correct if there were no previous incorrect guesses
            score++;
        }
        feedback.textContent = translations[language].correct;
        feedback.classList.remove('incorrect');
        feedback.classList.add('correct');
    } else {
        hasIncorrectGuess = true; // Mark that the player has made an incorrect guess
        feedback.textContent = translations[language].incorrect;
        feedback.classList.remove('correct');
        feedback.classList.add('incorrect');
    }

    feedback.classList.remove('hidden');
    document.getElementById('guess-input').value = '';

    if (validGuesses.includes(guess)) {
        currentIndex++;
        if (currentIndex < images.length) {
            setTimeout(loadNextImage, 1000);
        } else {
            setTimeout(showResults, 1000);
        }
    }
}

function showResults() {
    const lang = translations[language];
    document.getElementById('image-container').classList.add('hidden');
    document.getElementById('guess-input').classList.add('hidden');
    document.querySelector('button').classList.add('hidden');
    document.getElementById('status').classList.add('hidden');
    document.getElementById('feedback').classList.add('hidden');
    
    const percentage = (score / images.length) * 100;
    let grade;
    
    if (percentage >= 90) grade = 'A';
    else if (percentage >= 80) grade = 'B';
    else if (percentage >= 70) grade = 'C';
    else if (percentage >= 60) grade = 'D';
    else grade = 'F';

    document.getElementById('score').textContent = score;
    document.getElementById('total').textContent = images.length;
    document.getElementById('grade').textContent = grade;
    document.getElementById('game-over').textContent = lang.gameOver;
    document.getElementById('score-text').textContent = lang.scoreText;
    document.getElementById('grade-text').textContent = lang.gradeText;
    document.getElementById('play-again').textContent = lang.playAgain;
    document.getElementById('result').classList.remove('hidden');
}

// Initialize the welcome screen
document.getElementById('start-button').addEventListener('click', startGame);
updateLanguage();

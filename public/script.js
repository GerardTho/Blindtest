let videoList = [];
let currentIndex = 0;
let isRevealed = false;

const videoEl = document.getElementById('video');
const revealBtn = document.getElementById('revealBtn');
const timerEl = document.getElementById('timer');

let countdownInterval;

async function fetchVideos() {
    const res = await fetch('/api/videos');
    videoList = await res.json();
    videoList.sort(); // Optional
    startVideo();
}

function startVideo() {
    if (currentIndex >= videoList.length) {
        alert("End of playlist!");
        return;
    }

    const currentVideo = videoList[currentIndex];
    videoEl.src = `videos/${currentVideo}`;
    videoEl.hidden = true;
    videoEl.currentTime = 0;
    videoEl.play();

    // Reset UI
    isRevealed = false;
    revealBtn.textContent = 'Reveal';
    revealBtn.hidden = false;
    timerEl.textContent = '30';
    timerEl.classList.remove('hidden');

    // Countdown
    let timeLeft = 30;
    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        // if (timeLeft <= 0) {
        //     clearInterval(countdownInterval);
        //     if (!isRevealed) {
        //         isRevealed = true;
        //         revealBtn.textContent = 'Next';
        //         videoEl.hidden = false;
        //         timerEl.classList.add('hidden'); // Hide timer on auto reveal
        //     }
        // }
    }, 1000);
}

revealBtn.addEventListener('click', () => {
    if (!isRevealed) {
        // Force reveal early
        clearInterval(countdownInterval);
        isRevealed = true;
        videoEl.hidden = false;
        revealBtn.textContent = 'Next';
        timerEl.classList.add('hidden'); // Hide timer after reveal
    } else {
        // Move to next video
        currentIndex++;
        startVideo();
    }
});

// Space bar triggers Reveal/Next
document.addEventListener('keydown', (event) => {
    // Prevent scrolling when pressing space
    if (event.code === 'Space') {
        event.preventDefault();
        revealBtn.click();
    }
});


fetchVideos();

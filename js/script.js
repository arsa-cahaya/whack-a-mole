const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const papanSkor = document.getElementById('score');
const bestSkor = document.getElementById('best-score');
const pop = document.querySelector('#pop');
const tombolPlay = document.querySelector('.play');
const selesaiText = document.querySelector('.selesai');
const tema = document.querySelector('#tema');

let tanahSebelumnya;
let selesai;
let skor;
let bestScore = localStorage.getItem('bestScore') || 0;

function randomTanah(tanah) {
    const t = Math.floor(Math.random() * tanah.length);
    const tanahRandom = tanah[t];
    if (tanahRandom == tanahSebelumnya) {
        randomTanah(tanah);
    }
    tanahSebelumnya = tanahRandom;
    return tanahRandom;
}

function randomWaktu(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function munculTikus() {
    const tanahRandom = randomTanah(tanah);
    const waktuRandom = randomWaktu(800, 1800);
    tanahRandom.classList.add('muncul');

    setTimeout(() => {
        tanahRandom.classList.remove('muncul');
        if (!selesai) {
            munculTikus();
        }
    }, waktuRandom);
}

function updateBestScore() {
    if (skor > bestScore) {
        bestScore = skor;
        localStorage.setItem('bestScore', bestScore);
        bestSkor.textContent = bestScore;
    }
}

function mulai() {
    selesai = false;
    skor = 0;
    papanSkor.textContent = 0;
    papanSkor.textContent = 0;
    bestSkor.textContent = bestScore;
    munculTikus();
    tombolPlay.style.display = 'none';
    selesaiText.classList.add('hidden');

    tema.play();

    setTimeout(() => {
        selesai = true;
        selesaiText.classList.remove('hidden');
        tombolPlay.textContent = 'Play Again?';
        tombolPlay.style.display = 'block';
        tema.pause();
        updateBestScore();
    }, 20000);
}

function pukulTikus() {
    skor++;
    // this.style.transition = "top 0s";
    this.parentNode.classList.remove('muncul');
    pop.play();
    papanSkor.textContent = skor;
}

tikus.forEach(t => {
    t.addEventListener('click', pukulTikus);
});

window.onload = function () {
    bestSkor.textContent = bestScore;
}

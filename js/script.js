const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const papanSkor = document.querySelector('.papan-skor');
const pop = document.querySelector('#pop');

let tanahSebelumnya;
let selesai;
let skor;

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

function mulai() {
    selesai = false;
    skor = 0;
    papanSkor.textContent = 0;
    munculTikus();
    setTimeout(() => {
        selesai = true;
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
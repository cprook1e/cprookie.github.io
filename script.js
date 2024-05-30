const arrows = document.querySelectorAll(".arrow");
const movieList = document.querySelectorAll(".movie-list");

// Her arrow için bir olay dinleyicisi eklenir
arrows.forEach((arrow, i) => {
    arrow.addEventListener("click", function () {
        // Her arrow tıklandığında, ilgili movie listesi birimini alır
        const currentMovieList = movieList[i];
        // movie listesinin şu anki X eksenindeki pozisyonunu alır
        const currentPosition = parseFloat(getComputedStyle(currentMovieList).transform.replace("matrix(1, 0, 0, 1, ", ""));
        // Her bir film öğesinin genişliğini alır
        const itemWidth = currentMovieList.querySelector("img").getBoundingClientRect().width;
        // Her bir kaydırma işlemi için bir adet film öğesi genişliği kadar ileri kaydırır
        const moveDistance = itemWidth;
        // Film sayısını belirler
        const movieCount = currentMovieList.querySelectorAll("img").length;
        // Maksimum kaydırma mesafesini belirler
        const maxDistance = (movieCount - 4) * itemWidth;
        
        // Arrowa tıklandığında hareket ettirilecek mesafeyi hesaplar
        let newPosition = currentPosition - moveDistance;
        
        // Eğer yeni konum negatif ise, en başa sarar
        if (newPosition < -maxDistance) {
            newPosition = 0;
        }
        
        // Yeni konumu uygular
        currentMovieList.style.transform = `translateX(${Math.max(-maxDistance, newPosition)}px)`;
    });
});

const ball = document.querySelector(".toggle-ball"); // ".toggle-ball" seçici ile düzeltildi
const items = document.querySelectorAll(".container,.navbar,.sidebar,.sidebar a,sidebar a:hover.active,.toggle,.toggle-ball,.movie-list-filter select,.movie-list-title,.film-info p,.categories,.comments-section textarea,.film-info,.categories ul li a"); // Yanlış virgüller düzeltildi
ball.addEventListener("click", function(){
    items.forEach((item) => item.classList.toggle("active"));
});

// script.js


function renkDegistir(clickedIcon, likeType) {
    var upIcon = clickedIcon.parentElement.querySelector('.bi-hand-thumbs-up-fill');
    var downIcon = clickedIcon.parentElement.querySelector('.bi-hand-thumbs-down-fill');

    if (likeType === 'up') {
        upIcon.classList.toggle('liked');
        downIcon.classList.remove('disliked');
    } else if (likeType === 'down') {
        downIcon.classList.toggle('disliked');
        upIcon.classList.remove('liked');
    }
}

function redirectToProfile() {
    window.location.href = "profile.html";
}

function redirectToAccountChange() {
    window.location.href = "degis.html";
}

function redirectToRecommend() {
    window.location.href = "oneri.html";
}

function redirectToChangePassword() {
    window.location.href = "sifre.html";
}




function redirectToHelp() {
    window.location.href = "yardım.html";
}

document.addEventListener('DOMContentLoaded', function () {
    var submenu = document.getElementById("submenu");
    var languageItem = document.querySelector("#submenu li:nth-child(5)");

    languageItem.addEventListener('click', function (event) {
        event.stopPropagation(); // Alt menünün kapanmasını engeller
        var subsubmenu = document.querySelector(".sub-submenu");
        subsubmenu.classList.toggle("active");
    });

    document.addEventListener('click', function (event) {
        var submenu = document.getElementById("submenu");
        var menuIcon = document.querySelector(".profile-text");
        var targetElement = event.target;

        if (!targetElement.matches('.sub-submenu')) {
            var subsubmenu = document.querySelector(".sub-submenu");
            if (subsubmenu.classList.contains("active")) {
                subsubmenu.classList.remove("active");
            }
        }

        if (submenu.classList.contains("active") && targetElement !== submenu && targetElement !== menuIcon) {
            submenu.classList.remove("active");
        }
    });
});

function toggleMenu(event) {
    var submenu = document.getElementById("submenu");
    submenu.classList.toggle("active");

    event.stopPropagation();
}

document.getElementById('genreSelect').addEventListener('change', function() {
    var selectedGenre = this.value;
    var selectedText = this.options[this.selectedIndex].text; // Seçilen seçeneğin metnini al

    // Seçilen seçeneği en üste getirme
    var selectedOption = this.options[this.selectedIndex];
    this.removeChild(selectedOption); // Seçilen seçeneği kaldır
    this.insertBefore(selectedOption, this.firstChild); // Seçilen seçeneği en üste ekle

    // Yönlendirme
    setTimeout(function() {
        window.location.href = selectedGenre + ".html"; // Seçilen türe göre yönlendirme yap
    }, 0);

    // Seçilen seçeneğin metnini en üste getirme
    var genreTextElement = document.createElement("option");
    genreTextElement.textContent = selectedText;
    genreTextElement.value = selectedGenre;
    this.removeChild(genreTextElement); // Daha önce oluşturulan seçeneği kaldır
    this.insertBefore(genreTextElement, this.firstChild); // Seçilen metni en üste ekle
});





  function goToPage(pageUrl) {
    // Belirtilen sayfaya yönlendirme işlemi
    window.location.href = pageUrl;
}
function goToPage(page) {
    window.location.href = page;
}

// Sayfa yüklendiğinde ikon durumunu güncelle
window.onload = function() {
    updateIconState();
}

// Filmi ekleme/çıkarma ve ikonu güncelleme fonksiyonu
function toggleList(element, movieTitle, movieImg, moviePage) {
    if (!movieTitle || !movieImg || !moviePage) {
        console.error("Film verileri eksik!");
        return;
    }

    // LocalStorage'dan mevcut film listesini alın
    let movieList = JSON.parse(localStorage.getItem('movieList')) || [];

    if (movieList.some(movie => movie.title === movieTitle)) {
        // Film listede varsa çıkar
        movieList = movieList.filter(movie => movie.title !== movieTitle);
        localStorage.setItem('movieList', JSON.stringify(movieList));
        alert(`${movieTitle} listenizden çıkarıldı.`);
        
        // Simgeyi geri dönüştür
        element.classList.remove('bi-check-circle-fill');
        element.classList.add('bi-plus-circle-fill');
    } else {
        // Film listede yoksa ekle
        movieList.push({ title: movieTitle, img: movieImg, page: moviePage });
        localStorage.setItem('movieList', JSON.stringify(movieList));
        alert(`${movieTitle} listenize eklendi.`);
        
        // Simgeyi değiştir
        element.classList.remove('bi-plus-circle-fill');
        element.classList.add('bi-check-circle-fill');
    }

    // Sayfa yenilendiğinde ikon durumunu güncelle
    updateIconState();
}

// Sayfa yüklendiğinde ikon durumunu güncelleme fonksiyonu
function updateIconState() {
    let movieList = JSON.parse(localStorage.getItem('movieList')) || [];
    const icons = document.querySelectorAll('.bi-plus-circle-fill');

    icons.forEach(icon => {
        const title = icon.getAttribute('data-title');
        if (movieList.some(movie => movie.title === title)) {
            icon.classList.remove('bi-plus-circle-fill');
            icon.classList.add('bi-check-circle-fill');
        }
    });
}



function navigateTo(page) {
    window.location.href = page;
}
/* video start */
function openVideo() {
    var videoContainer = document.getElementById("video-container");
    var overlay = document.getElementById("overlay");
    videoContainer.style.display = "block";
    overlay.style.display = "block";
    document.getElementById("main-video").play();
  }

  function closeVideo() {
    var videoContainer = document.getElementById("video-container");
    var overlay = document.getElementById("overlay");
    videoContainer.style.display = "none";
    overlay.style.display = "none";
    document.getElementById("main-video").pause();
  }
  /* video end */


/* JavaScript kodlarınızı buraya yazın */

function openVideo(src) {
    var videoPlayer = document.getElementById("main-video");
    videoPlayer.src = src;
    videoPlayer.load();
    videoPlayer.play();

    var videoContainer = document.getElementById("video-container");
    var overlay = document.getElementById("overlay");
    videoContainer.style.display = "block";
    overlay.style.display = "block";
}

function changeVideo(src) {
    var videoPlayer = document.getElementById("video-player");
    videoPlayer.src = src;
    videoPlayer.load();
    videoPlayer.play();
}

function closeVideo() {
    var videoContainer = document.getElementById("video-container");
    var overlay = document.getElementById("overlay");
    videoContainer.style.display = "none";
    overlay.style.display = "none";
    document.getElementById("main-video").pause();
}











        
    




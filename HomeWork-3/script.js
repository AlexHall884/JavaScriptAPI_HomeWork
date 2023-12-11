function getRandomPhoto() {
    fetch('https://api.unsplash.com/photos/random?client_id=Vf97XxaXJL3ge-soNBYn51oCQJvYLCEzjmoiJ_Tw5JI')
        .then(response => response.json())
        .then(data => {
            const photo = document.getElementById('photo');
            const photographer = document.getElementById('photographer');

            photo.src = data.urls.regular;
            photographer.innerText = `Автор: ${data.user.name}`;

            // Сохранение в локальное хранилище
            saveHistory(data);
        })
        .catch(error => console.log(error));
}

// Обновление счетчика лайков
function updateLikeCount() {
    const likeCount = document.getElementById('likeCount');
    const currentCount = parseInt(likeCount.innerText);

    likeCount.innerText = currentCount + 1;

    // Сохранение в локальное хранилище
    localStorage.setItem('likeCount', likeCount.innerText);
}

// Загрузка истории просмотров из локального хранилища
function loadHistory() {
    const history = localStorage.getItem('history');

    if (history) {
        return JSON.parse(history);
    }

    return [];
}

// Сохранение истории просмотров в локальное хранилище
function saveHistory(photo) {
    const history = loadHistory();

    history.push(photo);

    localStorage.setItem('history', JSON.stringify(history));
}

// Отображение истории просмотров
function displayHistory() {
    const history = loadHistory();

    const historyContainer = document.getElementById('historyContainer');

    // Очистка контейнера
    while (historyContainer.firstChild) {
        historyContainer.removeChild(historyContainer.firstChild);
    }

    // Добавление фото в контейнер
    history.forEach(photo => {
        const img = document.createElement('img');
        img.classList = 'history-img';
        img.src = photo.urls.thumb;

        historyContainer.appendChild(img);
    });
}

// Обработчик кнопки "лайк"
document.getElementById('likeButton').addEventListener('click', () => {
    updateLikeCount();
});

// Загрузка случайного изображения и истории при загрузке страницы
window.addEventListener('load', () => {
    getRandomPhoto();
    displayHistory();

    // Загрузка счетчика лайков из локального хранилища
    const likeCount = localStorage.getItem('likeCount');

    if (likeCount) {
        document.getElementById('likeCount').innerText = likeCount;
    }
});
async function fetchData() {
    try {
        const response = await fetch("timetable.json");
        // console.log(response);
        if (!response.ok) {
            throw new Error("Не удалось получить данные с data JSON");
        }
        const data = await response.json();
        const table = document.querySelector('.scheduleTable');
        data.forEach(({ name, time, maxParticipants, currentParticipants }) => {
            const tableElement = `
                <div class="lesson">
                    <h3 class="lesson-name">Занятие: ${name}</h3>
                    <p class="lesson-time">Время: ${time}</p>
                    <p class="lesson-maxParticipants">Максимальное кол-во участников: ${maxParticipants}</p>
                    <p class="lesson-currentParticipants">Текущее кол-во участников: ${currentParticipants}</p>
                    <button class="addButton">Записаться</button>
                    <button class="cancelButton">Отменить запись</button>
                </div>
            `
            table.insertAdjacentHTML("beforeend", tableElement);
        });

        const cancelButtons = document.querySelectorAll('.cancelButton');
        const addButtons = document.querySelectorAll('.addButton');

        addButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                if (data[index].currentParticipants < data[index].maxParticipants) {
                    data[index].currentParticipants++;
                    updateParticipants(table, index, data[index].currentParticipants);
                    saveDataToLocalStorage(data);
                    cancelButtons[index].style.display = 'block'; // Показываем кнопку "Отменить запись"

                } else {
                    button.disabled = true; // Делаем кнопку "Записаться" неактивной
                }
            });
        });

        cancelButtons.forEach((button, index) => {
            button.style.display = 'none'; // Сначала скрываем кнопку "Отменить запись"
            button.addEventListener('click', () => {
                if (data[index].currentParticipants > 0) {
                    data[index].currentParticipants--;
                    updateParticipants(table, index, data[index].currentParticipants);
                    saveDataToLocalStorage(data);
                } else {
                    button.disabled = true; // Делаем кнопку "Записаться" неактивной
                }
            });
        });

        function updateParticipants(table, index, count) {
            const lesson = table.querySelectorAll('.lesson')[index];
            const participantsElem = lesson.querySelector('.lesson-currentParticipants');
            participantsElem.textContent = `Текущее кол-во участников: ${count}`;
        }

        function saveDataToLocalStorage(data) {
            localStorage.setItem('timetableData', JSON.stringify(data));
        }

    } catch (error) {
        console.error(error);
    }
}

fetchData();

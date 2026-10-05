const trackButton = document.getElementById('trackButton');
const trackResult = document.getElementById('trackResult');
const trackNumber = document.getElementById('trackNumber');
const trackIdValue = document.getElementById('trackIdValue');
const trackFromValue = document.getElementById('trackFromValue');
const trackToValue = document.getElementById('trackToValue');
const trackStatusList = document.getElementById('trackStatusList');

function renderStatuses(statuses) {
    trackStatusList.innerHTML = '';

    statuses.forEach((status) => {
        const item = document.createElement('div');
        item.className = 'track-status-item';

        const icon = document.createElement('img');
        icon.className = 'track-status-icon';
        icon.src = `./images/icons/${status.type}.svg`;

        const text = document.createElement('div');
        text.className = 'track-status-text';

        const state = document.createElement('div');
        state.className = 'track-status-name';
        state.textContent = status.label;

        const date = document.createElement('div');
        date.className = 'track-status-date';
        date.textContent = status.date;

        text.append(state, date);
        item.append(icon, text);
        trackStatusList.appendChild(item);
    });
}

trackButton.addEventListener('click', () => {
    if (!trackNumber.value || trackNumber.value === '') {
        alert('Заполните номер отправления');
        return;
    }

    if (Number(trackNumber.value) < 1000 || Number(trackNumber.value) > 10000) {
        alert('К сожалению, мы не смогли найти отправление по данному номеру');
        trackResult.classList.toggle('is-visible', false);
        return;
    }

    const response = {
        id: trackNumber.value,
        route: {
            from: 'Москва, улица Арбат, 1',
            to: 'Минск, проспект Независимости, 10'
        },
        statuses: [
            { type: 'created', label: 'Создана', date: '12.05.2026 10:00' },
            { type: 'in-way', label: 'В пути', date: '12.05.2026 14:30' },
            { type: 'in-way', label: 'В пути', date: '12.05.2026 18:00' },
            { type: 'in-way', label: 'В пути', date: '13.05.2026 08:00' },
            { type: 'ready', label: 'Готова к выдаче', date: '13.05.2026 09:15' },
            { type: 'done', label: 'Доставлена', date: '13.05.2026 16:00' }
        ]
    };

    trackResult.classList.toggle('is-visible', true);

    trackIdValue.textContent = `№${response.id}`;
    trackFromValue.textContent = `Откуда: ${response.route.from}`;
    trackToValue.textContent = `Куда: ${response.route.to}`;

    renderStatuses(response.statuses);
});
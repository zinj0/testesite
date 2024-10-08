// Seleciona o container dos quadrados e as popups
const container = document.querySelector('.container');
const popup = document.getElementById('popup');
const popupImage = document.getElementById('popup-image');
let isDown = false;
let startX;
let scrollLeft;
let lastClicked = null;
let clickCount = 0;
let velocity = 0;
let lastMouseX = 0;
let momentumRafId;

// Função para iniciar o movimento ao pressionar o botão do mouse
container.addEventListener('mousedown', (e) => {
    isDown = true;
    container.classList.add('active');
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    lastMouseX = e.pageX;
    cancelAnimationFrame(momentumRafId);
});

// Função para terminar o movimento ao soltar o botão do mouse
container.addEventListener('mouseup', () => {
    if (isDown) {
        isDown = false;
        container.classList.remove('active');
        applyMomentum();
    }
});

// Função para capturar o movimento do mouse
container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 0.4;
    container.scrollLeft = scrollLeft - walk;
    velocity = e.pageX - lastMouseX;
    lastMouseX = e.pageX;
});

// Função para lidar com a rolagem inercial
function applyMomentum() {
    if (Math.abs(velocity) > 0.5) {
        container.scrollLeft -= velocity;
        velocity *= 0.95;
        momentumRafId = requestAnimationFrame(applyMomentum);
    } else {
        velocity = 0;
    }
}

// Evento de clique nos quadrados para abrir a popup
container.querySelectorAll('.square').forEach(square => {
    square.addEventListener('click', () => {
        const backgroundImage = square.style.backgroundImage;
        const imageUrl = backgroundImage.slice(5, -2); // Remove o 'url()'
        popupImage.src = imageUrl;
        popup.style.display = 'flex'; // Exibe a popup
    });
});

// Evento de clique na popup para fechá-la
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});

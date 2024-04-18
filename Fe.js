import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Создание сцены
var scene = new THREE.Scene();

// Создание камеры
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0.3;
camera.lookAt(0, -0.1, 1);

// Создание рендерера
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Создание загрузчика
var loader = new GLTFLoader();

// Добавление контроллера камеры для управления при помощи мыши
var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Включение инерции

// Подключение обработчика события загрузки окна
// Загрузка модели
loader.load(
    // Путь к файлу модели
    'models/Fe.glb',

    // Функция, которая вызывается при завершении загрузки
    function (gltf) {
        // Получение сцены из загруженной модели
        var model = gltf.scene;

        // Добавление модели на сцену
        scene.add(model);

        // Добавление освещения
        var light = new THREE.PointLight(0xffffff, 5, 100);
        light.position.set(0, 0, 10);
        scene.add(light);

        var light2 = new THREE.PointLight(0xffffff, 5, 100);
        light2.position.set(10, 10, -10);
        scene.add(light2);

        // Функция анимации
        

        // Запуск анимации
        
    },

    // Функция, вызываемая во время загрузки
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% загружено');
    },

    // Функция, вызываемая в случае ошибки
    function (error) {
        console.error('Произошла ошибка загрузки', error);
    }
);

function animate() {
    requestAnimationFrame(animate);

    // Вращение модели по горизонтали
    scene.traverse(function(object) {
        if (object.isMesh) {
            object.rotation.z += 0.01;
        }
    });

    // Рендеринг сцены
    renderer.render(scene, camera);
}

var listener = new THREE.AudioListener();
camera.add(listener); // Подключение AudioListener к камере для привязки к позиции камеры

var sound = new THREE.Audio(listener);

var audioLoader = new THREE.AudioLoader();

// Добавьте обработчик события, который будет запускать воспроизведение звука после щелчка пользователя





document.getElementById('myButton').addEventListener('click', function() {
    audioLoader.load('/audio/Fe.mp3', function(buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true); // Установка зацикленного воспроизведения
        sound.setVolume(0.5); // Установка громкости (от 0 до 1)
        sound.play(); // Начать воспроизведение
    });

    // Начать анимацию только после загрузки аудио
    animate();

    this.remove();
});



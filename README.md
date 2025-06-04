# Write Down - Приложение для заметок

Веб-приложение для создания и управления заметками с системой аутентификации пользователей и административной панелью.

## 🚀 Технологии

### Backend
- **Node.js** с **TypeScript**
- **Express.js** - веб-фреймворк
- **PostgreSQL** - база данных
- **Sequelize** - ORM для работы с базой данных
- **JWT** - аутентификация пользователей
- **bcrypt** - хеширование паролей

### Frontend
- **React** с **TypeScript**
- **MobX** - управление состоянием
- **Material-UI** - компоненты интерфейса
- **React Router** - маршрутизация
- **Axios** - HTTP-клиент
- **Parcel** - сборщик проекта

### DevOps
- **Docker** - контейнеризация
- **nginx** - веб-сервер

## 📁 Структура проекта

```
write-down/
├── client/                 # Frontend приложение
│   ├── src/
│   │   ├── components/     # React компоненты
│   │   ├── pages/         # Страницы приложения
│   │   ├── stores/        # MobX сторы
│   │   └── utils/         # Утилиты
│   └── package.json
├── server/                # Backend приложение
│   ├── src/
│   │   ├── controllers/   # Контроллеры
│   │   ├── db/           # Модели базы данных
│   │   ├── middlewares/  # Промежуточное ПО
│   │   ├── routers/      # Маршруты API
│   │   ├── scripts/      # Скрипты
│   │   └── utils/        # Утилиты
│   └── package.json
├── postgres_data/         # Данные PostgreSQL
├── Dockerfile            # Docker конфигурация
├── nginx.conf           # Конфигурация nginx
└── README.md
```

## ⚡ Быстрый старт

### Предварительные требования

- Node.js (версия 18 или выше)
- PostgreSQL
- npm или yarn

### Установка и запуск

#### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd write-down
```

#### 2. Настройка переменных окружения

Создайте файл `.env` в директории `server/`:

```env
# База данных
DB_HOST=localhost
DB_PORT=5432
DB_NAME=writedown
DB_USER=your_username
DB_PASSWORD=your_password

# JWT секреты
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Порт сервера
PORT=3002
```

#### 3. Установка зависимостей

```bash
# Установка зависимостей сервера
cd server
npm install

# Установка зависимостей клиента
cd ../client
npm install
```

#### 4. Запуск приложения

```bash
# Запуск сервера (из директории server/)
npm start

# Запуск клиента (из директории client/)
npm start
```

Приложение будет доступно по адресу:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3002

## 🐳 Запуск с Docker

### Сборка и запуск контейнера

```bash
# Сборка Docker образа
docker build -t write-down .

# Запуск контейнера
docker run -p 3000:3000 -p 3002:3002 write-down
```

## 🔧 API Endpoints

### Аутентификация
- `POST /api/user/sign-up` - Регистрация пользователя
- `POST /api/user/sign-in` - Вход в систему
- `POST /api/user/sign-out` - Выход из системы
- `POST /api/user/auth` - Обновление токена доступа

### Заметки
- `GET /api/note/get` - Получение всех заметок пользователя
- `POST /api/note/create` - Создание новой заметки
- `PUT /api/note/change` - Изменение заметки
- `DELETE /api/note/delete` - Удаление заметки

Следуйте инструкциям в консоли для ввода email пользователя.

## 🎨 Функциональность

- ✅ Регистрация и аутентификация
- ✅ Создание, редактирование и удаление заметок
- ✅ Изменение цвета заметок
- ✅ Закрепление важных заметок
- ✅ Адаптивный интерфейс

## 🔒 Безопасность

- JWT токены для аутентификации
- HTTP-only куки для хранения токенов
- Хеширование паролей с bcrypt
- Валидация данных на клиенте и сервере
- Middleware для проверки прав доступа

## 🛠️ Разработка

### Структура команд

```bash
# Сервер
cd server
npm start          # Запуск в режиме разработки

# Клиент
cd client
npm start          # Запуск в режиме разработки
npm run build      # Сборка для продакшена
```

### Архитектура

Приложение построено по архитектуре клиент-сервер:

- **Backend**: RESTful API с использованием Express.js
- **Frontend**: SPA на React с MobX для управления состоянием
- **База данных**: PostgreSQL с ORM Sequelize
- **Аутентификация**: JWT токены с автоматическим обновлением

## 📝 Лицензия

Этот проект создан в образовательных целях.

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/AmazingFeature`)
3. Зафиксируйте изменения (`git commit -m 'Add some AmazingFeature'`)
4. Отправьте в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📞 Поддержка

Если у вас возникли вопросы или проблемы, создайте issue в репозитории.

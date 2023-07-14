# Пожликбез

Пожликбез - это проект, предназначенный для пожарных охранников и владельцев зданий. Он
предоставляет различные пожарные калькуляторы и инструменты для оценки пожароопасности и обеспечения
соблюдения пожарной безопасности на объекте.

## Требования

- Node.js 18 или выше
- PNPM 8 или выше

## Запуск

1. Необходимо запросить доступ к базе данных Supabase
2. Вставить полученную ссылку для подключения в .env.local

```dotenv
SUPABASE_DATABASE_URL=postgresql://user:password@host:5432/database
```

3. Выполнить команду `pnpm i`

## Структура проекта

Проект основан на архитектурной методологии [Feature Sliced Design](https://feature-sliced.design/).

## Используемые библиотеки

### Интерфейс

- [shadcn/ui](https://ui.shadcn.com/)

### Управление состоянием

- [effector](https://effector.dev/)
- [patronum](https://patronum.effector.dev/)
- [reflect](https://reflect.effector.dev/)

### Роутинг

- [atomic-router](https://atomic-router.github.io/)

### Аутентификация

- [logto-js](https://docs.logto.io/docs/recipes/integrate-logto/vanilla-js/)

### Работа с API

- [supabase-js](https://supabase.com/docs/reference/javascript/introduction)

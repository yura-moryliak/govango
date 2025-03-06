# GoVanGo

В проєкті йде розділення на мікросервіси і
використання контейнерів Docker буде розділено для кожного сервера свій:

### Dotnet

1. Запуск MYSQL for Dotnet
```bash
docker-compose -f docker-compose.dotnet.yml up -d
```

2. Стоп MYSQL for Dotnet
```bash
docker-compose -f docker-compose.dotnet.yml down
```

### NestJS

1. Запуск MYSQL for NestJS
```bash
docker-compose -f docker-compose.nestjs.yml up -d
```

2. Стоп MYSQL for Dotnet
```bash
docker-compose -f docker-compose.nestjs.yml down
```
# PurchasePlanner - Aplikacja do planowania zakupów
Autorzy: Sławomir Mendyka, Marcin Michalak, Wojciech Michalak

PurchasePlanner to aplikacja internetowa do tworzenia i zarządzania listami zakupów. Aplikacja pozwala na tworzenie list, dodawanie do nich produktów, a także podsumowywanie wydatków w danym miesiącu.

## Wymagania

- Node.js (wersja 16 lub wyższa)
- Yarn
- PostgreSQL

## Instalacja

### Klonowanie repozytorium

Najpierw sklonuj repozytorium na swoje urządzenie za pomocą polecenia git:
```
git clone https://github.com/slawomirdev/PurchasePlanner.git
```

### Instalacja zależności dla serwera

Przejdź do folderu Server w klonowanym repozytorium i zainstaluj zależności za pomocą Yarn:
```
cd Server
yarn install
```

### Instalacja zależności dla klienta

Podobnie, przejdź do folderu Frontend i zainstaluj zależności:
```
cd ../Frontend
yarn install
```

### Utworzenie bazy danych

Utwórz bazę danych o nazwie purchase za pomocą polecenia:
```
createdb purchase
```

### Utworzenie tabel w bazie danych

Poniższe zapytania SQL utworzą potrzebne tabele. Wykonaj te zapytania w swoim interfejsie PostgreSQL. Znajdziesz te zapytania też w folderze Server pliku **data.sql**.
```
CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  hashed_password VARCHAR(255)
);

CREATE TABLE shopping_lists (
  id SERIAL PRIMARY KEY,
  user_email VARCHAR(255) REFERENCES users(email),
  name VARCHAR(255) NOT NULL,
  date_created DATE NOT NULL
);

CREATE TABLE list_items (
  id SERIAL PRIMARY KEY,
  list_id INTEGER REFERENCES shopping_lists(id),
  item_name VARCHAR(255) NOT NULL,
  item_price DECIMAL(10, 2) NOT NULL,
  date_added DATE NOT NULL
);
```

## Uruchomienie

### Uruchomienie serwera

Przejdź do folderu Server i uruchom serwer za pomocą Yarn:
```
cd ../Server
yarn run start
```
Serwer powinien zacząć działać na porcie 8000.

### Uruchomienie klienta

Przejdź do folderu Frontend i uruchom klienta:
```
cd ../Frontend
yarn dev
```
Klient powinien zacząć działać na porcie 5173.

## Wykorzystanie

Po zainstalowaniu i uruchomieniu, aplikacja powinna być dostępna w przeglądarce pod adresem **http://localhost:5173**.

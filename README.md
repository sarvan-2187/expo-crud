# Expo CRUD

A small CRUD app built with Expo Router and TypeScript. It lets you create, read, update, and delete items from a clean single-screen interface.

## Features

- Create items with a title and notes.
- View all items in a responsive Expo screen.
- Edit an existing item in place.
- Delete items from the list.
- Uses typed item models and path aliases.

## Tech Stack

- Expo
- Expo Router
- React Native
- TypeScript

## Project Structure

```text
app/
  _layout.tsx      Navigation stack configuration
  index.tsx        CRUD screen
src/
  data/            Starter data
  types/           Shared TypeScript types
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npm start
```

Then open the app with Expo Go, an emulator, or the web runner:

```bash
npm run android
npm run ios
npm run web
```

## Available Scripts

- `npm start`: starts Expo.
- `npm run android`: starts Expo and opens Android.
- `npm run ios`: starts Expo and opens iOS.
- `npm run web`: starts Expo for web.
- `npm run typecheck`: runs TypeScript without emitting files.
- `npm run lint`: runs Expo linting.

## Notes

The app currently stores items in component state so the CRUD flow stays simple and easy to inspect. A practical next step would be adding persistence with `expo-sqlite` or a remote API.

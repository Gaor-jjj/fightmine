# Mobile game "Fightmine"

A React Native application built with Expo, NativeWind, and Appwrite created as part of a programming course assignment. The game takes a alot of insipration from other clicker genre games such as [Cookie Clicker](https://orteil.dashnet.org/cookieclicker/) and [AdVenture Capitalist](https://store.steampowered.com/app/346900/AdVenture_Capitalist/) and is intended to be a simplified version of those games. Development was done in a two person team and the app currently supports (mostly) working authentication, gold generation, achievements and combat system.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Status](#project-status)

## Features

- **User Authentication:** Login and registration functionality with secure authentication.
- **Gold Generation:** Generate gold by pressing the giant gold coin or generate passive income by purchasing buildings.
- **Achievements:** Score achievement points by accumulating certain amounts of gold.
- **Fight Monsters:** Fight different enemies by tapping on them.
- **Multiplatform:** Built with React Native it should support both Android and iOS platforms.

## Tech Stack

- **Frontend:**
  - [React Native](https://reactnative.dev/) (with [Expo](https://expo.dev))
  - [NativeWind](https://www.nativewind.dev/) for styling
  - **JavaScript** for all application logic
- **Backend:**
  - [Appwrite](https://appwrite.io/) for authentication, database, and storage

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Gaor-jjj/fightmine
   cd fightmine
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Appwrite (optional):

   - If you want to set up your own Appwrite backend follow the [Appwrite setup guide](https://appwrite.io/docs/tutorials/react-native/step-3) to configure authentication, storage, and database connections.

4. Run the app:

   ```bash
   npx expo start -c
   ```

## Project Status
This app is currently not in active development but might be picked up in the future. Current working systems need to fleshed out more and some systems aren't working such as the profile and shop systems.

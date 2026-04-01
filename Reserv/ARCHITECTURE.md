# RESRV — Architecture Document

## Overview

RESRV is a mobile meeting-room reservation application built with React Native (Expo). It runs on Android and iOS and allows users to browse available rooms, make reservations, view their bookings, and cancel them. All data is stored locally on the device using AsyncStorage — there is no backend server or remote API.

---

## Technology Stack

| Layer         | Technology                             | Version |
| ------------- | -------------------------------------- | ------- |
| Framework     | React Native (Expo)                    | ~48.0.0 |
| Language      | TypeScript                             | ^4.9.4  |
| Navigation    | React Navigation (Native Stack)        | ^6.x    |
| UI Components | React Native Paper (Material Design)   | ^5.8.0  |
| Local Storage | AsyncStorage                           | 1.17.11 |
| Date Picker   | @react-native-community/datetimepicker | 6.7.3   |

---

## Project Structure

```
RESRV-main/
├── App.tsx                     # Root component — navigation stack + theme provider
├── package.json
├── tsconfig.json
├── ARCHITECTURE.md             # This file
├── README.md
└── src/
    └── screens/
        ├── HomeScreen.tsx          # Entry hub with navigation buttons
        ├── RoomListScreen.tsx      # Room browser with date & capacity filters
        ├── ReservationScreen.tsx   # Booking form — saves to AsyncStorage
        ├── CancellationScreen.tsx  # Cancel by reference number (UI stub)
        └── MyReservationsScreen.tsx # Lists and cancels saved reservations
```

---

## Application Entry Point

**`App.tsx`** is the root of the application. It wraps the entire app in:

- `PaperProvider` — supplies the Material Design theme to all components.
- `NavigationContainer` — provides the navigation context.
- `Stack.Navigator` — a native stack navigator that manages the five screens.

---

## Navigation Flow

```
HomeScreen
├── "Book a Room"         → RoomListScreen
│                               └── (select room) → ReservationScreen → HomeScreen
├── "My Reservations"     → MyReservationsScreen
└── "Cancel Reservation"  → CancellationScreen → HomeScreen
```

All navigation is handled by React Navigation's `NativeStackNavigator`. Parameters (room ID, selected date) are passed between screens via `navigation.navigate('ScreenName', { params })`.

---

## Screens

### HomeScreen

The main entry point of the app. Displays three buttons that navigate to the three primary flows: booking a room, viewing existing reservations, and cancelling a reservation.

### RoomListScreen

Displays a filterable list of available rooms. The user selects a date using a native date picker and enters a minimum capacity requirement. Rooms are filtered client-side from a hardcoded in-memory array:

```
Room A — capacity 20
Room B — capacity 50
Room C — capacity 100
```

Selecting a room navigates to `ReservationScreen`, passing the `roomId` and selected `date` as route parameters.

### ReservationScreen

Presents a form for the user to enter their name and email address. On submission:

1. A reference number is generated (last 6 digits of `Date.now()` + 3 random digits).
2. Existing reservations are read from `AsyncStorage`.
3. The new reservation object is appended and the full array is written back.
4. A success snackbar shows the reference number, then navigates home after 3 seconds.

### MyReservationsScreen

Reads all reservations from `AsyncStorage` on mount and displays each as a card showing room, name, date, and reference number. Each card has a "Cancel Reservation" button that removes that entry from `AsyncStorage` and updates local state immediately.

### CancellationScreen

Accepts a reference number typed by the user. In the current implementation this screen is a UI stub — it displays a success message without looking up or removing the corresponding reservation from `AsyncStorage`. Actual cancellation by reference number is only performed through `MyReservationsScreen`.

---

## Data Model

Reservations are stored in `AsyncStorage` under the key `"reservations"` as a JSON-serialised array.

### Reservation object

```typescript
type Reservation = {
  id: string;
  name: string;
  email: string;
  roomId: number;
  date: string;
  referenceNumber: string;
};
```

### Room object (hardcoded)

```typescript
type Room = {
  id: number;
  name: string;
  capacity: number;
};
```

---

## Data Flow

```
RoomListScreen   ──(roomId, date)──►  ReservationScreen
                                            │
                                     AsyncStorage.setItem("reservations", [...])
                                            │
MyReservationsScreen  ◄──────────  AsyncStorage.getItem("reservations")
        │
        └──(cancel)──►  AsyncStorage.setItem("reservations", filtered[...])
```

There is no network layer, no authentication, and no shared state management library. Each screen reads from and writes to `AsyncStorage` independently.

---

## Key Design Decisions

| Decision                             | Rationale                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------ |
| AsyncStorage for persistence         | No backend required; data persists across app restarts on the local device     |
| Hardcoded room list                  | Simplifies the scope; no room management or availability conflict detection    |
| Reference number generation          | Timestamp + random suffix provides a unique-enough ID for a local-only app     |
| No global state (e.g. Redux/Context) | App is small enough that prop passing and direct AsyncStorage reads suffice    |
| React Native Paper                   | Provides consistent Material Design components without custom styling overhead |

---

## Known Limitations

- **No conflict detection**: two reservations can be made for the same room on the same date.
- **CancellationScreen is a stub**: entering a reference number on that screen does not remove the reservation from storage.
- **No user accounts**: reservations from all "users" share the same AsyncStorage key on one device.
- **Room data is not dynamic**: rooms and their capacities are hard-coded in `RoomListScreen.tsx`.
- **No input validation**: email format and name length are not validated beyond a non-empty check.

# RESRV — Meeting Room Reservation App

A mobile application built with React Native and Expo that allows users to browse, book, and manage meeting room reservations.

---

## Team Details

1- 230513576 Muhammad Mani Murtala. ,muhammadmanii
2- 210513647Munther Iskender. ,munthermohammed064-pixel  
3- 200513618 Christ Guy Donald Dushime. 4DCGD
4- 230513697 Fahad Muhammed, mohfahadd890-sys

## Features

- Browse available meeting rooms filtered by date and capacity
- Make a room reservation with your name and email
- View all your existing reservations
- Cancel a reservation directly from your reservations list

---

## Tech Stack

- **React Native** with **Expo** (~48.0.0)
- **TypeScript**
- **React Navigation** — screen navigation
- **React Native Paper** — UI components (Material Design)
- **AsyncStorage** — local data persistence

---

## Getting Started

### Prerequisites

- Node.js installed
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone, or an Android/iOS emulator

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd RESRV-main

# Install dependencies
npm install

# Start the app
npm start
```

Then scan the QR code with the Expo Go app, or press `a` for Android / `i` for iOS emulator.

---

## Project Structure

```
RESRV-main/
├── App.tsx                        # Root component — navigation and theme setup
├── src/
│   └── screens/
│       ├── HomeScreen.tsx         # Main menu
│       ├── RoomListScreen.tsx     # Browse and filter rooms
│       ├── ReservationScreen.tsx  # Complete a booking
│       ├── CancellationScreen.tsx # Cancel by reference number
│       └── MyReservationsScreen.tsx # View and manage your bookings
├── ARCHITECTURE.md
└── README.md
```

---

## How to Use

1. **Book a Room** — Select a date, set a minimum capacity, then tap a room to proceed to the booking form. Enter your name and email to confirm. A reference number will be generated for your reservation.

2. **My Reservations** — View all your saved reservations. You can cancel any booking directly from this screen.

3. **Cancel Reservation** — Enter a reference number to cancel a booking.

---

## Notes

- All data is stored locally on the device using AsyncStorage — no internet connection is required.
- Room availability conflict detection is not implemented; the same room can be booked multiple times for the same date.

## Architecture Link

[View Architecture Documentation](./ARCHITECTURE.md)

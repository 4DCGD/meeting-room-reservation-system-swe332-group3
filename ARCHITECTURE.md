# Software Architecture Document (SAD) - RESRV

## 1. Scope
[cite_start]This document outlines the software architecture for the RESRV mobile application using the 4+1 View Model. [cite: 3]

## 3. Software Architecture
| Layer | Technology |
| :--- | :--- |
| **Framework** | React Native (Expo) |
| **Language** | TypeScript |
| **Persistence** | AsyncStorage |

## 5. Logical Architecture
Focuses on functional requirements. The system is component-based, where each screen (Home, RoomList, Reservation) manages its own logic and interacts directly with local storage.

## 6. Process Architecture
Describes system runtime behavior:
- **Navigation**: Controlled by React Navigation (Native Stack).
- **Data Flow**: Parameters are passed between screens; reservations are serialized to JSON and saved to AsyncStorage.

## 7. Development Architecture
The codebase is structured for maintainability:
- `/src/screens/`: Functional UI components.
- `App.tsx`: Central hub for navigation and theme providers.

## 8. Physical Architecture
- **Platform**: Distributed as a native app for iOS and Android.
- **Hardware**: Runs entirely on the user's mobile device with local-only storage.

## 9. Scenarios (+1)
- **Scenario 1**: User filters rooms by capacity and date, then completes a booking.
- **Scenario 2**: User views existing reservations and performs a local deletion (cancellation).

## 10. Size and Performance
The app is optimized for low memory usage (<50MB) and fast local data operations (<100ms).

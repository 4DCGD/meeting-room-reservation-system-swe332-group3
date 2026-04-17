# RESRV — Architecture Document

## Title Page

RESRV Mobile Meeting Room Reservation Application
Architecture Documentation

---

## Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Current Date] | [Author] | Initial Architecture Document |

---

## Table of Contents

1. [Scope](#1-scope)
2. [References](#2-references)
3. [Software Architecture](#3-software-architecture)
4. [Architectural Goals & Constraints](#4-architectural-goals--constraints)
5. [Logical Architecture](#5-logical-architecture)
6. [Process Architecture](#6-process-architecture)
7. [Development Architecture](#7-development-architecture)
8. [Physical Architecture](#8-physical-architecture)
9. [Scenarios](#9-scenarios)
10. [Size and Performance](#10-size-and-performance)
11. [Quality](#11-quality)

---

## List of Figures

[Figures will be listed here as they are added]

---

## 1. Scope

### 1.1 System Overview
RESRV is a mobile application for booking meeting rooms,developed using React Native (Expo). It operates on both Androids and IOS platforms,enabling users to explore available rooms,create reservations,check their existing bookings,and cancel them when needed.All information is stored directly on the device using AsyncStorage,meaning the app does not rely on any backend server or external API

### 1.2 System Boundaries
- **In Scope**: Mobile client application, local data persistence, room reservation functionality
- **Out of Scope**: Backend services, user authentication, real-time synchronization, external integrations

---

## 2. References

This architecture document is based on the following references:

1. Kruchten, Philippe. "The 4+1 View Model of Architecture." IEEE Software, 1995.
2. React Native Documentation. https://reactnative.dev/docs/getting-started
3. Expo Documentation. https://docs.expo.dev/
4. React Navigation Documentation. https://reactnavigation.org/docs/getting-started
5. React Native Paper Documentation. https://callstack.github.io/react-native-paper/
6. AsyncStorage Documentation (@react-native-async-storage/async-storage).
   https://react-native-async-storage.github.io/async-storage/docs/usage/
7. TypeScript Handbook. https://www.typescriptlang.org/docs/
8. Google Material Design Guidelines. https://m3.material.io/

---

## 3. Software Architecture

### 3.1 Technology Stack

| Layer         | Technology                             | Version |
| ------------- | -------------------------------------- | ------- |
| Framework     | React Native (Expo)                    | ~48.0.0 |
| Language      | TypeScript                             | ^4.9.4  |
| Navigation    | React Navigation (Native Stack)        | ^6.x    |
| UI Components | React Native Paper (Material Design)   | ^5.8.0  |
| Local Storage | AsyncStorage                           | 1.17.11 |
| Date Picker   | @react-native-community/datetimepicker | 6.7.3   |

### 3.2 Architectural Pattern
The application follows a **component-based architecture** with **local storage persistence**. Each screen operates independently with direct access to AsyncStorage for data persistence.

---

## 4. Architectural Goals & Constraints

### 4.1 Goals
- **Simplicity**: Minimal dependencies and straightforward implementation
- **Offline Capability**: Full functionality without network connectivity
- **Cross-Platform**: Single codebase for iOS and Android
- **Performance**: Fast response times with local data storage

### 4.2 Constraints
- **No Backend**: All data must be stored locally
- **No User Authentication**: Single-user per device model
- **Static Room Data**: Room configurations are hardcoded
- **Limited Conflict Detection**: No real-time availability checking

---

## 5. Logical Architecture

### 5.1 Component Structure

```
App Layer
├── Navigation Container
├── Theme Provider (Material Design)
└── Stack Navigator
    ├── HomeScreen
    ├── RoomListScreen
    ├── ReservationScreen
    ├── MyReservationsScreen
    └── CancellationScreen
```

### 5.2 Data Model

#### Reservation Object
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

#### Room Object (Hardcoded)
```typescript
type Room = {
  id: number;
  name: string;
  capacity: number;
};
```

### 5.3 Data Flow
```
RoomListScreen   ──(roomId, date)──►  ReservationScreen
                                            │
                                     AsyncStorage.setItem("reservations", [...])
                                            │
MyReservationsScreen  ◄──────────  AsyncStorage.getItem("reservations")
        │
        └──(cancel)──►  AsyncStorage.setItem("reservations", filtered[...])
```

---

## 6. Process Architecture

### 6.1 Navigation Flow
```
HomeScreen
├── "Book a Room"         → RoomListScreen
│                               └── (select room) → ReservationScreen → HomeScreen
├── "My Reservations"     → MyReservationsScreen
└── "Cancel Reservation"  → CancellationScreen → HomeScreen
```

### 6.2 Screen Processes

#### HomeScreen Process
- Display navigation buttons
- Handle navigation to primary flows

#### RoomListScreen Process
- Load room data from hardcoded array
- Apply date and capacity filters
- Handle room selection

#### ReservationScreen Process
- Generate reference number
- Validate user input
- Save reservation to AsyncStorage
- Display confirmation

#### MyReservationsScreen Process
- Load reservations from AsyncStorage
- Display reservation cards
- Handle cancellation requests

#### CancellationScreen Process
- Accept reference number input
- [Currently stubbed - no actual cancellation logic]

---

## 7. Development Architecture

### 7.1 Project Structure
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

### 7.2 Development Environment
- **Platform**: React Native Expo
- **Language**: TypeScript
- **Build Tools**: Expo CLI
- **Testing**: [To be defined]

---

## 8. Physical Architecture

### 8.1 Deployment Architecture
The application is deployed as:
- **iOS**: Native iOS app via App Store
- **Android**: Android app via Google Play Store

### 8.2 Data Storage
- **Location**: Device local storage
- **Technology**: AsyncStorage
- **Format**: JSON serialization
- **Key**: "reservations"

---

## 9. Scenarios

### 9.1 User Scenarios

#### Scenario 1: Book a Room
1. User opens app and sees HomeScreen
2. User taps "Book a Room"
3. User selects date and capacity filters
4. User chooses available room
5. User enters name and email
6. System generates reference number
7. Reservation is saved locally
8. User sees confirmation message

#### Scenario 2: View Reservations
1. User opens app and taps "My Reservations"
2. System loads all reservations from AsyncStorage
3. User sees list of their reservations
4. User can cancel any reservation

#### Scenario 3: Cancel Reservation
1. User navigates to MyReservationsScreen
2. User finds reservation to cancel
3. User taps "Cancel Reservation"
4. System removes reservation from AsyncStorage
5. List updates immediately

---

## 10. Size and Performance

### 10.1 Application Size
- **Estimated APK Size**: ~15-20 MB
- **Estimated iOS Build Size**: ~25-30 MB

### 10.2 Performance Characteristics
- **Startup Time**: < 2 seconds
- **Screen Navigation**: < 500ms
- **Data Operations**: < 100ms (local AsyncStorage)
- **Memory Usage**: < 50 MB typical usage

### 10.3 Scalability Considerations
- **Local Storage Limit**: AsyncStorage has device-specific limits
- **Reservation Count**: Performance degrades with >1000 reservations
- **No Server Scaling**: Limited by device capabilities

---

## 11. Quality

### 11.1 Reliability
- **Data Persistence**: AsyncStorage provides reliable local storage
- **Error Handling**: Basic error handling for storage operations
- **Crash Prevention**: TypeScript reduces runtime errors

### 11.2 Usability
- **Material Design**: Consistent UI patterns
- **Intuitive Navigation**: Clear flow between screens
- **Immediate Feedback**: Snackbar confirmations

### 11.3 Maintainability
- **TypeScript**: Type safety improves code maintainability
- **Component Structure**: Modular screen components
- **Clear Separation**: Each screen handles specific functionality

### 11.4 Security
- **Local Data Only**: No network communications to secure
- **No Sensitive Data**: Personal information stored locally only
- **No Authentication**: Single-user model reduces attack surface

---

## Appendices

### Acronyms and Abbreviations

| Acronym | Definition |
|---------|------------|
| API | Application Programming Interface |
| UI | User Interface |
| UX | User Experience |
| JSON | JavaScript Object Notation |
| TS | TypeScript |

### Definitions

| Term | Definition |
|------|------------|
| AsyncStorage | React Native's key-value storage system |
| Expo | Platform and framework for universal React applications |
| Reference Number | Unique identifier generated for each reservation |
| Material Design | Google's design system for creating UIs |

### Design Principles

1. **Simplicity First**: Choose the simplest solution that meets requirements
2. **Local-Only Design**: No external dependencies or network connectivity
3. **Component Independence**: Each screen should be self-contained
4. **Type Safety**: Use TypeScript to prevent runtime errors
5. **User Experience**: Prioritize intuitive navigation and clear feedback
6. **Performance**: Optimize for mobile device constraints
7. **Maintainability**: Write clean, readable code with clear structure

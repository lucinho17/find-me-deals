# Course Knowledge: React & Full-Stack Development (PMFST)

This document summarizes the technical standards, patterns, and curriculum of the "Okviri i alati za razvoj web aplikacija" course. Use this as a reference to ensure code consistency with the course's teachings.

## 1. React Hooks and Patterns
The course emphasizes a functional approach to React, focusing on the following hooks and core concepts:

### Core Hooks
- **`useState`**: For managing local component state, including complex states (objects/arrays).
- **`useEffect`**: For handling side effects, data fetching, and synchronization.
- **`useRef`**: For accessing DOM elements directly or persisting values across renders without triggering re-renders.
- **`useContext`**: For global state management and avoiding prop drilling.

### Key Patterns
- **Component-Based Architecture**: Components are the primary building blocks.
- **Unidirectional Data Flow**: Data flows strictly from parent to child via props.
- **Lifting State Up**: Sharing data between components by moving state to a common ancestor.
- **Declarative UI**: Describing the desired UI state and letting React handle DOM updates via the **Virtual DOM**.
- **Controlled Inputs**: Managing form data through React state.

## 2. Styling Conventions
The course transitions from general CSS to modern CSS-in-JS solutions:
- **Styled Components (`styled-components`)**: The primary recommended library for component-level styling.
- **Formatting (Oblikovanje)**: Emphasis on structured and maintainable CSS practices.

## 3. Backend Architecture
The backend curriculum is built on the **MERN** stack (specifically Express and MongoDB):
- **Express.js**: Used for creating the server and handling routing.
- **RESTful API Design**: Implementation of standard HTTP methods:
    - `GET`: Data retrieval.
    - `POST`: Creating new resources.
    - `PUT`/`PATCH`: Updating existing resources.
    - `DELETE`: Removing resources.
- **MongoDB & Mongoose**: 
    - NoSQL database integration.
    - Defining schemas and handling database relations.
    - CRUD operations (Create, Read, Update, Delete).
- **Middleware**: Used for request processing, logging, and security.
- **Axios**: The preferred library for client-side HTTP requests to the backend.

## 4. Authentication and Security
- **JSON Web Token (JWT)**: The standard for stateless authentication.
- **Authentication vs. Authorization**: 
    - **Authentication**: Verifying user identity.
    - **Authorization**: Managing permissions and access levels.
- **Secure Communication**: Implementation of security layers within the Express middleware.

## 5. Project Structure and Naming Conventions
- **Client-Server Separation**: Clear distinction between the React frontend and Express backend.
- **Component Organization**: Logic and UI are encapsulated within components.
- **Application Structure**:
    - **Middleware Layer**: For backend logic separation.
    - **Data Layer**: Dedicated logic for MongoDB interactions.
    - **Route Layer**: Organized HTTP endpoint definitions.
- **Naming**: Follows standard JavaScript/React conventions (PascalCase for components, camelCase for variables/functions).

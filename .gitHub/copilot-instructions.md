# GitHub Copilot Instructions

## Project Overview

This is a full-stack application consisting of:

- **Backend**: ASP.NET Core Web API (.NET 8.0) with Swagger documentation
- **Frontend**: Angular 19+ application with modern features
- **Testing**: Playwright for E2E testing, Karma/Jasmine for unit testing
- **Database**: SQLite with Dapper ORM

## How to Start the Application

### Prerequisites

- .NET 8.0 SDK
- Node.js (LTS version)
- Angular CLI (`npm install -g @angular/cli`)

### Quick Start (Recommended)

```powershell
# Start both applications with auto-open browsers
.start-app.ps1
```

This script will automatically:

- Start the .NET backend API with HTTPS
- Start the Angular frontend development server
- Open Swagger UI at: https://localhost:7102/swagger
- Open the Angular app at: http://localhost:4200/

### Manual Start (Alternative)

If you prefer to start applications manually:

#### Starting the Backend (.NET API)

```powershell
# Navigate to backend directory
cd backend

# Restore dependencies
dotnet restore

# Run the application (with HTTPS and Swagger)
dotnet run --launch-profile https
# OR for HTTP only:
dotnet run --launch-profile http

# API will be available at:
# - HTTPS: https://localhost:7102 (with Swagger UI at /swagger)
# - HTTP: http://localhost:5257
```

#### Starting the Frontend (Angular)

```powershell
# Navigate to frontend directory
cd frontend\frontend

# Install dependencies
npm install

# Start development server
npm start
# OR
ng serve

# Application will be available at: http://localhost:4200
```

### Running Tests

```powershell
# Backend tests
cd backendTests
dotnet test

# Frontend unit tests
cd frontend\frontend
npm test

# E2E tests with Playwright
npm run test:e2e
```

## Development Guidelines

### Angular Development (Follow Angular v19+ Standards)

**For detailed Angular development guidelines, coding standards, and best practices, refer to:**

- **[Angular Instructions](coding-guidelines/Angular/instructions.md)** - Comprehensive Angular 19+ guidelines with signals and standalone components
- **[Angular Best Practices](coding-guidelines/Angular/best-practices.md)** - TypeScript and Angular best practices for scalable applications

### C# Backend Development

**For detailed C# development guidelines, coding standards, and architectural patterns, refer to:**

- **[C# Coding Guidelines](coding-guidelines/C#/coding-guidelines.instructions.md)** - Clean code principles, functional patterns, and modern C# practices

## Project Structure Guidelines

### File Organization:

- Keep related files together (component.ts, component.html, component.scss)
- Use feature modules/folders for logical grouping
- Separate concerns: models, services, components, pipes, etc.

### Naming Conventions:

- **Angular**: kebab-case for files, PascalCase for classes
- **C#**: PascalCase for public members, camelCase for private fields
- **Files**: Descriptive names that indicate purpose

### Testing Strategy:

- Write unit tests for business logic
- Use E2E tests for user workflows
- Mock external dependencies in unit tests
- Test error scenarios and edge cases

## Common Commands Reference

### Angular CLI:

```powershell
ng generate component feature/component-name
ng generate service services/service-name
ng generate pipe pipes/pipe-name
ng build --configuration production
```

### .NET CLI:

```powershell
dotnet new webapi -n ProjectName
dotnet add package PackageName
dotnet ef migrations add MigrationName
dotnet publish --configuration Release
```

### Testing:

```powershell
# Angular tests
ng test --watch=false --browsers=ChromeHeadless
ng e2e

# .NET tests
dotnet test --configuration Release --logger "console;verbosity=detailed"
```

Remember: Always follow the established patterns in the codebase and prioritize maintainability and performance.

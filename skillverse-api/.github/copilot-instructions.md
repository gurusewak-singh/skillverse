# Copilot Instructions for SKILL-VERSE API

## Big Picture Architecture

- This is a NestJS-based TypeScript monorepo for a skill-sharing platform API.
- Major modules: `auth`, `users`, `ledger`, and `prisma` (database access).
- GraphQL is used for API communication (`GraphQLModule` with Apollo Driver).
- Prisma ORM manages PostgreSQL database schema and migrations.
- Each feature (e.g., Auth, Users) is organized as a module under `src/`.

## Developer Workflows

- **Install dependencies:** `npm install`
- **Start development server:** `npm run start:dev` (port 3001 by default)
- **Run tests:** `npm run test` (unit), `npm run test:e2e` (end-to-end)
- **Lint and format:** `npm run lint`, `npm run format`
- **Prisma migrations:**
  - Create migration: `npx prisma migrate dev`
  - Open Prisma Studio: `npx prisma studio`
- **GraphQL Playground:** Enabled by default for local development.

## Project-Specific Conventions

- **Global Validation:** `ValidationPipe` is applied globally in `main.ts` and via `APP_PIPE` in `app.module.ts`.
- **Error Handling:** Promises must be handled (use `.catch` or `await`).
- **Type Safety:** Use explicit DTOs and types for request bodies and GraphQL entities. Extend types (e.g., Express `Request`) as needed.
- **Module Imports:** All modules (e.g., `LedgerModule`, `UsersModule`) must be registered in `app.module.ts`.
- **GraphQL Entities:** Use decorators from `@nestjs/graphql` (`@ObjectType`, `@Field`, etc.) and ensure proper imports.
- **Environment Variables:** Sensitive config (e.g., JWT secret, database URL) is loaded from environment variables.

## Integration Points

- **Database:** PostgreSQL via Prisma (`prisma/schema.prisma`, migrations in `prisma/migrations/`).
- **Authentication:** JWT-based, with Passport.js strategies in `auth` module.
- **GraphQL:** API schema auto-generated at `src/schema.gql`.
- **External Packages:** See `package.json` for dependencies (NestJS, Prisma, Passport, etc.).

## Key Files & Directories

- `src/main.ts`: Application bootstrap and global pipes.
- `src/app.module.ts`: Main module registration and GraphQL config.
- `src/auth/`: Authentication logic, JWT strategy, guards, DTOs.
- `src/users/`: User entity and related logic.
- `src/ledger/`: Ledger feature (if present).
- `prisma/`: Database schema and migrations.
- `package.json`: Scripts and dependencies.
- `README.md`: Basic setup and workflow reference.

## Example Patterns

- Register new modules in `app.module.ts` imports array.
- Use DTOs for request validation and type safety.
- Extend Express `Request` type for custom properties (e.g., `user`).
- Use Prisma service for database access in modules.
- Use GraphQL decorators for API schema definition.

---

For questions or unclear conventions, check `README.md` or ask for clarification.

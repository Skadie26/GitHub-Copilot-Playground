# DB Standards Template Generation

Create consistent database schemas and naming conventions with GitHub Copilot.

| Field                 | Description                                                                                                                                                                                                                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Identifier**        | UC-00009                                                                                                                                                                                                                                                                                                    |
| **Role**              | Database Developer                                                                                                                                                                                                                                                                                          |
| **Motivation**        | Database designs often lack consistency in naming and structure across projects. Manual database design is time-consuming and error-prone. Teams need standardized templates to ensure consistency, maintainability, and compliance. GitHub Copilot can generate database templates that enforce standards. |
| **Brief Description** | Database developers use GitHub Copilot to generate standardized database schemas that enforce consistent naming conventions, structural patterns, and best practices across all database projects.                                                                                                          |
| **Precondition**      | - Database standards and conventions are defined<br>- Database management system is selected<br>- GitHub Copilot is installed and enabled<br>- Design patterns are documented                                                                                                                               |
| **Input Data**        | - Database design requirements<br>- Business entity definitions<br>- Relationship specifications<br>- Performance requirements<br>- Existing database standards                                                                                                                                             |
| **Result**            | - Standardized database schema templates<br>- Consistent naming convention enforcement<br>- Reusable design patterns<br>- Documentation templates<br>- Migration script templates                                                                                                                           |
| **Postcondition**     | - Database designs follow established standards<br>- Naming conventions are consistently applied<br>- Templates are available for team reuse<br>- Design patterns are documented and validated                                                                                                              |

## Main Flow

1. Database Developer defines requirements for new database schema.
2. Developer tells Copilot: "Generate a schema for our customer business entity."
3. Copilot generates schema following team naming standards and patterns.
4. Developer asks: "Include audit fields and relationships following our conventions."
5. Copilot updates the schema with audit tables and foreign keys.
6. Developer asks for: "Migration scripts and documentation."
7. Copilot generates migration scripts and template documentation.
8. Developer saves templates to repository for team reuse.

## Alternative Flows

**Variant 1: Integration with legacy database**

1. Developer needs new schema compatible with legacy system.
2. Developer asks Copilot: "How should we bridge this with the old schema?"
3. Copilot analyzes legacy structure and suggests compatibility views.
4. Developer validates integration points with legacy tables.

**Variant 2: Multi-tenant application requiring special design**

1. Developer needs multi-tenant schema design.
2. Developer asks Copilot: "Design multi-tenant schema with proper isolation."
3. Copilot generates schema with tenant partitioning strategy.
4. Developer validates design meets security and scalability needs.

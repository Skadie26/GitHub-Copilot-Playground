# Template Generation

Create reusable code templates to standardize structure and reduce boilerplate across projects using GitHub Copilot.

| Field                 | Description                                                                                                                                                                                                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Identifier**        | UC-00002                                                                                                                                                                                                                                                                                     |
| **Role**              | All Developer Roles                                                                                                                                                                                                                                                                          |
| **Motivation**        | Teams waste time writing repetitive boilerplate code. Without standardized templates, code quality varies, onboarding slows, and best practices aren't consistently applied. GitHub Copilot can generate and maintain reusable templates that ensure consistency and accelerate development. |
| **Brief Description** | Developers use GitHub Copilot to create standardized, reusable code templates that capture common patterns, structures, and best practices, enabling consistent code generation across the team.                                                                        |
| **Precondition**      | - Developer has access to development environment<br>- GitHub Copilot is installed and enabled<br>- Template storage system is accessible in the instructonfile.md <br> - Optional: Generate a mode Dedicatet to crate code fro the Templte                            |
| **Input Data**        | - Existing code examples and patterns<br>- Team coding standards<br>- Architecture requirements                                                                                                                                                                                              |
| **Result**            | - Reusable code templates for common patterns<br>- Standardized project structures<br>- Reduced boilerplate in new projects<br>- Consistent code quality across team                                                                                                                         |
| **Postcondition**     | - Templates are stored in accessible repository<br>- Templates follow team standards<br>- Team can generate consistent code structures<br>- Development time for common patterns is reduced                                                                                                  |

## Main Flow

TODO : NEED EDITING !
******
1. Developer identifies repetitive code pattern across multiple projects.
2. Developer shows Copilot the pattern.
3. Copilot extracts the common structure and identifies customization points.
4. Developer asks Copilot: "What should be variable and what should be fixed?"
5. Copilot suggests parameterization strategy and placeholder naming.
6. Developer reviews the template and asks for team standards integration.
7. Developer references `copilot-instructions.md` for template specifications and standardization guidelines.
8. Copilot generates the template with inline documentation, usage examples, and aligned with team specifications.
9. Developer saves the template an link it in the `copilot-instructions.md` file.

## Alternative Flows

**Variant 1: Updating existing template for modern patterns**

1. Developer finds outdated template using deprecated libraries.
2. Developer asks Copilot: "Update this template to use current best practices."
3. Copilot analyzes the template and suggests modern alternatives.
4. Developer approves updates and Copilot generates new version.
5. Developer updates repository with version notes and migration guidance.

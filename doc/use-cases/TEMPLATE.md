# Use Case Template

This document serves as a template for documenting use cases. Each field includes a short explanation of what should be entered.

| Description           | Explanation                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| **Identifier**        | Enter a unique identifier for the use case (e.g., AF-00010).                                     |
| **Actors/Role**       | List all persons, roles, or systems involved in this use case (e.g., Employee, Driver, System).  |
| **Motivation**        | Explain why this use case is needed — describe the background, context, or problem being solved. |
| **Brief Description** | Provide a short summary of what happens in this use case and its main purpose.                   |
| **Cross References**  | List related documents, diagrams, or use cases (if applicable).                                  |
| **Precondition**      | Describe what must be true or completed before this use case can start.                          |
| **Input Data**        | List all required data that enters the process (e.g., user data, customer data).                 |
| **Result**            | Describe the expected outcome of the use case (e.g., generated report, updated record).          |
| **Postcondition**     | State what is true after the use case has finished (e.g., data saved, confirmation sent).        |
| **Invariants**        | Mention any rules or conditions that must always hold true during the use case.                  |

## Main Flow

Describe the normal sequence of actions step-by-step.

**Example:**

1. Employee opens the planning tool.
2. System displays different submenus.
3. Employee clicks on 'Export Customer List'.
4. System verifies the employee.
5. System downloads the customized list.

## Alternative Flows

Describe exceptional or alternative scenarios (e.g., errors, timeouts).

**Example:**

**Variant 1: Verification takes too long.**

1. Employee cancels the process by reloading the page.
2. System displays the overview again.

**Variant 2: Verification fails.**

1. System downloads all customers.
2. Employee reports to supervisor.
3. Supervisor reports to IT.

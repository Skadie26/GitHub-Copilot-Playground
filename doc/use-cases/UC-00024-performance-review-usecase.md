# Performance Review

Analyze application performance and identify bottlenecks with GitHub Copilot.

| Field                 | Description                                                                                                                                                                                                                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Identifier**        | UC-00024                                                                                                                                                                                                                                                                                               |
| **Role**              | Backend Developer                                                                                                                                                                                                                                                                                      |
| **Motivation**        | Manual performance analysis is time-consuming and requires specialized expertise. Applications suffer from degraded user experience, increased infrastructure costs, and scalability limits. Teams need systematic performance review. GitHub Copilot can analyze metrics and recommend optimizations. |
| **Brief Description** | Developers use GitHub Copilot to systematically analyze application and database performance, identify bottlenecks, generate optimization recommendations, and establish consistent performance review processes for optimal system performance.                                                       |
| **Precondition**      | - Performance monitoring tools are deployed and collecting metrics<br>- GitHub Copilot is installed and enabled<br>- Application baselines are established<br>- Performance requirements are defined                                                                                                   |
| **Input Data**        | - Application performance metrics and logs<br>- Database query performance statistics<br>- Infrastructure resource utilization data<br>- User experience and response time measurements<br>- System load patterns and usage analytics                                                                  |
| **Result**            | - Comprehensive performance analysis report<br>- Identified bottlenecks and optimization opportunities<br>- Prioritized performance improvement recommendations<br>- Database query optimization suggestions<br>- Infrastructure scaling and tuning guidance                                           |
| **Postcondition**     | - Performance issues are identified and prioritized<br>- Optimization recommendations are actionable<br>- Performance monitoring is enhanced<br>- System performance meets or exceeds requirements                                                                                                     |

## Main Flow

1. Performance Engineer shares performance metrics with Copilot.
2. Engineer asks Copilot: "Analyze this performance data for bottlenecks."
3. Copilot analyzes metrics and identifies performance issues.
4. Copilot prioritizes bottlenecks by impact.
5. Engineer asks: "What optimizations would help most?"
6. Copilot suggests prioritized optimization recommendations.
7. Engineer implements improvements.
8. Engineer monitors and validates performance gains.

## Alternative Flows

**Variant 1: Critical performance degradation requiring immediate action**

1. Engineer faces severe performance issues affecting users.
2. Engineer asks Copilot: "Find the critical bottleneck immediately."
3. Copilot performs emergency analysis and provides rapid fixes.
4. Engineer implements emergency optimizations.

**Variant 2: Capacity planning for growth**

1. Engineer conducts performance review for future planning.
2. Engineer asks Copilot: "How will we scale with growth?"
3. Copilot analyzes growth patterns and suggests scaling strategies.
4. Engineer develops capacity management plan.


## Improvements

- Removed duplicate margin declarations
- Changed onlick handler to use event listener
- Added .35s transition to background colour change

## ASCII Diagram

using-ai-in-development/
└── portfolio.html
    ├── <head>
    │   ├── meta (charset, viewport)
    │   ├── title ("About Me")
    │   ├── Google Fonts links
    │   └── <style>
    │       ├── Base styles (body, h1, h2, p, ul, #funButton)
    │       └── Media queries
    │           ├── max-width: 768px
    │           ├── max-width: 480px
    │           └── min-width: 1024px
    └── <body>
        ├── Content
        │   ├── h1 ("About Me")
        │   ├── p (intro text)
        │   ├── h2 ("My Interests")
        │   └── ul
        │       ├── Juggling
        │       ├── Games
        │       └── Programming
        ├── button#funButton ("🎨 Change Background Color!")
        └── <script>
            ├── Select button (#funButton)
            ├── addEventListener('click', changeBackgroundColor)
            └── changeBackgroundColor()
                ├── color array
                ├── random color selection
                └── apply to document.body.style.backgroundColor

## Learnings

- Content Security Policy controls which scripts the browser is allowed to run
- Inline JS code is vulnerable to injected code (e.g. XSS)
- The ease keyword can be used in CSS to smoothen transitions and animations by slowing them at start and end

## Ethics

### Confidential code and data

- **Description:** Since content submitted to an LLM system may be stored or used as training data, it is important to take care never to share proprietary, sensitive customer information or API keys.
- **Mitigation:** Only provide non-sensitive context and sanitize examples before submission.

### Security vulnerabilities

- **Description:** Machine-generated code is prone to security flaws such as a lack of input validation, SQL injection
- **Mitigation:** Model output should be treated as draft code; it still needs peer review, linting, static analysis, dependency scanning, input validation checks, and targeted tests.

### Accuracy and hallucinations

- **Description:** As a learner, it is especially important to bear in mind that LLMs can hallucinate, and that their output may not always be accurate.
- **Mitigation:** Check code against official documentation, run local tests and experiments, request citations/references from LLM.
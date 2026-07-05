# Contributing to API Masterclass 🤝

First off, thank you for considering contributing to API Masterclass! It's people like you that make open-source software such a great community.

## How Can I Contribute?

### 1. Reporting Bugs 🐛
If you find a bug, please create an issue on GitHub. Before creating a new issue, please search the existing issues to see if it has already been reported. When reporting a bug, include:
- A clear, descriptive title.
- Steps to reproduce the bug.
- Expected behavior vs. actual behavior.
- Screenshots if applicable.

### 2. Suggesting Enhancements ✨
Have an idea for a new feature? We'd love to hear it! Open an issue and use the label `enhancement`. Describe the feature in detail and explain why it would be beneficial to the project.

### 3. Adding New API Modules 📚
The curriculum is driven by `src/utils/apiData.js`. If you want to add new endpoints or an entirely new module based on FreeAPI:
1. Review the data structure in `apiData.js`.
2. Add your new endpoints to `endpointGroups`.
3. Update `src/utils/content.js` to provide the rich learning content and concepts for your new endpoints.

### 4. Submitting Pull Requests (PRs) 🚀
We gladly accept Pull Requests! To submit one:
1. **Fork** the repository and clone it locally.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`
3. Make your changes in the codebase.
4. Ensure your code works by testing it locally (`npm run dev`).
5. Commit your changes with a clear commit message: `git commit -m "Add feature X"`
6. Push to your branch: `git push origin feature/your-feature-name`
7. Open a Pull Request against the `main` branch of this repository.

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/api-masterclass.git

# Navigate into the directory
cd api-masterclass

# Install dependencies
npm install

# Start the local development server
npm run dev
```

## Code Style Guide
- This project uses React (Vite) and Tailwind CSS.
- Please stick to the established styling conventions (e.g., using `zenSidebar`, `zenPanel`, and `zenAccent` utility classes in Tailwind).
- Ensure your code is formatted properly before submitting a PR. We recommend using an editor configured with ESLint and Prettier.

## Code of Conduct
Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms. Be respectful, constructive, and kind to one another!

Thank you for contributing! 🎉

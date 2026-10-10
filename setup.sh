#!/bin/bash

set -e

# Root files
touch README.md .gitignore

# Server structure
mkdir -p server/src/{config,models,controllers,routes,middleware}

touch server/package.json
touch server/.env.example
touch server/src/server.js
touch server/src/app.js
touch server/src/config/db.js
touch server/src/models/Task.js
touch server/src/controllers/taskController.js
touch server/src/routes/taskRoutes.js
touch server/src/middleware/errorHandler.js
touch server/src/middleware/notFound.js

# Client structure
mkdir -p client/src/{api,hooks,utils,components,pages}

touch client/package.json
touch client/index.html
touch client/vite.config.js
touch client/tailwind.config.js
touch client/postcss.config.js

touch client/src/main.jsx
touch client/src/App.jsx
touch client/src/index.css

touch client/src/api/tasks.js
touch client/src/hooks/useTasks.jsx

touch client/src/utils/dates.js
touch client/src/utils/taskHelpers.js

touch client/src/components/TaskItem.jsx
touch client/src/components/TaskList.jsx
touch client/src/components/TaskFormSheet.jsx
touch client/src/components/ConfirmDialog.jsx
touch client/src/components/DateSelector.jsx
touch client/src/components/WeeklyProgress.jsx

touch client/src/pages/OnboardingPage.jsx
touch client/src/pages/HomePage.jsx
touch client/src/pages/SearchPage.jsx
touch client/src/pages/AllTasksPage.jsx

echo "To-Do App project structure created successfully!"

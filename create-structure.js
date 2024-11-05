const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

// Define the project structure
const projectStructure = {
  src: {
    controllers: {},
    models: {},
    routes: {},
    middlewares: {},
    utils: {},
    config: {},
    services: {},
    views: {},
  },
  public: {
    css: {},
    js: {},
    images: {},
  },
  tests: {},
  "README.md":
    "# Your Project Title\n\n## Description\n\nYour project description.",
  ".gitignore": "node_modules/\ndist/\n.env\n",
  ".env": "#DB_NAME=\n#DB_PORT=\n#DB_PASSWORD="
};

// Function to create directories and files
const createStructure = (structure, basePath) => {
  for (const key in structure) {
    const newPath = path.join(basePath, key);
    if (typeof structure[key] === "object") {
      fs.mkdirSync(newPath, { recursive: true });
      createStructure(structure[key], newPath);
    } else {
      fs.writeFileSync(newPath, structure[key].content || structure[key]);
    }
  }
};

// Get the target directory from command line arguments
const targetDir = process.argv[2] || "my-backend-project";

// Create the project structure
createStructure(projectStructure, targetDir);

// Change working directory to the target directory
process.chdir(targetDir);

// Install npm packages
exec("npm init -y", (err, stdout, stderr) => {
  if (err) {
    console.error(`Error installing packages: ${stderr}`);
    return;
  }
  console.log(`Packages installed: ${stdout}`);
});


// Print the completion message
console.log(`Project structure created in '${targetDir}'`);

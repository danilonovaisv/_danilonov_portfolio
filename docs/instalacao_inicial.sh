#!/bin/bash

# Project Analysis Script
# Performs comprehensive analysis of a JavaScript/TypeScript project

set -e  # Exit immediately if a command exits with a non-zero status

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Global variables
PROJECT_ROOT=$(pwd)
PACKAGE_MANAGER="npm"
DEV_COMMAND="npm run dev"

echo -e "${BLUE}Starting project analysis...${NC}"

# Function to print section headers
print_header() {
    echo -e "\n${YELLOW}=== $1 ===${NC}"
}

# Function to print success messages
print_success() {
    echo -e "${GREEN}$1${NC}"
}

# Function to print error messages
print_error() {
    echo -e "${RED}$1${NC}"
}

# Function to print warnings
print_warning() {
    echo -e "${YELLOW}$1${NC}"
}

# 1) ANALYSIS OF PROJECT
print_header "1) INITIAL PROJECT ANALYSIS"

# Check for package.json
if [[ ! -f "package.json" ]]; then
    print_error "No package.json found in the project root. This script requires a Node.js project."
    exit 1
else
    echo "Found package.json"
    # Detect project type based on dependencies
    if grep -q '"next"' package.json; then
        PROJECT_TYPE="Next.js Application"
        DEV_COMMAND="npm run dev"
    elif grep -q '"@nestjs"' package.json; then
        PROJECT_TYPE="NestJS Application"
        DEV_COMMAND="npm run start:dev"
    elif grep -q '"express"' package.json; then
        PROJECT_TYPE="Express API"
        DEV_COMMAND="npm run dev"
    elif grep -q '"react"' package.json && grep -q '"@types/react"' package.json; then
        PROJECT_TYPE="React Application"
        DEV_COMMAND="npm start"
    elif grep -q '"vue"' package.json; then
        PROJECT_TYPE="Vue Application"
        DEV_COMMAND="npm run dev"
    else
        PROJECT_TYPE="Generic Node.js Project"
    fi
    echo "Detected project type: $PROJECT_TYPE"
fi

# Check for lockfiles
if [[ -f "pnpm-lock.yaml" ]]; then
    PACKAGE_MANAGER="pnpm"
    DEV_COMMAND="${PACKAGE_MANAGER} dev"
elif [[ -f "yarn.lock" ]]; then
    PACKAGE_MANAGER="yarn"
    DEV_COMMAND="${PACKAGE_MANAGER} dev"
else
    PACKAGE_MANAGER="npm"
    DEV_COMMAND="${PACKAGE_MANAGER} run dev"
fi
echo "Detected package manager: $PACKAGE_MANAGER"

# Read package.json to get scripts
echo "Available scripts in package.json:"
if command -v jq &> /dev/null; then
    jq -r '.scripts | to_entries[] | "  - \(.key): \(.value)"' package.json 2>/dev/null || echo "  (Could not parse scripts, jq not found or package.json invalid)"
else
    echo "  (jq not found, skipping script listing)"
fi

# Check for config files
CONFIG_FILES=("tsconfig.json" "jest.config.js" "jest.config.ts" "vitest.config.js" "vitest.config.ts" "playwright.config.js" "playwright.config.ts" "eslint.config.js" ".eslintrc.js" ".eslintrc.json" ".prettierrc.js" ".prettierrc.json" ".prettierrc")
for file in "${CONFIG_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        echo "Found config file: $file"
    fi
done

# Check for .vscode directory
if [[ -d ".vscode" ]]; then
    echo "Found .vscode directory"
    if [[ -f ".vscode/settings.json" ]]; then
        echo "  - Found .vscode/settings.json"
    fi
    if [[ -f ".vscode/extensions.json" ]]; then
        echo "  - Found .vscode/extensions.json"
    fi
fi

print_success "Initial analysis complete."

# 2) CHECK TOOLS AND VERSIONS
print_header "2) CHECKING TOOLS AND VERSIONS"

# Check Node version
NODE_VERSION=$(node -v)
echo "Current Node version: $NODE_VERSION"

# Check for version constraints
NVMRC_VERSION=""
if [[ -f ".nvmrc" ]]; then
    NVMRC_VERSION=$(cat .nvmrc)
    echo "Required Node version from .nvmrc: $NVMRC_VERSION"
fi

TOOL_VERSIONS_NODE=""
if [[ -f ".tool-versions" ]]; then
    TOOL_VERSIONS_NODE=$(grep -E '^nodejs\s' .tool-versions | awk '{print $2}')
    if [[ -n "$TOOL_VERSIONS_NODE" ]]; then
        echo "Required Node version from .tool-versions: $TOOL_VERSIONS_NODE"
    fi
fi

ENGINE_VERSION=""
if command -v jq &> /dev/null; then
    ENGINE_VERSION=$(jq -r '.engines.node // empty' package.json 2>/dev/null)
    if [[ -n "$ENGINE_VERSION" && "$ENGINE_VERSION" != "null" ]]; then
        echo "Required Node version from package.json engines: $ENGINE_VERSION"
    fi
fi

# Simple check for version compatibility (example: if .nvmrc exists)
if [[ -n "$NVMRC_VERSION" ]]; then
    # Basic check - a more sophisticated version check could be implemented
    if [[ ! "$NODE_VERSION" =~ ^v$NVMRC_VERSION ]]; then
        print_warning "Node version mismatch detected."
        print_warning "Current: $NODE_VERSION, Required: $NVMRC_VERSION"
        print_warning "Consider using 'nvm use' or installing the required version."
        echo "Suggested command: nvm install $NVMRC_VERSION && nvm use"
    fi
fi

# Check if node_modules exists
if [[ ! -d "node_modules" ]]; then
    print_warning "node_modules directory not found."
    echo "Suggested next step: Run '$PACKAGE_MANAGER install' to install dependencies."
    INSTALL_NEEDED=true
else
    echo "node_modules directory found."
    INSTALL_NEEDED=false
fi

# 3) INSTALL DEPENDENCIES (WHEN NECESSARY)
if [[ "$INSTALL_NEEDED" == true ]]; then
    print_header "3) INSTALLING DEPENDENCIES"
    read -p "Do you want to run '$PACKAGE_MANAGER install' now? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Running '$PACKAGE_MANAGER install'..."
        $PACKAGE_MANAGER install
        if [[ $? -eq 0 ]]; then
            print_success "Dependencies installed successfully."
            INSTALL_NEEDED=false
        else
            print_error "Dependency installation failed. Please check the errors above."
            exit 1
        fi
    else
        print_warning "Skipping dependency installation. Some checks might fail."
    fi
fi

# 4) TEST CONFIGURATION AND VERIFICATION
print_header "4) CONFIGURATION AND VERIFICATION OF TESTS"

TEST_RUNNER="none"
if command -v jq &> /dev/null; then
    if jq -e '.dependencies.jest // .devDependencies.jest' package.json > /dev/null 2>&1; then
        TEST_RUNNER="Jest"
    elif jq -e '.dependencies.vitest // .devDependencies.vitest' package.json > /dev/null 2>&1; then
        TEST_RUNNER="Vitest"
    elif jq -e '.dependencies.playwright // .devDependencies.playwright' package.json > /dev/null 2>&1; then
        TEST_RUNNER="Playwright"
    elif jq -e '.dependencies.cypress // .devDependencies.cypress' package.json > /dev/null 2>&1; then
        TEST_RUNNER="Cypress"
    fi
fi

if [[ "$TEST_RUNNER" != "none" ]]; then
    echo "Detected test runner: $TEST_RUNNER"
    # Check for test scripts
    HAS_TEST_SCRIPT=false
    if command -v jq &> /dev/null; then
        if jq -e '.scripts.test // .scripts["test:unit"] // .scripts["test:e2e"]' package.json > /dev/null 2>&1; then
            HAS_TEST_SCRIPT=true
        fi
    fi

    if [[ "$HAS_TEST_SCRIPT" == true ]]; then
        echo "Test scripts found in package.json."
        echo "Running tests with '$PACKAGE_MANAGER test'..."
        $PACKAGE_MANAGER test --passWithNoTests # Add --passWithNoTests to avoid failure if no tests are found
    else
        print_warning "Test runner ($TEST_RUNNER) detected, but no test script found in package.json."
        echo "Example script to add to package.json for $TEST_RUNNER might be:"
        case $TEST_RUNNER in
            "Jest")
                echo '  "scripts": { "test": "jest" }'
                ;;
            "Vitest")
                echo '  "scripts": { "test": "vitest" }'
                ;;
            "Playwright")
                echo '  "scripts": { "test": "playwright test" }'
                ;;
            "Cypress")
                echo '  "scripts": { "test": "cypress run" }'
                ;;
        esac
    fi
else
    print_warning "No common test runner detected (Jest, Vitest, Playwright, Cypress)."
    echo "Consider adding a test runner configuration for better project health."
fi

# 5) LINT, FORMAT, AND TYPE-CHECK
print_header "5) LINT, FORMAT, AND TYPE-CHECK"

# Check for lint script
if command -v jq &> /dev/null && jq -e '.scripts.lint' package.json > /dev/null 2>&1; then
    echo "Running lint script..."
    $PACKAGE_MANAGER run lint
else
    print_warning "No 'lint' script found in package.json."
fi

# Check for typecheck script
if command -v jq &> /dev/null && jq -e '.scripts.typecheck // .scripts["type-check"]' package.json > /dev/null 2>&1; then
    echo "Running typecheck script..."
    $PACKAGE_MANAGER run typecheck || $PACKAGE_MANAGER run "type-check"
else
    print_warning "No 'typecheck' script found in package.json."
fi

# Check for format script
if command -v jq &> /dev/null && jq -e '.scripts.format // .scripts.fmt' package.json > /dev/null 2>&1; then
    echo "Running format script..."
    $PACKAGE_MANAGER run format || $PACKAGE_MANAGER run fmt
else
    print_warning "No 'format' or 'fmt' script found in package.json."
fi

# 6) VS CODE PLUGINS / EXTENSIONS
print_header "6) VS CODE PLUGINS / EXTENSIONS"

VSCODE_DIR=".vscode"
EXTENSIONS_FILE="$VSCODE_DIR/extensions.json"

if [[ -d "$VSCODE_DIR" ]]; then
    if [[ -f "$EXTENSIONS_FILE" ]]; then
        echo "Found existing $EXTENSIONS_FILE"
        echo "Current recommended extensions:"
        if command -v jq &> /dev/null; then
            jq -r '.recommendations[]' "$EXTENSIONS_FILE" 2>/dev/null || echo "  (Could not parse extensions, jq not found or file invalid)"
        else
            cat "$EXTENSIONS_FILE"
        fi
    else
        echo "No $EXTENSIONS_FILE found in $VSCODE_DIR."
        CREATE_EXTENSIONS=true
    fi
else
    echo "No .vscode directory found."
    mkdir -p "$VSCODE_DIR"
    CREATE_EXTENSIONS=true
fi

if [[ "$CREATE_EXTENSIONS" == true ]]; then
    echo "Suggesting common extensions based on project type ($PROJECT_TYPE)..."
    # Basic recommendations based on common project types
    # A more sophisticated check would look at dependencies in package.json
    if grep -q '"typescript"' package.json; then
        echo "  - Recommend: esbenp.prettier-vscode (Prettier)"
        echo "  - Recommend: dbaeumer.vscode-eslint (ESLint)"
        echo "  - Recommend: bradlc.vscode-tailwindcss (Tailwind CSS IntelliSense if Tailwind is present)"
        echo "  - Recommend: EditorConfig.EditorConfig"
        echo "  - Recommend: ms-vscode.vscode-typescript-next (TypeScript)"
    elif grep -q '"react"' package.json; then
        echo "  - Recommend: esbenp.prettier-vscode (Prettier)"
        echo "  - Recommend: dbaeumer.vscode-eslint (ESLint)"
        echo "  - Recommend: msjsdiag.vscode-react-performance-devtools (React Developer Tools)"
        echo "  - Recommend: EditorConfig.EditorConfig"
    fi
    echo "Would you like to create/update $EXTENSIONS_FILE with these recommendations?"
    read -p "This will overwrite the file if it exists. (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        mkdir -p "$VSCODE_DIR"
        cat > "$EXTENSIONS_FILE" << EOF
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "EditorConfig.EditorConfig"
  ]
}
EOF
        print_success "Created/updated $EXTENSIONS_FILE with basic recommendations."
    fi
fi

# 7) BUILD AND READY-CHECK
print_header "7) BUILD AND READY-CHECK"

BUILD_SCRIPT_EXISTS=false
if command -v jq &> /dev/null && jq -e '.scripts.build' package.json > /dev/null 2>&1; then
    BUILD_SCRIPT_EXISTS=true
    echo "Found 'build' script in package.json."
    echo "Attempting to run build..."
    $PACKAGE_MANAGER run build
    BUILD_SUCCESS=$?
    if [[ $BUILD_SUCCESS -eq 0 ]]; then
        print_success "Build completed successfully."
    else
        print_error "Build failed with exit code $BUILD_SUCCESS."
        echo "Please fix the build errors before proceeding."
        exit $BUILD_SUCCESS
    fi
else
    print_warning "No 'build' script found in package.json."
    echo "This is normal for some development-only projects, but required for production builds."
fi

# 8) FINAL REPORT
print_header "8) FINAL REPORT"

echo "Project Type: $PROJECT_TYPE"
echo "Package Manager: $PACKAGE_MANAGER"
echo "Node Version: $NODE_VERSION"
echo "Dev Command: $DEV_COMMAND"

echo -e "\nStatus:"
if [[ "$INSTALL_NEEDED" == false ]]; then
    echo "  - [x] Dependencies installed"
else
    echo "  - [ ] Dependencies installed"
fi

if [[ "$TEST_RUNNER" != "none" ]]; then
    echo "  - [x] Test runner detected ($TEST_RUNNER)"
else
    echo "  - [ ] Test runner detected"
fi

if command -v jq &> /dev/null && jq -e '.scripts.lint' package.json > /dev/null 2>&1; then
    echo "  - [x] Lint script available"
else
    echo "  - [ ] Lint script available"
fi

if command -v jq &> /dev/null && jq -e '.scripts.typecheck // .scripts["type-check"]' package.json > /dev/null 2>&1; then
    echo "  - [x] Type-check script available"
else
    echo "  - [ ] Type-check script available"
fi

if command -v jq &> /dev/null && jq -e '.scripts.format // .scripts.fmt' package.json > /dev/null 2>&1; then
    echo "  - [x] Format script available"
else
    echo "  - [ ] Format script available"
fi

if [[ "$BUILD_SCRIPT_EXISTS" == true ]]; then
    echo "  - [x] Build script available and successful"
else
    echo "  - [ ] Build script available"
fi

echo -e "\nVS Code Extensions:"
if [[ -f "$EXTENSIONS_FILE" ]]; then
    echo "  - [x] Extensions file ($EXTENSIONS_FILE) exists"
else
    echo "  - [ ] Extensions file ($EXTENSIONS_FILE) exists"
fi

# Final Check: Can dev command likely run?
DEV_COMMAND_READY=true
if [[ ! -d "node_modules" ]]; then
    DEV_COMMAND_READY=false
    print_error "node_modules missing: '$DEV_COMMAND' will likely fail."
elif [[ ! -f "package.json" ]]; then
    DEV_COMMAND_READY=false
    print_error "package.json missing: Cannot run '$DEV_COMMAND'."
else
    if command -v jq &> /dev/null; then
        if ! jq -e ".scripts.${DEV_COMMAND#* }" package.json > /dev/null 2>&1; then
            DEV_COMMAND_READY=false
            print_error "Dev script '${DEV_COMMAND#* }' not found in package.json: '$DEV_COMMAND' will fail."
        fi
    fi
fi

if [[ "$DEV_COMMAND_READY" == true ]]; then
    print_success "Project appears ready for development."
    echo "You can likely run the development server with: $DEV_COMMAND"
else
    print_error "Project is not ready to run the development command '$DEV_COMMAND'."
    echo "Please resolve the issues listed above."
fi

echo -e "\n${GREEN}Project analysis complete.${NC}"
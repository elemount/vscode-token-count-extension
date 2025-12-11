# Publishing Guide

This guide explains how to publish the VS Code Tiktoken Extension to the Visual Studio Code Marketplace.

## Prerequisites

1. A [Visual Studio Marketplace publisher account](https://marketplace.visualstudio.com/manage)
2. A [Personal Access Token (PAT)](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token) with Marketplace publishing permissions

## Setup GitHub Secrets

To enable automated publishing via GitHub Actions, you need to set up a secret in your repository:

1. Go to your repository on GitHub
2. Navigate to Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Create a secret named `VSCE_PAT` with your Visual Studio Marketplace Personal Access Token

## Publishing Methods

### 1. Automated Publishing via GitHub Release

The easiest way to publish is to create a GitHub release:

1. Update the version in `package.json`
2. Commit and push your changes
3. Create a new release on GitHub with a tag (e.g., `v0.0.2`)
4. The `publish.yml` workflow will automatically:
   - Build and test the extension
   - Package the extension (.vsix file)
   - Attach the .vsix file to the release
   - Publish to the VS Code Marketplace (if `VSCE_PAT` secret is configured)

### 2. Manual Workflow Trigger

You can also manually trigger the publish workflow:

1. Go to Actions tab in your GitHub repository
2. Select "Publish Extension" workflow
3. Click "Run workflow"
4. Choose whether to publish to the marketplace
5. Click "Run workflow" button

### 3. Local Publishing

To publish manually from your local machine:

```bash
# Install vsce globally (optional, already in devDependencies)
npm install -g @vscode/vsce

# Login to marketplace
vsce login <publisher-name>

# Package the extension
npm run package

# Publish the extension
vsce publish
```

## Continuous Integration

The CI workflow (`ci.yml`) runs automatically on:
- Push to main/master branch
- Pull requests to main/master branch

It performs the following checks:
- Linting
- Compilation
- Packaging

The CI runs on multiple platforms (Ubuntu, Windows, macOS) and Node.js versions (18.x, 20.x) to ensure compatibility.

## Version Management

Before publishing a new version:

1. Update the version number in `package.json`:
   ```json
   {
     "version": "0.0.2"
   }
   ```

2. Update the changelog/release notes

3. Commit and push:
   ```bash
   git add package.json
   git commit -m "Bump version to 0.0.2"
   git push
   ```

4. Create a release on GitHub with the same version tag

## Troubleshooting

### Authentication Issues

If you encounter authentication errors:
- Verify your PAT is valid and has the correct scopes
- Ensure the `VSCE_PAT` secret is correctly set in GitHub
- Try regenerating your PAT if it has expired

### Build Failures

If the build fails in CI:
- Check the workflow logs in the Actions tab
- Ensure all dependencies are correctly specified in `package.json`
- Test the build locally with `npm run compile`

### Packaging Issues

If packaging fails:
- Verify that all necessary files are included (check `.vscodeignore`)
- Ensure the `out` directory exists and contains compiled JavaScript
- Run `npm run package` locally to test

## Resources

- [VS Code Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [vsce Documentation](https://github.com/microsoft/vscode-vsce)
- [VS Code Marketplace](https://marketplace.visualstudio.com/)

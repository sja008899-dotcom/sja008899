# App Icon generation

This branch adds a utility script to generate iOS App Icons from a single high-resolution source image (SVG or PNG).

Steps to use locally:

1) Place your source logo at assets/logo.png or assets/logo.svg (recommended: SVG or at least 2048x2048 PNG).
2) Install dependencies in the repo root (this project expects node and npm):
   npm install sharp minimist
3) Run the generator:
   node tools/generate-ios-icons.js --input=assets/logo.png --output=ios/App/Assets.xcassets/AppIcon.appiconset

This will create all required PNG sizes and a Contents.json in the target folder.

If you want this to run in CI, I can add a workflow step that installs sharp and executes this script before the iOS build step.

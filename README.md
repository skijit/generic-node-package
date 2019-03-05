Setting up a Node Package
============================

- This guide covers how to set up, version, publish, etc. typescript-based node packages for reuse (presumably in Angular spa's)
  - The process for building libraries which have angular dependencies is different!

## Steps Taken to Create this Package
- Git configuration
  - git init
  - git remote add origin http://rictfserver1prd:8080/tfs/NMProjects/NewMarket/_git/genericNodePackage
  - git push -u origin --all
  - git remote add bb https://skijit@bitbucket.org/skijit/genericnodepackage.git
  - git push -u bb --all
  - Add Readme
  - Add .gitignore
  - git add .
  - git commit -a -m 'init commit'
  - git push origin master
  - touch .npmrc
  - git add .npmrc

- NPM config
  - npm init -y
  - npm install --save-dev typescript 

- TypeScript config

  ```(json)
  {
    "compileOnSave": true,
    "compilerOptions": {
      "baseUrl": "./",
      "outDir": "./dist",
      "sourceMap": true,
      "declaration": true,
      "moduleResolution": "node",
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "target": "es5",
      "typeRoots": [
        "node_modules/@types"
      ],
      "lib": [
        "es2017",
        "dom"
      ], 
      "strict": true      
    }
  }
  ```

  - Todo: if we add a tests directory, be sure to add this to the exclude list
- Project Structure Set Up
  - mkdir src
  - create src/index.ts
    - this will just export all the various stuff you want exported
  - mkdir src/lib
    - put various ts files and folder structures in lib
- Build setup
  - add an npm script: `"build": "tsc"`
  - Update the package.json:
      "main": "dist/index.js",
      "types": "dist/index.d.ts",
  
- Versioning and Publishing
  - Prereleases
    -  "version": "0.0.1-alpha1",
  

- How would CI Pipeline work?

## How to Customize
- Fork git repo
- Adding dependencies
- Adding Type declarations

## How to Publish
- Background
  - 'Latest' tag is automatically applied by npm
    - when you ask for the @latest in a package.json, be sure whether you're getting a pre-release or not
  - Some people use the manually applied 'Next' tag instead, to help filter out pre-releases from 'Latest'
- Check-in to Git with a corresponding Tag

- Publish to Npm
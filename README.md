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
  - set version: "version": "0.0.0"
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
  
- Versioning
  - `npm version` automatically bumps the specified version number (including pre-releases) and sets a corresponding git tag
  - Bump only the pre-release number, with the prefix of 'alpha'
    - `npm version prerelease --preid=alpha`
    - will set the first time to: "version": "0.0.1-alpha1"
  - Bump on the patch:
    - `npm version patch`
  - be sure that when you push to the remote, you include the tags:
    - `git push --tags origin master`

- Testing
  - We're going to use Jest
    - It's more popular than karma, is typescript-friendly, and the api is compatible with jasmine
  - `npm install --save-dev jest ts-jest @types/jest`
  - create a new jestconfig.json file:

  ```(json)
  {
    "transform": {
      "^.+\\.(t|j)sx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"]
  }
  ```

  - update the test entry in the package.json to: `"test": "jest --config jestconfig.json"`
  - create a new folder called `__tests__` inside the src folder
  - test your test: `npm run test`

- Publishing
  - `npm publish`
  
- How would CI Pipeline work?

## How to Customize
- Fork git repo
- Adding dependencies


## How to Publish
- **Important**: 
  - make sure the "name" in your package.json contains only lowercased letters and dashes, or publish won't work
  - make sure the "description" for your package.json is up to date
  - be sure you've re-transpiled your typescript into the dist folder before publishing
- Background
  - 'Latest' tag is automatically applied by npm
    - when you ask for the @latest in a package.json, be sure whether you're getting a pre-release or not
  - Some people use the manually applied 'Next' tag instead, to help filter out pre-releases from 'Latest'
- Check-in to Git with a corresponding Tag
  - `git push --tags origin master`
- Publish to Npm

## Test Consume in an Angular project
- mkdir tmpAng
- cd tmpAng
- ng new tmpAng
- update the project .nmprc:
  registry=http://rictfserver1prd:8080/tfs/NMProjects/_packaging/NewMarketPackages/npm/registry/
  always-auth=true
- add saved runtime dependency: `npm i --save generic-node-package@latest`
- update app.component.ts

```(typescript)
import { Component } from '@angular/core';
import { LogEntry, yo } from 'generic-node-package';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tmpAng';

  constructor() {
    const v = <LogEntry>{
      message: 'this is my message',
      data: 'some other data',
      time: new Date(),
      level: 'some level string'
    };
      
    console.log(yo(v));  
  }
  
}
```

- `ng serve`

## Todo
- Discuss how we can set up a CI Deployment for node packages

## Misc Sources
- https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c
- https://medium.com/cameron-nokes/the-30-second-guide-to-publishing-a-typescript-package-to-npm-89d93ff7bccd
- https://medium.com/@mbostock/prereleases-and-npm-e778fc5e2420
- https://blog.angularindepth.com/integrate-jest-into-an-angular-application-and-library-163b01d977ce
- https://blog.angularindepth.com/the-angular-library-series-publishing-ce24bb673275
- https://blog.angularindepth.com/angular-workspace-no-application-for-you-4b451afcc2ba
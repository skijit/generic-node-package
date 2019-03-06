Setting up a Reusable Node Package
============================

- This guide covers how to set up, version, and publish typescript-based node packages for reuse (presumably consuming in Angular spa's)
- **Note**: The process for building libraries which have angular dependencies is different!
  - see [this guide](http://notes.skjei.org/programming/web/angular2/angular-library-cookbook) for angular libraries
- This guide discusses 2 alternate sequences you can follow to create your reusable package:
  1. Build by Hand (basically- how this repo was built)
  2. Fork this Repo and customize (this is easier)
- Once you have a buildable and testable package, see the sections on:
  - Versioning
  - Publishing
- Optionally, see the section on setting up a test consumer

## Building by Hand
- **Git config**
  - `git init`
  - `git remote add origin http://rictfserver1prd:8080/tfs/NMProjects/NewMarket/_git/genericNodePackage`
  - `git push -u origin --all`  
  - Add README.md
  - Add .gitignore

  ```
  /node_modules
  /dist
  ```

  - Add .npmrc

  ```
  registry=http://rictfserver1prd:8080/tfs/NMProjects/_packaging/NewMarketPackages/npm/registry/
  always-auth=true
  ```

  - `git add .`
  - `git commit -a -m 'init commit'`
  - `git push origin master`
  

- **NPM config**
  - `npm init -y`
  - Update your package.json
    - set version: "version": "0.0.0"
    - make sure repo points at the right location    
  - `npm install --save-dev typescript`

- **TypeScript config**

  - add a tsconfig.json to root dir:

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

- **Project Structure config**
  - `mkdir src`
  - create src/index.ts
    - this will just export all the various stuff you want exported
  - mkdir src/lib
    - put various ts files and folder structures in lib

- **Build config**
  - add an npm script: `"build": "tsc"`
  - Update the package.json:
      "main": "dist/index.js",
      "types": "dist/index.d.ts"
  - test the build command: `npm run build`

- **Test config**  
  - We're going to use Jest
    - It's more popular than karma
    - is typescript-friendly
    - the api is compatible with jasmine
    - there are angular schematics to use Jest instead of karma
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
  - add a test file (extension must be `test.ts`)
  - test your test: `npm test`

  
## Fork Existing
- Fork the generic-node-package repo
  - Go to the [TFS page](http://rictfserver1prd:8080/tfs/NMProjects/NewMarket/_git/genericNodePackage?_a=contents) for the generic-node-package repo and select 'Fork'
    - Give the forked repo a new name, like 'testForkedGenericNodePackage'
    - Put it whatever project you want
- Clone the forked package:
  - e.g. `git clone http://rictfserver1prd:8080/tfs/NMProjects/NewMarket/_git/testForkedGenericNodePackage`
- Update package.json
  - change "name" field
  - change "version" to 0.0.0
  - change "description" to whatever you want
  - change the repository.url field to point to your forked repo.  E.G.

  ```(json)
  "repository": {
    "type": "git",
    "url": "http://rictfserver1prd:8080/tfs/NMProjects/NewMarket/_git/testForkedGenericNodePackage"
  },
  ```

- Update any dependency refs either through the npm cli or by modifying the package.json
- Install dependencies: `npm install`
- Test build: `npm run build`
- Test your tests: `npm test`
- Add your code to the lib and __tests__ folders 
- See instructions below for versioning and publishing

## Versioning
- `npm version` is a useful way of managing version numbers
  - automatically bumps the specified version number (including pre-releases) in package.json
  - automatically sets a corresponding git tag for the new version number
  - `npm version -h` to learn how to use it
  - Example: Bump only the pre-release number, with the prefix of 'alpha'
    - `npm version prerelease --preid=alpha`
    - if the initial version is set to "0.0.0", the new version will be "0.0.1-alpha1"
  - Example: bump only the patch number (i.e. we're using semantic versioning)
    - `npm version patch`
- be sure that when you push to the remote, you include the tags:
  - `git push --tags origin master`

## How to Publish
- **Important**: 
  - make sure the "name" in your package.json contains only lowercased letters and dashes, or publish won't work
  - make sure the "description" for your package.json is up to date
  - be sure you've re-transpiled your typescript into the dist folder before publishing, or you'll just be publishing old binaries!
- Npm Tags:
  - 'Latest' tag is automatically applied by npm
    - when you ask for the @latest in a package.json, be sure whether you're getting a pre-release or not
  - Some people use the manually applied 'Next' tag instead of 'Latest', to help filter out pre-releases
- Publish to Npm: `npm publish`

## Test Consume in an Angular project
- `mkdir tmpAng`
- `cd tmpAng`
- `ng new tmpAng`
- update the project .nmprc:
  
  ```
  registry=http://rictfserver1prd:8080/tfs/NMProjects/_packaging/NewMarketPackages/npm/registry/
  always-auth=true
  ```

- isntall the dependency: `npm i --save generic-node-package@latest`
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

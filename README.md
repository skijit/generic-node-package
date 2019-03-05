Setting up a Node Package
============================

- This guide covers how to set up, version, publish, etc. typescript-based node packages for reuse (presumably in Angular spa's)
  - The process for building libraries which have angular dependencies is different!

## Steps Taken to Create this Package
- `git init`
- git remote add origin http://rictfserver1prd:8080/tfs/NMProjects/NewMarket/_git/genericNodePackage
- git push -u origin --all
- git remote add bb https://skijit@bitbucket.org/skijit/genericnodepackage.git
- git push -u bb --all
- Add Readme
- Add .gitignore

## How to Customize
- Fork git repo
- Adding dependencies
- Adding Type declarations

## How to Publish
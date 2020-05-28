![build-test](https://github.com/pi-base/compile/workflows/build-test/badge.svg)

Compiles, checks, and published a data bundle for the [π-base viewer](https://github.com/pi-base/viewer)

**Future TODOs**

* Use e.g. JSON schema to validate structure
* Test for and report on contradictions
* Add test factories to @pi-base/core and use to improve test coverage here

## Run locally

In the directory containing your data files, run one of

    npx /path/to/compile # if you have a clone of this repo locally
    npx @pi-base/compile # otherwise

## Publish Action

<<<<<<< HEAD
    yarn run ncc build src/main.ts # bundle into dist/index.js
    git add -f dist/index.js

Actions are run from GitHub repos.  We will create a releases branch and only checkin production modules (core in this case).
=======
Actions can be published on a releases branch using `ncc`
>>>>>>> master

    git checkout releases/v1
    yarn pack
    git add -f dist/index.js
    git commit
    git push

Once stable, they probably should be [given a tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md

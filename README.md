## Publish Action

<<<<<<< HEAD
    yarn run ncc build src/main.ts # bundle into dist/index.js
    git add -f dist/index.js

Actions are run from GitHub repos.  We will create a releases branch and only checkin production modules (core in this case).
=======
Actions can be published on a releases branch using `ncc`
>>>>>>> master

    git checkout releases/v1
    yarn run ncc build src/main.ts
    git add -f dist/index.js
    git commit
    git push

Once stable, they probably should be [given a tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md

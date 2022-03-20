#!/usr/bin/env sh
# abort on errors
set -e
# build
npm run build
# navigate into the build output directory
cd dist

cp ../MP_verify_y0wXuH9N5IYHPWmA.txt .
cp ../CNAME .
# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
git checkout gh-pages
git add -A
git commit -m 'deploy'


git push o gh-pages

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages
# git push -f git@git-gujievivi:guxiaojie/present-vue.git master:gh-pages
# git remote add o git@git-gujievivi:guxiaojie/guxiaojie.github.io.git
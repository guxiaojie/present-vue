
set -e
npm run build
git checkout master

cp ./MP_verify_y0wXuH9N5IYHPWmA.txt ./dist

git pull gitee master

set -e
npm run build
cp ./MP_verify_y0wXuH9N5IYHPWmA.txt ./dist


git checkout main
git add .
now=$(date +"%T")
git commit -m $now --allow-empty

git push gitee main -f
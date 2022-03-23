 

set -e
npm run build

cd dist

#reset git
ssh-add -l
ssh-add -D 
ssh-add ~/.ssh/id_rsa_gujievivi

git config --global user.name "guxiaojie"
git config --global user.email gujievivi@gmail.com

# 
cp ../MP_verify_y0wXuH9N5IYHPWmA.txt .
# if you are deploying to a custom domain
cp ../CNAME .


git checkout gh-pages 

git add -A
now=$(date +"%T")
git commit -m $now --allow-empty

git pull o gh-pages
git push o gh-pages -f
 
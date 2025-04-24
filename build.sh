echo '正在准备ing'

echo '删除无关文件_book/book'
rm -r _book && rm -r book

echo 'build'
nvm use v10.24.0 && gitbook build

echo '改名'
mv _book book

echo '提交github'
git add . && git commit -m 'fix: 修改一些文案样式错误' && git push

echo '成功'
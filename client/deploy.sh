echo "Deploy tesing"

npm run build
aws s3 sync build/ s3://a-cli-react --acl public-read


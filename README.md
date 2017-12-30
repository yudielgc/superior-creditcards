# Superior Credit Cards

Credit cards website to play around with NodeJS and MongoDB, it generates a static website (based on [NanoGen](https://github.com/doug2k1/nanogen)) to be published into an S3 bucket.

## Setup

- `$ npm install`
- `$ npm run build`
- `$ npm run serve`

Go to [http://localhost:5000](http://localhost:5000) to see the generated site.

Go to [live demo](http://superiorcreditcards.com/)

## Deploy to AWS s3 bucket

- `$ s3-publish sync`

Read about `s3-publish` [here](https://www.npmjs.com/package/s3-publish)

- You need to create an `s3p.config.js` file in the current working directory: `s3p init --origin ./public --destination s3://<YOUR_BUCKET_NAME>`
- You also need your AWS credentials stored at `~/.aws/credentials` or `C:\Users\USER_NAME\.aws\credentials`, read [here](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html#getting-started-nodejs-configure-keys)

**Note:** Check out [node-s3-cli](https://github.com/andrewrk/node-s3-cli) if better

## References
[NanoGen](https://github.com/doug2k1/nanogen): Micro static site generator in Node.js

See the post: [Build a static site generator in 40 lines with Node.js](https://medium.com/douglas-matoso-english/build-static-site-generator-nodejs-8969ebe34b22) by [Douglas Matoso](https://github.com/doug2k1)
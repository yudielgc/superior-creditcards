const fse = require('fs-extra');
const path = require('path');
const { promisify } = require('util');
const ejsRenderFile = promisify(require('ejs').renderFile);
const globP = promisify(require('glob'));
const config = require('../site.config');

const srcPath = './src';
const distPath = './public';

// clear destination folder
fse.emptyDirSync(distPath);

// copy assets folder
fse.copy(`${srcPath}/assets`, `${distPath}`);
// copy creditcards images
fse.copy(`${srcPath}/data/images/creditcards`, `${distPath}/images`);

// read page templates
globP('**/*.ejs', { cwd: `${srcPath}/pages` })
    .then((files) => {
    // create pages on the go for categories and creditcards 
    //files.push('low-interest.ejs');

    files.forEach((file) => {
        const fileData = path.parse(file);
        const destPath = path.join(distPath, fileData.dir);

        switch (fileData.name) {
            case 'category':
                config.site.categories.forEach((category) => {
                    createPages(category.alias);
                });
                break;
            case 'credit-card':
                config.site.creditcards.forEach((creditcard) => {
                    createPages(creditcard.url);
                });
                break;   
            default:
                createPages(fileData.name);
                break;             
        }

        function createPages(fileName) {
            // create destination directory
            fse.mkdirs(destPath)
                .then(() => {
                    // render page
                    return ejsRenderFile(`${srcPath}/pages/${file}`, Object.assign({}, config));
                })
                .then((pageContents) => {
                    // render layout with page contents
                    return ejsRenderFile(`${srcPath}/layout.ejs`, Object.assign({}, config, { body: pageContents }));
                })
                .then((layoutContent) => {
                    // save the html file
                    fse.writeFile(`${destPath}/${fileName}.html`, layoutContent);
                })
                .catch((err) => { console.error(err) });
        }
    })
})
.catch((err) => { console.error(err) });

const gulp = require('gulp');
const fs = require('fs');

const del = (fileName) => {
    if (fs.existsSync(fileName)) {
        fs.readdir(fileName, (fileArr) => {
            console.log(fileArr);
        });
    }
};

gulp.task('clean', () => {
    // return del(['dist/*','build/static/images/*'])
    // fs.
});

gulp.task('build', () => {
    console.log('build');
});

gulp.task('default', () => {
    del('test');
});

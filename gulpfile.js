const gulp = require('gulp');
const fs = require('fs');
const cache = require('gulp-cached');
const runSequence = require('run-sequence');
const gulpif = require('gulp-if');
const jsonminify = require('gulp-jsonminify');
const htmlminify = require('gulp-htmlmin');
const less = require('gulp-less');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const combiner = require('stream-combiner2');
const minimist = require('minimist');
var changed = require('gulp-changed');
const knownOptions = {
    string: 'env',
    default: { env: process.env.NODE_ENV || 'production' }      // eslint-disable-line
};
const options = minimist(process.argv.slice(2), knownOptions);  // eslint-disable-line
const isProduction = options.env === 'production';
/**
 *
 * @param {删除文件夹} filePath
 */
const deleteDir = function(filePath) {
    const arg = arguments;
    try {
        if (fs.existsSync(filePath)) {
            const fileArr = fs.readdirSync(filePath);
            // if (fileArr.length !== 0) {
            fileArr.map(function(item, index) {
                const itemPath = `${filePath}/${item}`;
                if (fs.statSync(itemPath).isFile()) {
                    fs.unlinkSync(itemPath);
                } else {
                    const fsDir = fs.readdirSync(itemPath);
                    if (fsDir.length !== 0) {
                        arg.callee(itemPath);
                    } else {
                        fs.rmdirSync(itemPath);
                    }
                }
            });
            fs.rmdirSync(filePath);
        }
    } catch (e) {
        console.log(`${e}`);
    }
};

/**
 * 删除dist文件夹
 */
gulp.task('clean', () => {
    return deleteDir('dist');
});

/**
 * copy文件
 */
gulp.task('copy', () => {
    // gulp.src(['src/**/**/*.?(json|js|wxml|wxss)'])
    //     .pipe(gulp.dest('dist'));
    // runSequence('copy:components', 'copy:pages', 'copy:app', callback);
});

/**
 * copy组件包
 */
gulp.task('copy:components', () => {
    gulp.src('src/components/**/*.?(json|wxss|wxml|js)')
        .pipe(cache('components'))
        .pipe(gulp.dest('dist/components'));
});

/**
 * copy页面
 */
gulp.task('copy:pages', () => {
    gulp.src('src/pages/**/*.?(json|wxss|wxml|js)')
        .pipe(cache('pages'))
        .pipe(gulp.dest('dist/pages'));
});

/**
 * app启动界面
 */
gulp.task('copy:app', () => {
    gulp.src('src/*.?(json|wxss|wxml|js)')
        .pipe(cache('app'))
        .pipe(gulp.dest('dist'));
});

/**
 * compile:json
 */

gulp.task('compile:json', () => {
    gulp.src(['src/**/**/*.json'])
        .pipe(changed('dist'))
        .pipe(cache('compile:json'))
        .pipe(gulpif(isProduction, jsonminify()))
        .pipe(gulp.dest('dist'));
});

/**
 * compile:html
 */

gulp.task('compile:html', () => {
    gulp.src(['src/**/**/*.{html,wxml}'])
        .pipe(changed('dist'))
        .pipe(cache('compile:html'))
        .pipe(gulpif(isProduction, htmlminify({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        })))
        .pipe(rename({
            extname: '.wxml'
        }))
        .pipe(gulp.dest('dist'));
});

/**
 * compile:css
 */
gulp.task('compile:css', () => {
    gulp.src(['src/**/**/*.{wxss,less}'])
        .pipe(changed('dist'))
        .pipe(cache('compile:less'))
        .pipe(less())
        .pipe(rename({
            extname: '.wxss'
        }))
        .pipe(gulp.dest('dist'));
});

/**
 * compile:js
 * pump抛出错误处理
 */

gulp.task('compile:js', (next) => {
    const combined = combiner.obj([
        gulp.src('src/**/**/*.js'),
        changed('dist'),
        cache('compile:js'),
        babel({
            presets: ['es2015']
        }),
        gulpif(isProduction, uglify()),
        gulp.dest('dist')
    ]);
    combined.on('error', console.error.bind(console));
    return combined;
});

/**
 * compile
 */

/**
 * compile任务
 */

gulp.task('compile', (next) => {
    return runSequence(['compile:json', 'compile:html', 'compile:css', 'compile:js'], next);
});

/**
 * 编译任务
 */
gulp.task('build', ['clean', 'copy'], (next) => {
    return runSequence(['compile'], next);
});

/**
 * 监听文件改变
 */
gulp.task('watch', () => {
    gulp.watch('src/**/*.js', ['compile:js']);
    gulp.watch('src/**/*.json', ['compile:json']);
    gulp.watch('src/**/*.{wxml,html}', ['compile:html']);
    gulp.watch('src/**/*.{wxss,less}', ['compile:css']);
});

const gulp= require("gulp");
const sass= require('gulp-sass');
const babel = require('gulp-babel');
sass.compiler = require('node-sass');
//var babel = require("babel");
gulp.task('sass', function() {
    return gulp.src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
gulp.task('babel', function(){
    gulp.src('./js/*.js')
    .pipe(babel({
        presets: ['@babel/preset-env']
    }))
    .pipe(gulp.dest('dist'))
})
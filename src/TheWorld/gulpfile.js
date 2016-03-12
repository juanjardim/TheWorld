/// <binding AfterBuild='build' />
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('minify-site', function () {
    return gulp.src("wwwroot/js/site.js")
        .pipe(plugins.uglify())
        .pipe(gulp.dest("wwwroot/lib/_app"));
});

gulp.task('minify-concat-app', function() {
    return gulp.src("wwwroot/js/app/*.js")
        .pipe(plugins.concat("app.js"))
        .pipe(gulp.dest('wwwroot/lib/_app'))
        .pipe(plugins.rename("app.min.js"))
        .pipe(plugins.uglify())
        .pipe(gulp.dest("wwwroot/lib/_app"));

})

gulp.task('build', ['minify-site', 'minify-concat-app'], function () {
    // place code for your default task here
});
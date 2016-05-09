var gulp = require('gulp');
var jshint = require('gulp-jshint');
var cleanCSS = require('gulp-clean-css');
var size = require('gulp-size');
var concat = require('gulp-concat');

var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var mainBowerFiles = require('gulp-main-bower-files');
var gulpFilter = require('gulp-filter');
var addsrc = require('gulp-add-src');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('jshint', function() {
    return gulp.src(['public/js/**/*.js', '!public/js/bower/**/*.js', '!public/js/min/scripts.min.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('develop', function(){
  gulp.watch('public/js/**/*.js', ['jshint']);
  // Other watchers
});

gulp.task('minify-css', function() {
    return gulp.src([
        'public/bower/angular-material/angular-material.css',
        'public/stylesheets/style.css',
    ])
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('public/stylesheets/min'));
});

var filterJS = gulpFilter('**/*.js');

gulp.task('build-js', ['jshint'], function() {

    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(filterJS)
        .pipe(addsrc([
            'public/js/app.js',
            'public/js/home/home.js',
            'public/js/topic/topic.js',
            'public/js/login/login.js',
            'public/js/signup/signup.js',
            'public/js/main/main.js',
            'public/js/chat/chat.js',
            'public/js/services/AuthToken.js',
            'public/js/services/topics-service.js',
            'public/js/services/AuthInterceptor.js',
            'public/js/services/RouteInterceptor.js',
            'public/js/services/socket-service.js',
        ]))
        .pipe(size())
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(size())
        .pipe(gulp.dest('public/js/min'));
});

gulp.task('build', ['jshint', 'build-js', 'minify-css']);

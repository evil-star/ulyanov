var syntax = 'sass'; // Syntax: sass or scss;

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browsersync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  notify = require("gulp-notify"),
  rigger = require("gulp-rigger"),
  wait = require("gulp-wait"),
  postcss = require('gulp-postcss'),
  ftp = require('vinyl-ftp'),
  gcmq = require('gulp-group-css-media-queries');

gulp.task('browser-sync', function() {
  browsersync({
    server: {
      baseDir: 'app'
    },
    notify: false,
    open: false,
    // tunnel: true,
    // tunnel: "checktest782", //Demonstration page: http://projectname.localtunnel.me
  });
});

gulp.task('styles', function() {
  return gulp.src('app/' + syntax + '/**/*.' + syntax + '')
    .pipe(wait(500))
    .pipe(sass({
      outputStyle: 'advanced'
    }).on("error", notify.onError()))
    .pipe(gcmq())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(postcss([
      require('autoprefixer')(['last 15 versions']),
      // require("cssnano")
    ]))
    .pipe(gulp.dest('app/css'))
    .pipe(browsersync.reload({
      stream: true
    }));
});

// FTP
gulp.task('deploy', function() {

  var conn = ftp.create({
    host: 'mywebsite.tld',
    user: 'me',
    password: 'mypass',
    parallel: 3
  });

  var globs = [
    'app/css/**',
    'app/js/**',
    'app/fonts/**',
    'app/img/**',
    'app/SMTP',
    'app/**/*.html',
    'app/**/*.php',
  ];

  // using base = '.' will transfer everything to /public_html correctly
  // turn off buffering in gulp.src for best performance

  return gulp.src(globs, { base: './app', buffer: false })
    .pipe(conn.newer('/')) // only upload newer files
    .pipe(conn.dest('/'));

});

gulp.task('js', function() {
  return gulp.src('app/js/common.js')
    .pipe(rigger())
    .pipe(concat('scripts.min.js'))
    // .pipe(uglify()) // Minify js (opt.)
    .pipe(gulp.dest('app/js'))
    .pipe(browsersync.reload({
      stream: true
    }));
});

gulp.watch('app/' + syntax + '/**/*.' + syntax, gulp.parallel('styles'));
gulp.watch('app/js/common.js', gulp.parallel('js'));
gulp.watch('app/**/*.html', gulp.series(reload));
gulp.watch('app/*.php', gulp.series(reload));

function reload(done) {
  browsersync.reload();
  done();
}

gulp.task('default', gulp.series('styles', 'js', 'browser-sync'));
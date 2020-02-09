const gulp = require("gulp")

const terser = require("gulp-terser"),
  rename = require("gulp-rename"),
  sass = require("gulp-sass"),
  cssnano = require("gulp-cssnano"),
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-sync");


gulp.task("scripts", function (done) {
  return gulp
    .src("./javascript/*js") //input files for gulp to minify
    .pipe(terser()) //calls the terser function on these files
    .pipe(rename({ extname: ".min.js" })) //renames minified file
    .pipe(gulp.dest("./build/js")) //creates a build folder and places min files in there
    .pipe(browserSync.stream())
})

//For SASS
gulp.task('sass', function () {
  return gulp
    //locates scss files
    .src('./sass/main.scss')
    //converts sass to css
    .pipe(sass())
    //adds prefixes for compatability
    .pipe(
      autoprefixer()
    )
    //adds css to build dir
    .pipe(gulp.dest('./build/css'))
    //minifies our css
    .pipe(cssnano())
    //renames our css files
    .pipe(rename('style.min.css'))
    //adds our final output to build dir
    .pipe(gulp.dest('./build/css'))
    //syncs browser whenever a change is made and saved
    .pipe(browserSync.stream());
})

gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
  gulp.watch('js/*.js', gulp.series(['scripts']))
  gulp.watch('./*html').on('change', browserSync.reload)
})

gulp.task("default", gulp.series('watch'))
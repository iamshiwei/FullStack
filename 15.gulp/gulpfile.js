const gulp = require('gulp');
const livereload = require('gulp-livereload');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

const js_path = ['./src/js/**/*.js'];
gulp.task('js', () => {
  return gulp
    .src(js_path)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
    .pipe(livereload())
})
gulp.task('watch', ()=>{
  livereload.listen(8081);
  gulp.watch(js_path, ['js']);
  gulp.watch([
    './1.html',
    ...js_path,
  ], file=>{
    livereload.changed(file.path)
  }) 
})
gulp.task('default', ['js', 'watch'])
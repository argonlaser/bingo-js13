var gulp = require('gulp')
var nodemon = require('gulp-nodemon')

gulp.task('dev', () => {
  nodemon({
    script: 'index.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  })
})

gulp.task('default', ['dev'])

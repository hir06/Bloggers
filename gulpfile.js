var gulp=require('gulp');
var browserSync = require('browser-sync').create();
gulp.task('browserSync', function() {
   browserSync.init({
      server: {
         baseDir: 'src'
      },
   })
});
// gulp.task('default', 'browserSync', function (){
   // //gulp.watch('src/styles/*.css', ['styles']);
// });   
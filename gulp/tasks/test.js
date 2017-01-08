var gulp = require("gulp"),
    ts = require("gulp-typescript"),
    tsProject = ts.createProject("tsconfig.json");

gulp.task(
    "test",
    function () {
        return tsProject.src()
            .pipe(ts(tsProject))
    }
);
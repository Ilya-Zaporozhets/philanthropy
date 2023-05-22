import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*otf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          fifle: "FONTS",
          maessage: "Error:<%=error.message %>",
        })
      )
    )
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
};

export const ttfToWoff = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          fifle: "FONTS",
          maessage: "Error:<%=error.message %>",
        })
      )
    )
    .pipe(
      fonter({
        formats: ["woff"],
      })
    )
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));
};

export const fontsStyle = () => {
  let fontsDir = app.path.build.fonts;
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;

  fs.readdir(fontsDir, function (err, files) {
    if (fontsFile) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, "", cb);

        let newFileOnly;
        for (var i = 0; i < files.length; i++) {
          let fontFileName = files[i].split(".")[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split(".")[0];
            let fontWeight = fontFileName.split(".")[1] || "400";

            switch (fontWeight.toLocaleLowerCase()) {
              case "thin":
                fontWeight = 100;
                break;
              case "extralight":
                fontWeight = 200;
                break;
              case "light":
                fontWeight = 300;
                break;
              case "medium":
                fontWeight = 500;
                break;
              case "semibold":
                fontWeight = 600;
                break;
              case "bold":
                fontWeight = 700;
                break;
              case "extrabold":
              case "heavy":
                fontWeight = 800;
                break;
              case "black":
                fontWeight = 900;
                break;
              default:
                fontWeight = 400;
            }

            fs.appendFile(
              fontsFile,
              `@font-face {
              font-family:${fontName};
              font-display:swap;
              src:url("../fonts/${fontFileName}.woff2") format("woff2"),url("../fonts/${fontFileName}.woff") format("woff");
              font-weight:${fontWeight};
              font-style:normal;
          }\r\n`,
              cb
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        console.log(
          "Якщо файл scss/fonts.scss вже існує,для його оновлення потрібно видалити його!"
        );
      }
    }
  });

  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() {}
};

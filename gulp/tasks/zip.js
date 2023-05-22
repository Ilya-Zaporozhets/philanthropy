import { promises as fs } from 'fs';
import path from 'path';
import gulp from 'gulp';
import zipPlugin from 'gulp-zip';

const rootFolder = path.basename(path.resolve());
const buildFolder = `./dist`;
const zipPath = `./${rootFolder}.zip`;

export const zip = async () => {
  try {
    // Check if zip file exists, delete it if it does
    try {
      await fs.access(zipPath, fs.constants.F_OK);
      await fs.unlink(zipPath);
    } catch (error) {
      // Ignore the error if the zip file doesn't exist
    }

    // Create new zip file
    await fs.access(rootFolder, fs.constants.W_OK);
    await gulp
      .src(`./${buildFolder}/**/*`)
      .pipe(zipPlugin(`${rootFolder}.zip`))
      .pipe(gulp.dest('./'));
    console.log(`Zip file created at ./`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const { execSync } = require('child_process');
const { join } = require('path');
const { platform } = require('os');

if (!['darwin', 'win32'].includes(platform())) {
  try {
    execSync('npm install', {
      cwd: join(__dirname, '..', 'src', 'sensors')
    });
  } catch (error) {
    //
  }
}

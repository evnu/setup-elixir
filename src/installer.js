const {exec} = require('@actions/exec')
const path = require('path')
const semver = require('semver')

module.exports = {installElixir, installOTP}

/**
 * Install Elixir.
 *
 * @param {string} version
 * @param {string} otpMajor
 */
async function installElixir(version, otpMajor) {
  const otpString = otpMajor ? `-otp-${otpMajor}` : ''
  if (process.platform === 'linux') {
    await exec(path.join(__dirname, 'install-elixir'), [version, otpString])

    return
  }

  if (process.platform === 'win32') {
    // FIXME version
    await exec('choco.exe', ['install', 'elixir'])

    return
  }
}

/**
 * Install OTP.
 *
 * @param {string} version
 */
async function installOTP(version) {
  if (process.platform === 'linux') {
    await exec(path.join(__dirname, 'install-otp'), [version])
    return
  }

  if (process.platform === 'win32') {
    // OTP is installed via elixir
    return
  }

  throw new Error(
    '@actions/setup-elixir only supports Ubuntu Linux and Windows at this time'
  )
}

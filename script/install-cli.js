/**
 * @author xukj
 * @date 2019/07/11
 * @description install-cli 安装第三方包脚本
 */
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

/**
 * Use Yarn if available, it's much faster than the npm client.
 * Return the version of yarn installed on the system, null if yarn is not available.
 */
function getYarnVersionIfAvailable() {
    let yarnVersion;
    try {
        // execSync returns a Buffer -> convert to string
        yarnVersion = (
            execSync('yarn --version', {
                stdio: [0, 'pipe', 'ignore'],
            }).toString() || ''
        ).trim();
    } catch (error) {
        return null;
    }
    return yarnVersion;
}

/**
 * 安装依赖的第三方包
 */
function install3Packages() {
    console.info(
        '\x1B[32m---------------------------------------------\x1B[0m',
    );
    console.info('\x1B[32m安装依赖的第三方包\x1B[0m');
    console.info(
        '\x1B[32m第三方依赖包在 package.json 的 devDependencies 中定义\x1B[0m',
    );
    console.info(
        '\x1B[32m---------------------------------------------\x1B[0m',
    );

    const packagePath = path.join(__dirname, '../package.json');
    const packageJSON = JSON.parse(fs.readFileSync(packagePath));
    const devDependencies = packageJSON['devDependencies'];
    let count = 1;
    for (const depName in devDependencies) {
        const depVersion = devDependencies[depName];
        const depToInstall = `${depName}@${depVersion}`;
        // 过滤掉不需要安装的
        if (
            depName == 'prop-types' ||
            depName == 'react' ||
            depName == 'react-native'
        ) {
            continue;
        }
        // 安装
        console.info(`\x1B[33m...... \x1B[0m`);
        console.info(`\x1B[33m${count}. 安装 ${depToInstall} \x1B[0m`);
        if (getYarnVersionIfAvailable()) {
            execSync(`yarn add ${depToInstall}`, { stdio: 'inherit' });
        } else {
            execSync(`npm install ${depToInstall} --save`, {
                stdio: 'inherit',
            });
        }
        console.info(`\x1B[32m${depToInstall} 安装成功 \x1B[0m`);
        count++;
    }

    console.info('\x1B[33m...... \x1B[0m');
    
    // ---
    // RN >= 0.60.0 版本使用auto-link，脚本里不再提供link操作。如果失败请自行调用link
    // console.info('\x1B[33m原生代码link \x1B[0m');
    // execSync('react-native link', { stdio: 'inherit' });
    // console.info('\x1B[33m...... \x1B[0m');
    // ---

    console.info(
        `\x1B[32m🎉 安装完成，如果安装失败，请参考 README.md 通过手动安装 \x1B[0m`,
    );
}

install3Packages();

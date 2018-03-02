'use strict';

process.on('unhandledRejection', err => {
    throw err;
});

var chalk = require('chalk');
var friendlySyntaxErrorLabel = 'Syntax error:';

function isLikelyASyntaxError(message) {
    return message.indexOf(friendlySyntaxErrorLabel) !== -1;
}

function formatMessage(message, isError) {
    var lines = message.split('\n');

    if (lines.length > 2 && lines[1] === '') {
        lines.splice(1, 1);
    }

    if (lines[0].lastIndexOf('!') !== -1) {
        lines[0] = lines[0].substr(lines[0].lastIndexOf('!') + 1);
    }
    
    var threadLoaderIndex = -1;
    lines.forEach(function (line, index) {
        if (threadLoaderIndex !== -1) {
            return;
        }
        if (line.indexOf('from thread-loader (worker') !== -1) {
            threadLoaderIndex = index;
        }
    });

    if (threadLoaderIndex !== -1) {
        lines = lines.slice(0, threadLoaderIndex);
    }

    lines = lines.filter(function (line) {
        return line.indexOf(' @ ') !== 0;
    });
    
    if (!lines[0] || !lines[1]) {
        return lines.join('\n');
    }
    
    if (lines[1].indexOf('Module not found: ') === 0) {
        lines = [
            lines[0],
            lines[1]
                .replace("Cannot resolve 'file' or 'directory' ", '')
                .replace('Cannot resolve module ', '')
                .replace('Error: ', '')
                .replace('[CaseSensitivePathsPlugin] ', ''),
        ];
    }
    
    if (lines[1].indexOf('Module build failed: ') === 0) {
        lines[1] = lines[1].replace(
            'Module build failed: SyntaxError:',
            friendlySyntaxErrorLabel
        );
    }
    
    var exportError = /\s*(.+?)\s*(")?export '(.+?)' was not found in '(.+?)'/;
    if (lines[1].match(exportError)) {
        lines[1] = lines[1].replace(
            exportError,
            "$1 '$4' does not contain an export named '$3'."
        );
    }

    lines[0] = chalk.inverse(lines[0]);
    
    message = lines.join('\n');
    message = message.replace(
        /^\s*at\s((?!webpack:).)*:\d+:\d+[\s)]*(\n|$)/gm,
        ''
    );

    return message.trim();
}

function formatWebpackMessages(json) {
    var formattedErrors = json.errors.map(function (message) {
        return formatMessage(message, true);
    });
    var formattedWarnings = json.warnings.map(function (message) {
        return formatMessage(message, false);
    });
    var result = {
        errors: formattedErrors,
        warnings: formattedWarnings,
    };
    if (result.errors.some(isLikelyASyntaxError)) {
        result.errors = result.errors.filter(isLikelyASyntaxError);
    }
    return result;
}

const webpack = require('webpack');
const path = require('path');
const config = require('../webpack.config');
let compiler = webpack(config);

const callback = (err, stats) => {
    console.log('Compiler has finished execution.');
};

compiler.run(callback);

/*
return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
        if (err) {
            return reject(err);
        }
        const messages = formatWebpackMessages(stats.toJson({}, true));
        if (messages.errors.length) {
            if (messages.errors.length > 1) {
                messages.errors.length = 1;
            }
            return reject(new Error(messages.errors.join('\n\n')));
        }
        if (
            process.env.CI &&
            (typeof process.env.CI !== 'string' ||
                process.env.CI.toLowerCase() !== 'false') &&
            messages.warnings.length
        ) {
            console.log(
                chalk.yellow(
                    '\nTreating warnings as errors because process.env.CI = true.\n' +
                    'Most CI servers set it automatically.\n'
                )
            );
            return reject(new Error(messages.warnings.join('\n\n')));
        }
        return resolve({
            stats,
            warnings: messages.warnings,
        });
    });
});
*/
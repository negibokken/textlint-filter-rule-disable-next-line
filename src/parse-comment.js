// Copyright (c) 2016 azu
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

"use strict";
const HTML_COMMENT_REGEXP = /<!--((?:.|\s)*?)-->/g;
export function isHTMLComment(htmlString) {
    return HTML_COMMENT_REGEXP.test(htmlString);
}

/**
 * get comment value from html comment tag
 * @param {string} commentValue <!-- comment -->
 * @returns {string[]}
 */
export function getValuesFromHTMLComment(commentValue) {
    const results = [];
    commentValue.replace(HTML_COMMENT_REGEXP, function(all, comment){
        results.push(comment);
    });
    return results;
}
/**
 * Parses a config of values separated by comma.
 * @param {string} string The string to parse.
 * @returns {Object} Result map of values and true values
 */
export function parseListConfig(string) {
    const items = {};

    // Collapse whitespace around ,
    string = string.replace(/\s*,\s*/g, ",");
    string.split(/,+/).forEach(function (name) {
        name = name.trim();
        if (!name) {
            return;
        }
        items[name] = true;
    });
    return items;
}

/**
 * parse "textlint-enable aRule, bRule" and return ["aRule", "bRule"]
 * @param {string} string
 * @returns {string[]}
 */
export function parseRuleIds(string) {
    return Object.keys(parseListConfig(string));
}

// LICENSE : MIT
"use strict";
import {parseRuleIds, getValuesFromHTMLComment, isHTMLComment} from "./parse-comment";
const defaultOptions = {
    // disable next line comment directive
    // if comment has the value, then disable textlint rule for the next line only
    "disablingNextLineComment": "textlint-disable-next-line"
};
module.exports = function(context, options = defaultOptions) {
    const {Syntax, shouldIgnore, getSource} = context;

    const disablingNextLineComment = options.disablingNextLineComment || defaultOptions.disablingNextLineComment;

    const content = getSource();

    let shouldIgnoreNextLine = false;
    let ignoreRuleIds = [];

    const handleIgnoreNextLine = (node) => {
        if (!shouldIgnoreNextLine) {
            return;
        }
        if(ignoreRuleIds.length > 0) {
            ignoreRuleIds.forEach((ruleId) => {
                shouldIgnore(node.range, {
                    ruleId: ruleId
                });
            })
        } else {
            shouldIgnore(node.range, {
                ruleId: '*'
            });
        };
        shouldIgnoreNextLine = false;
        ignoreRuleIds = [];
    }

    return {
        /*
<!-- textlint-disable-next-line -->
This is ignored.

or with rule id

<!-- textlint-disable-next-line no-todo -->
This is ignored.
         */
        [Syntax.Html](node){
            handleIgnoreNextLine(node);
            const nodeValue = getSource(node);
            if (!isHTMLComment(nodeValue)) {
                return;
            }
            const comments = getValuesFromHTMLComment(nodeValue);
            comments.forEach(commentValue => {
                if (commentValue.indexOf(disablingNextLineComment) !== -1) {
                    const configValue = commentValue.replace(disablingNextLineComment, "");
                    shouldIgnoreNextLine = true;
                    ignoreRuleIds = parseRuleIds(configValue);
                }
            });
        },
        [Syntax.Comment](node){
            handleIgnoreNextLine(node);
            const commentValue = node.value || "";
            if (commentValue.indexOf(disablingNextLineComment) !== -1) {
                const configValue = commentValue.replace(disablingNextLineComment, "");
                shouldIgnoreNextLine = true;
                ignoreRuleIds = parseRuleIds(configValue);
            }
        },
        [Syntax.Str](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.Document](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.Paragraph](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.BlockQuote](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.List](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.ListItem](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.Header](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.CodeBlock](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.HtmlBlock](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.Link](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.LinkReference](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.Delete](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.Emphasis](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.Strong](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.Break](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.Image](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.ImageReference](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.Definition](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.HorizontalRule](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.Code](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.Table](node){
            handleIgnoreNextLine(node);
        },
        [Syntax.TableRow](node){
            handleIgnoreNextLine(node);
        },
    }
};

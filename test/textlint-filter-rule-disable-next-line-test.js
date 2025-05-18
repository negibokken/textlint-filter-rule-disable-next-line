// LICENSE : MIT
"use strict";
import { TextLintCore } from "@textlint/legacy-textlint-core"
import { ASTNodeTypes } from "@textlint/ast-node-types";
import filterRule from "../src/textlint-filter-rule-disable-next-line";
import reportRule from "textlint-rule-report-node-types";
import assert from "assert";

const testCases = [
    {
        name: "Str",
        nodeType:ASTNodeTypes.Str,
        text: "This is Error."
    },
    {
        name: "Str (two sentences)",
        nodeType:ASTNodeTypes.Str,
        text: "This is Error. This is also Error."
    },
    {
        name: "Emphasis",
        nodeType:ASTNodeTypes.Emphasis,
        text: "This is ignored *emphasis*."
    },
    {
        name: "Code",
        nodeType:ASTNodeTypes.Code,
        text: "This is ignored `code`."
    },
    {
        name: "Link",
        nodeType:ASTNodeTypes.Link,
        text: "This is ignored [link](https://example.com)."
    },
    {
        name: "Header",
        nodeType:ASTNodeTypes.Header,
        text: "# This is ignored header."
    },
    {
        name: "BlockQuote",
        nodeType:ASTNodeTypes.BlockQuote,
        text: "> This is ignored blockquote."
    },
    {
        name: "List",
        nodeType:ASTNodeTypes.List,
        text: "- This is ignored list."
    },
    {
        name: "Table",
        nodeType:ASTNodeTypes.Table,
        text: "| This is ignored | table |."
    },
    {
        name: "TableCell",
        nodeType:ASTNodeTypes.TableCell,
        text: "| This is ignored | table |."
    },
    {
        name: "ListItem",
        nodeType:ASTNodeTypes.ListItem,
        text: "- This is ignored list item."
    },
    {
        name: "HorizontalRule",
        nodeType:ASTNodeTypes.HorizontalRule,
        text: "---"
    },
    {
        name: "HtmlBlock",
        nodeType: ASTNodeTypes.HtmlBlock,
        text: "<div>This is ignored html block.</div>"
    },
    {
        name: "Delete",
        nodeType: ASTNodeTypes.Delete,
        text: "~~This is ignored delete.~~"
    },
]

const REPORTED_NODE_TYPES = [
    ASTNodeTypes.BlockQuote,
    ASTNodeTypes.ListItem,
    ASTNodeTypes.List,
    ASTNodeTypes.Header,
    ASTNodeTypes.CodeBlock,
    ASTNodeTypes.HorizontalRule,
    ASTNodeTypes.Comment,
    ASTNodeTypes.Str,
    ASTNodeTypes.Break,
    ASTNodeTypes.Emphasis,
    ASTNodeTypes.Strong,
    ASTNodeTypes.Link,
    ASTNodeTypes.LinkReference,
    ASTNodeTypes.Image,
    ASTNodeTypes.ImageReference,
    ASTNodeTypes.Definition,
    ASTNodeTypes.Code,
    ASTNodeTypes.Delete,
    ASTNodeTypes.Table,
    ASTNodeTypes.TableRow,
    ASTNodeTypes.TableCell,
]

describe("textlint-filter-rule-disable-next-line", function () {
    context("no options", function () {
        context("when using textlint-disable-next-line", function () {
            testCases.forEach((testCase) => {

                it(`should ignore only the next line: ${testCase.nodeType}`, function () {
                    const textlint = new TextLintCore();
                    textlint.setupRules({
                        report: reportRule
                    }, {
                        report: {
                            nodeTypes: REPORTED_NODE_TYPES
                        }
                    });
                    textlint.setupFilterRules({
                        filter: filterRule
                    });
                    return textlint.lintMarkdown(`
This is Error.

<!-- textlint-disable-next-line -->
${testCase.text}

This is also Error.
`).then(({ messages }) => {
                        assert.equal(messages.length, 2);
                        // Check that the ignored line is not in the messages
                        const errorLines = messages.map(message => message.line);
                        assert.ok(errorLines.includes(2)); // "This is Error." line
                        assert.ok(!errorLines.includes(5)); // "This is ignored." line
                        assert.ok(errorLines.includes(7)); // "This is also Error." line
                    });
                });
            });
        });

        context("when using textlint-disable-next-line", function () {
            it(`should ignore only the next line: CodeBlock`, function () {
                const textlint = new TextLintCore();
                textlint.setupRules({
                    report: reportRule
                }, {
                    report: {
                        nodeTypes: REPORTED_NODE_TYPES
                    }
                });
                textlint.setupFilterRules({
                    filter: filterRule
                });
                return textlint.lintMarkdown(
"\n" +
"This is Error.\n" +
"<!-- textlint-disable-next-line -->\n" +
"```\n" +
"This is ignored code block.\n" +
"```\n" +
"This is also Error.\n"
).then(({ messages }) => {
                        assert.equal(messages.length, 2);
                        // Check that the ignored line is not in the messages
                        const errorLines = messages.map(message => message.line);
                        assert.ok(errorLines.includes(2)); // "This is Error." line
                        assert.ok(!errorLines.includes(5)); // "This is ignored." line
                        assert.ok(errorLines.includes(7)); // "This is also Error." line
                    });
            });
        });

        context("when using textlint-disable-next-line", function () {
            it(`should ignore next line of new line`, function () {
                const textlint = new TextLintCore();
                textlint.setupRules({
                    report: reportRule
                }, {
                    report: {
                        nodeTypes: REPORTED_NODE_TYPES
                    }
                });
                textlint.setupFilterRules({
                    filter: filterRule
                });
                return textlint.lintMarkdown(`
This is Error.

<!-- textlint-disable-next-line -->

This is ignored.

This is also Error.
`).then(({ messages }) => {
                        assert.equal(messages.length, 2);
                        // Check that the ignored line is not in the messages
                        const errorLines = messages.map(message => message.line);
                        assert.ok(errorLines.includes(2)); // "This is Error." line
                        assert.ok(!errorLines.includes(6)); // "This is ignored." line
                        assert.ok(errorLines.includes(8)); // "This is also Error." line
                    });
            });
        });

        context("when using textlint-disable-next-line at the end of document", function () {
            it("should handle the case gracefully", function () {
                const textlint = new TextLintCore();
                textlint.setupRules({
                    report: reportRule
                }, {
                    report: {
                        nodeTypes: [ASTNodeTypes.Str]
                    }
                });
                textlint.setupFilterRules({
                    filter: filterRule
                });
                return textlint.lintMarkdown(`
This is Error.

<!-- textlint-disable-next-line -->
`).then(({ messages }) => {
                    assert.equal(messages.length, 1);
                    const errorLines = messages.map(message => message.line);
                    assert.ok(errorLines.includes(2)); // The end of line
                });
            });
        });
    });

    context("with ruleId options", function () {
        context("when disable-next-line <ruleA>", function () {
            it("should ignore only the specified rule for next line", function () {
                const textlint = new TextLintCore();
                textlint.setupRules({
                    ruleA: reportRule,
                    ruleB: reportRule
                }, {
                    ruleA: {
                        nodeTypes: [ASTNodeTypes.Str]
                    },
                    ruleB: {
                        nodeTypes: [ASTNodeTypes.Str]
                    }
                });

                textlint.setupFilterRules({
                    filter: filterRule
                });
                return textlint.lintMarkdown(`
<!-- textlint-disable-next-line ruleA -->
This is ignored for ruleA but not for ruleB.

This is Error for both ruleA and ruleB.
`).then(({ messages }) => {
                    assert.equal(messages.length, 1);
                    const errorLines = messages.map(message => message.line);
                    assert.ok(!errorLines.includes(3)); // "This is ignored for ruleA but not for ruleB." line
                    assert.ok(errorLines.includes(5)); // "This is Error for both ruleA and ruleB." line
                });
            });

            it("should ignore multiple specified rules for next line", function () {
                const textlint = new TextLintCore();
                textlint.setupRules({
                    ruleA: reportRule,
                    ruleB: reportRule,
                }, {
                    ruleA: {
                        nodeTypes: [ASTNodeTypes.Str]
                    },
                    ruleB: {
                        nodeTypes: [ASTNodeTypes.Emphasis]
                    },
                });

                textlint.setupFilterRules({
                    filter: filterRule
                });
                return textlint.lintMarkdown(`
<!-- textlint-disable-next-line ruleA,ruleB -->
This is ignored for ruleA and ruleB.

**This is Error for rule B rules.**
`).then(({ messages }) => {
                    assert.equal(messages.length, 1);

                    const errorLines = messages.map(message => message.line);
                    assert.ok(!errorLines.includes(3)); // "This is Error." line
                    assert.ok(errorLines.includes(5)); // "This is ignored." line
                });
            });
        });
    });
});

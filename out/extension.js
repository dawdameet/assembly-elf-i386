"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    console.log('Assembly ELF i386 extension is now active!');
    // Register a completion provider for asm-i386
    const completionProvider = vscode.languages.registerCompletionItemProvider('asm-i386', {
        provideCompletionItems(document, position) {
            const instructions = [
                new vscode.CompletionItem('mov', vscode.CompletionItemKind.Keyword),
                new vscode.CompletionItem('add', vscode.CompletionItemKind.Keyword),
                new vscode.CompletionItem('sub', vscode.CompletionItemKind.Keyword),
                new vscode.CompletionItem('jmp', vscode.CompletionItemKind.Keyword),
                new vscode.CompletionItem('call', vscode.CompletionItemKind.Keyword),
                new vscode.CompletionItem('int', vscode.CompletionItemKind.Keyword)
            ];
            const registers = [
                new vscode.CompletionItem('eax', vscode.CompletionItemKind.Variable),
                new vscode.CompletionItem('ebx', vscode.CompletionItemKind.Variable),
                new vscode.CompletionItem('ecx', vscode.CompletionItemKind.Variable),
                new vscode.CompletionItem('edx', vscode.CompletionItemKind.Variable),
                new vscode.CompletionItem('esp', vscode.CompletionItemKind.Variable),
                new vscode.CompletionItem('ebp', vscode.CompletionItemKind.Variable)
            ];
            const directives = [
                new vscode.CompletionItem('section', vscode.CompletionItemKind.Keyword),
                new vscode.CompletionItem('global', vscode.CompletionItemKind.Keyword),
                new vscode.CompletionItem('extern', vscode.CompletionItemKind.Keyword),
                new vscode.CompletionItem('db', vscode.CompletionItemKind.Keyword),
                new vscode.CompletionItem('dw', vscode.CompletionItemKind.Keyword)
            ];
            return [...instructions, ...registers, ...directives];
        }
    }, '.' // Trigger character (optional)
    );
    // Register a hover provider for asm-i386
    const hoverProvider = vscode.languages.registerHoverProvider('asm-i386', {
        provideHover(document, position) {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);
            // Define hover documentation for instructions
            const instructionDocs = {
                mov: 'Moves data between registers or memory.',
                add: 'Adds two operands and stores the result in the destination.',
                sub: 'Subtracts the source operand from the destination.',
                jmp: 'Jumps to a specified label or address.',
                call: 'Calls a function or subroutine.',
                int: 'Triggers a software interrupt.'
            };
            // Define hover documentation for registers
            const registerDocs = {
                eax: 'Accumulator register, often used for arithmetic operations.',
                ebx: 'Base register, often used as a pointer to data.',
                ecx: 'Counter register, often used for loops.',
                edx: 'Data register, often used for I/O operations.',
                esp: 'Stack pointer register, points to the top of the stack.',
                ebp: 'Base pointer register, used to reference function parameters.'
            };
            // Define hover documentation for directives
            const directiveDocs = {
                section: 'Defines a section in the ELF file (e.g., .text, .data).',
                global: 'Declares a global symbol visible to the linker.',
                extern: 'Declares an external symbol defined elsewhere.',
                db: 'Defines a byte of data.',
                dw: 'Defines a word (2 bytes) of data.'
            };
            // Check if the hovered word matches any documentation
            if (word && instructionDocs[word]) {
                return new vscode.Hover(new vscode.MarkdownString(`**${word}**\n\n${instructionDocs[word]}`));
            }
            else if (word && registerDocs[word]) {
                return new vscode.Hover(new vscode.MarkdownString(`**${word}**\n\n${registerDocs[word]}`));
            }
            else if (word && directiveDocs[word]) {
                return new vscode.Hover(new vscode.MarkdownString(`**${word}**\n\n${directiveDocs[word]}`));
            }
            return null;
        }
    });
    context.subscriptions.push(completionProvider, hoverProvider);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

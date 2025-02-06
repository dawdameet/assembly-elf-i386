"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    console.log('Assembly ELF i386 extension is now active!');
    // Register a completion provider for asm-i386
    const provider = vscode.languages.registerCompletionItemProvider('asm-i386', {
        provideCompletionItems(document, position) {
            // Common assembly instructions
            const instructions = [
                createCompletionItem('mov', 'Move data between registers or memory.', vscode.CompletionItemKind.Keyword),
                createCompletionItem('add', 'Add two values and store the result.', vscode.CompletionItemKind.Keyword),
                createCompletionItem('sub', 'Subtract one value from another.', vscode.CompletionItemKind.Keyword),
                createCompletionItem('jmp', 'Jump to a label or address.', vscode.CompletionItemKind.Keyword),
                createCompletionItem('call', 'Call a function or procedure.', vscode.CompletionItemKind.Keyword),
                createCompletionItem('int 0x80', 'Trigger a system call interrupt.', vscode.CompletionItemKind.Keyword)
            ];
            // Registers
            const registers = [
                createCompletionItem('eax', 'General-purpose register (accumulator).', vscode.CompletionItemKind.Variable),
                createCompletionItem('ebx', 'General-purpose register (base).', vscode.CompletionItemKind.Variable),
                createCompletionItem('ecx', 'General-purpose register (counter).', vscode.CompletionItemKind.Variable),
                createCompletionItem('edx', 'General-purpose register (data).', vscode.CompletionItemKind.Variable),
                createCompletionItem('esp', 'Stack pointer register.', vscode.CompletionItemKind.Variable),
                createCompletionItem('ebp', 'Base pointer register.', vscode.CompletionItemKind.Variable)
            ];
            // Sections
            const sections = [
                createCompletionItem('section .data', 'Define the data section.', vscode.CompletionItemKind.Keyword),
                createCompletionItem('section .text', 'Define the text (code) section.', vscode.CompletionItemKind.Keyword),
                createCompletionItem('section .bss', 'Define the uninitialized data section.', vscode.CompletionItemKind.Keyword)
            ];
            // Directives
            const directives = [
                createCompletionItem('global', 'Declare a global symbol.', vscode.CompletionItemKind.Keyword),
                createCompletionItem('extern', 'Declare an external symbol.', vscode.CompletionItemKind.Keyword),
                createCompletionItem('db', 'Define a byte of data.', vscode.CompletionItemKind.Keyword),
                createCompletionItem('dw', 'Define a word (2 bytes) of data.', vscode.CompletionItemKind.Keyword),
                createCompletionItem('dd', 'Define a double word (4 bytes) of data.', vscode.CompletionItemKind.Keyword)
            ];
            // Combine all suggestions
            return [...instructions, ...registers, ...sections, ...directives];
        }
    }, '.' // Trigger character (optional)
    );
    context.subscriptions.push(provider);
}
exports.activate = activate;
/**
 * Helper function to create a CompletionItem with documentation.
 */
function createCompletionItem(label, description, kind) {
    const item = new vscode.CompletionItem(label, kind);
    item.documentation = new vscode.MarkdownString(description);
    return item;
}
function deactivate() { }
exports.deactivate = deactivate;

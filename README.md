# NML Language Support

Language support for **NML (Neural Machine Language)** in VSCode and Cursor.

NML is a 71-opcode tensor register machine for AI workloads — 32 registers, 32-bit fixed-width encoding, three interchangeable syntax modes (classic, symbolic, verbose).

## Features

- **Syntax highlighting** for all three NML syntaxes (classic `MMUL`, symbolic `×`, verbose `MATRIX_MULTIPLY`)
- **Real-time diagnostics** — invalid opcodes, wrong operand counts, type errors, jump target validation, missing HALT, FRAG/ENDF mismatch
- **Completions** — context-aware opcode, register, and `@memory` ref completions with snippet tabstops
- **Hover** — opcode docs, register purpose, memory slot usage, jump target resolution with PC math
- **Semantic tokens** — rich highlighting that distinguishes opcodes, registers, immediates, memory refs, shapes, and comments
- **Document symbols** — META keys, FRAG blocks, memory slots in the outline view (Cmd+Shift+O)
- **Go to definition** — Cmd+click on `@name` to jump to LD/ST references or `.nml.data` definitions

## Install

### 1. Install the Python language server

```bash
cd /path/to/nml
pip install -e lsp/
```

Requires Python 3.10+. This installs the `nml-lsp` package which provides diagnostics, completions, hover, and all other LSP features.

### 2. Install the extension

```bash
cursor --install-extension nml-language-0.1.0.vsix
```

Or in Cursor: **Extensions panel → ... → Install from VSIX** and select the `.vsix` file.

### 3. Reload

Cmd+Shift+P → **Developer: Reload Window**

Open any `.nml` file — all features activate automatically.

## Usage

| Action | What happens |
|---|---|
| Type at start of line | Opcode completions with operand tabstops |
| Hover over opcode | Category, description, operand pattern, all syntax aliases |
| Hover over register | Index, canonical name, Greek symbol, purpose |
| Hover over `@name` | Shows LD/ST references in the file |
| Hover over jump offset | Resolves target line with PC math |
| Cmd+click `@name` | Jump to definition in file or `.nml.data` |
| Cmd+Shift+O | Document symbols — META, FRAG blocks, memory slots |
| Save file | Diagnostics refresh (also on every keystroke) |

## Configuration

| Setting | Default | Description |
|---|---|---|
| `nml.pythonPath` | `python3` | Python interpreter used to run the NML language server |

## Rebuild

After making changes to the extension or LSP:

```bash
cd vscode-nml
npm run compile
npx @vscode/vsce package
cursor --install-extension nml-language-0.1.0.vsix
```

## Links

- [NML Spec](../docs/NML_SPEC.md)
- [NML GitHub](https://github.com/dnamaz/nml)

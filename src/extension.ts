import * as path from "path";
import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
} from "vscode-languageclient/node";

let client: LanguageClient | undefined;

export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration("nml");
  const pythonPath = config.get<string>("pythonPath", "python3");

  const serverModule = path.resolve(__dirname, "..", "..", "lsp", "nml_lsp", "server.py");

  const serverOptions: ServerOptions = {
    command: pythonPath,
    args: ["-m", "nml_lsp.server"],
    options: {
      cwd: path.resolve(__dirname, "..", "..", "lsp"),
    },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "nml" }],
    synchronize: {
      fileEvents: vscode.workspace.createFileSystemWatcher("**/*.{nml,nml.data}"),
    },
  };

  client = new LanguageClient("nml-lsp", "NML Language Server", serverOptions, clientOptions);
  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  return client?.stop();
}

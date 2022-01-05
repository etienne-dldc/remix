import type { DataFunctionArgs } from "./routeModules";
import type { EntryContext, AssetsManifest } from "./entry";
import type { ServerRouteManifest } from "./routes";

/**
 * The output of the compiler for the server build.
 */
export interface ServerBuild {
  entry: {
    module: ServerEntryModule;
  };
  routes: ServerRouteManifest;
  assets: AssetsManifest;
}

export interface HandleDocumentRequestFunction {
  (
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    context: EntryContext
  ): Promise<Response> | Response;
}

export interface StreamDocumentRequestFunction {
  (
    request: Request,
    responseHeaders: Headers,
    getRemixContext: () => Promise<
      Response | { context: EntryContext; status: number }
    >
  ): Promise<Response> | Response;
}

export interface OnLoadersCompleteCallback {
  (entryContext: EntryContext): void;
}

export interface HandleDataRequestFunction {
  (response: Response, args: DataFunctionArgs): Promise<Response> | Response;
}

/**
 * A module that serves as the entry point for a Remix app during server
 * rendering.
 */
export interface ServerEntryModule {
  default: HandleDocumentRequestFunction;
  handleDataRequest?: HandleDataRequestFunction;
  streamDocument?: StreamDocumentRequestFunction;
}

declare module "markdown-link-check" {
  interface LinkResult {
    link: string;
    status: string;
    statusCode?: number;
  }

  type Callback = (err: Error | null, results: LinkResult[]) => void;

  function markdownLinkCheck(
    markdown: string,
    opts: Record<string, unknown>,
    callback: Callback
  ): void;

  export default markdownLinkCheck;
}

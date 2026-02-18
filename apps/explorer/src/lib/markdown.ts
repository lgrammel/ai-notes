import { Marked } from "marked";
import path from "node:path";

/**
 * Resolve a relative markdown link to an app route.
 * E.g. "./llm.md" from "concepts" -> "/concepts/llm"
 *      "../threats/prompt-injection.md" from "concepts" -> "/threats/prompt-injection"
 *      "../threats/index.md" from "concepts" -> "/threats"
 *      "https://example.com" -> "https://example.com" (unchanged)
 */
function resolveLink(
  href: string | null | undefined,
  sourceCategory: string
): string | null | undefined {
  if (
    !href ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("#")
  ) {
    return href;
  }

  const sourcePath = `/${sourceCategory}/current`;
  const resolved = path.posix.resolve(path.posix.dirname(sourcePath), href);

  let cleaned = resolved.replace(/\.md$/, "");

  if (cleaned.endsWith("/index")) {
    cleaned = cleaned.replace(/\/index$/, "");
  }

  return cleaned;
}

export function renderMarkdown(
  content: string,
  sourceCategory: string
): string {
  const marked = new Marked();

  const renderer = {
    // Marked binds `this` to the renderer context at runtime.
    // Typing it loosely keeps this helper simple without pulling in deep Marked internals.
    link(
      this: { parser: { parseInline: (t: unknown[]) => string } },
      {
        href,
        title,
        tokens,
      }: {
        href?: string | null;
        title?: string | null;
        tokens: unknown[];
      }
    ): string {
      const resolvedHref = resolveLink(href, sourceCategory);
      const text = this.parser.parseInline(tokens);
      const titleAttr = title ? ` title="${title}"` : "";

      const isExternal =
        resolvedHref &&
        (resolvedHref.startsWith("http://") ||
          resolvedHref.startsWith("https://"));
      const extraAttrs = isExternal
        ? ' target="_blank" rel="noopener noreferrer"'
        : "";

      return `<a href="${resolvedHref}"${titleAttr}${extraAttrs}>${text}</a>`;
    },
  };

  marked.use({ renderer: renderer as never });
  return marked.parse(content) as string;
}

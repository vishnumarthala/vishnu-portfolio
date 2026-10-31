import type { ReactNode } from "react";
import type { Block } from "@/content/series/types";

/** Renders `code` and **bold** inside a sentence; nothing else is interpreted. */
export function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const re = /`([^`]+)`|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(m[1] ? <code key={m.index}>{m[1]}</code> : <strong key={m.index}>{m[2]}</strong>);
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export default function Prose({ blocks, labels }: { blocks: Block[]; labels: { tip: string; warn: string } }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "p":
            return (
              <p key={i}>
                <Inline text={b.text} />
              </p>
            );
          case "h":
            return <h2 key={i}>{b.text}</h2>;
          case "list": {
            const List = b.ordered ? "ol" : "ul";
            return (
              <List key={i}>
                {b.items.map((item) => (
                  <li key={item}>
                    <Inline text={item} />
                  </li>
                ))}
              </List>
            );
          }
          case "code":
            return (
              <figure key={i} className="prose__code">
                <pre tabIndex={0}>
                  <code>{b.code}</code>
                </pre>
                {b.caption ? <figcaption>{b.caption}</figcaption> : null}
              </figure>
            );
          case "note":
            return (
              <aside key={i} className={`prose__note prose__note--${b.tone}`}>
                <strong className="prose__noteLabel">{b.tone === "tip" ? labels.tip : labels.warn}</strong>
                <p>
                  <Inline text={b.text} />
                </p>
              </aside>
            );
          case "table":
            return (
              <div key={i} className="prose__table" tabIndex={0}>
                <table>
                  <thead>
                    <tr>
                      {b.head.map((h) => (
                        <th key={h} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, j) =>
                          j === 0 ? (
                            <th key={j} scope="row">
                              {cell}
                            </th>
                          ) : (
                            <td key={j}>{cell}</td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </>
  );
}

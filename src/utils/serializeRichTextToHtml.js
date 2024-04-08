import escapeHTML from 'escape-html';
import { Text } from 'slate';
import { twMerge } from 'tailwind-merge';

const serialize = (children, customClassNames) => {
  let html = '';

  children?.forEach((node, i) => {
    const classNames = {
      h1: twMerge('h1 mt-6', customClassNames?.h1),
      h2: twMerge('h2 mt-5', customClassNames?.h2),
      h3: twMerge('h3 mt-4', customClassNames?.h3),
      h4: twMerge('h4 mt-3', customClassNames?.h4),
      h5: twMerge('h5 mt-2', customClassNames?.h5),
      h6: twMerge('h6', customClassNames?.h6),
      p: twMerge('p-small', customClassNames?.p),
      ul: twMerge('ul', customClassNames?.ul),
      ol: twMerge('ol', customClassNames?.ol),
      li: twMerge('li', customClassNames?.li),
      blockquote: twMerge('blockquote', customClassNames?.blockquote),
      a: twMerge('a', customClassNames?.a),
    };

    if (Text.isText(node)) {
      let text = node.text ? escapeHTML(node.text) : '&nbsp;';

      if (node['primaryColor']) {
        text = `<span class='text-menzBlue-500'>${text}</span>`;
      }

      if (node.bold) {
        text = `<strong>${text}</strong>`;
      }

      if (node.code) {
        text = `<code>${text}</code>`;
      }

      if (node.italic) {
        text = `<em>${text}</em>`;
      }

      if (node.underline) {
        text = `<span class='underline'>${text}</span>`;
      }

      if (node.strikethrough) {
        text = `<span class='line-through'>${text}</span>`;
      }

      html += text;
    } else if (node) {
      switch (node.type) {
        case 'h1':
          html += `<h1 class='${classNames.h1}'>${serialize(node.children)}</h1>`;
          break;
        case 'h2':
          html += `<h2 class='${classNames.h2}'>${serialize(node.children)}</h2>`;
          break;
        case 'h3':
          html += `<h3 class='${classNames.h3}'>${serialize(node.children)}</h3>`;
          break;
        case 'h4':
          html += `<h4 class='${classNames.h4}'>${serialize(node.children)}</h4>`;
          break;
        case 'h5':
          html += `<h5 class='${classNames.h5}'>${serialize(node.children)}</h5>`;
          break;
        case 'h6':
          html += `<h6 class='${classNames.h6}'>${serialize(node.children)}</h6>`;
          break;
        case 'quote':
          html += `<blockquote class='blockquote'>${serialize(node.children)}</blockquote>`;
          break;
        case 'ul':
          html += `<ul class='${classNames.ul}'>${serialize(node.children)}</ul>`;
          break;
        case 'ol':
          html += `<ol class='${classNames.ol}'>${serialize(node.children)}</ol>`;
          break;
        case 'li':
          html += `<li class='${classNames.li} list-disc ml-4'>${serialize(node.children)}</li>`;
          break;
        case 'link':
          html += `<a class='${classNames.a}' href='${escapeHTML(node.url)}'>${serialize(node.children)}</a>`;
          break;
        case 'hr':
          html += '<hr>';
          break;
        default:
          html += `<p class='${classNames.p}'>${serialize(node.children)}</p>`;
          break;
      }
    }
  });

  return html;
};

export default serialize;

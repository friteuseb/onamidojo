import { parse, HTMLElement, TextNode, Node, NodeType } from 'node-html-parser'

interface LexicalTextNode {
  type: 'text'
  text: string
  format: number
  detail: number
  mode: string
  style: string
  version: 1
}

interface LexicalLinkNode {
  type: 'link'
  children: LexicalNode[]
  direction: 'ltr'
  format: ''
  indent: number
  version: 1
  fields: {
    linkType: 'custom'
    newTab: boolean
    url: string
  }
}

interface LexicalElementNode {
  type: string
  children: LexicalNode[]
  direction: 'ltr'
  format: ''
  indent: number
  version: 1
  tag?: string
  listType?: string
  start?: number
  value?: number
}

type LexicalNode = LexicalTextNode | LexicalLinkNode | LexicalElementNode

function textNode(text: string, format: number = 0): LexicalTextNode {
  return {
    type: 'text',
    text,
    format,
    detail: 0,
    mode: 'normal',
    style: '',
    version: 1,
  }
}

function elementNode(type: string, children: LexicalNode[], extra: Record<string, unknown> = {}): LexicalElementNode {
  return {
    type,
    children,
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    ...extra,
  } as LexicalElementNode
}

// Formats binaires Lexical : 1=bold, 2=italic, 8=underline, etc.
function getFormatFromTag(tagName: string): number {
  switch (tagName) {
    case 'STRONG':
    case 'B':
      return 1
    case 'EM':
    case 'I':
      return 2
    case 'U':
      return 8
    case 'S':
    case 'STRIKE':
      return 4
    default:
      return 0
  }
}

function isInlineTag(tagName: string): boolean {
  return ['STRONG', 'B', 'EM', 'I', 'U', 'S', 'STRIKE', 'A', 'SPAN', 'CODE'].includes(tagName)
}

function convertInlineChildren(node: HTMLElement, parentFormat: number = 0): LexicalNode[] {
  const result: LexicalNode[] = []

  for (const child of node.childNodes) {
    if (child.nodeType === NodeType.TEXT_NODE) {
      const text = (child as TextNode).text
      if (text) {
        result.push(textNode(text, parentFormat))
      }
    } else if (child.nodeType === NodeType.ELEMENT_NODE) {
      const el = child as HTMLElement
      const tag = el.tagName

      if (tag === 'A') {
        const href = el.getAttribute('href') || ''
        const linkChildren = convertInlineChildren(el, parentFormat)
        result.push({
          type: 'link',
          children: linkChildren.length > 0 ? linkChildren : [textNode(el.text || href, parentFormat)],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          fields: {
            linkType: 'custom',
            newTab: el.getAttribute('target') === '_blank',
            url: href,
          },
        })
      } else if (tag === 'BR') {
        result.push(elementNode('linebreak', []))
      } else if (tag === 'CODE') {
        // Inline code : format 16
        const codeText = el.text || ''
        if (codeText) {
          result.push(textNode(codeText, parentFormat | 16))
        }
      } else if (isInlineTag(tag)) {
        const format = parentFormat | getFormatFromTag(tag)
        result.push(...convertInlineChildren(el, format))
      } else {
        // Fallback : traiter comme inline
        result.push(...convertInlineChildren(el, parentFormat))
      }
    }
  }

  return result
}

function convertElement(node: HTMLElement): LexicalNode[] {
  const tag = node.tagName

  switch (tag) {
    case 'P': {
      const children = convertInlineChildren(node)
      return [elementNode('paragraph', children.length > 0 ? children : [textNode('')])]
    }

    case 'H1':
    case 'H2':
    case 'H3':
    case 'H4':
    case 'H5':
    case 'H6': {
      const children = convertInlineChildren(node)
      return [elementNode('heading', children.length > 0 ? children : [textNode('')], { tag: tag.toLowerCase() })]
    }

    case 'BLOCKQUOTE': {
      // Lexical blockquote contient des paragraphes
      const quoteChildren: LexicalNode[] = []
      for (const child of node.childNodes) {
        if (child.nodeType === NodeType.ELEMENT_NODE) {
          const el = child as HTMLElement
          if (el.tagName === 'P') {
            quoteChildren.push(...convertElement(el))
          } else {
            quoteChildren.push(...convertBlockNode(el))
          }
        } else if (child.nodeType === NodeType.TEXT_NODE) {
          const text = (child as TextNode).text.trim()
          if (text) {
            quoteChildren.push(elementNode('paragraph', [textNode(text)]))
          }
        }
      }
      if (quoteChildren.length === 0) {
        quoteChildren.push(elementNode('paragraph', [textNode('')]))
      }
      return [elementNode('quote', quoteChildren)]
    }

    case 'UL':
    case 'OL': {
      const listType = tag === 'UL' ? 'bullet' : 'number'
      const items: LexicalNode[] = []
      let index = 1
      for (const child of node.childNodes) {
        if (child.nodeType === NodeType.ELEMENT_NODE && (child as HTMLElement).tagName === 'LI') {
          const liChildren = convertInlineChildren(child as HTMLElement)
          items.push(elementNode('listitem', liChildren.length > 0 ? liChildren : [textNode('')], { value: index }))
          index++
        }
      }
      return [elementNode('list', items, { listType, start: 1, tag: tag.toLowerCase() })]
    }

    case 'HR': {
      return [{ type: 'horizontalrule', version: 1 } as unknown as LexicalElementNode]
    }

    case 'IMG': {
      // On ignore les images pour l'instant (elles nécessiteraient un upload)
      const alt = node.getAttribute('alt') || ''
      if (alt) {
        return [elementNode('paragraph', [textNode(`[Image: ${alt}]`, 2)])]
      }
      return []
    }

    case 'DIV':
    case 'SECTION':
    case 'ARTICLE': {
      return convertBlockNodes(node)
    }

    default: {
      // Traiter comme paragraphe si contient du texte
      const text = node.text?.trim()
      if (text) {
        const children = convertInlineChildren(node)
        return [elementNode('paragraph', children)]
      }
      return []
    }
  }
}

function convertBlockNode(node: HTMLElement): LexicalNode[] {
  if (isInlineTag(node.tagName)) {
    // Inline orphelin → wrapper dans un paragraphe
    const children = convertInlineChildren(node)
    return children.length > 0 ? [elementNode('paragraph', children)] : []
  }
  return convertElement(node)
}

function convertBlockNodes(parent: HTMLElement): LexicalNode[] {
  const result: LexicalNode[] = []

  for (const child of parent.childNodes) {
    if (child.nodeType === NodeType.TEXT_NODE) {
      const text = (child as TextNode).text.trim()
      if (text) {
        result.push(elementNode('paragraph', [textNode(text)]))
      }
    } else if (child.nodeType === NodeType.ELEMENT_NODE) {
      result.push(...convertBlockNode(child as HTMLElement))
    }
  }

  return result
}

export function htmlToLexical(html: string): Record<string, unknown> {
  const root = parse(html)
  const children = convertBlockNodes(root)

  // S'assurer qu'il y a au moins un paragraphe
  if (children.length === 0) {
    children.push(elementNode('paragraph', [textNode('')]))
  }

  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

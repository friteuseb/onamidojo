interface LexicalNode {
  type: string
  text?: string
  children?: LexicalNode[]
}

export function extractTextFromLexical(content: unknown): string {
  if (!content || typeof content !== 'object') return ''

  const root = content as { root?: LexicalNode }
  if (!root.root) return ''

  const texts: string[] = []

  function walk(node: LexicalNode) {
    if (node.text) texts.push(node.text)
    if (node.children) node.children.forEach(walk)
  }

  walk(root.root)
  return texts.join(' ')
}

export function calculateReadingTime(content: unknown): number {
  const text = extractTextFromLexical(content)
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

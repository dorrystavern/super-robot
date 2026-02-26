// Standard Dolch sight word lists organized by grade level.
// Kindergarten = Dolch Pre-Primer, 1st = Dolch Primer,
// 2nd = Dolch First Grade, 3rd = Dolch Second Grade

export const wordLists = {
  kindergarten: [
    'a', 'and', 'away', 'big', 'blue', 'can', 'come', 'down', 'find', 'for',
    'funny', 'go', 'help', 'here', 'I', 'in', 'is', 'it', 'jump', 'little',
    'look', 'make', 'me', 'my', 'not', 'one', 'play', 'red', 'run', 'said',
    'see', 'the', 'three', 'to', 'two', 'up', 'we', 'where', 'yellow', 'you'
  ],

  first: [
    'all', 'am', 'are', 'at', 'ate', 'be', 'black', 'brown', 'but', 'came',
    'did', 'do', 'eat', 'four', 'get', 'good', 'have', 'he', 'into', 'like',
    'must', 'new', 'no', 'now', 'on', 'our', 'out', 'please', 'pretty', 'ran',
    'ride', 'saw', 'say', 'she', 'so', 'soon', 'that', 'there', 'they', 'this',
    'too', 'under', 'want', 'was', 'well', 'went', 'what', 'white', 'who', 'will',
    'with', 'yes'
  ],

  second: [
    'after', 'again', 'an', 'any', 'as', 'ask', 'by', 'could', 'every', 'fly',
    'from', 'give', 'going', 'had', 'has', 'her', 'him', 'his', 'how', 'just',
    'know', 'let', 'live', 'may', 'of', 'old', 'once', 'open', 'over', 'put',
    'round', 'some', 'stop', 'take', 'thank', 'them', 'think', 'walk', 'were', 'when'
  ],

  third: [
    'always', 'around', 'because', 'been', 'before', 'best', 'both', 'buy', 'call',
    'cold', 'does', "don't", 'fast', 'first', 'five', 'found', 'gave', 'goes',
    'green', 'its', 'made', 'many', 'off', 'or', 'pull', 'read', 'right', 'sing',
    'sit', 'sleep', 'tell', 'their', 'these', 'those', 'upon', 'us', 'use', 'very',
    'wash', 'which', 'why', 'wish', 'work', 'would', 'write', 'your'
  ]
}

export const wordListMeta = {
  kindergarten: { label: 'Kindergarten', description: 'Dolch Pre-Primer (40 words)' },
  first:        { label: '1st Grade',    description: 'Dolch Primer (52 words)' },
  second:       { label: '2nd Grade',    description: 'Dolch First Grade (40 words)' },
  third:        { label: '3rd Grade',    description: 'Dolch Second Grade (46 words)' },
}

export function parseCustomWords(input) {
  return input
    .split(',')
    .map(w => w.trim())
    .filter(w => w.length > 0)
}

export function shuffleWords(words) {
  const arr = [...words]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

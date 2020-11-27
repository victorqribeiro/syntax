(() => {
const reservedWords = [
    "abstract", "arguments", "await", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue", "debugger", 
    "default", "delete", "do", "double", "else", "enum", "eval", "export", "extends", "false", "final", "finally", "float", "for", 
    "function", "goto", "if", "implements", "import", "in", "instanceof", "int", "interface", "let", "long", "native", "new", "null", 
    "package", "private", "protected", "public", "return", "short", "static", "super", "switch", "synchronized", "this", "throw", 
    "throws", "transient", "true", "try", "typeof", "var", "void", "volatile", "while", "with", "yield"
]

const objectsPropertiesMethods = [
    "Array", "Date", "hasOwnProperty", "Infinity", "isFinite", "isNaN", "isPrototypeOf", "length", "Math", "NaN", "name", "Number", 
    "Object", "prototype", "String", "toString", "undefined", "valueOf"
]

const rules = [
    {regex: `\\b(${reservedWords.join('|')})\\b`, params: ['g'], replaceWith: '¹$1¹'},
    {regex: `\\b(${objectsPropertiesMethods.join('|')})\\b`, params: ['g'], replaceWith: '²$1²'},
    {regex: '(\'.*\')|(\".*\")|(\`.*\`)', params: ['g'], replaceWith: '³$&³'},
    {regex: '(\\$\{.*\})', params: ['g'], replaceWith: '¹$1¹'},
    {regex: '(\#.*)', params: ['g'], replaceWith: '⁴$1⁴'},
    {regex: '¹([^¹]*)¹', params: ['g'], replaceWith: '<spam class="reserved">$1</spam>'},
    {regex: '²([^²]*)²', params: ['g'], replaceWith: '<spam class="methods">$1</spam>'},
    {regex: '³([^³]*)³', params: ['g'], replaceWith: '<spam class="variable">$1</spam>'},
    {regex: '⁴([^⁴]*)⁴', params: ['g'], replaceWith: '<spam class="comment">$1</spam>'},
    {regex: '(/\\*[^*]*\\*+(?:[^/*][^*]*\\*+)*/)', params: ['g'], replaceWith: '<spam class="comment">$1</spam>'},
    {regex: '([+-]?([0-9]*[.])?[0-9]+)', params: ['g'], replaceWith: '<spam class="number">$1</spam>'},
]

const format = (code) => {
    let text = code.innerText.trim()
    for(const rule of rules)
        text = text.replace(new RegExp(rule.regex, ...rule.params), rule.replaceWith)
    return text.split(/\n/).map(line => `<div>${line}</div>`).join('')
}

const formatAll = () => {
    for(const code of document.querySelectorAll('code'))
        code.innerHTML = format(code)
}

formatAll()
})()

const res = await fetch('/api/chat', { method: 'POST', body: '...' })
const reader = res.body.getReader()
const decoder = new TextDecoder()
let buffer = ''

while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })

    const lines = buffer.split('\n')
    buffer = lines.pop()
    for(const line of lines){
        if(line.startsWith('data:')){
            const content = line.replace('data:','').trim()
            output += content
        }
    }
}
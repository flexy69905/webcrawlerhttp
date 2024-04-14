const {normalizeUrl,getURLsFromHTML} = require('./crawl.js')
const {test,expect} = require('@jest/globals')

test('normalizeUrl strip protocol', ()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})


test('normalizeUrl strip trailing slash', ()=>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip http', ()=>{
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', ()=>{
    const inputHTMLbody = `
    <html>
        <body>
            <a href = "https://blog.boot.dev/">
                Boot.dev blog
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLbody,inputBaseUrl)
    const expected = ["https://blog.boot.dev/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', ()=>{
    const inputHTMLbody = `
    <html>
        <body>
            <a href = "/path/">
                Boot.dev blog
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLbody,inputBaseUrl)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', ()=>{
    const inputHTMLbody = `
    <html>
        <body>
            <a href = "https://blog.boot.dev/path1/">
                Boot.dev blog path1 
            </a>
            <a href = "/path2/">
                Boot.dev blog path2
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLbody,inputBaseUrl)
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML  invalid', ()=>{
    const inputHTMLbody = `
    <html>
        <body>
            <a href = "invalid">
                invalid url
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLbody,inputBaseUrl)
    const expected = []
    expect(actual).toEqual(expected)
})
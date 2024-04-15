const {JSDOM} = require('jsdom')

async function crawlpage(baseUrl,currentURl,pages){
    


    const baseUrlObj = new URL(baseUrl)
    const currentURlObj = new URL(currentURl)

    if(baseUrlObj.hostname != currentURlObj.hostname){
        return pages
    }

    const normalizedCurrentUrl = normalizeUrl(currentURl)
    if(pages[normalizedCurrentUrl] > 0){
        pages[normalizedCurrentUrl] ++
        return pages
    }

    pages[normalizedCurrentUrl] = 1

    console.log(`actively crawling ${currentURl}`)

    try{
        const resp = await fetch(currentURl)

        if(resp.status > 399){
            console.log(`error in fetch with status code ${resp.status} on page ${currentURl}`)
            return pages
        }

        const contentType = resp.headers.get('content-type')
        if(!contentType.includes('text/html')){
            console.log(`non html respone,content-type: ${contentType} on page ${currentURl}`)
            return pages
        }
        const htmlBody = await resp.text()

        const nextUrls = getURLsFromHTML(htmlBody,baseUrl)

        for (const nextURl of nextUrls){
            pages = await crawlpage(baseUrl, nextURl, pages)
        }
    }catch(err){
        console.log(`error in fetch:${err.message}, on page ${currentURl}`)
    }

    return pages
}

function getURLsFromHTML(htmlbody,baseUrl){
    const urls= []
    const dom = new JSDOM(htmlbody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for(const linkElement of linkElements){
        if(linkElement.href.slice(0,1) === '/'){
            //relative url
            try{
                const urlObj = new URL(`${baseUrl}${linkElement.href}`)
                urls.push(urlObj.href)
            }catch(err){
                console.log("error with relative url ")
            }
        }else{
            try{
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            }catch(err){
                console.log("error with absolut url ")
            }
            
        }
    }
    return urls
}



function normalizeUrl(urlString){
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0,-1)
    }
    return hostPath
}

module.exports = {
    normalizeUrl,
    getURLsFromHTML,
    crawlpage
}
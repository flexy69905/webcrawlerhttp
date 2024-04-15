function printReport(pages){
    console.log("=========")
    console.log("report")
    console.log("=========")   
    const sortedPages = sortPages(pages) 
    for(const sortpage in sortedPages){
        const url = sortedPages[0]
        const hits = sortedPages[1]
        console.log(`Found ${hits} links to url: ${url}`)
    }
    console.log("=========")
    console.log("End report")
    console.log("=========") 
}


function sortPages(pages){
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a,b)=>{
        ahits = a[1]
        bhits = b[1]
        return b[1] - a[1]
    })
    return pagesArr
}


module.exports = {
    sortPages,
    printReport
}
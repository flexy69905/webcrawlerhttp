const {crawlpage} = require('./crawl.js')

console.log('hello')

async function main(){
    if(process.argv.length < 3){
        console.log("No website provided")
        process.exit(1)
    }
    if(process.argv.length > 3){
        console.log("too many cmd commands")
        process.exit(1)
    }
    const baseUrl = process.argv[2]

    console.log(`starting crawl for website ${baseUrl}`)

    const pages = await crawlpage(baseUrl,baseUrl,{})

    for( const page of Object.entries(pages)){
        console.log(page)
    }
    
}
main()
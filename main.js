const {crawlpage} = require('./crawl.js')

console.log('hello')

function main(){
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

    crawlpage(baseUrl)
    
}
main();
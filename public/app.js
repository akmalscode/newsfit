console.log('script loaded')

$('#scrape-button').on('click', function() {
    console.log('button clicked')
    $.get('/scrape').then(function(res) {
        console.log(res)
        res.forEach(function(article) {

            $('#articles').append(`
        
            <div>
                <h1>${article}</h1>
            </div>
        
        `)

        })
    })
})
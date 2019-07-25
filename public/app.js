$('#scrape-button').on('click', function() {
    $.get('/scrape').then(function() {

        console.log('scraped')
    })
})
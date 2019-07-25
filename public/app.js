console.log('script loaded')


function attachSaveListener() {
    $('.save-article').on('click', function(e) {
        $.post('/save-article', {
            link: e.target.value
        })
    })
}

$('#scrape-button').on('click', function() {
    $.get('/scrape').then(function(res) {
        res.forEach(function(article) {

            $('#articles').append(`
        
            <div>
                <h2>${article.header}</h2>
                <hr />
                <button class="save-article" value="${article.link}">Save Article</button>
            </div>
        
        `)

        })

        attachSaveListener();
    })
})
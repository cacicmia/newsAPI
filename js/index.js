let newsDisplay = {
    init () {
    
    $('#search-bar').submit(this.performSearch);
    
    },
    performSearch (e) {
        e.preventDefault();
        this.queryValue = $('#search-input').val();
        $.getJSON(`https://newsapi.org/v2/top-headlines?q=${this.queryValue}&apiKey=447fc2f2b2f742588d178279786b6a9a`, function(response){console.log(response)});
    },
    clearNews () {

    }

}
newsDisplay.init();
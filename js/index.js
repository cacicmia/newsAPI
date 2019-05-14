let newsDisplay = {
    init () {
    this.img= $('#news-img');
    this.heading =  $('#news-heading');
    this.author = $('#news-author');
    this.content= $('#news-content');
    this.origin = $('#news-origin');
    $('#search-bar').submit(this.performSearch);
    this.arrowLeft= $('#arrow-left');
    this.arrowRight= $('#arrow-right');
    
    },
    performSearch (e) {
        e.preventDefault();
        this.queryValue = $('#search-input').val();
        $.getJSON(`https://newsapi.org/v2/top-headlines?q=${this.queryValue}&apiKey=447fc2f2b2f742588d178279786b6a9a`).done(newsDisplay.respond);
    },
    respond (response){
        console.log(response);
        
        if (response.articles.length>0){
            newsDisplay.current = 0;
            newsDisplay.articles =  response.articles.slice(0,5);
        newsDisplay.renderNews(newsDisplay.articles[0]);
        } else {
            noImage();
        }
    },
   
    renderNews (news) {
        console.log(news);
        let articleClip= ((news.content) ?  news.content.substring(0,50): news.description).concat('...') ;
        this.img.attr('src',news.urlToImage);
       this.heading.html(news.title);
        this.author.html(news.author);
       this.content.html(articleClip);
        this.origin.attr('href', news.url);
        this.arrowLeft.click(this.slide.bind(this,false));
        this.arrowRight.click(this.slide.bind(this,true));

    }, 
    slide (n) {
        this.arrowLeft.off('click');
        this.arrowRight.off('click');
        console.log('current',this.current);
        console.log('articles',this.articles);
        this.currentChange(n);
        console.log(this.current)
            this.renderNews(this.articles[this.current]);
       
    },
    noImage () {
       console.log('this should clean the screen');
    },
    currentChange(n){
        let last=this.articles.length-1;
        if (n){
            this.current=(this.current===last ? 0 : this.current+1);
           
        } else {
            this.current = (this.current ===0 ? last : this.current-1);
           
        }

    }
    

}
newsDisplay.init();

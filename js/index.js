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
        
        newsDisplay.queryValue = $('#search-input').val();
        let url = `https://newsapi.org/v2/everything?q=${newsDisplay.queryValue}&apiKey=447fc2f2b2f742588d178279786b6a9a`;
        $.ajax(url).done(newsDisplay.respond);
    },
    respond (response){
              newsDisplay.articles=[];
         if (response.articles.length>0){
            newsDisplay.current = 0;
            newsDisplay.articles =  response.articles.slice(0,5);
          
        newsDisplay.renderNews(newsDisplay.articles[0]);
        } else {
             newsDisplay.noContent();
           
            
            
        }
    },
   
    renderNews (news) {

        if (news.urlToImage) {    
        this.img.attr('src',news.urlToImage);
        } else {
        this.img.attr('src',"./Asseti/Placeholder.jpg");   
        }
        this.heading.html(news.title);
        this.author.html(news.author);
       this.content.html(this.adjustContent(news.content, news.description));
        this.origin.attr('href', news.url);
        this.arrowLeft.click(this.slide.bind(this,false));
        this.arrowRight.click(this.slide.bind(this,true));

    }, 
    adjustContent(content, description){
        let newContent ="";
        if (content){ 
        let arr= content.split(' ');
        if (arr.length<50) {
       newContent= arr.slice(0, arr.length-2).join(' ');
        } else {
            newContent= arr.slice(0,49).join(' ');
        }
      
        } else if (description){
           
           newContent = description; 
        } else {
            newContent= 'No content available';
        }
        
        return newContent.concat('...') ;
    },
    slide (n) {
     
        this.arrowLeft.off('click');
        this.arrowRight.off('click');
        
        if (this.articles.length){
        this.currentChange(n);
        this.renderNews(this.articles[this.current]);
       
        } else {
           
        }
        },
    noContent () {
        
        this.img.attr('src',"./Asseti/Placeholder.jpg");
        this.heading.html(this.queryValue);
        this.author.html('');
        this.origin.attr('href','#');
        this.articles= [];
        this.content.html('Ne postoje rezultati');
      
       
    },
    currentChange(n){
        if (newsDisplay.articles.length > 0) {
        let last=this.articles.length-1;
        if (n){
            this.current=(this.current===last ? 0 : this.current+1);
           
        } else {
            this.current = (this.current ===0 ? last : this.current-1);
           
        }

    }
}
    

}
newsDisplay.init();

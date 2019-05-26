let newsDisplay = {
    init () {
        /* reach DOM  */
    this.container = $('#news-display') 
        
    $('#search-bar').submit(this.performSearch);
  
    
    },
    /**
     * @description perform ajax call on news API 
     */
    performSearch (e) {
        e.preventDefault(); 
        newsDisplay.noContent();
    
        newsDisplay.queryValue = $('#search-input').val();
        newsDisplay.lang= $('#lang').val();
        let url;
        if (newsDisplay.lang) {
            url = `https://newsapi.org/v2/everything?q=${newsDisplay.queryValue}&language=${newsDisplay.lang}&apiKey=447fc2f2b2f742588d178279786b6a9a`;
        } else {
         url = `https://newsapi.org/v2/everything?q=${newsDisplay.queryValue}&apiKey=447fc2f2b2f742588d178279786b6a9a`;
        }
        $.ajax(url).done(newsDisplay.respond);
    },
    
    respond (response){
       
              newsDisplay.articles=[];
         if (response.articles.length>0){
            
            newsDisplay.articles =  response.articles.slice();
         
        newsDisplay.renderNews();
       
        } else {
             newsDisplay.noContent();
           
            
            
        }
    },
   /**
    * @description adds articles to the DOM 
    * */
    renderNews () {
        $.each(newsDisplay.articles,(i,article)=>{
            this.container.append(this.createArticle(article));
            

        });
       
      

    },
    /**
     * @desription build and parse DOM for every article
     * @param {object} article article data
     * @return article DOM element
      */ 
  createArticle(article){
    if (!article.urlToImage) {    
      
        article.urlToImage="./Asseti/Placeholder.jpg";   
        }
       
        if (!article.author) {
            article.author=' nepoznat';
        }
      
    let articleDOM= ` <article class="news">
    <img src="${article.urlToImage}" alt="news preview" class="news-img">
    <div class="news-article">
        <h2 class="news-heading">${article.title}</h2>
        <p class="small date-small">Objavljeno:<span class="news-date">${this.setDate(article.publishedAt)}</span></p>
        <p class="small author-small">Autor:<span class="news-author">${article.author}</span></p>
        <p class="news-content">${this.adjustContent(article)}</p>
        <a class="news-origin" href="${article.url}" target="blank"><p>Pročitaj članak</p></a>

    </div>
    </article>`;
        return $.parseHTML(articleDOM);
  },
  /**
   * @description convert date format
   * @returns {string} date to render
    */
  setDate(date){
     date= new Date(date);
    let year= date.getFullYear();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[date.getMonth()];
    day = date.getDate();
    return `${month} ${day}, ${year}`;
  },
  /**
   * @description adjust data for rendering
   * @param {object} article
   *  
   */
    adjustContent(article){
        let content = article.content,
        description = article.description;
      
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
   /**
    * @description clear container
    */
    noContent () {
        
        this.container.empty();
      
       
    }
    
}
    


newsDisplay.init();

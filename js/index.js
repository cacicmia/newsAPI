let newsDisplay = {
    init () {
    this.container = $('#news-display') 
  
    $('#search-bar').submit(this.performSearch);
  
    
    },
    performSearch (e) {
        e.preventDefault(); 
        
        newsDisplay.queryValue = $('#search-input').val();
        let url = `https://newsapi.org/v2/everything?q=${newsDisplay.queryValue}&apiKey=447fc2f2b2f742588d178279786b6a9a`;
        $.ajax(url).done(newsDisplay.respond);
    },
    respond (response){
        console.log(response);
              newsDisplay.articles=[];
         if (response.articles.length>0){
            
            newsDisplay.articles =  response.articles.slice();
          
        newsDisplay.renderNews();
       
        } else {
             newsDisplay.noContent();
           
            
            
        }
    },
   
    renderNews () {
        $.each(newsDisplay.articles,(article)=>{
            this.container.append(createArticle(article));
            

        });
       
      

    }, 
  createArticle(article){
    if (!article.urlToImage) {    
      
        article.urlToImage("./Asseti/Placeholder.jpg");   
        }
       
        if (!article.author) {
            article.author(' nepoznat');
        }
      
    let articleDOM= ` <article class="news">
    <img src="${article.urlToImage}" alt="news preview" class="news-img">
    <div class="news-article">
        <h2 class="news-heading">${article.title}</h2>
        <p class="small">Autor:<span class="news-author">${article.author}</span></p>
        <p class="news-content">${adjustContent(article)}</p>
        <a class="news-origin" href="${article.url}" target="blank"><p>Pročitaj članak</p></a>

    </div>
    </article>`;
        return $.parseHTML(articleDOM);
  },
    adjustContent(article){
        let content = article.content,
        description = article.description,
        srcname = article.source.name;
        let newContent ="";
        if (srcname==="Jutarnji.hr"){
            newContent= description;
        }else {
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
    }
       
        return newContent.concat('...') ;
    },
   
    noContent () {
        
        this.container.
      
       
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

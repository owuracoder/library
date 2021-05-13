let myLibrary = []


function Book(author,title,pages,feedback){
    this.author = author
    this.title = title
    this.pages = pages
    this.feedback = feedback
}

Book.prototype.status = ''

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}



function showBooks(){

    let testLibrary = localStorage.getItem('myLibrary')
    
    
    if(testLibrary === null){
        return;
    } 

    let myLibrary = JSON.parse(testLibrary)

    for(let i = 0; i < myLibrary.length; i++){

        let card = document.createElement('div')
        card.id = `book-${i}`
        card.classList.add('card')
    
        card.innerHTML = `
        <h2>Author <i class="fas fa-user-tie"></i> : <span id="author"></span></h2>
        <h2>Title <i class="fas fa-book-reader"></i> : <span id="title"></span></h2>
        <h2>Pages <i class="fas fa-bookmark"></i> : <span id="pages"></span></h2>
        <h2>Feedback <i class="fas fa-comment"></i> : <span id="feedback"></span></h2>
        <h2 id='readtag'>Read <i class="fas fa-glasses"></i> : <span id="status"></span></h2>
        <div id='read-img'><h2>Read This? <h2/><button id='corr'><i class="fas fa-check-circle fa-lg"></i></button><i id='wrong' class="fas fa-times-circle fa-lg"></i></div>
        <button id='delete-card' class='del-card'>Delete Book</button>
        `
        
        let author = card.querySelector('#author')
        let title = card.querySelector('#title')
        let pages = card.querySelector('#pages')
        let feedback = card.querySelector('#feedback')
        let readTag = card.querySelector('#readtag')
        
        for(let j = 0; j < Object.keys(myLibrary[i]).length; j++){
    
            let propName = Object.keys(myLibrary[i])[j]
        
            if(propName == 'author'){
                author.textContent = myLibrary[i][propName]
                
                
            }else if(propName == 'title'){
                title.textContent = myLibrary[i][propName]
                
            } else if(propName == 'pages'){
                pages.textContent = myLibrary[i][propName]
            } else if(propName == 'feedback'){
                feedback.textContent = myLibrary[i][propName]
            }
    
    
        }

        if(readTag.childNodes[3].textContent == ''){
            readTag.style.display = 'none'
        } 
    
        container.appendChild(card)
    }

    notReadBook = document.querySelectorAll('#wrong')
    notReadThis()

    readBook = document.querySelectorAll('#corr')
    readThis()



    deleteCard = document.querySelectorAll('.del-card')
    removeBtn()
}

function removeBtn(){
    for(let i = 0; i < deleteCard.length; i++){
        deleteCard[i].addEventListener('click',function(e){
            if(e.target.parentElement.id == `book-${i}`){
                e.target.parentElement.remove()
                let current = localStorage.getItem('myLibrary')
                let myLibrary = JSON.parse(current)
                myLibrary.splice(i,1)
                localStorage.setItem('myLibrary', JSON.stringify(myLibrary)) 
            }
        })
    }
}

function readThis(){
    for(let i=0; i<readBook.length; i++){
        readBook[i].addEventListener('click',function(e){
            let readFont = e.target.closest('#read-img').previousElementSibling
            let span = readFont.querySelector('#status')
            span.textContent = 'I have read This'
            readFont.style.display = 'block'
            myLibrary[i].status = 'read'
        })
      }
}

function notReadThis(){
    for(let i=0; i<notReadBook.length; i++){
        notReadBook[i].addEventListener('click',function(e){
            let notreadFont = e.target.closest('#read-img').previousElementSibling
            let span = notreadFont.querySelector('#status')
            span.textContent = 'Not Seen This'
            notreadFont.style.display = 'block'
            myLibrary[i].status = 'not read'
        })
      }
}


let container = document.querySelector('.big-container')

const main = document.querySelector('.main')

const button = document.querySelector('.btn')

const form = document.querySelector('.form-container')

const addNewBook = document.querySelector('#add-book')

const cancel = document.querySelector('#red')

const addBook = document.querySelector('#green')

let formAuthor = document.querySelector('#form-author')

let formTitle = document.querySelector('#form-title')

let formPages = document.querySelector('#form-pages')

let formFeedback = document.querySelector('#form-feedback')



showBooks()

addBook.addEventListener('click',function(){
    
    let author = formAuthor.value
    let title = formTitle.value
    let pages = formPages.value
    let feedback = formFeedback.value
    let newBook = new Book(author,title,pages,feedback)


    if(localStorage.getItem('myLibrary') != null){
        let current = localStorage.getItem('myLibrary')
        myLibrary = JSON.parse(current)
        myLibrary.push(newBook)
    }else {
        myLibrary.push(newBook)
    }

    if (storageAvailable('localStorage')) {
        
        localStorage.setItem('myLibrary',JSON.stringify(myLibrary))
       
      }else {
        alert('There is no storage space for you')
      }

    while(container.firstChild){
        container.removeChild(container.firstChild)
    }
    showBooks()
    form.style.display = 'none'
    container.classList.remove('blur')
})

cancel.addEventListener('click',function(){
    form.style.display = 'none'
    container.classList.remove('blur')

})

addNewBook.addEventListener('click',function(){
    container.classList.add('blur')
    form.style.display = 'block'
})












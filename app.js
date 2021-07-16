class Book{
    constructor(author,title,isbn){
        this.author = author
        this.title = title
        this.isbn = isbn
    }
}


class UIController{
    addBook(book){
        let bookList = document.getElementById('book-list')
        let bookDetails = `<tr>
        <td>${book.author}</td>
        <td>${book.title}</td>
        <td>${book.isbn}</td>
        <td><i class="far fa-trash-alt"></i></td>
        </tr>`
        
        bookList.innerHTML += bookDetails

        let author = document.getElementById('author')
        let title = document.getElementById('title')
        let isbn = document.getElementById('isbn')

        author.value = ''
        title.value = ''
        isbn.value = ''
    }

    showAlert(message,style){
        const container = document.querySelector('.container')
        const bookForm = document.getElementById('book-form')
        const alertBox = document.createElement('div')

        alertBox.textContent = message
        alertBox.classList.add(style)
        container.insertBefore(alertBox,bookForm)

        setTimeout(function(){
           alertBox.remove() 
        }, 2000)
    }

    removeBook(trashBind){
        trashBind.parentElement.parentElement.remove()  
    }
}


class Store {
   static getBook(){
     let savedBook = localStorage.getItem('book')
     if(savedBook == null){
         return savedBook = []
     } else {
         return JSON.parse(savedBook)
     }
    }

    static removeBook(btnClicked){
        let btn = btnClicked.parentElement.previousElementSibling.textContent

        let storedBooks = this.getBook()
        storedBooks.forEach(function(book){
            if(book.isbn === btn ){
                let bookIndex = storedBooks.indexOf(book)
                
                storedBooks.splice(bookIndex,1)
            }
        })

        localStorage.setItem('book',JSON.stringify(storedBooks))
    }

   static addBook(book){
    let alBook = this.getBook()
    alBook.push(book)
    localStorage.setItem('book',JSON.stringify(alBook))
    }
}

const uiController = new UIController()

const addBtn = document.getElementById('add-btn')

addBtn.addEventListener('click',function(e){
   const author = document.getElementById('author').value
   const title = document.getElementById('title').value
   const isbn = document.getElementById('isbn').value
   
   const book = new Book(author,title,isbn)

   if(author === '' || title === '' || isbn === ''){
       uiController.showAlert('Boxes cannot be empty','error')

   } else {
        uiController.addBook(book)
        uiController.showAlert('Successfully Added','success')
        Store.addBook(book)
   }

    e.preventDefault()
})

const bookList = document.getElementById('book-list').addEventListener('click',function(event){
    let trashBtn = event.target
    if(trashBtn.className.includes('far')){
        uiController.removeBook(trashBtn)
        Store.removeBook(trashBtn)
        uiController.showAlert('Book removed successfully','success')
    }


})
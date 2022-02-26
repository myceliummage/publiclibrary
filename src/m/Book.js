function Book(slots) {
	this.isbn = slots.isbn;
	this.title = slots.title;
	this.year = slots.year;

}

// Class-level entity table of all book instances managed by application
Book.instances = {};

// Class-level method to retreive books from local storage. uses Local Storage API
Book.retrieveAll = function () {
	var booksString="";
	try {
		if (localStorage.getItem("books")) {
			booksString = localStorage.getItem("books");
		}
	} catch (e) {
		alert("Error when reading from Local Sorage\n" + e);
	}
	if (booksString) {
		const books = JSON.parse(booksString);
		const keys = Object.keys(books);
		console.log(`${keys.length} books loaded.`);
		for (const key of keys) {
			Book.instances[key] = books[key];
		}
	}
};

// saves all books in Book.instances to local storage
Book.saveAll = function () {
	var error = false;
	try {
		const booksString = JSON.stringify( Book.instances);
		localStorage.setItem("books", booksString);
	} catch (e) {
		alert("Error when writing to Local Storage\n" + e);
		error = true;
	}
	if (!error) {
		const nmrOfBooks = Object.keys( Book.instances).length;
		console.log(`${nmrOfBooks} books saved.`);
		}
};

// create new Book instance in Book.instances
Book.add = function (slots) {
	const book = new Book( slots);
	//add book to the collection of Book.instances
	Book.instances[slots.isbn] = book;
	console.log('Book ${slots.isbn} created!');
}

// retreive Book from Book.instances and update attributes
Book.update = function (slots) {
	const book = Book.instances[slots.isbn],
	      year = parseInt( slots.year); book.title = slots.title;
	if (book.title !== slots.title) book.title = slots.title;
	if (book.year !== year) book.year = year;
	console.log(`Book ${slots.isbn} modified!`);
};

// delete Book instance from Book.instances
Book.destroy = function (isbn) {
	if (Book.instances[isbn]){
		//JSON.parse(localStorage[books]);
		delete Book.instances[isbn]
		const booksString = JSON.stringify( Book.instances);
		localStorage.setItem("books", booksString);
		console.log(`Book ${isbn} deleted`);
	} else {
		console.log(`no such book exists!!! no books with ISBN ${isbn} at all!! sadddd!!!!`)};
};

// test data 
Book.createTestData = function () {
	console.log("yooooo wasssuppp");
	Book.instances["006251587X"] = new Book(
		{isbn:"006251587X", title:"Weaving the Web", year:2000});
	Book.instances["0465026567"] = new Book(
		{isbn:"0465026567", title: "Godel, Escher, Bach", year:1999});
	Book.instances["0465030793"] = new Book(
		{isbn:"0465030793", title:"I Am A Strange Loop", year:2008});
	Book.saveAll();
};

// clear all data from local storage
Book.clearData = function () {

	if (window.confirm("y u do dis. u for real homie???")) {
		localStorage.setItem("books", "{}");
	}
};
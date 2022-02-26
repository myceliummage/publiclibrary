pl.v.deleteBook = {
	setupUserInterface: function () {
		const formE1 = document.forms["Book"],
			deleteButton = formE1.commit,
			selectBookE1 = formE1.selectBook;
		Book.retrieveAll(); // load all book objects
		// populate the selection list with books
		for (const key of Object.keys(Book.instances)) {
			const book = Book.instances[key],
				optionE1 = document.createElement("option");
			optionE1.text = book.title;
			optionE1.value = book.isbn;
			selectBookE1.add(optionE1, null);
		}
		// set an event handler for the delete button
		deleteButton.addEventListener("click", 
			pl.v.deleteBook.handleDeleteButtonClickEvent);

	},
	
	handleDeleteButtonClickEvent: function () {
		const selectE1 = document.forms["Book"].selectBook,
			isbn = selectE1.value;
		if (isbn) {
			Book.destroy(isbn);
			// remove deleted book from select options
			selectE1.remove(selectE1.selectedIndex);
		}
	}
}

pl.v.updateBook = {
	setupUserInterface: function () {
		const formE1 = document.forms["Book"],
			saveButton = formE1.commit,
			selectBookE1 = formE1.selectBook;
		Book.retrieveAll(); // load all book objects
		// populate the selection list with books
		for (const key of Object.keys(Book.instances)) {
			const book = Book.instances[key];
			const optionE1 = document.createElement("option");
			optionE1.text = book.title;
			optionE1.value = book.isbn;
			selectBookE1.add( optionE1, null);
		}
		// when a book is selected, fill the form with its data
		selectBookE1.addEventListener("change",
			pl.v.updateBook.handleBookSelectionEvent);
		// set an event handler for the submit/save button
		saveButton.addEventListener("click",
			pl.v.updateBook.handleSaveButtonClickEvent);
		// handle the event when the browser window/tab is closed
		window.addEventListener("beforeunload", Book.saveAll);
	},
	
	handleBookSelectionEvent: function () {
		const formE1 = document.forms["Book"],
			selectBookE1 = formE1.selectBook,
			key = selectBookE1.value;
		if (key) {
			const book = Book.instances[key]
			formE1.isbn.value = book.isbn;
			formE1.title.value = book.title;
			formE1.year.value = book.year;
		} else {
			formE1.reset();
		}
	},

	handleSaveButtonClickEvent: function () {
		const formE1 = document.forms["Book"],
			selectBookE1 = formE1.selectBook;
		const slots = {isbn: formE1.isbn.value,
			title: formE1.title.value,
			year: formE1.year.value
		};
		Book.update(slots);
		// update the selection list option element
		selectBookE1.options[selectBookE1.selectedIndex].text = slots.title;
		formE1.reset();
	}
}
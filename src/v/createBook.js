pl.v.createBook = {
	setupUserInterface: function () {
		const saveButton = document.forms["Book"].commit;
		// load all book objects
		Book.retrieveAll();
		// set an event handler for the save/submit button
		saveButton.addEventListener("click", pl.v.createBook.handleSaveButtonClickEvent);
		// handle the event when the browser window/tab is closed
		window.addEventListener("beforeunload", function () {
			Book.saveAll();
		});
	},
	handleSaveButtonClickEvent: function () {
		const formE1 = document.forms["Book"];
		const slots = { isbn: formE1.isbn.value,
			        title: formE1.title.value,
				year: formE1.year.value };
		Book.add( slots);
		formE1.reset();
	}
};

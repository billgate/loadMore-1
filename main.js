var loadmore = $('.container').loadmore({
	url : '/books', // url becomes /books?page=1
	name: 'page',
	page: 1, 		// initial page
	offset: 100, // number of pixels from the bottom 
	loader: '<div class="loader">Loading..</div>', // loader 
	contentClass: 'content' // the container that actually holds the content
});

loadmore.success = function(response) {
	// response do something
	console.log(response);

	//if (all data finished)
	//this.stopListner(); // removes the scroll event
}

loadmore.error = function(response) {

}
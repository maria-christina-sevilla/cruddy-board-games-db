// console.log("JS good to go, sir!");

$(function() {
    // listen for a "submit" event for the edit page. the edit form will live
    // at the path GET /game/:name/edit. Use AJAX to send a PUT request to the
    // appropriate URL

    $('#edit-game').on('submit', function(event) {
        event.preventDefault();
        var element = $(this);
        var url = element.attr('action');
        var method = element.attr('method');
        var formData = element.serialize();

        console.log(formData);
        console.log(method);

        $.ajax({
            method: method,
            url: url,
            data: formData
        }).done(function(data) {
            // get data returned from the PUT route
            console.log(data);

            // refresh the page we're on using GET to display the item details.
            window.location = '/';
        });
    });

    // listen for clicks on "delete" links. use AJAX to send a DELETE HTTP request
    // to the appropriate URL

    $('.delete-link').on('click', function(event) {
        event.preventDefault();
        var url = $(this).attr('href');

        $.ajax({
            url: url,
            method: 'DELETE'
        }).done(function() {
            window.location = '/';
        });
    });
});

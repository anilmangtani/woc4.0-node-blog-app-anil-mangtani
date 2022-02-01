//add user code
$("#add-blog").submit(function(event){
    alert("Data inserted!")
})

//update user code
//to get information of the page (this OR #update-blog) serializeArray : returns the array
$("#update-blog").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:3000/api/blog/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})



// delete code
if(window.location.pathname == '/'){
    $ondelete = $('a.delete');
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url":`http://localhost:3000/api/blog/${id}`,
            "method":"DELETE"
        }

        if(confirm("Do you really want to this blog")){
            $.ajax(request).done(function(response){
                alert("Blog Deleted");
                location.reload()
            })
        }

    })
}

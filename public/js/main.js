$(document).ready(function(){
    $('.delete-downtimeevent').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url: '/downtimeevent/'+id,
            success: function(response){
                alert('Deleting event');
                window.location.href='/';
            },
            error: function(err){
                console.log(err);
            }
        });
    });
});

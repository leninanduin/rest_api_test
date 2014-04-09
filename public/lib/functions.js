
function resetFrom(f_id){
    document.getElementById(f_id).reset();
    return false;
}
function getUsers(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/user/list',        
        success: function(d){        
            $("#result > pre").html(JSON.stringify(d, undefined, 2));
        },
        error: function(d){
            $("#result > pre").html(JSON.stringify(d, undefined, 2));  
        }        
    });
    
    return false;
}

function getById(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/user/get/'+ $('[name="get_u_id"]').val(),
        success: function(d){        
            $("#result > pre").html(JSON.stringify(d, undefined, 2));
            if(!d.error)
                resetFrom("get_by_id");
        },
        error: function(d){
            $("#result > pre").html(JSON.stringify(d, undefined, 2));  
        }        
    });
    
    return false;
}

function addUser(){    
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/user/add/',
        data: $("#add").serialize() ,
        success: function(d){        
            $("#result > pre").html(JSON.stringify(d, undefined, 2));
            if(!d.error)
                resetFrom("add");
        },
        error: function(d){
            $("#result > pre").html(JSON.stringify(d, undefined, 2));  
        }        
    });
    
    return false;
}

function editUser(){    
    $.ajax({
        type: 'PUT',
        url: 'http://localhost:3000/user/edit',
        data: $("#edit").serialize() ,
        success: function(d){        
            $("#result > pre").html(JSON.stringify(d, undefined, 2));
            if(!d.error)
                resetFrom("edit");
        },
        error: function(d){
            $("#result > pre").html(JSON.stringify(d, undefined, 2));  
        }        
    });
    
    return false;
}

function loginUser(){    
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/user/login',
        data: $("#login").serialize() ,
        success: function(d){        
            $("#result > pre").html(JSON.stringify(d, undefined, 2));
            if(!d.error)
                resetFrom("login");
        },
        error: function(d){
            $("#result > pre").html(JSON.stringify(d, undefined, 2));  
        }        
    });
    
    return false;
}
function logoutUser(){    
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/user/logout/'+ $('[name="logout_email"]').val(),
        success: function(d){        
            $("#result > pre").html(JSON.stringify(d, undefined, 2));
            if(!d.error)
                resetFrom("logout");
        },
        error: function(d){
            $("#result > pre").html(JSON.stringify(d, undefined, 2));  
        }        
    });
    
    return false;
}


function deleteUser(){    
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/user/delete/',
        data: $("#delete").serialize() ,
        success: function(d){        
            $("#result > pre").html(JSON.stringify(d, undefined, 2));
            if(!d.error)
                resetFrom("delete");
        },
        error: function(d){
            $("#result > pre").html(JSON.stringify(d, undefined, 2));  
        }        
    });
    
    return false;
}
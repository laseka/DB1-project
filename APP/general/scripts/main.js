const deleteRow = async (url, id) => {
    
    try {
        const response = await fetch(url + '/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        jsonOBJ = await response.json();
        alert(jsonOBJ["message"]);
        window.location.href = "/" + url;
    } catch (error) {
        console.log(error);
    }
}

const updateRow = async (url, form) => {
    data = new FormData(document.getElementById("updateForm"));
    const Id = form.Id.value;
    try {
        const response = await fetch(url + '/' + Id, {
            method: 'POST',
            body: data
        });
        jsonOBJ = await response.json();
        alert(jsonOBJ["message"]);
        window.location.href = "/" + url;
        
    } catch (error) {
        console.error(error);
    }
    
};

const showForm = () => {
    if ($("#addForm").css("display") === "none") {
        $("#addForm").css("display", "inline");
    } else {
        $("#addForm").css("display", "none");
    }
    $("#updateForm").css("display", "none");
    $("result").html("");
}

var idToUpdate;

const updateForm = (id) => {
    idToUpdate = id;
    $("#Id").val(idToUpdate);

    if ($("#updateForm").css("display") === "none") {
        $("#updateForm").css("display", "inline");
    } else {
        $("#updateForm").css("display", "none");
    }
    $("#addForm").css("display", "none");
    $("result").html("");
}

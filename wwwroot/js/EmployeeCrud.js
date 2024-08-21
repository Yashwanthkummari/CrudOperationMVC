
$(document).ready(function () {
    ShowEmployeeData();
});

$('#addEmployee').click(function () {
    $('#employeeModal').modal('show');
    $('#EditEmployee').hide();
    $('#EditttEmployee').hide();
    $('#employeeId').parent().hide();
})



function AddEmployee()
{
    let employeeData = {
        name: $('#name').val(),
        phoneNumber: $('#phone').val(),
        email: $('#email').val(),
        Password: $('#pass').val(),
        State: $('#state').val(),
        city: $('#city').val()
    }
    $.ajax({
    url: '/Employee/AddEmployee',
    type: 'POST',
    data: JSON.stringify(employeeData),  
    contentType: 'application/json;charset=utf-8;',  
    dataType: 'json',
    success: function (response) {
        alert('Data Saved');
        clearText();
        closeEmployeeModel();
        ShowEmployeeData();

    },
    error: function () {
        alert('Data Not Saved');
    }
});

}

function closeEmployeeModel() {
    $('#employeeModal').modal('hide');

}
function clearText() {
    $('#name').val('');
    $('#phone').val('');
    $('#email').val('');
    $('#pass').val('');
    $('#state').val('');
    $('#city').val('');
}
function ShowEmployeeData() {
    
    $.ajax({
        url: '/Employee/GetEmployeesData',
        type: 'GET',
        dataype:'json',
        success: function (response) {
            $("#table-data").empty();
           var allEmployeeData = response;
            allEmployeeData.map(function (employee) {
                $("#table-data").append(
                    `<tr>
                        <td>${employee.name}</td>
                        <td>${employee.phoneNumber}</td>
                        <td>${employee.email}</td>
                        <td>${employee.state}</td>
                        <td>${employee.city}</td>
                        <td>
                             <button class="btn btn-primary" id="editEmployee" onclick=GetEmployeeById(${employee.id})>Edit</button>||
                             <button class="btn btn-danger" id="deleteEmployee" onclick=DeleteEmployee(${employee.id})>Delete</button>
                        </td>
                    </tr>`
                );
            });
        },
        error: function () {
            alert('Data Not received');

        }
    })
}

function GetEmployeeById(employeeId) {
    $.ajax({
        url: '/Employee/GetEmployeeById?id=' + employeeId,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            $('#employeeModal').modal('show');
//            $('#EditttEmployee').parent.show();
            $('#employeeId').parent().show();
            $('#EditEmployee').show();
            $('#AddddEmployee').hide();
            $('#AddEmployee').hide();

            
            $('#employeeId').val(response.id);
            $('#name').val(response.name);
            $('#phone').val(response.phoneNumber);
            $('#email').val(response.email);
            $('#pass').val(response.password);
            $('#state').val(response.state);
            $('#city').val(response.city);
        },
        error: function() {
            alert('Error retrieving employee data.');
        }
    });
}


function updateEmployeeData() {
    let employeeData = {
        id: $('#employeeId').val(),
        name: $('#name').val(),
        phoneNumber: $('#phone').val(),
        email: $('#email').val(),
        password: $('#pass').val(),
        state: $('#state').val(),
        city: $('#city').val()
    };

    $.ajax({
        url: '/Employee/UpdateEmployeeData',
        type: 'PATCH',
        data: JSON.stringify(employeeData),
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            if (response.success !== false) {
                alert('Employee updated successfully.');
                $('#employeeModal').modal('hide');
                ShowEmployeeData();
            } else {
                alert(response.message);
            }
        },
        error: function () {
            alert('Error updating employee data.');
        }
    });
}

 
function DeleteEmployee(EmployeId) {
    $.ajax({
        url: '/Employee/DeleteEmployeesData?id=' + EmployeId,
        type: 'DELETE',
        success: function (response) {
            alert('Employee Deleted Sucessfully');
            ShowEmployeeData();

        },
        error: function () {
            alert('Employee not Deleted ');

        }
    })
}




function EditEmployee(EmployeId) {

    $.ajax({
        url: '/Employee/UpdateEmployeeData?id=' + EmployeId,
        type: 'PATCH',
        success: function () {
            alert('Data Updated Sucessfully')

        },
        error: function () {
            alert('Data not Updated')
        }
    })
}
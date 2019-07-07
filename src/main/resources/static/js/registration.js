var mainUrl = "http://localhost:8098";
setActionOnCreateBtn();

function setActionOnCreateBtn() {
        $(document.getElementById("btnCreatePerson")).click(function () {
                        var login = $(document.getElementById("reg_login")).val();
                        var firstName = $(document.getElementById("reg_name")).val();
                        var password = $(document.getElementById("reg_password")).val();
                        var lastName = $(document.getElementById("reg_surname")).val();
                        var email = $(document.getElementById("reg_email")).val();
                        var phone = $(document.getElementById("reg_phone")).val();
                        var address = $(document.getElementById("reg_address")).val();
                        var newPerson = {
                            "address": address,
                            "email": email,
                            "firstName": firstName,
                            "lastName": lastName,
                            "login": login,
                            "password": password,
                            "phone": phone
                        }
                        $.ajax({
                            url: mainUrl + "/users",
                            type: "POST",
                            contentType: "application/json",
                            data: JSON.stringify(newPerson),
                            success: function (data) {
                                alert("user created");
                                $(document.getElementById("reg_message")).append("User created");
                                location.assign('main.html');
                            },
                            error: function (error) {
                                console.log(newPerson);
                                $(document.getElementById("reg_message")).append("Try again and fill all field correctly");
                            }
                        });

                    });
        }

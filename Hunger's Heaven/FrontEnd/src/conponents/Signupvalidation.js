function validation(values){
    let error = {}
    const phno_pattern = /^\d{10}$/;
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:,<.>])[a-zA-Z0-9!@#$%^&*()-_=+{};:,<.>.]{8,}$/

    //name
    if(values.fname == ""){
       error.fname = "First name should not be empty"
    }
    else{
       error.fname=""
    }

    if(values.lname == ""){
        error.lname = "Last name should not be empty"
    }
    else{
        error.lname=""
    }
    //email
    if(values.email == ""){
        error.email = "Email should not be empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Email didn't match"
    }
     else{
        error.email=""
    }
    //phno
    if(values.phno == ""){
        error.phno = "Phone No. should not be empty"
    }
     else if(!phno_pattern.test(values.phno)){
        error.phno = "Phone No. didn't match"
    }
     else{
        error.phno=""
    }

    // Create Password
    if(values.crpass == ""){
       error.crpass = " Create Password should not be empty"
    }
    else if(!password_pattern.test(values.crpass)){
       error.crpass = "Create Password didn't match"
    }
    else{
       error.crpass=""
    }

    // Conform Password
    if(values.copass == ""){
        error.copass = "Conform Password should not be empty"
     }
     else if(!password_pattern.test(values.copass)){
        error.copass = "Conform Password didn't match"
     }
     else if(values.crpass != values.copass){
        error.copass = "Password didn't match"
     }
     else{
        error.copass=""
     }

     // Check


    return error;

}
export default validation;
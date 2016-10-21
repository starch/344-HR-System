module.exports = {

    /** Validates the event. You cannot make the start date 
     * in the past. Two part response in format {bool isValid, 
     * string error messages}
     */
    validateUserDateOfBirth: function(user, newBirthDate) {
        var today = new Date();
        var dateStr = newBirthDate.split('-');
        var month = dateStr[0];
        var day = dateStr[1];
        var year = dateStr[2];
        var userDateOfBirth = new Date(year, month, day);

        if(isNaN(userDateOfBirth.getTime())) {
            return({isValid: false, err: "Date format was incorrect, use mm-dd-yyyy"});
        }

        if (today.getTime() < userDateOfBirth.getTime()){
            return({isValid: false, err: "Date of birth has to be a date in the past!"});
        }
        return({isValid: true, err: ""});
    },

    validateUserSalary: function(user) {
        if (user.salary < 0) {
            return({isValid: false, err: "Salary can't be negative."});
        }
        return({isValid: true, err: ""});
    },
    
};
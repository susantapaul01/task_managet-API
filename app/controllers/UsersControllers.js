import UsersModel from "../model/UserModel.js";
import { EmailSend } from "../utility/emailUtility.js";
import { TokenEncode } from "../utility/tokenUtility.js";

export const Registration = async (req, res) => {
    try {    
        let reqBody = req.body;
        await UsersModel.create(reqBody);
        return res.json({ status: "success", messege: "Registration successful" });
    }
    catch(e) {
        return res.json({ status: "Fail", messege: e.toString() });
    }
}

export const Login = async (req, res) => {
    try {
        let reqBody = req.body;
        // return res.json({ status: reqBody['email']});
        let data = await UsersModel.findOne(reqBody);
        if(!data) {
            return res.json({ status: "Fail", messege: "Email or password dose not match"});
        }
        else {
            let token = TokenEncode(data['email'], data['_id']);
            return res.json({ status: "success", messege: "Login successful", "token": token});
        }   
    }
    catch(e) {
        return res.json({ status: "Fail", messege: e.toString()});
    }
}

export const EmailVerify = async (req, res) => {
    try {
        let emailParams = req.params['email'];
        let data = await UsersModel.findOne({ email: emailParams });
        if(data==null) {
            return res.json({ status: "Fail", messege: "Email dose not exist"})
        }
        else {
            // Send OTP To Email
            let code= Math.floor(100000+Math.random()*900000);
            let emailTo = data['email'];
            let emailSubject = "Task Manager Verification Code";
            let emailText = `your verification code is ${code}`;
            await EmailSend(emailTo, emailSubject, emailText);
            // Update OTP In User
            await UsersModel.updateOne({'email': data['email']}, {otp: code});
            return res.json({ status: "success", messege: "Verification successfully. Please check your email."});
        }
    }
    catch(e) {
        return res.json({ status: "fail", messege: e.toString() });
    }
}

export const CodeVerify = async (req, res) => {
    try {
        // Input email & OTP
        let inputData = req.body;
        let data = await UsersModel.findOne({'email': inputData['email'], 'otp': inputData['otp']});
        if(!data) {
            res.json({ status: "fail", messege: "Wrong verification!"});
        }
        else {
            res.json({ status: "fail", messege: "Verification successful"});
        }
    }
    catch(e) {
        return res.json({ status: "fail", messege: e.toString() });
    }
}

export const ResetPassword = async (req, res) => {
    try {
        // Input email, password & OTP
        let inputData = req.body;
        let isData = await UsersModel.findOne({ 'email': inputData['email'], 'otp': inputData['otp']});
        if(!isData) {
            res.json({ status: "fail", messege: "Wrong verification!"});
        }
        else {
            await UsersModel.updateOne({'email': inputData['email']}, { 'password': inputData['password']})
            return res.json({ status: "success", messege: "Password reset successful"});
        }
    }
    catch(e) {
        return res.json({ status: "fail", messege: e.toString() });
    }
}

export const ProfileDetail = async (req, res) => {
    try {
        let user_id = req.headers['user_id'];
        let data = await UsersModel.findOne({ "_id": user_id})
        return res.json({ status: "success", messege: "ProfileDetail successful", "Data": data});
    }
    catch(e) {
        return res.json({ status: "success", messege: e.toString()});
    }
}

export const ProfileUpdate = async (req, res) => {
    try {
        let reqBody = req.body;
        let user_id = req.headers['user_id'];
        await UsersModel.updateOne({"_id": user_id}, reqBody);
        return res.json({ status: "success", messege: "ProfileUpdate successful"});
    }
    catch(e) {
        return res.json({ status: "success", messege: e.toString()});
    }
}




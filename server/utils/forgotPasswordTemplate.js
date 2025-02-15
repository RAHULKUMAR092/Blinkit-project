const forgotPasswordTemplate = ({ name, otp }) => {
  return `
    <div>
        <p>Dear, ${name}</p>
        <p>You're request a password reset. Please use following OTP code to reset your password.</p>
    </div>
    <div style="background:yellow;font-size:20px;padding:20px;text-align:center;
    font-weight:800;">${otp}</div>
    <div>
        <p>This otp is valid for 1 hour only. Enter this otp in the blinkit website to proced with resetting your password.</p>
        </br>
        </br>
        <p>Thanks, Best regards</p>
        <p>Blinkit</p>
    </div>
    
    `;
};

export default forgotPasswordTemplate;

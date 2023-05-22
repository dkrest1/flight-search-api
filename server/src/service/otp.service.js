import otp from "otp-generator"

const generateOTP = () => {
    const OTP = otp.generate(
        6,
        { upperCaseAlphabets: true, specialChars: false }
    )

    return OTP
}

export default generateOTP
// const pswStrengthRegex = (?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,});

const validateEMail = (em) => {
    const emailValidRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailValidRegex.test(em)
}

export default validateEMail;
const generatedOTP = async () => {
  try {
    const generate = (otp = `${Math.floor(1000 + Math.random() * 9000)}`);
    return generate;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generatedOTP,
};

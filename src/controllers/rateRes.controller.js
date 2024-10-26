const rateResByRes = (req, res) => {
    return res.status(200).json({message: "rateResByRes"});
}

const rateResByUser = (req, res) => {
    return res.status(200).json({message: "rateResByUser"});
}

const rateRes = (req, res) => {
    return res.status(200).json({message: "rateRes"});
}

export {
    rateResByRes,
    rateResByUser,
    rateRes,
}
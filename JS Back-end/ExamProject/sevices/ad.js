const Ad = require('../models/Ad');


async function getAllAds() {
    const ads = await Ad.find({}).lean();

    return ads;
}


async function getFirstThree() {
    const ads = await Ad.find({}).sort({createdAt: 1}).limit(3).lean();

    return ads;
}

async function getAdById(id) {
    return Ad.findById(id)
        .populate('author', 'email')
        .populate('usersApplied', 'email descriptionSkills')
        .lean();
}



async function createAd(ad) {
    const result = new Ad(ad);
    await result.save()

    return result;
}

async function update(id, ad) {
    const existing = await Ad.findById(id);

    existing.headline = ad.headline;
    existing.location = ad.location;
    existing.companyName = ad.companyName;
    existing.description = ad.description;

    await existing.save()

}

async function deleteAd(id) {
    return Ad.findByIdAndDelete(id)
}

async function apply(userId, addId) {
    const ad = await Ad.findById(addId);

    if (ad.usersApplied.includes(userId)) {
        throw new Error('User is already has applied.')
    }
    ad.usersApplied.push(userId);

    await ad.save();
}


module.exports = {
    getAllAds,
    getFirstThree,
    getAdById,
    createAd,
    update,
    apply,
    deleteAd
}
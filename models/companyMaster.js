const mongoose = require('mongoose');

const companyMasterSchema = new mongoose.Schema({
    companyId: { type: String, required: true, default: "0" },
    CO_NAME: { type: String, required: true },
    CO_ADD1: { type: String, required: true },
    CO_ADD2: { type: String },
    CONTACT: { type: String, required: true },
    SYS_GSTNO: { type: String, required: true },
    EMAIL_ID: { type: String, required: true },
    SYS_PHONE1: { type: String, default: "" },
    SYS_PHONE2: { type: String, default: "" },
    SYS_ESINO: { type: String, required: true },
    SYS_PFNO: { type: String, required: true },
    LOCALOFF: { type: String, required: true },
    STATENAME: { type: String, required: true },
    STATECODE: { type: String, required: true },
    DOCPREFIX: { type: String, required: true },
    COPINCODE: { type: String, required: true },
    WEBSITE: { type: String },
    COMPHEADOFFICE: { type: String },
    COMPBRANCHASE: { type: String },
    COMPGODOWNS: { type: String }
});

module.exports = mongoose.model('CompanyMaster', companyMasterSchema);

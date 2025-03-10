// models/FormData.js
const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId},
    username: { type: String, required: true }, 
    department: { type: String, required: true },
    projectName: { type: String, required: true },
    projectManager: { type: String, required: true },
    duration: { type: String, required: true },
    location: { type: String, required: true },
    checkboxes: [
        {
            id: { type: String, required: true },
            label: { type: String, required: true },
            checked: { type: Boolean, default: false }
        }
    ],
    checkboxes1: [
        {
            id: { type: String, required: true },
            label: { type: String, required: true },
            checked: { type: Boolean, default: false }
        }
    ],
    checkboxes2: [
        {
            id: { type: String, required: true },
            label: { type: String, required: true },
            checked: { type: Boolean, default: false }
        }
    ],
    checkboxes3: [
        {
            id: { type: String, required: true },
            label: { type: String, required: true },
            checked: { type: Boolean, default: false }
        }
    ],
    checkboxes4: [
        {
            id: { type: String, required: true },
            label: { type: String, required: true },
            checked: { type: Boolean, default: false }
        }
    ],
    integration: {
        teachingManagement: {
            checked: { type: Boolean, default: false },
            details: { type: String, default: '' }
        },
        research: {
            checked: { type: Boolean, default: false },
            details: { type: String, default: '' }
        },
        operations: {
            checked: { type: Boolean, default: false },
            details: { type: String, default: '' }
        },
        culturalPreservation: {
            checked: { type: Boolean, default: false },
            details: { type: String, default: '' }
        },
        academicServices: {
            checked: { type: Boolean, default: false },
            details: { type: String, default: '' }
        },
        others: {
            checked: { type: Boolean, default: false },
            details: { type: String, default: '' }
        }
    },
    budgetItems: [{ item: String, price: Number, id: Number }],
    filePath: { type: String },
    status: { type: String, enum: ['รอดำเนินการ', 'กำลังดำเนินการ', 'เสร็จสิ้น', 'ไม่ผ่านการอนุมัติ'], default: 'รอดำเนินการ' },
});

const FormData = mongoose.model('FormData', formSchema);

module.exports = FormData;

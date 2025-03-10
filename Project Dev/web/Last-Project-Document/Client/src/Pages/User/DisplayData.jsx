// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SidebarUser from '../../Components/common/SidebarUser';
import { Checkbox, Typography } from "@material-tailwind/react";
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Card,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import NavbarUser from '../../Components/common/NavbarUser';

const DisplayData = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);  // เปิด/ปิดโมดัล
    const [modalOpen1, setModalOpen1] = useState(false);  // เปิด/ปิดโมดัล
    const [currentItem, setCurrentItem] = useState(null); // เก็บข้อมูลเอกสารที่เลือก
    const [setEditMode] = useState(false); // เช็คสถานะการแก้ไข
    const [integrationData, setIntegrationData] = useState({});
    const [filePath, setFilePath] = useState("");
    const [budgetItemsData, setBudgetItemsData] = useState([]);


    // ✅ ฟังก์ชันแก้ไข budget item
    const handleBudgetChange = (index, field, value) => {
        const updatedBudgetItems = [...budgetItemsData];
        updatedBudgetItems[index] = { ...updatedBudgetItems[index], [field]: value };
        setBudgetItemsData(updatedBudgetItems);
    };

    // ✅ ฟังก์ชันเพิ่ม Budget Item
    const addBudgetItem = () => {
        setBudgetItemsData([...budgetItemsData, { item: '', price: 0 }]);
    };

    // ✅ ฟังก์ชันลบ Budget Item
    const removeBudgetItem = (index) => {
        setBudgetItemsData(budgetItemsData.filter((_, i) => i !== index));
    };

    const [formData, setFormData] = useState({
        department: '',
        projectName: '',
        projectManager: '',
        duration: '',
        location: '',
        checkboxes: [],
        checkboxes1: [],
        checkboxes2: [],
        checkboxes3: [],
        checkboxes4: [],
        integration: {
            teachingManagement: { checked: false, details: '' },
            research: { checked: false, details: '' },
            operations: { checked: false, details: '' },
            culturalPreservation: { checked: false, details: '' },
            academicServices: { checked: false, details: '' },
            others: { checked: false, details: '' }
        },
        selectedFile: 'file',
        budgetitem: [],
    });

    const openModal1 = (currentItem) => {
        setCurrentItem(currentItem);
        setFormData({
            department: currentItem.department || '',
            projectName: currentItem.projectName || '',
            projectManager: currentItem.projectManager || '',
            duration: currentItem.duration || '',
            location: currentItem.location || '',
            checkboxes: currentItem.checkboxes || [],
            checkboxes1: currentItem.checkboxes1 || [],
            checkboxes2: currentItem.checkboxes2 || [],
            checkboxes3: currentItem.checkboxes3 || [],
            checkboxes4: currentItem.checkboxes4 || [],
            integration: currentItem.integration || {
                teachingManagement: { checked: false, details: '' },
                research: { checked: false, details: '' },
                operations: { checked: false, details: '' },
                culturalPreservation: { checked: false, details: '' },
                academicServices: { checked: false, details: '' },
                others: { checked: false, details: '' }
            },
            selectedFile: currentItem.filePath || '', // กรณีที่ไม่มีไฟล์ให้ใส่ค่าเป็นว่าง

        });
        setModalOpen1(true);
        setBudgetItemsData([...currentItem.budgetItems]);

    };


    const closeModal1 = () => {
        setModalOpen1(false);
        setEditMode(false); // ปิดโหมดการแก้ไข
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const updateData = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const formDataToSend = new FormData();

            formDataToSend.append("department", formData.department || "");
            formDataToSend.append("projectName", formData.projectName || "");
            formDataToSend.append("projectManager", formData.projectManager || "");
            formDataToSend.append("duration", formData.duration || "");
            formDataToSend.append("location", formData.location || "");
            formDataToSend.append("checkboxes", JSON.stringify(formData.checkboxes || []));
            formDataToSend.append("checkboxes1", JSON.stringify(formData.checkboxes1 || []));
            formDataToSend.append("checkboxes2", JSON.stringify(formData.checkboxes2 || []));
            formDataToSend.append("checkboxes3", JSON.stringify(formData.checkboxes3 || []));
            formDataToSend.append("checkboxes4", JSON.stringify(formData.checkboxes4 || []));
            formDataToSend.append("integration", JSON.stringify(formData.integration || {}));
            formDataToSend.append("budgetitem", JSON.stringify(budgetItemsData || [])); // ✅ ใช้ budgetItemsData แทน budgetitem

            if (formData.selectedFile && formData.selectedFile instanceof File) {
                formDataToSend.append("file", formData.selectedFile);
            }

            console.log("📌 FormData ส่งไป:", [...formDataToSend.entries()]);

            const response = await axios.put(`http://localhost:3000/api/formdata/${currentItem._id}`, formDataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setCurrentItem(prev => ({
                ...prev,
                budgetItems: [...budgetItemsData] // ✅ ใช้ budgetItemsData ที่เพิ่งบันทึก
            }));

            setData(data.map(item => item._id === currentItem._id ? response.data : item));
            alert("อัปเดตข้อมูลสำเร็จ!");
            setModalOpen1(false);
        } catch (error) {
            console.error("🛑 Error updating data:", error);
            alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
        }
    };




    const handleCheckboxChange = (e, section, index) => {
        const { checked } = e.target;
        const updatedCheckboxes = [...formData[section]];
        updatedCheckboxes[index].checked = checked;

        setFormData({
            ...formData,
            [section]: updatedCheckboxes
        });
    };


    const handleIntegrationChange = (section, field, value) => {
        setIntegrationData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };
    useEffect(() => {
        if (currentItem) {
            setIntegrationData(currentItem.integration || {});
            setFilePath(currentItem.filePath || "");
        }
    }, [currentItem]);




    const openModal = (item) => {
        setCurrentItem(item); // เก็บข้อมูลของแถวที่เลือก
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentItem(null); // เคลียร์ข้อมูลเมื่อปิดโมดัล
    };

    useEffect(() => {
        const fetchData = async () => {
            try {

                const token = localStorage.getItem('authToken'); // Retrieve token from storage or context
                const response = await axios.get('http://localhost:3000/api/formdata/:id', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                setError(error.response ? error.response.data.message : 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
            }
        };
        fetchData();
    }, []);

    const getSectionLabel = (section) => {
        switch (section) {
            case 'teachingManagement':
                return 'การจัดการเรียนการสอน';
            case 'research':
                return 'การวิจัย';
            case 'operations':
                return 'การปฏิบัติงาน';
            case 'culturalPreservation':
                return 'ทำนุบำรุงศิลปวัฒนธรรม';
            case 'academicServices':
                return 'บริการวิชาการ';
            case 'others':
                return 'อื่นๆ';
            default:
                return '';
        }
    };


    // ฟังก์ชันที่กำหนดค่าของ Timeline ตามสถานะ
    const getTimelineStep = (status) => {
        switch (status) {
            case 'รอดำเนินการ':
                return [
                    { title: 'เริ่มต้น', description: 'รอดำเนินการ', icon: 'fa fa-clock', color: 'text-blue-500' },
                ];
            case 'กำลังดำเนินการ':
                return [
                    { title: 'เริ่มต้น', description: 'รอดำเนินการ', icon: 'fa fa-clock', color: 'text-blue-500' },
                    { title: 'กำลังดำเนินการ', description: 'กำลังดำเนินการโครงการ', icon: 'fa fa-cogs', color: 'text-yellow-500' },
                ];
            case 'เสร็จสิ้น':
                return [
                    { title: 'เริ่มต้น', description: 'รอดำเนินการ', icon: 'fa fa-clock', color: 'text-blue-500' },
                    { title: 'กำลังดำเนินการ', description: 'กำลังดำเนินการโครงการ', icon: 'fa fa-cogs', color: 'text-yellow-500' },
                    { title: 'เสร็จสิ้น', description: 'โครงการเสร็จสิ้นแล้ว', icon: 'fa fa-check-circle', color: 'text-green-500' },
                ];
            case 'ไม่ผ่านการอนุมัติ':
                return [
                    { title: 'ไม่ผ่านการอนุมัติ', description: 'โครงการไม่ได้รับการอนุมัติ', icon: 'fa fa-times-circle', color: 'text-red-500' },
                ];
            default:
                return [];
        }
    };



    return (
        <>
            <NavbarUser />
            <SidebarUser />
            <div className="flex justify-center ">
                <Typography variant="h5" color="blue-gray" className="mb-2">โครงการของท่าน</Typography>
            </div>
            <div className='flex justify-center   min-h-screen'>
                {error && <p>{error}</p>}
                <div className="grid grid-cols-2 gap-2 ">
                    {data.map((currentItem) => (
                        <div key={currentItem._id}>
                            <div className="">
                                <div className="">
                                    <Card className="mt-6 w-96">
                                        <CardBody>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="mb-4 h-12 w-12 text-gray-900"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                                                    clipRule="evenodd"
                                                />
                                                <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
                                            </svg>
                                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                                โครงการของท่าน
                                            </Typography>
                                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                                ชื่อผู้ดูแล: {currentItem.username}
                                            </Typography>
                                            <Typography>
                                                <p>สถานะเอกสาร: {currentItem.status}</p>
                                            </Typography>
                                        </CardBody>
                                        <CardFooter className="pt-0">
                                            <Button onClick={() => openModal(currentItem)}>ดูเอกสาร</Button>
                                            <Button variant="outlined" onClick={() => openModal1(currentItem)} className="ml-2">แก้ไข</Button>
                                        </CardFooter>
                                    </Card>
                                </div>

                            </div>

                        </div>
                    ))}
                </div>


                <Dialog open={modalOpen} onClose={closeModal} className="custom-dialog">
                    <DialogHeader>รายละเอียดโครงการ</DialogHeader>
                    <DialogBody className="max-h-[500px] overflow-y-auto">
                        {currentItem && (
                            <div>
                                <Timeline>
                                    {getTimelineStep(currentItem.status).map((step, index) => (
                                        <TimelineItem key={index}>
                                            <TimelineConnector />
                                            <TimelineHeader className="h-3">
                                                <TimelineIcon className={step.color} /> {/* ใช้สีจาก `step.color` */}
                                                <Typography variant="h6" color="blue-gray" className="leading-none">
                                                    {step.title}
                                                </Typography>
                                            </TimelineHeader>
                                            <TimelineBody className="pb-8">
                                                <Typography variant="small" color="gray" className="font-normal text-gray-600">
                                                    {step.description}
                                                </Typography>
                                            </TimelineBody>
                                        </TimelineItem>
                                    ))}
                                </Timeline>
                                <div className="mt-10">
                                    <Typography variant="h6">ชื่อผู้ดูแล: {currentItem.username}</Typography>
                                    <Typography>1.หน่วยงาน: {currentItem.department}</Typography>
                                    <Typography>2.ชื่อโครงการ: {currentItem.projectName}</Typography>
                                    <Typography>3.ผู้รับผิดชอบโครงการ: {currentItem.projectManager}</Typography>
                                    <Typography>4.ระยะเวลา: {currentItem.duration}</Typography>
                                    <Typography>5.สถานที่: {currentItem.location}</Typography>
                                </div>
                                <div>
                                    <div className="w-full max-w-lg p-8 space-y-4 ">
                                        <Typography variant="h6" color="blue-gray">
                                            6.ความสอดคล้องกับประเด็นยุทธศาสตร์/ตอบสนองของโครงการกับแผนพัฒนาหน่วยงานและการประกันคุณภาพการศึกษา
                                        </Typography>
                                        <Typography variant="h5" color="blue-gray">
                                            1) สอดคล้องกับยุทธศาสตร์การพัฒนามหาวิทยาลัย
                                        </Typography>
                                        {currentItem.checkboxes.map((checkbox, index) => (
                                            <div key={index}>
                                                <Checkbox
                                                    type='checkbox'
                                                    checked={checkbox.checked}
                                                    readOnly
                                                />
                                                <label>{checkbox.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full max-w-lg p-8 space-y-4 ">
                                        <Typography variant="h5" color="blue-gray">
                                            2. สอดคล้องกับการประกันคุณภาพภายในระดับหลักสูตร (สกอ.)
                                        </Typography>
                                        {currentItem.checkboxes1.map((checkbox, index) => (
                                            <div key={index}>
                                                <Checkbox
                                                    type='checkbox'
                                                    checked={checkbox.checked}
                                                    readOnly
                                                />
                                                <label>{checkbox.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full max-w-lg p-8 space-y-4 ">
                                        <Typography variant="h5" color="blue-gray">
                                            3. สอดคล้องกับการประกันคุณภาพภายในระดับคณะ (สกอ.)
                                        </Typography>
                                        {currentItem.checkboxes2.map((checkbox, index) => (
                                            <div key={index}>
                                                <Checkbox
                                                    type='checkbox'
                                                    checked={checkbox.checked}
                                                    readOnly
                                                />
                                                <label>{checkbox.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full max-w-lg p-8 space-y-4 ">
                                        <Typography variant="h5" color="blue-gray">
                                            4. สอดคล้องกับการประกันคุณภาพภายนอก (สมศ.)
                                        </Typography>
                                        {currentItem.checkboxes3.map((checkbox, index) => (
                                            <div key={index}>
                                                <Checkbox
                                                    type='checkbox'
                                                    checked={checkbox.checked}
                                                    readOnly
                                                />
                                                <label>{checkbox.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full max-w-lg p-8 space-y-4 ">
                                        <Typography variant="h5" color="blue-gray">
                                            5. สอดคล้องกับการประเมินผลการดำเนินงานตามคำรับรองการปฏิบัติราชการ (กพร.)
                                        </Typography>
                                        {currentItem.checkboxes4.map((checkbox, index) => (
                                            <div key={index}>
                                                <Checkbox
                                                    type='checkbox'
                                                    checked={checkbox.checked}
                                                    readOnly
                                                />
                                                <label>{checkbox.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Typography variant='h5'>
                                        7. การบูรณาการโครงการ
                                    </Typography>
                                    <div className="w-full max-w-lg p-8 space-y-4 ">
                                        {['teachingManagement', 'research', 'operations', 'culturalPreservation', 'academicServices', 'others'].map((section, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <Checkbox
                                                    checked={currentItem.integration[section].checked}
                                                    readOnly
                                                />
                                                <label htmlFor={section}>{getSectionLabel(section)}</label>
                                                <input
                                                    type="text"
                                                    value={currentItem.integration[section].details}
                                                    readOnly
                                                    className="border border-gray-300 px-2 py-1 rounded"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full max-w-lg p-8 space-y-4">
                                        <Typography variant="h5" color="blue-gray">
                                            รายการงบประมาณ
                                        </Typography>

                                        {budgetItemsData.length > 0 ? (
                                            budgetItemsData.map((budgetItem, index) => (
                                                <div key={index} className="flex justify-between items-center border-b border-gray-300 py-2">
                                                    <Typography variant="h6">
                                                        {budgetItem.item}
                                                    </Typography>
                                                    <Typography variant="h6">
                                                        ฿{budgetItem.price.toLocaleString('th-TH')}
                                                    </Typography>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">ไม่มีข้อมูลงบประมาณ</p>
                                        )}
                                    </div>

                                    <div className="w-full max-w-lg p-8 space-y-4">
                                        <Typography variant="h5" color="blue-gray">
                                            ไฟล์ที่อัปโหลด
                                        </Typography>
                                        {currentItem.filePath && (
                                            <div className="items-center space-x-2">
                                                <img
                                                    src={`http://localhost:3000/${currentItem.filePath}`}
                                                    alt="Uploaded File"
                                                    className="max-w-full h-auto rounded-lg shadow-md"
                                                />
                                                <a
                                                    href={`http://localhost:3000/${currentItem.filePath}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 underline"
                                                >
                                                    ดาวน์โหลดไฟล์
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogBody>
                    <DialogFooter>
                        <Button onClick={closeModal}>ปิด</Button>
                    </DialogFooter>
                </Dialog>
                {/* โมดัลสำหรับแก้ไขข้อมูล */}
                <Dialog open={modalOpen1} onClose={closeModal1} className="custom-dialog">
                    <DialogHeader>แก้ไขข้อมูลโครงการ</DialogHeader>
                    <DialogBody className="max-h-[500px] overflow-y-auto">
                        <form onSubmit={(e) => { e.preventDefault(); updateData(); }}>
                            <div className="space-y-4">
                                <input
                                    label="หน่วยงาน"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}

                                />
                                <input
                                    label="ชื่อโครงการ"
                                    name="projectName"
                                    value={formData.projectName}
                                    onChange={handleInputChange}

                                />
                                <input
                                    label="ผู้รับผิดชอบโครงการ"
                                    name="projectManager"
                                    value={formData.projectManager}
                                    onChange={handleInputChange}

                                />
                                <input
                                    label="ระยะเวลา"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}

                                />
                                <input
                                    label="สถานที่"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}

                                />
                            </div>
                            <div>
                                <div className="w-full max-w-lg p-8 space-y-4 ">
                                    <Typography variant="h6" color="blue-gray">
                                        6. ความสอดคล้องกับประเด็นยุทธศาสตร์/ตอบสนองของโครงการกับแผนพัฒนาหน่วยงานและการประกันคุณภาพการศึกษา
                                    </Typography>
                                    <Typography variant="h5" color="blue-gray">
                                        1) สอดคล้องกับยุทธศาสตร์การพัฒนามหาวิทยาลัย
                                    </Typography>
                                    {currentItem && currentItem.checkboxes && currentItem.checkboxes.map((checkbox, index) => (
                                        <div key={index}>
                                            <Checkbox
                                                type='checkbox'
                                                checked={checkbox.checked}
                                                onChange={(e) => handleCheckboxChange(e, 'checkboxes', index)}
                                            />
                                            <label>{checkbox.label}</label>
                                        </div>
                                    ))}

                                </div>
                                <div className="w-full max-w-lg p-8 space-y-4 ">
                                    <Typography variant="h5" color="blue-gray">
                                        2. สอดคล้องกับการประกันคุณภาพภายในระดับหลักสูตร (สกอ.)
                                    </Typography>
                                    {currentItem && currentItem.checkboxes1 && currentItem.checkboxes1.map((checkbox, index) => (
                                        <div key={index}>
                                            <Checkbox
                                                type='checkbox'
                                                checked={checkbox.checked}
                                                onChange={(e) => handleCheckboxChange(e, 'checkboxes1', index)}
                                            />
                                            <label>{checkbox.label}</label>
                                        </div>
                                    ))}
                                </div>

                                <div className="w-full max-w-lg p-8 space-y-4 ">
                                    <Typography variant="h5" color="blue-gray">
                                        3. สอดคล้องกับการประกันคุณภาพภายในระดับคณะ (สกอ.)
                                    </Typography>
                                    {currentItem && currentItem.checkboxes2 && currentItem.checkboxes2.map((checkbox, index) => (
                                        <div key={index}>
                                            <Checkbox
                                                type='checkbox'
                                                checked={checkbox.checked}
                                                onChange={(e) => handleCheckboxChange(e, 'checkboxes2', index)}
                                            />
                                            <label>{checkbox.label}</label>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full max-w-lg p-8 space-y-4 ">
                                    <Typography variant="h5" color="blue-gray">
                                        4. สอดคล้องกับการประกันคุณภาพภายนอก (สมศ.)
                                    </Typography>
                                    {currentItem && currentItem.checkboxes3 && currentItem.checkboxes3.map((checkbox, index) => (
                                        <div key={index}>
                                            <Checkbox
                                                type='checkbox'
                                                checked={checkbox.checked}
                                                onChange={(e) => handleCheckboxChange(e, 'checkboxes3', index)}
                                            />
                                            <label>{checkbox.label}</label>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full max-w-lg p-8 space-y-4 ">
                                    <Typography variant="h5" color="blue-gray">
                                        5. สอดคล้องกับการประเมินผลการดำเนินงานตามคำรับรองการปฏิบัติราชการ (กพร.)
                                    </Typography>
                                    {currentItem && currentItem.checkboxes4 && currentItem.checkboxes4.map((checkbox, index) => (
                                        <div key={index}>
                                            <Checkbox
                                                type='checkbox'
                                                checked={checkbox.checked}
                                   ß             onChange={(e) => handleCheckboxChange(e, 'checkboxes4', index)}
                                            />
                                            <label>{checkbox.label}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full max-w-lg p-8 space-y-4 ">
                                <Typography variant="h5">
                                    7. การบูรณาการโครงการ
                                </Typography>
                                {['teachingManagement', 'research', 'operations', 'culturalPreservation', 'academicServices', 'others'].map((section, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <Checkbox
                                            checked={integrationData?.[section]?.checked || false}
                                            onChange={(e) => handleIntegrationChange(section, "checked", e.target.checked)}
                                        />
                                        <label htmlFor={section}>{getSectionLabel(section)}</label>
                                        <input
                                            type="text"
                                            value={integrationData?.[section]?.details || ""}
                                            onChange={(e) => handleIntegrationChange(section, "details", e.target.value)}
                                            className="border border-gray-300 px-2 py-1 rounded"
                                        />
                                    </div>
                                ))}
                            </div>



                            <div className="w-full max-w-lg p-8 space-y-4">
                                <Typography variant="h5" color="blue-gray">
                                    ไฟล์ที่อัปโหลด
                                </Typography>
                                <input
                                    type="file"
                                    accept="image/*, application/pdf"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setFormData(prevState => ({ ...prevState, selectedFile: file }));
                                        }
                                    }}
                                />

                                {currentItem && typeof filePath === "string" && (
                                    <div className="items-center space-x-2">
                                        <img
                                            src={`http://localhost:3000/${currentItem.filePath}`}
                                            alt="Uploaded File"
                                            className="max-w-full h-auto rounded-lg shadow-md"
                                        />
                                        <a
                                            href={`http://localhost:3000/${currentItem.filePath}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 underline"
                                        >
                                            ดาวน์โหลดไฟล์
                                        </a>
                                    </div>
                                )}
                            </div>


                        </form>
                        <div className="w-full max-w-lg p-8 space-y-4">
                            <Typography variant="h5" color="blue-gray">
                                รายการงบประมาณ
                            </Typography>

                            {budgetItemsData.length > 0 ? (
                                budgetItemsData.map((budgetItem, index) => (
                                    <div key={index} className="flex justify-between items-center border-b border-gray-300 py-2">
                                        {/* ชื่อรายการ */}
                                        <input
                                            type="text"
                                            value={budgetItem.item}
                                            onChange={(e) => handleBudgetChange(index, "item", e.target.value)}
                                            className="border border-gray-300 px-2 py-1 rounded w-1/2"
                                        />

                                        {/* จำนวนเงิน */}
                                   ß     <input
                                            type="number"
                                            value={budgetItem.price}
                                            onChange={(e) => handleBudgetChange(index, "price", e.target.value)}
                                            className="border border-gray-300 px-2 py-1 rounded w-1/4"
                                        />

                                        {/* ปุ่มลบรายการ */}
                                        <button
                                            onClick={() => removeBudgetItem(index)}
                                            className="ml-2 text-red-500 hover:text-red-700"
                                        >
                                            ❌ ลบ
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">ไม่มีข้อมูลงบประมาณ</p>
                            )}

                            {/* ปุ่มเพิ่มรายการใหม่ */}
                            <Button
                                onClick={addBudgetItem}

                            >
                                ➕ เพิ่มรายการใหม่
                            </Button>
                        </div>

                    </DialogBody>
                    <DialogFooter>
                        <Button onClick={closeModal1}>ปิด</Button>
                        <Button variant="outlined" onClick={updateData}>บันทึกการแก้ไข</Button>
                    </DialogFooter>
                </Dialog>
            </div>
        </>
    );
};

export default DisplayData;

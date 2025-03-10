import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
  Checkbox,

} from "@material-tailwind/react";
import Sidebar from '../../Components/common/Sidebar';
import NavbarAdmin from '../../Components/common/NavbarAdmin';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);  // โมดัลสำหรับรายละเอียด
  const [modalOpen2, setModalOpen2] = useState(false);  // โมดัลสำหรับอัปเดตสถานะ
  const [currentItem, setCurrentItem] = useState(null); // เก็บข้อมูลของแถวที่เลือก
  const [currentId, setCurrentId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [statusOptions] = useState(['รอดำเนินการ', 'กำลังดำเนินการ', 'เสร็จสิ้น', 'ไม่ผ่านการอนุมัติ']);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:3000/api/formdata', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(response.data);
    } catch (error) {

      setError('Error fetching data.');
      console.error('Error fetching data:', error);
    }
  };

  // ฟังก์ชันเปิดโมดัลที่แสดงรายละเอียดของแถวที่เลือก
  const openModal = (item) => {
    setCurrentItem(item);  // เก็บข้อมูลแถวที่ถูกเลือก
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentItem(null);  // เคลียร์ข้อมูลเมื่อปิดโมดัล
  };

  const openModal2 = (id, currentStatus) => {
    setCurrentId(id);
    setSelectedStatus(currentStatus);
    setModalOpen2(true);
  };

  const closeModal2 = () => {
    setModalOpen2(false);
  };

  const handleStatusChange = (value) => {
    if (value) {
      setSelectedStatus(value);
    } else {
      console.error("Value is undefined or null");
    }
  };

  const updateStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(`http://localhost:3000/api/formdata/${currentId}/status`,
        { status: selectedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(prevData =>
        prevData.map(item =>
          item._id === currentId ? { ...item, status: selectedStatus } : item
        )
      );
      closeModal2();
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const displayedData = data.slice(0, 5);

  const handleDelete = async (id) => {
    if (!id) {
      console.error('ID is required for deletion');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');

      await axios.delete(`http://localhost:3000/api/formdata/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('ลบเอกสารสำเร็จ');
      setData(prevData => prevData.filter(item => item._id !== id));
      console.log('Data deleted successfully');
    } catch (error) {
      console.error('Error deleting data:', error.response?.data?.message || error.message);
    }
  };
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



  return (
    <>
      <NavbarAdmin/>
      <Sidebar />
      <div className='flex justify-center items-center'>
        <Typography className="flex justify-center items-center" variant="h3" color="blue-gray">
          โครงการทั้งหมด
        </Typography>
      </div>
      <div className="flex justify-center items-center border border-b-gray-900">
        {error && <Typography color="red" className="text-center mb-4">{error}</Typography>}
        <Card className="p-8 overflow-x-auto w-full max-w-5xl">
          <table className="w-full min-w-max table-auto text-left ">
            <thead>
              <tr>
                <th className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    หน่วยงาน
                  </Typography>
                </th>
                <th className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    ชื่อโครงการ
                  </Typography>
                </th>
                <th className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    ผู้รับผิดชอบโครงการ
                  </Typography>
                </th>

                <th className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    รายละเอียด
                  </Typography>
                </th>
                <th className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    สถานะเอกสาร
                  </Typography>
                </th>
                <th className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    ตรวจสอบ
                  </Typography>
                </th>
                <th className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    ลบข้อมูล
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map(item => (
                <tr key={item._id}>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {item.department}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {item.projectName}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {item.projectManager}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Button onClick={() => openModal(item)}>ดูเอกสาร</Button>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      style={{
                        backgroundColor: item.status === 'รอดำเนินการ' ? 'blue' :
                          item.status === 'กำลังดำเนินการ' ? 'yellow' :
                            item.status === 'เสร็จสิ้น' ? 'green' :
                              'red',
                        color: 'white',
                        padding: '5px',
                        borderRadius: '50px',
                        opacity: '70%',
                      }}
                    >
                      {item.status}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Button onClick={() => openModal2(item._id, item.status)}>เปลี่ยนสถานะ</Button>

                  </td>
                  <td className="p-4">
                    <Button onClick={() => handleDelete(item._id)} color="red">
                      ลบ
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* โมดัลสำหรับรายละเอียด */}
      <Dialog open={modalOpen} onClose={closeModal} className="custom-dialog">
        <DialogHeader>รายละเอียดโครงการ</DialogHeader>
        <DialogBody className="max-h-[500px]  overflow-y-auto">
          {currentItem && (
            <div>
              <Typography><p className='text-green-600'>สถานะ: {currentItem.status}</p></Typography>
              <Typography variant="h6">ชื่อผู้ดูแล: {currentItem.username}</Typography>
              <Typography><p>หน่วยงาน: {currentItem.department}</p></Typography>
              <Typography><p>ชื่อโครงการ: {currentItem.projectName}</p></Typography>
              <Typography><p>ผู้รับผิดชอบโครงการ: {currentItem.projectManager}</p></Typography>
              <Typography><p>ระยะเวลา: {currentItem.duration}</p></Typography>
              <Typography><p>สถานที่: {currentItem.location}</p></Typography>
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
                {currentItem.budgetItems.map((budgetItem) => (
                  <div key={budgetItem.id} className="flex justify-between items-center border-b border-gray-300 py-2">
                    <Typography variant="h6">
                      {budgetItem.item}
                    </Typography>
                    <Typography variant="h6">
                      ฿{budgetItem.price.toLocaleString('th-TH')}
                    </Typography>
                  </div>
                ))}
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
          )}
        </DialogBody>
        <DialogFooter>
          <Button onClick={closeModal}>ปิด</Button>
        </DialogFooter>
      </Dialog>

      {/* โมดัลสำหรับอัปเดตสถานะ */}
      <Dialog open={modalOpen2} onClose={closeModal2}>
        <DialogHeader>สถานะเอกสาร</DialogHeader>
        <DialogBody>
          <Select onChange={(e) => handleStatusChange(e)} value={selectedStatus}>
            {statusOptions.map((status) => (
              <Option key={status} value={status}>{status}</Option>
            ))}
          </Select>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={closeModal2}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button variant="gradient" onClick={updateStatus}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DataTable;

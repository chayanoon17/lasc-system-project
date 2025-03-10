// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Card, Typography, IconButton } from '@material-tailwind/react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import LogoSSKRU from '../../assets/Images/LogoSSKRU.png'; 
import SidebarUser from '../../Components/common/SidebarUser';
import NavbarUser from '../../Components/common/NavbarUser';

const API_URL = 'http://localhost:3000/api/checkboxes'; // URL ของ API
const API_URL1 = 'http://localhost:3000/api/checkboxes1'; // URL ของ API
const API_URL2 = 'http://localhost:3000/api/checkboxes2'; // URL ของ API
const API_URL3 = 'http://localhost:3000/api/checkboxes3'; // URL ของ API
const API_URL4 = 'http://localhost:3000/api/checkboxes4'; // URL ของ API

const IntegratedForm = () => {
  //Checkbox Admin
  const [checkboxes, setCheckboxes] = useState([]);
  const [checkboxes1, setCheckboxes1] = useState([]);
  const [checkboxes2, setCheckboxes2] = useState([]);
  const [checkboxes3, setCheckboxes3] = useState([]);
  const [checkboxes4, setCheckboxes4] = useState([]);
  const [isAdmin, ] = useState(false); // ปรับเป็น false สำหรับผู้ใช้ทั่วไป
  const yourToken = localStorage.getItem('authToken'); // Adjust as needed
  // Fetch checkboxes data from API
  useEffect(() => {
    const fetchCheckboxes = async () => {
      try {
        const response = await axios.get(API_URL);
        setCheckboxes(response.data);
      } catch (error) {
        console.error('Error fetching checkboxes:', error);
      }
      
    };
    fetchCheckboxes();

    const fetchCheckboxes1 = async () => {
      try {
        const response = await axios.get(API_URL1);
        setCheckboxes1(response.data);
      } catch (error) {
        console.error('Error fetch checkboxes1:', error);
      }
    };
    fetchCheckboxes1();

    const fetchCheckboxes2 = async () => {
      try {
        const response = await axios.get(API_URL2);
        setCheckboxes2(response.data);
      } catch (error) {
        console.error('Error fetch checkboxes2:', error);
      }
    };
    fetchCheckboxes2();

    const fetchCheckboxes3 = async () => {
      try {
        const response = await axios.get(API_URL3);
        setCheckboxes3(response.data);
      } catch (error) {
        console.error('Error fetch checkboxes3:', error);
      }
    };
    fetchCheckboxes3();


    const fetchCheckboxes4 = async () => {
      try {
        const response = await axios.get(API_URL4);
        setCheckboxes4(response.data);
      } catch (error) {
        console.error('Error fetch checkboxes4:', error);
      }
    };
    fetchCheckboxes4();
  }, []);

  const handleCheckboxChange = async (id) => {
    try {
      const checkbox = checkboxes.find(checkbox => checkbox.id === id);
      await axios.put(`${API_URL}/${id}`, { ...checkbox, checked: !checkbox.checked });
      setCheckboxes(prevCheckboxes =>
        prevCheckboxes.map(checkbox =>
          checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
        )
      );
    } catch (error) {
      console.error('Error updating checkbox:', error);
    }
  };
 

  const handleCheckboxLabelChange = async (e, id) => {
    const { value } = e.target;
    try {
      await axios.put(`${API_URL}/${id}`, { label: value });
      setCheckboxes(prevCheckboxes =>
        prevCheckboxes.map(checkbox =>
          checkbox.id === id ? { ...checkbox, label: value } : checkbox
        )
      );
    } catch (error) {
      console.error('Error updating checkbox label:', error);
    }
  };
  

  const addCheckbox = async () => {
    const newId = checkboxes.length ? checkboxes[checkboxes.length - 1].id + 1 : 1;
    const newCheckbox = { id: newId, label: `คลิกเพื่อแก้ไข ${newId}`, checked: false };
    try {
      await axios.post(API_URL, newCheckbox);
      setCheckboxes(prevCheckboxes => [...prevCheckboxes, newCheckbox]);
    } catch (error) {
      console.error('Error adding checkbox:', error);
    }
  };
  

  const removeCheckbox = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCheckboxes(prevCheckboxes => prevCheckboxes.filter(checkbox => checkbox.id !== id));
    } catch (error) {
      console.error('Error deleting checkbox:', error);
    }
  };
  //End Checkbox Admin
  //Start Checkbox1 Admin
  const handleCheckboxChange1 = async (id) => {
    try {
      const checkbox = checkboxes1.find(checkbox => checkbox.id === id);
      await axios.put(`${API_URL1}/${id}`, { ...checkbox, checked: !checkbox.checked });
      setCheckboxes1(prevCheckboxes =>
        prevCheckboxes.map(checkbox =>
          checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
        )
      );
    } catch (error) {
      console.error('Error updating checkbox1:', error);
    }
  };
 

  const handleCheckboxLabelChange1 = async (e, id) => {
    const { value } = e.target;
    try {
      await axios.put(`${API_URL1}/${id}`, { label: value });
      setCheckboxes1(prevCheckboxes =>
        prevCheckboxes.map(checkbox =>
          checkbox.id === id ? { ...checkbox, label: value } : checkbox
        )
      );
    } catch (error) {
      console.error('Error updating checkbox1 label:', error);
    }
  };
  

  const addCheckbox1 = async () => {
    const newId = checkboxes1.length ? checkboxes1[checkboxes1.length - 1].id + 1 : 1;
    const newCheckbox = { id: newId, label: `คลิกเพื่อแก้ไข ${newId}`, checked: false };
    try {
      await axios.post(API_URL1, newCheckbox);
      setCheckboxes1(prevCheckboxes => [...prevCheckboxes, newCheckbox]);
    } catch (error) {
      console.error('Error adding checkbox1:', error);
    }
  };
  

  const removeCheckbox1 = async (id) => {
    try {
      await axios.delete(`${API_URL1}/${id}`);
      setCheckboxes1(prevCheckboxes => prevCheckboxes.filter(checkbox => checkbox.id !== id));
    } catch (error) {
      console.error('Error deleting checkbox1:', error);
    }
  };
  //End Checkbox1 Admin
  //Start Checkbox2 Admin
  const handleCheckboxChange2 = async (id) => {
    try {
      const checkbox = checkboxes2.find(checkbox => checkbox.id === id);
      await axios.put(`${API_URL2}/${id}`, { ...checkbox, checked: !checkbox.checked });
      setCheckboxes2(prevCheckboxes =>
        prevCheckboxes.map(checkbox =>
          checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
        )
      );
    } catch (error) {
      console.error('Error updating checkbox2:', error);
    }
  };
 

  const handleCheckboxLabelChange2 = async (e, id) => {
    const { value } = e.target;
    try {
      await axios.put(`${API_URL2}/${id}`, { label: value });
      setCheckboxes2(prevCheckboxes =>
        prevCheckboxes.map(checkbox =>
          checkbox.id === id ? { ...checkbox, label: value } : checkbox
        )
      );
    } catch (error) {
      console.error('Error updating checkbox2 label:', error);
    }
  };
  

  const addCheckbox2 = async () => {
    const newId = checkboxes2.length ? checkboxes2[checkboxes2.length - 1].id + 1 : 1;
    const newCheckbox = { id: newId, label: `คลิกเพื่อแก้ไข ${newId}`, checked: false };
    try {
      await axios.post(API_URL2, newCheckbox);
      setCheckboxes2(prevCheckboxes => [...prevCheckboxes, newCheckbox]);
    } catch (error) {
      console.error('Error adding checkbox2:', error);
    }
  };
  

  const removeCheckbox2 = async (id) => {
    try {
      await axios.delete(`${API_URL2}/${id}`);
      setCheckboxes2(prevCheckboxes => prevCheckboxes.filter(checkbox => checkbox.id !== id));
    } catch (error) {
      console.error('Error deleting checkbox2:', error);
    }
  };
  //End Checkbox2 Admin
  //Start Checkbox3 Admin
  const handleCheckboxChange3 = async (id) => {
    try {
      const checkbox = checkboxes3.find(checkbox => checkbox.id === id);
      await axios.put(`${API_URL3}/${id}`, { ...checkbox, checked: !checkbox.checked });
      setCheckboxes3(prevCheckboxes =>
        prevCheckboxes.map(checkbox =>
          checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
        )
      );
    } catch (error) {
      console.error('Error updating checkbox3:', error);
    }
  };
 

  const handleCheckboxLabelChange3 = async (e, id) => {
    const { value } = e.target;
    try {
      await axios.put(`${API_URL3}/${id}`, { label: value });
      setCheckboxes3(prevCheckboxes =>
        prevCheckboxes.map(checkbox =>
          checkbox.id === id ? { ...checkbox, label: value } : checkbox
        )
      );
    } catch (error) {
      console.error('Error updating checkbox3 label:', error);
    }
  };
  

  const addCheckbox3 = async () => {
    const newId = checkboxes3.length ? checkboxes3[checkboxes3.length - 1].id + 1 : 1;
    const newCheckbox = { id: newId, label: `คลิกเพื่อแก้ไข ${newId}`, checked: false };
    try {
      await axios.post(API_URL3, newCheckbox);
      setCheckboxes3(prevCheckboxes => [...prevCheckboxes, newCheckbox]);
    } catch (error) {
      console.error('Error adding checkbox3:', error);
    }
  };
  

  const removeCheckbox3 = async (id) => {
    try {
      await axios.delete(`${API_URL3}/${id}`);
      setCheckboxes3(prevCheckboxes => prevCheckboxes.filter(checkbox => checkbox.id !== id));
    } catch (error) {
      console.error('Error deleting checkbox3:', error);
    }
  };
  //End Checkbox3 Admin
  //Start Checkbox4 Admin4
  const handleCheckboxChange4 = async (id) => {
    try {
      const checkbox = checkboxes4.find(checkbox => checkbox.id === id);
      await axios.put(`${API_URL4}/${id}`, { ...checkbox, checked: !checkbox.checked });
      setCheckboxes4(prevCheckboxes =>
        prevCheckboxes.map(checkbox =>
          checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
        )
      );
    } catch (error) {
      console.error('Error updating checkbox3:', error);
    }
  };
 

  const handleCheckboxLabelChange4 = async (e, id) => {
    const { value } = e.target;
    try {
      await axios.put(`${API_URL4}/${id}`, { label: value });
      setCheckboxes4(prevCheckboxes =>
        prevCheckboxes.map(checkbox =>
          checkbox.id === id ? { ...checkbox, label: value } : checkbox
        )
      );
    } catch (error) {
      console.error('Error updating checkbox4 label:', error);
    }
  };
  

  const addCheckbox4 = async () => {
    const newId = checkboxes4.length ? checkboxes4[checkboxes4.length - 1].id + 1 : 1;
    const newCheckbox = { id: newId, label: `คลิกเพื่อแก้ไข ${newId}`, checked: false };
    try {
      await axios.post(API_URL4, newCheckbox);
      setCheckboxes4(prevCheckboxes => [...prevCheckboxes, newCheckbox]);
    } catch (error) {
      console.error('Error adding checkbox4:', error);
    }
  };
  

  const removeCheckbox4 = async (id) => {
    try {
      await axios.delete(`${API_URL4}/${id}`);
      setCheckboxes4(prevCheckboxes => prevCheckboxes.filter(checkbox => checkbox.id !== id));
    } catch (error) {
      console.error('Error deleting checkbox4:', error);
    }
  };
  //End Checkbox4 Admin4
  
  //CRUD To database
  const [formData, setFormData] = useState({
    id: '',
    label: '',
    checked: false,
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleIntegrationChange = (section, field, value) => {
    setFormData({
      ...formData,
      integration: {
        ...formData.integration,
        [section]: {
          ...formData.integration[section],
          [field]: value
        }
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const form = new FormData();
      form.append('department', formData.department);
      form.append('projectName', formData.projectName);
      form.append('projectManager', formData.projectManager);
      form.append('duration', formData.duration);
      form.append('location', formData.location);
      form.append('checkboxes', JSON.stringify(checkboxes));
      form.append('checkboxes1', JSON.stringify(checkboxes1));
      form.append('checkboxes2', JSON.stringify(checkboxes2));
      form.append('checkboxes3', JSON.stringify(checkboxes3));
      form.append('checkboxes4', JSON.stringify(checkboxes4));
      form.append('integration', JSON.stringify(formData.integration));
      form.append('budgetItems', JSON.stringify(items)); // ต้องใช้ชื่อ 'budgetItems' ให้ตรงกับชื่อในฐานข้อมูล

      if (!Array.isArray (checkboxes, checkboxes1, checkboxes2, checkboxes3, checkboxes4)) {
        console.error('Debug Checkboxes array')
      }

      if (selectedFile) {
        form.append('file', selectedFile);
      }

      const response = await axios.post('http://localhost:3000/api/formdata', form, {
        headers: {
          'Authorization': `Bearer ${yourToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Success:', response.data);
      alert('เพิ่มข้อมูลสำเร็จ');
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error.message);
      alert('เพิ่มข้อมูลไม่สำเร็จ');
    }
  };

  //End CRUD To database

  //Ep.7
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
  //End Ep.7

  //UploadFile
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  //End Uploadfile


  // Budget Management
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ item: '', price: 0 });

  const handleBudgetChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevItem => ({
      ...prevItem,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    if (newItem.item.trim() === '' || isNaN(newItem.price) || newItem.price <= 0) {
      alert('Please enter valid item details.');
      return;
    }
    setItems(prevItems => [
      ...prevItems,
      { ...newItem, id: Date.now() } // Using Date.now() to ensure unique ID
    ]);
    setNewItem({ item: '', price: 0 });
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + (parseFloat(item.price) || 0), 0).toFixed(2);
  };

  // JSX code...
  return (
   <>
   <NavbarUser/>
   <SidebarUser/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card color="transparent" shadow={false} className="w-full max-w-lg p-8 space-y-4">
      <section className="flex justify-center items-center  bg-gray-100">
      <div className="circle p-8">
        <img
          src={LogoSSKRU}
          alt="Logo"
          className="w-32 h-50 object-cover rounded-lg"
        />
      </div>
    </section>
        <Typography className="flex justify-center items-center" variant="h3" color="blue-gray">
          โครงการประกัน
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Typography variant='h5'>
            1. หน่วยงาน
          </Typography>
          <Input
            type="text" id="department"
            placeholder="หน่วยงาน"
            value={formData.department}
            onChange={handleChange}
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant='h5'>
            2. ชื่อโครงการ
          </Typography>
          <Input
            type="text" id="projectName"
            placeholder="ชื่อโครงการ"
            value={formData.projectName}
            onChange={handleChange}
            ssize="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant='h5'>
            3. ผู้รับผิดชอบโครงการ
          </Typography>
          <Input
            type="text"
            id="projectManager"
            placeholder="ผู้รับผิดชอบโครงการ"
            value={formData.projectManager}
            onChange={handleChange}
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant='h5'>
            4. ระยะเวลาในการดำเนินงาน
          </Typography>
          <Input
            type="text"
            id="duration"
            placeholder="ระยะเวลาในการดำเนินงาน"
            value={formData.duration}
            onChange={handleChange}
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant='h5'>
            5. สถานที่จัดโครงการ
          </Typography>
          <Input
            type="text"
            id="location"
            placeholder="สถานที่จัดโครงการ"
            value={formData.location}
            onChange={handleChange}
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h4" color="blue-gray">
            6.ความสอดคล้องกับประเด็นยุทธศาสตร์/ตอบสนองของโครงการกับแผนพัฒนาหน่วยงานและการประกันคุณภาพการศึกษา
          </Typography>
          <div className="flex justify-center items-center h-4"></div>
          <Typography variant="h5" color="blue-gray">
            1) สอดคล้องกับยุทธศาสตร์การพัฒนามหาวิทยาลัย
          </Typography>
          <div className="w-full max-w-lg p-8 space-y-4 ">
            {checkboxes.map((checkbox) => (
              <div key={checkbox.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={`checkbox${checkbox.id}`}
                  checked={checkbox.checked}
                  onChange={() => handleCheckboxChange(checkbox.id)}
                />
                {isAdmin ? (
                  <Input
                    name={String(checkbox.id)}
                    value={checkbox.label}
                    onChange={(e) => handleCheckboxLabelChange(e, checkbox.id)}
                    size="sm"
                  />
                ) : (
                  <Typography>{checkbox.label}</Typography>
                )}
                {isAdmin && (
                  <IconButton color="red" onClick={() => removeCheckbox(checkbox.id)}>
                    <MinusIcon className="h-5 w-5" />
                  </IconButton>
                )}
              </div>
            ))}
            {isAdmin && (
              <div className="flex justify-end">
                <IconButton color="blue" onClick={addCheckbox}>
                  <PlusIcon className="h-5 w-5" />
                </IconButton>
              </div>
            )}
          </div>
          <Typography variant="h5" color="blue-gray">
          2. สอดคล้องกับการประกันคุณภาพภายในระดับหลักสูตร (สกอ.)
          </Typography>
          <div className="w-full max-w-lg p-8 space-y-4 ">
            {checkboxes1.map((checkbox) => (
              <div key={checkbox.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={`checkbox${checkbox.id}`}
                  checked={checkbox.checked}
                  onChange={() => handleCheckboxChange1(checkbox.id)}
                />
                {isAdmin ? (
                  <Input
                    name={String(checkbox.id)}
                    value={checkbox.label}
                    onChange={(e) => handleCheckboxLabelChange1(e, checkbox.id)}
                    size="sm"
                  />
                ) : (
                  <Typography>{checkbox.label}</Typography>
                )}
                {isAdmin && (
                  <IconButton color="red" onClick={() => removeCheckbox1(checkbox.id)}>
                    <MinusIcon className="h-5 w-5" />
                  </IconButton>
                )}
              </div>
            ))}
            {isAdmin && (
              <div className="flex justify-end">
                <IconButton color="blue" onClick={addCheckbox1}>
                  <PlusIcon className="h-5 w-5" />
                </IconButton>
              </div>
            )}
          </div>
          <Typography variant="h5" color="blue-gray">
          3. สอดคล้องกับการประกันคุณภาพภายในระดับคณะ (สกอ.)
          </Typography>
          <div className="w-full max-w-lg p-8 space-y-4 ">
            {checkboxes2.map((checkbox) => (
              <div key={checkbox.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={`checkbox${checkbox.id}`}
                  checked={checkbox.checked}
                  onChange={() => handleCheckboxChange2(checkbox.id)}
                />
                {isAdmin ? (
                  <Input
                    name={String(checkbox.id)}
                    value={checkbox.label}
                    onChange={(e) => handleCheckboxLabelChange2(e, checkbox.id)}
                    size="sm"
                  />
                ) : (
                  <Typography>{checkbox.label}</Typography>
                )}
                {isAdmin && (
                  <IconButton color="red" onClick={() => removeCheckbox2(checkbox.id)}>
                    <MinusIcon className="h-5 w-5" />
                  </IconButton>
                )}
              </div>
            ))}
            {isAdmin && (
              <div className="flex justify-end">
                <IconButton color="blue" onClick={addCheckbox2}>
                  <PlusIcon className="h-5 w-5" />
                </IconButton>
              </div>
            )}
          </div>
          <Typography variant="h5" color="blue-gray">
          4. สอดคล้องกับการประกันคุณภาพภายนอก (สมศ.)
          </Typography>
          <div className="w-full max-w-lg p-8 space-y-4 ">
            {checkboxes3.map((checkbox) => (
              <div key={checkbox.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={`checkbox${checkbox.id}`}
                  checked={checkbox.checked}
                  onChange={() => handleCheckboxChange3(checkbox.id)}
                />
                {isAdmin ? (
                  <Input
                    name={String(checkbox.id)}
                    value={checkbox.label}
                    onChange={(e) => handleCheckboxLabelChange3(e, checkbox.id)}
                    size="sm"
                  />
                ) : (
                  <Typography>{checkbox.label}</Typography>
                )}
                {isAdmin && (
                  <IconButton color="red" onClick={() => removeCheckbox3(checkbox.id)}>
                    <MinusIcon className="h-5 w-5" />
                  </IconButton>
                )}
              </div>
            ))}
            {isAdmin && (
              <div className="flex justify-end">
                <IconButton color="blue" onClick={addCheckbox3}>
                  <PlusIcon className="h-5 w-5" />
                </IconButton>
              </div>
            )}
          </div>
          <Typography variant="h5" color="blue-gray">
          5. สอดคล้องกับการประเมินผลการดำเนินงานตามคำรับรองการปฏิบัติราชการ (กพร.)
          </Typography>
          <div className="w-full max-w-lg p-8 space-y-4 ">
            {checkboxes4.map((checkbox) => (
              <div key={checkbox.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={`checkbox${checkbox.id}`}
                  checked={checkbox.checked}
                  onChange={() => handleCheckboxChange4(checkbox.id)}
                />
                {isAdmin ? (
                  <Input
                    name={String(checkbox.id)}
                    value={checkbox.label}
                    onChange={(e) => handleCheckboxLabelChange4(e, checkbox.id)}
                    size="sm"
                  />
                ) : (
                  <Typography>{checkbox.label}</Typography>
                )}
                {isAdmin && (
                  <IconButton color="red" onClick={() => removeCheckbox4(checkbox.id)}>
                    <MinusIcon className="h-5 w-5" />
                  </IconButton>
                )}
              </div>
            ))}
            {isAdmin && (
              <div className="flex justify-end">
                <IconButton color="blue" onClick={addCheckbox4}>
                  <PlusIcon className="h-5 w-5" />
                </IconButton>
              </div>
            )}
          </div>

          <div className="">
            <Typography variant="h4" color="blue-gray">
              7. การบูรณาการโครงการ
            </Typography>
            {['teachingManagement', 'research', 'operations', 'culturalPreservation', 'academicServices', 'others'].map((section, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type='checkbox'
                  checked={formData.integration[section].checked}
                  onChange={(e) => handleIntegrationChange(section, 'checked', e.target.checked)}
                />
                <label htmlFor={section}>{getSectionLabel(section)}</label>
                <input
                  type="text"
                  value={formData.integration[section].details}
                  onChange={(e) => handleIntegrationChange(section, 'details', e.target.value)}
                  placeholder="ระบุ"
                  className="border border-gray-300 px-2 py-1 rounded"
                />
              </div>
            ))}
          </div>
          <div className="space-y-4 p-4 ">
            <Typography variant="h4" color="blue-gray">
              11. แผนการดำเนินงาน (JPG, PNG, and PDF)
            </Typography>
            <input type="file" name="file" onChange={handleFileChange} />
          </div>
          <div className="space-y-4 p-4 bg-white shadow-md rounded-lg">
          </div>
          <Button type="submit" ripple="light" fullWidth>
            ส่งข้อมูล
          </Button>
        </form>
        {/* Budget Table */}
      <Card color="transparent" shadow={false} className=" w-full max-w-lg p-6 space-y-4">
        <Typography variant="h5">รายละเอียดการใช้จ่ายงบประมาณ</Typography>
        <form onSubmit={handleBudgetSubmit} className="space-y-4">
          <Input
            type="text"
            name="item"
            value={newItem.item}
            onChange={handleBudgetChange}
            placeholder="รายการ"
            size="lg"
          />
          <Input
            type="number"
            name="price"
            value={newItem.price}
            onChange={handleBudgetChange}
            placeholder="Price"
            size="lg"
          />
          <Button type="submit" color="blue" fullWidth>
            Add Item
          </Button>
        </form>
        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr>
              <th className="border p-2">รายการ</th>
              <th className="border p-2">งบประมาณ
                (บาท)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.item}</td>
                <td className="border p-2">{item.price}</td>
              </tr>
            ))}
            <tr>
              <td className="border p-2 font-bold">Total</td>
              <td className="border p-2 font-bold">{getTotal()}</td>
            </tr>
          </tbody>
        </table>
        
      </Card>
      </Card>
      
    </div>
    </>
  );
};

export default IntegratedForm;
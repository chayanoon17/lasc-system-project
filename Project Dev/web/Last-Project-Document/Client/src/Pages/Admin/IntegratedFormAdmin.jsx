// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // นำเข้า axios
import { Input, Checkbox, Card, Typography, IconButton } from '@material-tailwind/react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import LogoSSKRU from '../../assets/Images/LogoSSKRU.png'; 
import Sidebar from '../../Components/common/Sidebar';
import NavbarAdmin from '../../Components/common/NavbarAdmin';

const API_URL = 'http://localhost:3000/api/checkboxes'; // URL ของ API
const API_URL1 = 'http://localhost:3000/api/checkboxes1'; // URL ของ API
const API_URL2 = 'http://localhost:3000/api/checkboxes2'; // URL ของ API
const API_URL3 = 'http://localhost:3000/api/checkboxes3'; // URL ของ API
const API_URL4 = 'http://localhost:3000/api/checkboxes4'; // URL ของ API

const IntegratedFormAdmin = () => {
  //Checkbox Admin
  const [checkboxes, setCheckboxes] = useState([]);
  const [checkboxes1, setCheckboxes1] = useState([]);
  const [checkboxes2, setCheckboxes2] = useState([]);
  const [checkboxes3, setCheckboxes3] = useState([]);
  const [checkboxes4, setCheckboxes4] = useState([]);
  const [isAdmin, ] = useState(true);

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
      await axios.put(`${API_URL3}/${id}`, { ...checkbox, checked: !checkbox.checked });
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

  // JSX code...
  return (
    <>
    <NavbarAdmin/>
    <Sidebar/>
    <div className="flex justify-center items-center ">
      <Card color="transparent" shadow={false} className="w-full max-w-xl p-8 space-y-4">
      <section className="flex justify-center items-center">
      <div className="circle p-8">
        <img
          src={LogoSSKRU}
          alt="Logo"
          className="w-32 h-50 object-cover rounded-lg"
        />
      </div>
    </section>
        <Typography className="flex justify-center items-center" variant="h3" color="blue-gray">
        สร้างยุทธศาสตร์
        </Typography>
        <form   className="space-y-4">
          <div className="flex justify-center items-center h-4">
          <Typography variant="h5" color="blue-gray">
            1) สอดคล้องกับยุทธศาสตร์การพัฒนามหาวิทยาลัย
          </Typography>
          </div>
          <div className="w-full max-w-lg p-8 space-y-4 ">
            {checkboxes.map((checkbox) => (
              <div key={checkbox.id} className="flex items-center space-x-2">
                <Checkbox
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
          
          <div className="flex justify-center items-center h-4">
          <Typography variant="h5" color="blue-gray">
          2. สอดคล้องกับการประกันคุณภาพภายในระดับหลักสูตร (สกอ.)
          </Typography>
          </div>
          <div className="w-full max-w-lg p-8 space-y-4 ">
            {checkboxes1.map((checkbox) => (
              <div key={checkbox.id} className="flex items-center space-x-2">
                <Checkbox
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

          <div className="flex justify-center items-center h-4">
          <Typography variant="h5" color="blue-gray">
          3. สอดคล้องกับการประกันคุณภาพภายในระดับคณะ (สกอ.)
          </Typography>
          </div>
          <div className="w-full max-w-lg p-8 space-y-4 ">
            {checkboxes2.map((checkbox) => (
              <div key={checkbox.id} className="flex items-center space-x-2">
                <Checkbox
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

          <div className="flex justify-center items-center h-4">
          <Typography variant="h5" color="blue-gray">
          4. สอดคล้องกับการประกันคุณภาพภายนอก (สมศ.)
          </Typography>
          </div>
          <div className="w-full max-w-lg p-8 space-y-4 ">
            {checkboxes3.map((checkbox) => (
              <div key={checkbox.id} className="flex items-center space-x-2">
                <Checkbox
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

          <div className="flex justify-center items-center h-4">
          <Typography variant="h5" color="blue-gray">
          5. สอดคล้องกับการประเมินผลการดำเนินงานตามคำรับรองการปฏิบัติราชการ (กพร.)
          </Typography>
          </div>
          <div className="w-full max-w-lg p-8 space-y-4 ">
            {checkboxes4.map((checkbox) => (
              <div key={checkbox.id} className="flex items-center space-x-2">
                <Checkbox
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
        </form>
      </Card>
    </div>
    </>
    
  );
};

export default IntegratedFormAdmin;

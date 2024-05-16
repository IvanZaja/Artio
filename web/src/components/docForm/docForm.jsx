import { Button, Input } from '@nextui-org/react'
import jsPDF from 'jspdf';
import { useState } from 'react';

function DocForm() {
    const [form, setForm] = useState({
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        companyName: '',
        nif: '',
        vat: '',
        address: '',
        postalCode: '',
        city: '',
        state: '',
      });

      const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

      const generateDocument = () => {
        const doc = new jsPDF();
        doc.setFontSize(28)
        doc.text(`${form.name} ${form.surname}`, 10, 10);
        doc.setFontSize(14);
        doc.text(`Email: ${form.email}`, 10, 30);
        doc.text(`Phone number: ${form.phoneNumber}`, 10, 40);
        doc.setTextColor(150);
        doc.setFontSize(10);
        doc.text(`Company name: ${form.companyName}`, 10, 50);
        doc.text(`NIF: ${form.nif}`, 10, 60);
        doc.text(`VAT: ${form.vat}`, 10, 70);
        doc.text(`Address: ${form.address}`, 10, 80);
        doc.text(`Postal code: ${form.postalCode}`, 10, 90);
        doc.text(`City: ${form.city}`, 10, 100);
        doc.text(`State: ${form.state}`, 10, 110);

        doc.save('certificate.pdf');
      };
  return (
    <div>
        <p className='mb-3'>Data to generate your certificate</p>
        <div className='flex gap-3 mb-3'>
            <Input type="text" name="name" onChange={handleChange} label="Name" />
            <Input type="text" name="surname" onChange={handleChange} label="Surname" />
        </div>
        <div className='flex gap-3 mb-3'>
            <Input type="email" name="email" onChange={handleChange} label="Email" />
            <Input type="number" name="phoneNumber" onChange={handleChange} label="Phone number" />
        </div>
        <Input className='mb-3' type="text" name="companyName" onChange={handleChange} label="Company name" />
        <div className='flex gap-3 mb-3'>
            <Input type="text" name="nif" onChange={handleChange} label="NIF" />
            <Input type="text" name="vat" onChange={handleChange} label="VAT" />
        </div>
        <Input className='mb-3' name="address" onChange={handleChange} type="text" label="Address" />
        <div className='flex gap-3 mb-3'>
            <Input type="text" name="postalCode" onChange={handleChange} label="Postal code" />
            <Input type="text" name="city" onChange={handleChange} label="City" />
        </div>
        <Input type="text" name="state" onChange={handleChange} label="State" />
        <Button onClick={generateDocument}>Generate Document</Button>
    </div>
  )
}

export default DocForm
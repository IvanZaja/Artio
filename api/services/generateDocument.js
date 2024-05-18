const { jsPDF } = require("jspdf"); // will automatically load the node version
const { v4: uuidv4 } = require('uuid');

module.exports.generateDocument = (form) => {
    const uniqueId = uuidv4();
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
    doc.text(`Tokens: ${form.tokens}`, 10, 120);

    doc.save(`${uniqueId}.pdf`); // will save the file in the current working directory
    const document = `${uniqueId}.pdf`
    return document
};

function generatePurchaseNote(order, student, teacher, workshopName, paymentMethod) {
  const date = new Date();
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  const content = `
    <div style="font-family: Arial; padding: 20px;">
      <div style="display: flex; align-items: center;">
        <img src="${schoolSettings.logoURL}" width="50" height="50" style="margin-right: 10px;" />
        <div><h2>${schoolSettings.schoolName}</h2></div>
      </div>
      <h3>Nota de Compra</h3>
      <p><strong>Alumno:</strong> ${student.name}</p>
      <p><strong>Docente:</strong> ${teacher}</p>
      <p><strong>Taller:</strong> ${workshopName}</p>
      <p><strong>Fecha:</strong> ${formattedDate} ${formattedTime}</p>
      <p><strong>Forma de pago:</strong> ${paymentMethod}</p>
      <hr />
      <ul>${order.items.map(item => `<li>${item.quantity} x ${item.name} - $${item.subtotal.toFixed(2)}</li>`).join('')}</ul>
      <h4>Total: $${order.total.toFixed(2)}</h4>
    </div>
  `;
  html2pdf().from(content).set({ margin: 0.5, filename: 'nota_compra.pdf', html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' } }).save();
}
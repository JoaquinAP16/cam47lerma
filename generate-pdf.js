
function generatePurchaseNote(order, student, teacher, workshopName, paymentMethod) {
  const fileName = `Nota_${student.name.replace(/\s+/g, '_')}_${new Date().toLocaleDateString('es-MX').replaceAll('/', '-')}.pdf`;
  const content = `
    <div style='font-family: Arial;'>
      <h2>${schoolSettings.schoolName}</h2>
      <p><strong>Alumno:</strong> ${student.name}</p>
      <p><strong>Docente:</strong> ${teacher}</p>
      <p><strong>Taller:</strong> ${workshopName}</p>
      <p><strong>Forma de pago:</strong> ${paymentMethod}</p>
      <hr />
      <ul>${order.items.map(i => `<li>${i.quantity} x ${i.name} - $${i.subtotal}</li>`).join('')}</ul>
      <h4>Total: $${order.total}</h4>
    </div>`;
  html2pdf().from(content).set({ filename: fileName }).save();
}

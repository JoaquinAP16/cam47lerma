
function generatePurchaseNote(order, student, teacher, workshopName, paymentMethod) {
  const date = new Date();
  const formattedDate = date.toLocaleDateString('es-MX').replaceAll('/', '-');
  const formattedTime = date.toLocaleTimeString('es-MX');

  const fileName = `Nota_${student.name.replace(/\s+/g, '_')}_${formattedDate}.pdf`;

  const content = `
    <div style="font-family: Arial; padding: 20px;">
      <h2 style="color:#2196f3;">Nota de Compra</h2>
      <p><strong>Alumno:</strong> \${student.name}</p>
      <p><strong>Docente:</strong> \${teacher}</p>
      <p><strong>Taller:</strong> \${workshopName}</p>
      <p><strong>Fecha:</strong> \${formattedDate} \${formattedTime}</p>
      <p><strong>Forma de pago:</strong> \${paymentMethod}</p>
      <hr />
      <ul>
        \${order.items.map(item => `<li>\${item.quantity} x \${item.name} - \$\${item.subtotal.toFixed(2)}</li>`).join('')}
      </ul>
      <h3>Total: \$\${order.total.toFixed(2)}</h3>
    </div>
  `;

  const opt = {
    margin: 0.5,
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().from(content).set(opt).save();
}

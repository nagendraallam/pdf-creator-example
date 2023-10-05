import html2pdf from "html2pdf.js";

export const generatePDF = () => {
  const content = document.getElementById("chart");
  const pdfOptions = {
    margin: 1,
    filename: "crime-rate.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 2,
      useCORS: true,

      // NEEDED ONLY IF U HAVE SVG!
      onclone: (element) => {
        const svgElements = Array.from(element.querySelectorAll("svg"));
        svgElements.forEach((s) => {
          const bBox = s.getBBox();
          s.setAttribute("x", bBox.x);
          s.setAttribute("y", bBox.y);
          s.setAttribute("width", bBox.width);
          s.setAttribute("height", bBox.height);
        });
      },
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  console.log(content);
  // Convert the HTML content to a PDF
  html2pdf().from(content).set(pdfOptions).save();
};

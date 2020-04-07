<template>
  <div>
    <button id="button" @click="start">Gerar PDF</button>
  </div>
</template>

<script>
import jsPDF from 'jspdf'
export default {
    name: "Pdf",
    props: {
        values: Object,
        aaaaaa: {
            type: String,
            default:'111111',
        }
    },
    data(){
        return {
            url: "https://unpkg.com/jspdf@latest/dist/jspdf.min.js",
            pdf: null,
        }
    },
    created() {
        let jspdf = document.createElement("script");
        jspdf.setAttribute(
            "src",
            "https://unpkg.com/jspdf@latest/dist/jspdf.min.js"
        );
        jspdf.onload = this.initPDF();
        document.head.appendChild(jspdf);
    },
    methods: {
        initPDF() {

            this.pdf = new jsPDF();
            this.pdf.setFontStyle("bold");

            this.pdf.setFontSize(20);
            this.pdf.text("Lorem Ipsum", 105, 15, null, null, "center");
            this.pdf.setFontSize(15);
            this.pdf.setFontStyle("bold");
            this.pdf.text("Lorem Ipsum", 0, 30, null, null, "left");
            this.pdf.setFontStyle("normal");
            this.pdf.setFontSize(10);
            this.pdf.text(
                `宋希文  ipsum dolor sit amet, consectetur adipisicing elit, ${this.aaaaaa}sed do eiusmod tempor incididunt`,
                35,
                37,
                null,
                null,
                "left"
            );
            this.pdf.text(
                "ut labore et dolore  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
                30,
                43,
                null,
                null,
                "left"
            );
            this.pdf.text(
                "laboris  nisi ut  aliquip ex ea commodo  consequat. Duis aute irure dolor in reprehenderit  in",
                30,
                49,
                null,
                null,
                "left"
            );
            this.pdf.text(
                "voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat.",
                30,
                55,
                null,
                null,
                "left"
            );
        },
        start() {
            this.pdf.save("report.pdf");
        }
    }
};
</script>
<style scoped>
button {
  background-color: rgb(79, 182, 82);
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  font-size: 16px;
}
</style>







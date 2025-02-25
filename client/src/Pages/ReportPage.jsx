import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import download from "../assets/download_10118725.png"
import printIcon from "../assets/printer.png"
import { useState } from "react";
const styles=StyleSheet.create({
  page:{padding:20},
  section:{marginBottom:10},
  title:{fontSize:18,textAlign:"center",fontWeight:"bold"},
  text:{fontSize:12,marginBottom:5}
})


const ReportPDF=({report})=>(
  
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.text}>Customer Report</Text>
<Text style={styles.text}>Customer Name : {report?.customerName}</Text>   
<Text style={styles.text}>Date Range:{report?.date?.startDate}-{report.date.endDate}</Text>  
 </View>
 <View style={styles.section}>
  <Text style={styles.text}>Total Purchase :{report?.purchase}</Text>
  <Text style={styles.text}>Total Paid : {report?.paid}</Text>
  <Text style={styles.text}> Balance:{report?.balance}</Text>
  <Text style={styles.text}>Total Balance:{report?.customertotalbalance}</Text>
 </View>
    </Page>
  </Document>
  
)

const ReportPage = () => {

      const [report]=useState(JSON.parse(localStorage.getItem("report")));
      const handlePrint=()=>{
        window.print();
      }
  return (
    <div className="flex flex-col items-center justify-center p-8">

                <div className="flex w-full  gap-8 justify-end mb-8">
                  <PDFDownloadLink document={<ReportPDF report={report}/>} fileName={`Report_${report.customerName}.pdf`}>{({loading})=>(<button disabled={loading} className="flex items-center gap-2 p-2 bg-blue-500 text-white rounded"><img  src={download} alt="download" className="w-10 h-10 cursor-pointer" />{loading?"Generating PDF...":"Download PDF"}</button>)}
                  </PDFDownloadLink>
                  <img src={printIcon} alt="" className="w-10 h-10 cursor-pointer" onClick={handlePrint} /></div>
    <div className=" rounded flex max-sm:w-full w-1/2 max-lg:w-3/4 gap-4 flex-col shadow-2xl shadow-slate-700 p-8 ">
      <h1 className="text-center text-[22px] font-semibold ">Report</h1>
      <div className="h-0.5 w-3/4 m-auto bg-slate-200 my-4 rounded "></div>
     <div className="flex gap-2 justify-center "> <h3>Customer Name :</h3>
      <p>{report.customerName}</p></div>
      <h3 className="text-center">Between Date from {report.date.startDate} to {report.date.endDate}</h3>
      <div className="m-auto gap-4 flex flex-col my-8">
      <div className="flex gap-2 ">
        <h3>Total Purchase :</h3> <p>{report.purchase}</p>
      </div>
      <div className="flex gap-2 ">
        <h3>Total Paid :</h3> <p>{report.paid}</p>
      </div>
      <div className="flex gap-2 ">
        <h3>Balance :</h3> <p>{report.balance}</p>
      </div>
      <div className="flex gap-2 ">
        <h3>Total Balance :</h3> <p>{report.customertotalbalance}</p>
      </div>
      </div>
    </div>
    </div>
  )
}

export default ReportPage

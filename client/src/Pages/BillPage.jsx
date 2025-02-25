import  toast  from "react-hot-toast";
import printIcon from "../assets/printer.png"
import download from "../assets/download_10118725.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Billpdf from "../Components/Billpdf";

const BillPage = () => {
  const { id } = useParams();
  const [bill, setBill] = useState({});

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(loading);
  }, [loading]);
  const getparticularbill = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/bills/bill/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include"
      });
      const data = await res.json();

      setBill(data.bill);
    } catch (error) {
      console.log("Error in billpage frontend", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handlePrint=()=>{
    window.print();
  }
  useEffect(() => {
   if(id){ getparticularbill();}
  }, [id]);
useEffect(()=>{
console.log(bill)
},[bill])
  return (
    <div className="m-10">
      {loading ? (
        <div className="animate-spin w-10 h-10 flex items-center justify-center border-t-2 border-white "></div>
      ) : (
     <>
         <div className="flex justify-end  gap-4 mb-8">
         {bill&&Object.keys(bill).length>0&&(   <PDFDownloadLink document={<Billpdf bill={bill}/>} fileName={`Bill_${id}.pdf`}>

          {({ loading }) => 
    loading ? <p>Generating PDF...</p> : <img src={download} alt="download" className="w-10 h-10 cursor-pointer" />
  }
           </PDFDownloadLink>)}
           <img src={printIcon} alt="" className="w-10 h-10 cursor-pointer" onClick={handlePrint} />
          </div>
        
          <div className=" p-10 shadow-md shadow-slate-300 ">
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
             
                <h3>Date : </h3>
                <p>{bill?.billDate?.split("T")[0]}</p>
              </div>
              <div className="flex gap-1">
             
                <h2>Bill No : </h2>
                <p>{bill.billNumber}</p>
              </div>
            </div>
            <div className="text-center my-4">
           
              <h1 className="text-2xl font-semibold">{bill?.customerId?.name}</h1>
            </div>
            <div className="grid grid-cols-7 max-sm:hidden justify-items-center">
              <h2>Code</h2>
              <h2>Vegetable</h2>
              <h2>Rate</h2>
              <h2>Unit</h2>
              <h2>Bags</h2>
              <h2>Units</h2>
              <h2>Amount</h2>
            </div>
            {
              bill?.items?.map((item,index) => (
           
                  <div key={index} className="grid grid-cols-7 max-sm:grid-cols-1   justify-items-center my-2 shadow-sm p-2 shadow-slate-300">
                    <div className="flex gap-2">
                      <h2 className="hidden max-sm:block">Code</h2>
                      <h2>{item.code.uniquecode}</h2>
                    </div>
                    <div className="flex gap-2">
                      <h2 className="hidden max-sm:block">Vegetable</h2>{" "}
                      <h2>{item.code.name}</h2>
                    </div>
                    <div className="flex gap-2">
                      <h2 className="hidden max-sm:block"> Rate</h2>{" "}
                      <h2>{item.rate}</h2>
                    </div>
                    <div className="flex gap-2">
                      <h2 className="hidden max-sm:block"> Unit</h2>
                      <h2>{item.unit}</h2>
                    </div>
                    <div className="flex gap-2">
                      <h2 className="hidden max-sm:block">Bags</h2>
                      <h2>{item.bags}</h2>
                    </div>
                    <div className="flex gap-2">
                      <h2 className="hidden max-sm:block">Units</h2>
                      <h2>{item.units}</h2>
                    </div>
                    <div className="flex gap-2">
                      <h2 className="hidden max-sm:block">Amount</h2>
                      <h2>{item.rate * item.units}</h2>
                    </div>
                  </div>
            
              ))}

            <div className="flex flex-col gap-3 my-8 items-end">
              <div className="flex gap-1 ">
                <h3>Total Amount :</h3>
                <p>{bill?.totalAmount || "N/A"}</p>
              </div>
              <div className="flex gap-1 ">
                <h3>Paid Amount :</h3>
                <p>{bill?.paid ||0}</p>
              </div>
              <div className="flex gap-1 ">
                <h3>Balance Amount :</h3>
                <p>{(bill?.totalAmount||0)- (bill?.paid||0)}</p>
              </div>
            </div>
          </div>
          </>
      )}
    </div>
  );
};

export default BillPage;

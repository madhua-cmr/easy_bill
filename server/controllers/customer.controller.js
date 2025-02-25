import Bill from "../models/billModel.js";
import Customer from "../models/customerModel.js";
import mongoose from "mongoose";
export const getCustomerBills = async (req, res) => {
  const data = req.body;
  const { customerId } = req.params;

  const id = new mongoose.Types.ObjectId(customerId);
  let bills;
   
  let purchase = 0;
  let paid = 0;
  const customer= await Customer.findById(customerId);
  let balance = 0;
const customertotalbalance=customer.balanceAmount;
const customerName=customer.name;
  try {
    if (data?.startDate == "" && data?.endDate == "") {
      bills = await Bill.find({ customerId: id });
    
      let startDate=bills[0]?.billDate,endDate=bills[0]?.billDate;

      bills?.forEach((bill) => {
        purchase += bill.totalAmount;
        paid += bill.paid;
        if(startDate<bill.billDate){
            startDate=bill.billDate
        }
        if(endDate>bill.billDate){
            endDate=bill.billDate
        }
      });
       balance = purchase - paid;
       if(bills.length===0){
        return res.status(200).json({ success: true, bills:[],report:{  customerName,
            date:{
                startDate:"",
                endDate:"",
            },
            purchase,
            paid,
            customertotalbalance,
            balance} })
      }
      const report={
        customerName,
        date:{
            startDate:new Date(startDate).toISOString().split("T")[0],
            endDate:new Date(endDate).toISOString().split("T")[0],
        },
        purchase,
        paid,
        customertotalbalance,
        balance
      }
      return res.status(200).json({ success: true, bills ,report });
    } else {
      bills = await Bill.find({ customerId: id })
        .where("billDate")
        .gte(new Date(data.startDate))
        .lte(new Date(data.endDate));

      if (bills) {
        bills.forEach((bill) => {
          purchase += bill.totalAmount;
          paid += bill.paid;
        });
        balance = purchase - paid;

        const report={
            customerName,
            date:data,
            purchase,
            paid,
            customertotalbalance,
            balance
          }
        return res.status(200).json({ success: true, bills ,report});
      } else {
        return res
          .status(404)
          .json({
            success: false,
            error: "No bills are found in your filter range",
          });
      }
    }
  } catch (error) {
    console.log("Error in getCustomerBills controller", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getCustomerBalance = async (req, res) => {
  const id = req.params.customerId;
  try {
    const bills = await Bill.find({ customerId: id });
    const totbalance = 0;
    bills.forEach((bill) => {
      totbalance += bill.totalAmount - bill.paid;
    });
    return res.status(200).json({ success: true, balanceAmount: totbalance });
  } catch (error) {
    console.log("Error in getCustomer balance controller", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = (await Customer.find({})) || [];
    if (customers) {
      return res.status(200).json({ success: true, customers });
    }
  } catch (error) {
    console.log("Error in getCustomers", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const addCustomer = async (req, res) => {
  const customerdata = req.body;
  try {
    if (!customerdata) {
      return res
        .status(404)
        .json({ success: false, error: "Customer details not provided" });
    }
    const customer = new Customer(customerdata);
    await customer.save();
    return res
      .status(200)
      .json({ success: true, message: "Customer added successfully" });
  } catch (error) {
    console.log("Error in addCustomer", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getReportData = async (req, res) => {
  const data = req.body;
  try {
  } catch (error) {
    console.log("Error in getReport data", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};


export const deleteCustomer=async(req,res)=>{
  const custId=req.params.id;
  try {
await Bill.deleteMany({customerId:custId});

  

    await Customer.findByIdAndDelete(custId);
return res.status(200).json({success:true,message:"Customer deleted Successfully"});



  } catch (error) {
    console.log("Error in delete customer controller", error.message);
    return res.status(500).json({ success: false, error: error.message });
  
  }
}
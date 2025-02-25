import view from "../assets/find_11514564.png";
import deleteicon from "../assets/delete_10024290.png";
import reportimage from "../assets/report_747803.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect} from "react";
import  toast  from "react-hot-toast";
import useFilterBills from "../hooks/useFilterBills";
import { AppContext } from "../Context/AppContextProvider";
import Loader from "../Components/Loader";

const CustomerBillsPage = () => {
  const{loading,setLoading,user,isadmin}=useContext(AppContext);
  const { bills, filtervalues, SetFilterValues, customerbills, report } =useFilterBills();

  const handledelete = async (id) => {

    if (window.confirm("Are you sure to delete the bill ?")) {
    setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/bills/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
           credentials:"include"
        });
        const data = await res.json();
        if (data.error) {
          toast.error(data.error);
          return;
        }
        if (data.success) {
        
          toast.success("Bill deleted successfully");
          
        }
      } catch (error) {
        console.log("Error in handledelete frontend", error.message);
        toast.error(error.message);
      }finally{
        setLoading(false);
      }
    } else {
      return;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!filtervalues.startDate) {
      toast.error("Please choose start date value");
      return;
    }
    if (!filtervalues.endDate) {
      toast.error("Please choose end date value");
      return;
    }
    if (new Date(filtervalues.startDate) > new Date(filtervalues.endDate)) {
      toast.error("Start date must be before or equals endDate");
      return;
    }

    customerbills();
  };

  const navigate = useNavigate();

  useEffect(() => {
   
    customerbills();
   
  }, []);


  return (
   
    <div className="p-8 py-16">
  
      <div className="flex  justify-end mx-16 gap-4 my-8 max-sm:flex-col max-sm:items-center   ">
    
     <form
          className="flex gap-4 items-center max-sm:flex-col"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            onChange={(e) =>
              SetFilterValues((prev) => ({
                ...prev,
                startDate: e.target.value,
              }))
            }
            className=" shadow-md shadow-slate-400 p-2 rounded border-0 outline-none hover:outline-none "
            name="startDate"
            id=""
            value={filtervalues?.startDate}
          />
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            name="endDate"
            className=" shadow-md shadow-slate-400 p-2  rounded border-0 outline-none hover:outline-none "
            value={filtervalues?.endDate}
            onChange={(e) =>
              SetFilterValues((prev) => ({ ...prev, endDate: e.target.value }))
            }
            id=""
          />
          <button
            type="submit"
            className="w-[100px]  bg-slate-900 rounded text-white p-1 flex items-center justify-center"
          >
            Filter
          </button>
        </form>
        <NavLink to="/report">
          <img src={reportimage} className="cursor-pointer w-8 h-8" alt=""  />
        </NavLink>
      </div>
      <h1 className="text-center text-[22px] font-semibold my-2">
        {report?.customerName}
      </h1>
      {loading?
      <Loader/>:bills?.length === 0 ? (
        <p className="flex  items-center justify-center my-32">No bills available</p>
      ) : (
        <>
          <div className="grid-cols-7 max-sm:hidden max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-2  grid gap-2 p-6 shadow-sm shadow-slate-200 items-center justify-items-center rounded">
            <h2>Bill Date</h2>
            <h2>Total Items</h2>
            <h2>Total Amount</h2>
            <h2>Paid Amount</h2>
            <h2>Balance Amount</h2>
            <h2>View</h2>
            <h2>Delete</h2>
          </div>
          {bills?.map((bill) => (
            <>
              <div
                key={bill?._id}
                className="grid-cols-7 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-1   grid gap-2 p-6 shadow-sm shadow-slate-200 items-center max-sm:justify-items-start max-sm:mx-auto  justify-items-center rounded"
              >
                <div className="flex gap-2">
                  <h2 className="max-sm:block hidden">Bill Date :</h2>
                  <p>{bill?.billDate?.split("T")[0]}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="max-sm:block hidden">Total Items :</h2>
                  <p>{bill?.items?.length}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="max-sm:block hidden">Total Amount :</h2>
                  <p>{bill?.totalAmount}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="max-sm:block hidden">Paid Amount :</h2>
                  <p>{bill?.paid}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="max-sm:block hidden">Balance Amount :</h2>
                  <p>{bill?.totalAmount - bill?.paid}</p>
                </div>
                <img
                  className="w-7 h-7 block max-sm:hidden object-cover cursor-pointer"
                  src={view}
                  alt=""
                  onClick={() => navigate(`/customer/bill/${bill?._id}`)}
                />
              {user&&isadmin&& <div
                  className="cursor-pointer"
                  onClick={() => handledelete(bill?._id)}
                >
                  <img
                    className="w-7 h-7 block max-sm:hidden object-cover "
                    src={deleteicon}
                    alt=""
                  />
                </div>}
                <div className=" hidden max-sm:flex  gap-4">
                  <img
                    className="w-7 h-7 object-cover cursor-pointer"
                    src={view}
                    alt=""
                    onClick={() => navigate(`/customer/bill/${bill._id}`)}
                  />
                  <div className="cursor-pointer " onClick={()=>handledelete(bill?._id)}>
                  <img
                    className="w-7 h-7 object-cover cursor-pointer"
                    src={deleteicon}
                    alt=""
                  />
                  </div>
                </div>
              </div>
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default CustomerBillsPage;

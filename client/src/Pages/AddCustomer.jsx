import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../Context/AppContextProvider";
import Loader from "../Components/Loader";

const AddCustomer = () => {
  const {loading,setLoading}=useContext(AppContext)
  const [details, setDetails] = useState({
    name: "",
    contact: "",
  });

  const submitHandler = async (e) => {
   
    e.preventDefault();
    const regix = /\d{10}/;
    if (!regix.test(details.contact)) {
      toast.error("Enter valid  10 digits phno");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/customer/", {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
         credentials:"include"
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }
      toast.success(data.message);
    } catch (error) {
      console.log("Error in add customer form submission", error.message);
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  };

  if(loading){
    return <Loader/>
  }
  return (
    <div>
      <h2 className="text-center text-[20px] font-semibold my-8 ">
        Add Customer
      </h2>
      <div className="w-1/2 max-sm:w-full rounded p-6 shadow-md m-auto items-center flex justify-center">
        {" "}
        <div className=" flex flex-col gap-4   ">
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            name="name"
            placeholder="Madhu"
            minLength={3}
            onChange={(e) =>
              setDetails((pre) => {
                return { ...pre, name: e.target.value };
              })
            }
            className="p-2 w-[200px] rounded outline-none hover:outline-none ring-1 ring-slate-200 shadow-xl"
            required
          />

          <label htmlFor="contact">Contact :</label>
          <input
            type="text"
            name="contact"
            placeholder="0123456789"
            onChange={(e) =>
              setDetails((prev) => {
                return { ...prev, contact: e.target.value };
              })
            }
            className="p-2 w-[200px] rounded outline-none hover:outline-none ring-1 ring-slate-200 shadow-xl"
            maxLength={10}
            minLength={10}
            required
          />
          <button
            className="bg-slate-900 rounded text-white p-1 w-[70px] my-6"
            type="submit"
            onClick={(e) => submitHandler(e)}
          >
            Submit
          </button>
        </div>{" "}
      </div>
    </div>
  );
};

export default AddCustomer;

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import BreadCrumb from "../ui/BreadCrumb";
import DataTable from "../ui/DataTable";
import SidePopup from "../ui/SidePopup";


import LeaveLegend from "../components/leave/LeaveLegend";
import LeaveStats from "../components/leave/LeaveStats";
import LeaveForm from "../components/leave/LeaveForm";
import LeaveTableColumns from "../components/leave/LeaveTableColumns";
import { fetchLeaves, applyLeave, updateLeave, deleteLeave } from "../services/leaveService";

function Leave() {

  const [showPopup, setShowPopup] = useState(false);

  const [leaveRecords, setLeaveRecords] = useState([])

  const [selectedLeave, setSelectedLeave] = useState(null);



  //Function to apply leave 
  async function handleApplyLeave(formData) {

    try {

      const payload = {
        leaveType: formData.leave_type,
        fromDate: formData.from_date,
        toDate: formData.to_date,
        reason: formData.reason
      };

      const res = await applyLeave(payload);

      console.log("API response:", res);

      setShowPopup(false);

      await loadLeaves();

    } catch (err) {
      console.error("Failed to apply leave:", err);
    }
  }


  //Function to edit leave 
  function handleEditClick(row) {
    setSelectedLeave(row);
    setShowPopup(true);
  }

  //Function to delete leave 
  async function handleDeleteClick(row) {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this leave?"
    );

    if (!confirmDelete) return;

    try {
      await deleteLeave(row.id);
      await loadLeaves();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }


  //UseEffect to fetch data
  useEffect(() => {
    loadLeaves();
  }, []);

  async function loadLeaves() {
    try {
      const leaves = await fetchLeaves();
      setLeaveRecords(leaves || []);
    } catch (err) {
      console.error("Failed to load leaves:", err);
    }
  }





  return (
    <div className="
      bg-bgMain
      min-h-screen
      px-6
      lg:px-12
      py-8
      space-y-8
    ">

      {/* HEADER SECTION */}
      <div className="space-y-4">
        <BreadCrumb
          items={[
            { label: "Dashboard", path: "/dashboard" },
            { label: "Leave", path: "/leave" }
          ]}
        />

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-textMain tracking-tight">
              Leave Management
            </h1>
            <p className="text-sm text-muted font-medium">
              Track and apply for your time off requests
            </p>
          </div>

          <button
            onClick={() => setShowPopup(true)}
            className="
              btn-modern
              px-4 py-3
              rounded-xl
              bg-bgCard
              border border-primary/10
              hover:bg-primarySoft
              flex items-center gap-2
              text-textMain
              shadow-sm
            "
          >
            <Plus size={20} />
            <span className="hidden sm:inline font-bold text-xs uppercase tracking-widest">Apply Leave</span>
          </button>
        </div>
      </div>



      {/* CONTENT GRID */}
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-bgCard/30 p-4 rounded-2xl border border-primary/5 backdrop-blur-sm shadow-sm">
          <LeaveLegend />
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* TABLE */}
          <div className="min-w-0">
            <DataTable
              data={leaveRecords}
              columns={LeaveTableColumns(handleEditClick, handleDeleteClick)}
              emptyMessage="No leave applied"
            />
          </div>


          {/* SUMMARY */}
          <div className="lg:sticky lg:top-24 h-fit">
            <LeaveStats records={leaveRecords} />
          </div>
        </div>
      </div>


      {/* popup */}
      <SidePopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title="Apply Leave"
        width="420px"
      >
        <LeaveForm onSubmit={handleApplyLeave} />
      </SidePopup>


    </div>

  );

}

export default Leave;
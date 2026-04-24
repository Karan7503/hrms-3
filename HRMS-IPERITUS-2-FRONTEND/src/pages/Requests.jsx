import { Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { fetchRequests, createRequest, updateRequest, deleteRequest } from "../services/requestsService"

import BreadCrumb from './../ui/BreadCrumb';
import DataTable from "../ui/DataTable";
import SidePopup from "../ui/SidePopup";

import RequestForm from "../components/requests/RequestForm";
import RequestTableColumns from "../components/requests/RequestTableColumns";
import RequestFilter from "../components/requests/RequestFilter";
import RequestStats from "../components/requests/RequestStats";
import RequestLegend from "../components/requests/RequestLegend";



function Requests() {

  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState([]);
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);


  async function loadRequests() {
    try {
      const response = await fetchRequests();
      setData(response.records || []);
    } catch (err) {
      console.error("Failed to load requests:", err);
    }
  }

  async function handleAddRequest(formData) {
    try {
      await createRequest(formData);
      setShowPopup(false);
      loadRequests(); // Refresh the table
    } catch (err) {
      console.error("Failed to create request:", err);
    }
  }

  const filteredData =
    typeFilter === "All"
      ? data
      : data.filter(
        r => r.request_for === typeFilter
      );



  // function to edit requests
  function handleEditClick(row) {
    setSelectedRequest(row);
    setShowPopup(true);
  }

  // function to delete requests
  async function handleDeleteClick(row) {

    const confirmDelete = window.confirm("Are you sure you want to delete this request?");

    if (!confirmDelete) return;

    try {
      console.log("Deleting ID", row.request_no);
      await deleteRequest(row.request_no);
      await loadRequests();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }



  //Useffect to load requests
  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <div className="
      bg-bgMain
      min-h-screen
      px-6
      lg:px-12
      py-8
      space-y-8
    ">

      <BreadCrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Requests", path: "/requests" }
        ]}
      />

      {/* HEADER SECTION */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-textMain tracking-tight">
            My Requests
          </h1>
          <p className="text-sm text-muted font-medium">
            Manage your stationary, IT, and other service requests
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
          <span className="hidden sm:inline font-bold text-xs uppercase tracking-widest">Add Request</span>
        </button>
      </div>



      {/* CONTENT GRID */}
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-bgCard/30 p-4 rounded-2xl border border-primary/5 backdrop-blur-sm shadow-sm">
          <div className="flex flex-wrap items-center gap-6">
            <RequestLegend />
            <div className="h-8 w-px bg-primary/10 hidden md:block" />
            <RequestFilter
              value={typeFilter}
              onChange={setTypeFilter}
            />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* TABLE */}
          <div className="min-w-0">
            <DataTable
              data={filteredData}
              columns={RequestTableColumns(handleEditClick, handleDeleteClick)}
              emptyMessage="No requests yet"
            />
          </div>


          {/* SUMMARY */}
          <div className="lg:sticky lg:top-24 h-fit">
            <RequestStats data={filteredData} />
          </div>
        </div>
      </div>


      {/* popup */}
      <SidePopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title="Add Request"
        width="500px"
      >
        <RequestForm onSubmit={handleAddRequest} />
      </SidePopup>


    </div>
  )
}

export default Requests
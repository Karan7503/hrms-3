import { useEffect, useState, useRef } from "react";
import { SlidersHorizontal } from "lucide-react";

import { fetchAttendance } from "../services/attendanceService";

import GetAttendance from "../components/attendance/GetAttendance";
import AttendanceStats from "../components/attendance/AttendanceStats";
import AttendanceLegend from "../components/attendance/AttendanceLegend";

import Breadcrumb from "../ui/BreadCrumb";
import AttendanceTable from "../components/attendance/AttendanceTable";


function Attendance() {
  /* filters */
  const [filters, setFilters] = useState({
    start: "",
    end: ""
  });

  const popupRef = useRef();

  /* popup */
  const [showPopup, setShowPopup] = useState(false);


  /* backend data */
  const defaultSummary = {
    totalDays: 0,
    present: 0,
    absent: 0,
    late: 0,
    holiday: 0,
    weekOff: 0,
    attendancePercent: 0
  };

  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState(defaultSummary);


  /* load data */
  async function loadAttendance() {
    try {
      const data = await fetchAttendance(filters);
      setRecords(data.records);
      setSummary(data.summary ?? defaultSummary);
    }
    catch (err) {
      console.error("attendance fetch failed", err);
    }
  }


  /* initial load */
  useEffect(() => {
    loadAttendance();
    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    }

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);



  /* filter search */
  function onSearch() {
    if (!filters.start || !filters.end) return;
    loadAttendance();
    setShowPopup(false);
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
        <Breadcrumb
          items={[
            { label: "Dashboard", path: "/dashboard" },
            { label: "Attendance", path: "/attendance" }
          ]}
        />

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-textMain tracking-tight">
              Attendance
            </h1>
            <p className="text-sm text-muted font-medium">
              Monitor employee presence and work hours
            </p>
          </div>

          <div className="relative" ref={popupRef}>
            <button
              onClick={() => setShowPopup(!showPopup)}
              className="
                btn-modern
                p-3
                rounded-xl
                bg-bgCard
                border border-primary/5
                hover:bg-primarySoft
                flex items-center gap-2
                text-textMain
                shadow-sm
              "
            >
              <SlidersHorizontal size={20} />
              <span className="hidden sm:inline font-bold text-xs uppercase tracking-widest">Filters</span>
            </button>


            {/* FILTER POPUP */}
            {showPopup && (
              <div className="
                  absolute
                  right-0
                  top-14
                  z-[1000]
                  bg-bgCard/95 backdrop-blur-md
                  border border-primary/10
                  rounded-2xl
                  shadow-xl
                  p-6
                  w-[320px]
                  sm:w-[360px]
                  animate-in fade-in zoom-in duration-200
                ">
                <div className="mb-4">
                  <h4 className="font-bold text-textMain">Filter Records</h4>
                  <p className="text-xs text-muted">Select date range to filter attendance</p>
                </div>
                <GetAttendance filters={filters} setFilters={setFilters} onSearch={onSearch} />
              </div>
            )}
          </div>
        </div>
      </div>



      {/* CONTENT GRID */}
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-bgCard/30 p-4 rounded-2xl ">
          <AttendanceLegend />
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* TABLE */}
          <div className="min-w-0">
            <AttendanceTable data={records} />
          </div>


          {/* SUMMARY */}
          <div className="lg:sticky lg:top-24 h-fit">
            <AttendanceStats summary={summary} filters={filters} />
          </div>
        </div>
      </div>


    </div>

  );

}

export default Attendance;
import React from "react";
import useSWR from "swr";

const fetchAbsence = async (absenceId: string) => {
  const res = await fetch(`http://localhost:3001/api/absences/admin/${absenceId}`, {
    credentials: "include",
  });
  return await res.json();
};

export default function AbsenceDetails({ absenceId }: any) {
  const { data, error } = useSWR(absenceId, fetchAbsence);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
 

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h3>Name: <span className="details">{data.name}</span></h3>
      <h3>Vame: <span className="details">{data.firstName}</span></h3>
      <h3>Absence From:<span className="details">{data.fromDate}</span></h3>
      <h3>Absence To: <span className="details">{data.toDate}</span></h3>
      <h3>Absence Reason: <span className="details">{data.reason}</span></h3>
      <h3>Reamarks: <span className="details">{data.remarks}</span></h3>
    </div>
  );
}

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
      <h3>Name: {data.name}</h3>
      <h3>Vame: {data.firstName}</h3>
      <h3>Absence From:{data.fromDate}</h3>
      <h3>Absence To: {data.toDate}</h3>
      <h3>Absence Reason: {data.reason}</h3>
      <h3>Reamarks: {data.remarks}</h3>
    </div>
  );
}

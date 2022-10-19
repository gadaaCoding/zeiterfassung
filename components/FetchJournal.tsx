import React from "react";
import useSWR from "swr";

const fetchJournal = async (journalId: string) => {
  const res = await fetch(`http://localhost:8080/journals/${journalId}`, {
    credentials: "include",
  });
  return await res.json();
};

export default function JournalDetails({ journalId }: any) {
  const { data, error } = useSWR(journalId, fetchJournal);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const fullName = `${data.firstName} ${data.lastName}`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h3>{fullName}</h3>
      <h3>{data.weekday}</h3>
      <h3>{data.journalFrom}</h3>
      <h3>{data.journalTo}</h3>
      <h3>{data.activity}</h3>
      <h3>{data.evaluation}</h3>
      <h3>{data.remarks}</h3>
    </div>
  );
}

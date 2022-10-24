import React from "react";
import useSWR from "swr";

const fetchJournal = async (journalId: string) => {
  const res = await fetch(`http://localhost:3001/api/journals/admin/${journalId}`, {
    credentials: "include",
  });
  return await res.json();
};

export default function JournalDetails({ journalId }: any) {
  const { data, error } = useSWR(journalId, fetchJournal);

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
      <h3>Vorname: {data.firstName}</h3>
      <h3>Tag der Woche: {data.dayOfWeek}</h3>
      <h3>Datum Von: {data.fromDate}</h3>
      <h3>Datum Bis: {data.toDate}</h3>
      <h3>Tätigkeiten: {data.activities}</h3>
      <h3>Bemerkungen: {data.remarks}</h3>
    </div>
  );
}

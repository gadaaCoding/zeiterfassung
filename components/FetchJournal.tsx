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
    <div className="detailsWapper">
      <h3>Name: <span className="details">{data.name}</span></h3>
      <h3>Vorname: <span className="details">{data.firstName}</span></h3>
      <h3>Tag der Woche: <span className="details">{data.dayOfWeek}</span></h3>
      <h3>Datum Von: <span className="details">{data.fromDate}</span></h3>
      <h3>Datum Bis: <span className="details">{data.toDate}</span></h3>
      <h3>Tätigkeiten: <span className="details">{data.activities}</span></h3>
      <h3>Bemerkungen: <span className="details">{data.remarks}</span></h3>
    </div>
  );
}

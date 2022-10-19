import useSWR from "swr";

const fetchAbsence = async (absenceId: string) => {
  const res = await fetch(`http://localhost:8080/absences/${absenceId}`, {
    credentials: "include",
  });
  return await res.json();
};

export default function AbsenceDetails({ absenceId }: any) {
  const { data, error } = useSWR(absenceId, fetchAbsence);

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
      <h3>{data.absenceFrom}</h3>
      <h3>{data.absenceTo}</h3>
      <h3>{data.reason}</h3>
      <h3>{data.remarks}</h3>
    </div>
  );
}

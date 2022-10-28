import useSWR from "swr";

const fetchUser = async (userId: string) => {
  const res = await fetch(`http://localhost:3001/api/users/admin/${userId}`, {
    credentials: "include",
  });
  return await res.json();
};

export default function UserDetails({ usersId }: any) {
  const { data, error } = useSWR(usersId, fetchUser);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="detailsWapper">
      <h3>Name: <span className="details">{data.name}</span></h3>
      <h3>Vorname: <span className="details">{data.firstName}</span></h3>
      <h3>Email: <span className="details">{data.email}</span></h3>
      <h3>Benutzerrolle: <span className="details">{data.roles}</span></h3>
    </div>
  );
}

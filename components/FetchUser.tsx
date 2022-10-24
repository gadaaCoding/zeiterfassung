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
      <h3>Email: {data.email}</h3>
      <h3>Benutzerrolle: {data.roles}</h3>
    </div>
  );
}

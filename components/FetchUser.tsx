import useSWR from "swr";

const fetchUser = async (userId: string) => {
  const res = await fetch(`http://localhost:8080/users/${userId}`, {
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
      <h3>{data.firstName}</h3>
      <h3>{data.lastName}</h3>
      <h3>{data.email}</h3>
      <h3>{data.roles}</h3>
    </div>
  );
}

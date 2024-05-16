import { ProjectTable } from "../components/ProjectTable";
import { fetchProjectList, getToken } from "../modules/api";

export default async function Page() {
  const data = await fetchProjectList();
  const token = await getToken();

  try {
    return (
      <div>
        <ProjectTable data={data} token={token} />
      </div>
    );
  } catch (error) {
    console.error(error);
  }
}

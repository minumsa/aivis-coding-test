import { ProjectTable } from "../components/ProjectTable";
import { fetchProjectList } from "../modules/api";

export default async function Page() {
  const data = await fetchProjectList();

  try {
    return (
      <div>
        <ProjectTable data={data} />
      </div>
    );
  } catch (error) {
    console.error(error);
  }
}

import { fetchProjectList } from "../modules/api";

export default async function Page() {
  const result = await fetchProjectList();

  try {
    return <div></div>;
  } catch (error) {
    console.error(error);
  }
}

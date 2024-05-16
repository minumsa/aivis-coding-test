import { PageProps } from "@/.next/types/app/layout";

export default function Page({ params }: PageProps) {
  const projectId = params.projectId;

  return <div>Project Id: {projectId}</div>;
}

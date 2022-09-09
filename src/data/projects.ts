import { ProjectData } from "@/state";
import { supabase } from "./supabaseClient";

export const getProjectById = async (id: string) => {
  const {
    data: [created],
    error,
  } = await supabase.from("projects").select("*").eq("id", id);
  if (error) {
    console.error(error);
    return false;
  }
  return created.data as ProjectData;
};

export const getProjects = async () => {
  const { data, error } = await supabase.from("projects").select("*");

  if (error) {
    console.error(error);
  }

  return data;
};

// export const insertProject = async (project: any) => {
//   const { data, error } = await supabase.from("project").upsert(project);

//   if (error) {
//     console.error(error);
//   }

//   return data;
// };

export const createProject = async (project: ProjectData) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    return false;
  }

  const {
    data: [created],
    error,
  } = await supabase
    .from("projects")
    .insert({
      data: project,
      title: project.title,
      user_id: user.id,
    })
    .select();

  if (error) console.error(error);

  return created.id;
};

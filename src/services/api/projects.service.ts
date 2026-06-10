import { supabase } from '../../lib/supabase';
import { Project } from '../../types/models';

export const projectsService = {
  async getAllProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*, mentor:users!projects_mentor_id_fkey(name)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
    return data as Project[];
  },

  async createProject(project: Omit<Project, 'id' | 'created_at'>): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return null;
    }
    return data as Project;
  },

  async assignMentor(projectId: string, mentorId: string | null): Promise<boolean> {
    const { error } = await supabase
      .from('projects')
      .update({ mentor_id: mentorId })
      .eq('id', projectId);

    if (error) {
      console.error('Error assigning mentor:', error);
      return false;
    }
    return true;
  },
  
  async deleteProject(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      return false;
    }
    return true;
  }
};

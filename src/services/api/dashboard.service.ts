import { supabase } from '../../lib/supabase';
import { ProjectWithDetails } from '../../types/models';

export const dashboardService = {
  // Optimized single-query fetch for Mentor Dashboard utilizing Supabase nested selects
  async getMentorDashboard(mentorId: string): Promise<ProjectWithDetails[]> {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        assignments (
          student_id,
          users (id, name, email)
        ),
        scores (*)
      `)
      .eq('mentor_id', mentorId);

    if (error) {
      console.error('Error fetching mentor dashboard data:', error);
      return [];
    }

    return data as unknown as ProjectWithDetails[];
  },

  // Optimized single-query fetch for Admin Dashboard
  async getAdminDashboardOverview() {
    const [studentsReq, projectsReq, mentorsReq] = await Promise.all([
      supabase.from('users').select('id', { count: 'exact', head: true }).eq('role', 'student'),
      supabase.from('projects').select('id', { count: 'exact', head: true }),
      supabase.from('users').select('id', { count: 'exact', head: true }).eq('role', 'mentor'),
    ]);

    return {
      totalStudents: studentsReq.count || 0,
      totalProjects: projectsReq.count || 0,
      totalMentors: mentorsReq.count || 0,
    };
  }
};

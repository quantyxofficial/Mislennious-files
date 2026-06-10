import { supabase } from '../../lib/supabase';
import { Assignment } from '../../types/models';

export const assignmentsService = {
  async assignStudent(studentId: string, projectId: string): Promise<boolean> {
    const { error } = await supabase
      .from('assignments')
      .insert([{ student_id: studentId, project_id: projectId }]);

    if (error) {
      console.error('Error assigning student:', error);
      return false;
    }
    return true;
  },

  async unassignStudent(studentId: string, projectId: string): Promise<boolean> {
    const { error } = await supabase
      .from('assignments')
      .delete()
      .match({ student_id: studentId, project_id: projectId });

    if (error) {
      console.error('Error unassigning student:', error);
      return false;
    }
    return true;
  }
};

import { supabase } from '../../lib/supabase';
import { Score } from '../../types/models';

export const scoresService = {
  // Upsert a score (insert or update if exists, utilizing historical updated_at)
  async submitScore(scoreData: Omit<Score, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> {
    
    // First, check if a score already exists for this student + project
    const { data: existing } = await supabase
      .from('scores')
      .select('id')
      .match({ student_id: scoreData.student_id, project_id: scoreData.project_id })
      .single();

    let error;

    if (existing) {
      // Update existing
      const { error: updateError } = await supabase
        .from('scores')
        .update({
          marks: scoreData.marks,
          feedback: scoreData.feedback,
          mentor_id: scoreData.mentor_id,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id);
      error = updateError;
    } else {
      // Insert new
      const { error: insertError } = await supabase
        .from('scores')
        .insert([scoreData]);
      error = insertError;
    }

    if (error) {
      console.error('Error submitting score:', error);
      return false;
    }
    return true;
  }
};

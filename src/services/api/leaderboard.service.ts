import { supabase } from '../../lib/supabase';
import { LeaderboardEntry } from '../../types/models';

export const leaderboardService = {
  // Compute leaderboard by aggregating scores directly via Supabase query
  async getGlobalLeaderboard(): Promise<LeaderboardEntry[]> {
    
    // In a production Supabase setup, this is best done via a Database View or RPC.
    // For now, we perform a relational query and aggregate in JavaScript, 
    // or we can use Supabase's built in RPC if we had defined one.
    // Since we don't have an RPC defined in the schema, we'll fetch all scores and aggregate.
    // This utilizes the idx_scores_student index efficiently for fetching.
    
    const { data: scores, error } = await supabase
      .from('scores')
      .select('marks, student_id, users!inner(name)');

    if (error) {
      console.error('Error fetching leaderboard data:', error);
      return [];
    }

    // Aggregate scores
    const aggregated = scores.reduce((acc: Record<string, any>, curr: any) => {
      const studentId = curr.student_id;
      if (!acc[studentId]) {
        acc[studentId] = {
          student_id: studentId,
          name: curr.users.name,
          total_marks: 0,
          projects_contributed: 0
        };
      }
      acc[studentId].total_marks += curr.marks;
      acc[studentId].projects_contributed += 1;
      return acc;
    }, {});

    // Sort and assign rank
    const sorted = Object.values(aggregated).sort((a: any, b: any) => b.total_marks - a.total_marks);
    
    return sorted.map((entry: any, index: number) => ({
      ...entry,
      rank: index + 1
    }));
  }
};

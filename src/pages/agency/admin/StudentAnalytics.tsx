import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Github, Globe, BookOpen, Download, Search, Filter } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface StudentProfile {
  id: string;
  user_id: string;
  full_name: string;
  email?: string;
  university: string;
  major: string;
  graduation_year: string;
  bio: string;
  github_url: string;
  portfolio_url: string;
  created_at: string;
  updated_at: string;
}

export function StudentAnalytics() {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUniversity, setFilterUniversity] = useState('');
  const [universities, setUniversities] = useState<string[]>([]);

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('student_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setStudents(data);
        // Extract unique universities
        const unis = [...new Set(data.map(s => s.university).filter(Boolean))];
        setUniversities(unis);
      }
    } catch (err) {
      console.error('Error loading student data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.major.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUniversity = !filterUniversity || student.university === filterUniversity;
    return matchesSearch && matchesUniversity;
  });

  const exportCSV = () => {
    const headers = ['Full Name', 'University', 'Major', 'Graduation Year', 'GitHub', 'Portfolio', 'Created At'];
    const rows = filteredStudents.map(s => [
      s.full_name,
      s.university,
      s.major,
      s.graduation_year,
      s.github_url,
      s.portfolio_url,
      new Date(s.created_at).toLocaleDateString()
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${cell || ''}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student-profiles-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const stats = {
    total: students.length,
    withGithub: students.filter(s => s.github_url).length,
    withPortfolio: students.filter(s => s.portfolio_url).length,
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Student Profiles</h1>
          <p className="text-slate-400">View and manage all student profile data</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 transition-all text-sm font-semibold"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Total Students</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Github className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">GitHub Linked</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.withGithub}</p>
          <p className="text-[10px] text-slate-500 mt-1">{stats.total > 0 ? Math.round((stats.withGithub / stats.total) * 100) : 0}%</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Portfolio Linked</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.withPortfolio}</p>
          <p className="text-[10px] text-slate-500 mt-1">{stats.total > 0 ? Math.round((stats.withPortfolio / stats.total) * 100) : 0}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <div className="flex-1 min-w-[250px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name or major..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>

        <select
          value={filterUniversity}
          onChange={(e) => setFilterUniversity(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors text-sm"
        >
          <option value="">All Universities</option>
          {universities.map(uni => (
            <option key={uni} value={uni}>{uni}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400">Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400">University</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400">Major</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400">Grad Year</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400">GitHub</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400">Portfolio</th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400">Joined</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-b border-white/5 hover:bg-white/[0.05] transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-white">{student.full_name || '–'}</td>
                <td className="px-6 py-4 text-sm text-slate-300">{student.university || '–'}</td>
                <td className="px-6 py-4 text-sm text-slate-300">{student.major || '–'}</td>
                <td className="px-6 py-4 text-sm text-slate-300">{student.graduation_year || '–'}</td>
                <td className="px-6 py-4 text-sm">
                  {student.github_url ? (
                    <a
                      href={student.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                    >
                      <Github className="w-3 h-3" />
                      Link
                    </a>
                  ) : (
                    <span className="text-slate-600">–</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  {student.portfolio_url ? (
                    <a
                      href={student.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                    >
                      <Globe className="w-3 h-3" />
                      Link
                    </a>
                  ) : (
                    <span className="text-slate-600">–</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">
                  {new Date(student.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No students found matching your filters</p>
        </div>
      )}

      <p className="text-xs text-slate-500 mt-4 text-center">
        Showing {filteredStudents.length} of {students.length} student profiles
      </p>
    </motion.div>
  );
}

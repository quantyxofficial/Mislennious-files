import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Trophy, Bell, Plus, Trash2, Edit2, Check, X,
  Search, RefreshCw, LogOut, Lock, ChevronDown, AlertCircle,
  Github, Globe, Download, Eye, EyeOff, Loader, Award, Mail
} from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { createClient as createCertClient } from '../../../lib/supabase/client';
import { useNavigate } from 'react-router-dom';

const certSupabase = createCertClient();

// ─── Types ────────────────────────────────────────────────────────────────────

interface Student {
  id: string;
  user_id: string;
  full_name: string;
  university: string;
  major: string;
  graduation_year: string;
  bio: string;
  github_url: string;
  portfolio_url: string;
  linkedin_url: string;
  resume_url: string;
  created_at: string;
}

interface Competition {
  id: string;
  title: string;
  description: string;
  prize: string;
  deadline: string;
  participants: number;
  status: 'open' | 'urgent' | 'upcoming';
  color: string;
  created_at: string;
}

interface Announcement {
  id: string;
  type: 'info' | 'alert' | 'megaphone';
  title: string;
  date: string;
  content: string;
  is_published: boolean;
  created_at: string;
}

// ─── Shared Input ─────────────────────────────────────────────────────────────

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</label>
    {children}
  </div>
);

const inp = "w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors";
const sel = "w-full px-3 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-white/30 transition-colors";

// ─── LOGIN ────────────────────────────────────────────────────────────────────

function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data, error: fe } = await supabase
        .from('admins')
        .select('id, email, password_hash, is_active')
        .eq('email', email)
        .single();

      if (fe || !data) { setError('Invalid email or password'); return; }
      if (!data.is_active) { setError('Account is inactive'); return; }
      if (data.password_hash !== password) { setError('Invalid email or password'); return; }

      await supabase.from('admins').update({ last_login: new Date().toISOString() }).eq('id', data.id);
      await supabase.from('admin_logs').insert({ admin_id: data.id, action: 'LOGIN', resource: 'auth', details: { method: 'password' } });

      sessionStorage.setItem('ks_admin_id', data.id);
      sessionStorage.setItem('ks_admin_email', data.email);
      onLogin();
    } catch { setError('Something went wrong. Try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-serif text-white mb-2">Admin Portal</h1>
          <p className="text-slate-400 text-sm">Dashboard management system</p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 space-y-5">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <Field label="Email">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@kaizenstat.com" required className={inp} />
            </Field>
            <Field label="Password">
              <div className="relative">
                <input type={show ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required className={inp + ' pr-10'} />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </Field>
            <button type="submit" disabled={loading} className="w-full py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
              {loading ? <><Loader className="w-4 h-4 animate-spin" /> Verifying...</> : <><Lock className="w-4 h-4" /> Sign In</>}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// ─── STUDENTS TAB ─────────────────────────────────────────────────────────────

function StudentsTab() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Student>>({});

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('student_profiles').select('*').order('created_at', { ascending: false });
    setStudents(data || []);
    setLoading(false);
  };

  const startEdit = (s: Student) => { setEditing(s.id); setEditForm({ ...s }); };
  const cancelEdit = () => { setEditing(null); setEditForm({}); };

  const saveEdit = async (id: string) => {
    const { error } = await supabase.from('student_profiles').update({ ...editForm, updated_at: new Date().toISOString() }).eq('id', id);
    if (!error) { setEditing(null); load(); }
  };

  const deleteStudent = async (id: string) => {
    if (!confirm('Delete this student profile?')) return;
    const { error } = await supabase.from('student_profiles').delete().eq('id', id);
    if (error) { alert('Delete failed: ' + error.message); return; }
    load();
  };

  const exportCSV = () => {
    const rows = filtered.map(s => [s.full_name, s.university, s.major, s.graduation_year, s.github_url, s.linkedin_url, s.portfolio_url, s.resume_url, new Date(s.created_at).toLocaleDateString()]);
    const csv = ['Name,University,Major,Grad Year,GitHub,LinkedIn,Portfolio,Resume,Joined', ...rows.map(r => r.map(c => `"${c || ''}"`).join(','))].join('\n');
    const a = document.createElement('a'); a.href = 'data:text/csv,' + encodeURIComponent(csv); a.download = 'students.csv'; a.click();
  };

  const filtered = students.filter(s =>
    (s.full_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.university || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.major || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Users className="w-4 h-4 text-slate-300" /></div>
          <h2 className="text-xl font-semibold text-white">Students <span className="text-sm text-slate-500 font-normal ml-1">{students.length} total</span></h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..." className="pl-9 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-white/20 focus:outline-none w-56" />
          </div>
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button onClick={load} className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors"><RefreshCw className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16"><div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500">No students found</div>
      ) : (
        <div className="space-y-2">
          {filtered.map(s => (
            <div key={s.id} className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
              {editing === s.id ? (
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Full Name"><input value={editForm.full_name || ''} onChange={e => setEditForm({ ...editForm, full_name: e.target.value })} className={inp} /></Field>
                    <Field label="University"><input value={editForm.university || ''} onChange={e => setEditForm({ ...editForm, university: e.target.value })} className={inp} /></Field>
                    <Field label="Major"><input value={editForm.major || ''} onChange={e => setEditForm({ ...editForm, major: e.target.value })} className={inp} /></Field>
                    <Field label="Graduation Year"><input value={editForm.graduation_year || ''} onChange={e => setEditForm({ ...editForm, graduation_year: e.target.value })} className={inp} /></Field>
                    <Field label="GitHub URL"><input value={editForm.github_url || ''} onChange={e => setEditForm({ ...editForm, github_url: e.target.value })} className={inp} /></Field>
                    <Field label="LinkedIn URL"><input value={editForm.linkedin_url || ''} onChange={e => setEditForm({ ...editForm, linkedin_url: e.target.value })} className={inp} /></Field>
                    <Field label="Portfolio URL"><input value={editForm.portfolio_url || ''} onChange={e => setEditForm({ ...editForm, portfolio_url: e.target.value })} className={inp} /></Field>
                    <Field label="Resume URL"><input value={editForm.resume_url || ''} onChange={e => setEditForm({ ...editForm, resume_url: e.target.value })} className={inp} /></Field>
                  </div>
                  <Field label="Bio"><textarea value={editForm.bio || ''} onChange={e => setEditForm({ ...editForm, bio: e.target.value })} rows={3} className={inp + ' resize-none'} /></Field>
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(s.id)} className="flex items-center gap-1.5 px-4 py-2 bg-white text-black text-xs font-semibold rounded-full hover:bg-white/90 transition-colors"><Check className="w-3.5 h-3.5" /> Save</button>
                    <button onClick={cancelEdit} className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 text-white text-xs font-semibold rounded-full hover:bg-white/10 transition-colors"><X className="w-3.5 h-3.5" /> Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between px-5 py-3.5 cursor-pointer hover:bg-white/[0.02]" onClick={() => setExpanded(expanded === s.id ? null : s.id)}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm font-serif font-bold text-white/60">
                        {(s.full_name || '?').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{s.full_name || '–'}</p>
                        <p className="text-xs text-slate-500">{s.university || 'No university'} {s.major && `· ${s.major}`}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-600 font-mono">{new Date(s.created_at).toLocaleDateString()}</span>
                      <button onClick={e => { e.stopPropagation(); startEdit(s); }} className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={e => { e.stopPropagation(); deleteStudent(s.id); }} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      <ChevronDown className={`w-4 h-4 text-white/20 transition-transform ${expanded === s.id ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  <AnimatePresence>
                    {expanded === s.id && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t border-white/5">
                        <div className="px-5 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div><p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Grad Year</p><p className="text-sm text-white">{s.graduation_year || '–'}</p></div>
                          <div><p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">GitHub</p>{s.github_url ? <a href={s.github_url} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 flex items-center gap-1 hover:text-cyan-300"><Github className="w-3 h-3" /> Profile</a> : <p className="text-sm text-slate-600">–</p>}</div>
                          <div><p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">LinkedIn</p>{s.linkedin_url ? <a href={s.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 flex items-center gap-1 hover:text-cyan-300"><Globe className="w-3 h-3" /> Profile</a> : <p className="text-sm text-slate-600">–</p>}</div>
                          <div><p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Portfolio</p>{s.portfolio_url ? <a href={s.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 flex items-center gap-1 hover:text-cyan-300"><Globe className="w-3 h-3" /> Website</a> : <p className="text-sm text-slate-600">–</p>}</div>
                          <div><p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Resume</p>{s.resume_url ? <a href={s.resume_url} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 flex items-center gap-1 hover:text-cyan-300"><Eye className="w-3 h-3" /> View</a> : <p className="text-sm text-slate-600">–</p>}</div>
                          <div className="col-span-2 md:col-span-4"><p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Bio</p><p className="text-sm text-slate-400 leading-relaxed">{s.bio || '–'}</p></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── COMPETITIONS TAB ─────────────────────────────────────────────────────────

function CompetitionsTab() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', description: '', prize: '', deadline: '', participants: 0, status: 'open', color: 'cyan' });

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('competitions').select('*').order('created_at', { ascending: false });
    setCompetitions(data || []);
    setLoading(false);
  };

  const reset = () => { setForm({ title: '', description: '', prize: '', deadline: '', participants: 0, status: 'open', color: 'cyan' }); setEditing(null); setShowForm(false); };

  const save = async () => {
    if (!form.title) return;
    let error;
    if (editing) {
      ({ error } = await supabase.from('competitions').update(form).eq('id', editing));
    } else {
      ({ error } = await supabase.from('competitions').insert(form));
    }
    if (error) { alert('Save failed: ' + error.message); return; }
    reset(); load();
  };

  const startEdit = (c: Competition) => {
    setForm({ title: c.title, description: c.description, prize: c.prize, deadline: c.deadline, participants: c.participants, status: c.status, color: c.color });
    setEditing(c.id); setShowForm(true);
  };

  const del = async (id: string) => {
    if (!confirm('Delete this competition?')) return;
    const { error } = await supabase.from('competitions').delete().eq('id', id);
    if (error) { alert('Delete failed: ' + error.message); return; }
    load();
  };

  const statusColors: Record<string, string> = { open: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', urgent: 'text-orange-400 bg-orange-500/10 border-orange-500/20', upcoming: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Trophy className="w-4 h-4 text-slate-300" /></div>
          <h2 className="text-xl font-semibold text-white">Competitions <span className="text-sm text-slate-500 font-normal ml-1">{competitions.length} total</span></h2>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { reset(); setShowForm(!showForm); }} className="flex items-center gap-1.5 px-4 py-2 bg-white text-black text-xs font-semibold rounded-full hover:bg-white/90 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Competition
          </button>
          <button onClick={load} className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors"><RefreshCw className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white">{editing ? 'Edit Competition' : 'New Competition'}</h3>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title"><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Competition title" className={inp} /></Field>
              <Field label="Prize"><input value={form.prize} onChange={e => setForm({ ...form, prize: e.target.value })} placeholder="$5,000 + Internship" className={inp} /></Field>
              <Field label="Deadline"><input value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} placeholder="In 14 days" className={inp} /></Field>
              <Field label="Participants"><input type="number" value={form.participants} onChange={e => setForm({ ...form, participants: parseInt(e.target.value) || 0 })} className={inp} /></Field>
              <Field label="Status">
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={sel}>
                  <option value="open">Open</option>
                  <option value="urgent">Urgent</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </Field>
              <Field label="Color">
                <select value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} className={sel}>
                  <option value="cyan">Cyan</option>
                  <option value="emerald">Emerald</option>
                  <option value="orange">Orange</option>
                  <option value="purple">Purple</option>
                </select>
              </Field>
            </div>
            <Field label="Description"><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Competition description..." className={inp + ' resize-none'} /></Field>
            <div className="flex gap-2">
              <button onClick={save} className="flex items-center gap-1.5 px-4 py-2 bg-white text-black text-xs font-semibold rounded-full hover:bg-white/90 transition-colors"><Check className="w-3.5 h-3.5" /> {editing ? 'Save Changes' : 'Create'}</button>
              <button onClick={reset} className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 text-white text-xs font-semibold rounded-full hover:bg-white/10 transition-colors"><X className="w-3.5 h-3.5" /> Cancel</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex items-center justify-center py-16"><div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" /></div>
      ) : competitions.length === 0 ? (
        <div className="text-center py-16 text-slate-500">No competitions yet. Add one above.</div>
      ) : (
        <div className="space-y-3">
          {competitions.map(c => (
            <div key={c.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${statusColors[c.status] || statusColors.open}`}>{c.status}</span>
                    <span className="text-xs text-slate-500">{c.deadline}</span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1">{c.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{c.description}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs text-slate-400">🏆 {c.prize}</span>
                    <span className="text-xs text-slate-400">👥 {c.participants?.toLocaleString()} participants</span>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => startEdit(c)} className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => del(c.id)} className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ANNOUNCEMENTS TAB ────────────────────────────────────────────────────────

function AnnouncementsTab() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ type: 'info', title: '', date: '', content: '', is_published: true });

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
    setAnnouncements(data || []);
    setLoading(false);
  };

  const reset = () => { setForm({ type: 'info', title: '', date: '', content: '', is_published: true }); setEditing(null); setShowForm(false); };

  const save = async () => {
    if (!form.title || !form.content) return;
    const payload = { ...form, date: form.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
    let error;
    if (editing) {
      ({ error } = await supabase.from('announcements').update(payload).eq('id', editing));
    } else {
      ({ error } = await supabase.from('announcements').insert(payload));
    }
    if (error) { alert('Save failed: ' + error.message); return; }
    reset(); load();
  };

  const startEdit = (a: Announcement) => {
    setForm({ type: a.type, title: a.title, date: a.date, content: a.content, is_published: a.is_published });
    setEditing(a.id); setShowForm(true);
  };

  const del = async (id: string) => {
    if (!confirm('Delete this announcement?')) return;
    const { error } = await supabase.from('announcements').delete().eq('id', id);
    if (error) { alert('Delete failed: ' + error.message); return; }
    load();
  };

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from('announcements').update({ is_published: !current }).eq('id', id);
    load();
  };

  const typeColors: Record<string, string> = {
    info: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    alert: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    megaphone: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Bell className="w-4 h-4 text-slate-300" /></div>
          <h2 className="text-xl font-semibold text-white">Announcements <span className="text-sm text-slate-500 font-normal ml-1">{announcements.length} total</span></h2>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { reset(); setShowForm(!showForm); }} className="flex items-center gap-1.5 px-4 py-2 bg-white text-black text-xs font-semibold rounded-full hover:bg-white/90 transition-colors">
            <Plus className="w-3.5 h-3.5" /> New Announcement
          </button>
          <button onClick={load} className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors"><RefreshCw className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white">{editing ? 'Edit Announcement' : 'New Announcement'}</h3>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title"><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Announcement title" className={inp} /></Field>
              <Field label="Date"><input value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="Oct 24, 2026" className={inp} /></Field>
              <Field label="Type">
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={sel}>
                  <option value="info">Info</option>
                  <option value="alert">Alert</option>
                  <option value="megaphone">Megaphone</option>
                </select>
              </Field>
              <Field label="Published">
                <select value={form.is_published ? 'true' : 'false'} onChange={e => setForm({ ...form, is_published: e.target.value === 'true' })} className={sel}>
                  <option value="true">Published</option>
                  <option value="false">Draft</option>
                </select>
              </Field>
            </div>
            <Field label="Content"><textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={4} placeholder="Announcement content..." className={inp + ' resize-none'} /></Field>
            <div className="flex gap-2">
              <button onClick={save} className="flex items-center gap-1.5 px-4 py-2 bg-white text-black text-xs font-semibold rounded-full hover:bg-white/90 transition-colors"><Check className="w-3.5 h-3.5" /> {editing ? 'Save Changes' : 'Publish'}</button>
              <button onClick={reset} className="flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 text-white text-xs font-semibold rounded-full hover:bg-white/10 transition-colors"><X className="w-3.5 h-3.5" /> Cancel</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex items-center justify-center py-16"><div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" /></div>
      ) : announcements.length === 0 ? (
        <div className="text-center py-16 text-slate-500">No announcements yet. Add one above.</div>
      ) : (
        <div className="space-y-3">
          {announcements.map(a => (
            <div key={a.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${typeColors[a.type]}`}>{a.type}</span>
                    <span className="text-[10px] text-slate-600">{a.date}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${a.is_published ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-slate-400 bg-white/5 border-white/10'}`}>
                      {a.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{a.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{a.content}</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => togglePublish(a.id, a.is_published)} className={`p-2 rounded-lg transition-colors ${a.is_published ? 'text-emerald-400 hover:bg-emerald-500/10' : 'text-white/20 hover:text-white hover:bg-white/5'}`} title={a.is_published ? 'Unpublish' : 'Publish'}>
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => startEdit(a)} className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => del(a.id)} className="p-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CERTIFICATES TAB ────────────────────────────────────────────────────────

interface Certificate {
  id: string;
  unique_id: string;
  email: string;
  name: string;
  position: string;
  category: string;
  template_id: string;
  created_at: string;
}

interface AllowedEmail {
  id: string;
  email: string;
  name: string;
  position: string;
  category: string;
  is_used: boolean;
  created_at: string;
}

function CertificatesTab() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [allowed, setAllowed] = useState<AllowedEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [subTab, setSubTab] = useState<'issued' | 'allowed'>('issued');
  const [search, setSearch] = useState('');

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const [certsRes, allowedRes] = await Promise.all([
      certSupabase.from('certificates').select('*').order('created_at', { ascending: false }),
      certSupabase.from('allowed_emails').select('*').order('created_at', { ascending: false }),
    ]);
    setCerts(certsRes.data || []);
    setAllowed(allowedRes.data || []);
    setLoading(false);
  };

  const exportCertsCSV = () => {
    const rows = filteredCerts.map(c => [c.name, c.email, c.category, c.position, c.unique_id, new Date(c.created_at).toLocaleDateString()]);
    const csv = ['Name,Email,Category,Position,Certificate ID,Issued Date', ...rows.map(r => r.map(v => `"${v || ''}"`).join(','))].join('\n');
    const a = document.createElement('a'); a.href = 'data:text/csv,' + encodeURIComponent(csv); a.download = 'certificates.csv'; a.click();
  };

  const filteredCerts = certs.filter(c =>
    (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.category || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.unique_id || '').toLowerCase().includes(search.toLowerCase())
  );

  const filteredAllowed = allowed.filter(a =>
    (a.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.category || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Award className="w-4 h-4 text-slate-300" /></div>
          <h2 className="text-xl font-semibold text-white">
            Certificates
            <span className="text-sm text-slate-500 font-normal ml-2">{certs.length} issued · {allowed.length} allowed emails</span>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="pl-9 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-white/20 focus:outline-none w-52" />
          </div>
          {subTab === 'issued' && (
            <button onClick={exportCertsCSV} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          )}
          <button onClick={load} className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white transition-colors"><RefreshCw className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 p-1 bg-white/[0.03] border border-white/10 rounded-xl w-fit">
        {(['issued', 'allowed'] as const).map(t => (
          <button key={t} onClick={() => setSubTab(t)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${subTab === t ? 'bg-white text-black' : 'text-slate-400 hover:text-white'}`}>
            {t === 'issued' ? `Issued (${certs.length})` : `Allowed Emails (${allowed.length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16"><div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" /></div>
      ) : subTab === 'issued' ? (
        filteredCerts.length === 0 ? (
          <div className="text-center py-16 text-slate-500">No certificates found</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Name</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Email</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Category</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Position</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Certificate ID</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Issued</th>
                </tr>
              </thead>
              <tbody>
                {filteredCerts.map(c => (
                  <tr key={c.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 text-white font-medium">{c.name || '–'}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{c.email || '–'}</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-semibold">{c.category || '–'}</span></td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{c.position || '–'}</td>
                    <td className="px-4 py-3 font-mono text-[11px] text-slate-500">{c.unique_id || '–'}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{new Date(c.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        filteredAllowed.length === 0 ? (
          <div className="text-center py-16 text-slate-500">No allowed emails found</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Email</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Name</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Category</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Position</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Status</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">Added</th>
                </tr>
              </thead>
              <tbody>
                {filteredAllowed.map(a => (
                  <tr key={a.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 text-slate-300 text-xs">{a.email || '–'}</td>
                    <td className="px-4 py-3 text-white font-medium">{a.name || '–'}</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-semibold">{a.category || '–'}</span></td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{a.position || '–'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${a.is_used ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}>
                        {a.is_used ? 'Used' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{new Date(a.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const tabs = [
  { id: 'students', label: 'Students', icon: Users },
  { id: 'competitions', label: 'Competitions', icon: Trophy },
  { id: 'announcements', label: 'Announcements', icon: Bell },
  { id: 'certificates', label: 'Certificates', icon: Award },
];

export function DashboardAdmin() {
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem('ks_admin_id'));
  const [activeTab, setActiveTab] = useState('students');
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem('ks_admin_id');
    sessionStorage.removeItem('ks_admin_email');
    setAuthed(false);
  };

  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-[#020202] pt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-white">Dashboard Admin</h1>
            <p className="text-sm text-slate-500 mt-0.5">{sessionStorage.getItem('ks_admin_email')}</p>
          </div>
          <button onClick={logout} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors text-sm">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white/[0.03] border border-white/10 rounded-xl mb-8 w-fit">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === t.id ? 'bg-white text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            {activeTab === 'students' && <StudentsTab />}
            {activeTab === 'competitions' && <CompetitionsTab />}
            {activeTab === 'announcements' && <AnnouncementsTab />}
            {activeTab === 'certificates' && <CertificatesTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
